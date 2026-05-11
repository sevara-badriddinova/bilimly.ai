package com.bilimly.backend.tts;

import com.bilimly.backend.tts.dto.TtsResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.Instant;
import java.util.Comparator;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

@Service
public class TtsService {
    private static final Logger log = LoggerFactory.getLogger(TtsService.class);

    private final GeminiTtsClient geminiTtsClient;
    private final Path storageDir;
    private final String publicPath;
    private final String ffmpegBinary;
    private final int maxCacheFiles;
    private final Duration maxCacheAge;
    private final Map<String, Object> locks = new ConcurrentHashMap<>();

    public TtsService(
            GeminiTtsClient geminiTtsClient,
            @Value("${tts.storage-dir:${java.io.tmpdir}/bilimly-audio}") String storageDir,
            @Value("${tts.public-path:/audio}") String publicPath,
            @Value("${tts.ffmpeg-binary:ffmpeg}") String ffmpegBinary,
            @Value("${tts.cache.max-files:200}") int maxCacheFiles,
            @Value("${tts.cache.max-age-days:30}") long maxCacheAgeDays
    ) {
        this.geminiTtsClient = geminiTtsClient;
        this.storageDir = Path.of(storageDir).toAbsolutePath().normalize();
        this.publicPath = publicPath.endsWith("/") ? publicPath.substring(0, publicPath.length() - 1) : publicPath;
        this.ffmpegBinary = ffmpegBinary;
        this.maxCacheFiles = Math.max(10, maxCacheFiles);
        this.maxCacheAge = Duration.ofDays(Math.max(1, maxCacheAgeDays));
    }

    public TtsResponse getOrCreateAudio(String namespace, String text) {
        String cacheKey = cacheKey(namespace, text);
        Path audioFile = storageDir.resolve(cacheKey + ".mp3");

        if (Files.exists(audioFile)) {
            return new TtsResponse(audioUrl(cacheKey), true);
        }

        Object lock = locks.computeIfAbsent(cacheKey, ignored -> new Object());
        synchronized (lock) {
            try {
                if (Files.exists(audioFile)) {
                    return new TtsResponse(audioUrl(cacheKey), true);
                }

                Files.createDirectories(storageDir);
                cleanupCache();
                GeminiTtsClient.GeminiAudio audio = geminiTtsClient.generate(text);
                writeMp3(audio, audioFile);
                log.info("Generated and cached Gemini TTS audio: {}", audioFile);
                return new TtsResponse(audioUrl(cacheKey), false);
            } catch (IOException e) {
                throw new IllegalStateException("Failed to generate TTS audio", e);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new IllegalStateException("Failed to generate TTS audio", e);
            } finally {
                locks.remove(cacheKey);
            }
        }
    }

    private void writeMp3(GeminiTtsClient.GeminiAudio audio, Path mp3File) throws IOException, InterruptedException {
        if (audio.mimeType().toLowerCase().contains("mpeg") || audio.mimeType().toLowerCase().contains("mp3")) {
            Files.write(mp3File, audio.bytes());
            return;
        }

        Path pcmFile = Files.createTempFile(storageDir, "tts-", ".pcm");
        try {
            Files.write(pcmFile, audio.bytes());
            Process process = new ProcessBuilder(
                    ffmpegBinary,
                    "-y",
                    "-f", "s16le",
                    "-ar", "24000",
                    "-ac", "1",
                    "-i", pcmFile.toString(),
                    "-codec:a", "libmp3lame",
                    "-b:a", "48k",
                    mp3File.toString()
            ).redirectErrorStream(true).start();

            boolean finished = process.waitFor(Duration.ofSeconds(30).toMillis(), java.util.concurrent.TimeUnit.MILLISECONDS);
            if (!finished || process.exitValue() != 0) {
                throw new IllegalStateException("ffmpeg failed to convert Gemini PCM audio to MP3");
            }
        } finally {
            Files.deleteIfExists(pcmFile);
        }
    }

    private String audioUrl(String cacheKey) {
        return publicPath + "/" + cacheKey + ".mp3";
    }

    private String cacheKey(String namespace, String text) {
        String normalizedNamespace = namespace.trim().toLowerCase().replaceAll("[^a-z0-9_-]", "-");
        String prefix = normalizedNamespace.isBlank() ? "tts" : normalizedNamespace;
        return prefix + "-" + sha256(text).substring(0, 16);
    }

    private String sha256(String text) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(digest.digest(text.getBytes(java.nio.charset.StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 is not available", e);
        }
    }

    private void cleanupCache() throws IOException {
        if (!Files.exists(storageDir)) {
            return;
        }

        Instant expiresBefore = Instant.now().minus(maxCacheAge);
        try (Stream<Path> files = Files.list(storageDir)) {
            files.filter(path -> path.getFileName().toString().endsWith(".mp3"))
                    .filter(path -> isOlderThan(path, expiresBefore))
                    .forEach(this::deleteQuietly);
        }

        try (Stream<Path> files = Files.list(storageDir)) {
            List<Path> audioFiles = files
                    .filter(path -> path.getFileName().toString().endsWith(".mp3"))
                    .sorted(Comparator.comparing(this::lastModifiedQuietly))
                    .toList();

            int overflow = audioFiles.size() - maxCacheFiles + 1;
            for (int i = 0; i < overflow && i < audioFiles.size(); i++) {
                deleteQuietly(audioFiles.get(i));
            }
        }
    }

    private boolean isOlderThan(Path path, Instant cutoff) {
        return lastModifiedQuietly(path).isBefore(cutoff);
    }

    private Instant lastModifiedQuietly(Path path) {
        try {
            return Files.getLastModifiedTime(path).toInstant();
        } catch (IOException e) {
            return Instant.EPOCH;
        }
    }

    private void deleteQuietly(Path path) {
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            log.warn("Failed to delete old TTS cache file: {}", path, e);
        }
    }
}
