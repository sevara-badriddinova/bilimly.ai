package com.bilimly.backend.admin.tts;

import com.bilimly.backend.admin.audit.AdminAuditService;
import com.bilimly.backend.admin.dto.TtsCacheItemResponse;
import com.bilimly.backend.admin.dto.TtsSummaryResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
public class AdminTtsService {
    private final Path storageDir;
    private final String publicPath;
    private final AdminAuditService auditService;

    public AdminTtsService(
            @Value("${tts.storage-dir:${java.io.tmpdir}/bilimly-audio}") String storageDir,
            @Value("${tts.public-path:/audio}") String publicPath,
            AdminAuditService auditService
    ) {
        this.storageDir = Path.of(storageDir).toAbsolutePath().normalize();
        this.publicPath = publicPath.endsWith("/") ? publicPath.substring(0, publicPath.length() - 1) : publicPath;
        this.auditService = auditService;
    }

    public TtsSummaryResponse summary() {
        List<Path> files = audioFiles();
        long size = files.stream().mapToLong(this::sizeQuietly).sum();
        return new TtsSummaryResponse(files.size(), size, isStorageWritable(), storageDir.toString(), publicPath);
    }

    public List<TtsCacheItemResponse> cacheItems() {
        return audioFiles().stream()
                .sorted(Comparator.comparing(this::lastModifiedQuietly).reversed())
                .map(path -> new TtsCacheItemResponse(cacheKey(path), publicPath + "/" + path.getFileName(), sizeQuietly(path), lastModifiedQuietly(path)))
                .toList();
    }

    public void delete(String cacheKey, String actorEmail, HttpServletRequest request) {
        if (cacheKey == null || !cacheKey.matches("[a-zA-Z0-9_-]+")) {
            throw new IllegalArgumentException("Invalid cache key");
        }
        Path target = storageDir.resolve(cacheKey + ".mp3").normalize();
        if (!target.startsWith(storageDir)) {
            throw new IllegalArgumentException("Invalid cache key");
        }
        try {
            Files.deleteIfExists(target);
            auditService.record(actorEmail, "TTS_CACHE_DELETED", "TTS_CACHE", cacheKey, "Deleted TTS cache file " + cacheKey, null, request);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to delete TTS cache file", e);
        }
    }

    private List<Path> audioFiles() {
        if (!Files.exists(storageDir)) {
            return List.of();
        }
        try (Stream<Path> files = Files.list(storageDir)) {
            return files
                    .filter(path -> path.getFileName().toString().endsWith(".mp3"))
                    .filter(Files::isRegularFile)
                    .toList();
        } catch (IOException e) {
            return List.of();
        }
    }

    private boolean isStorageWritable() {
        try {
            Files.createDirectories(storageDir);
            return Files.isWritable(storageDir);
        } catch (IOException e) {
            return false;
        }
    }

    private String cacheKey(Path path) {
        String fileName = path.getFileName().toString();
        return fileName.endsWith(".mp3") ? fileName.substring(0, fileName.length() - 4) : fileName;
    }

    private long sizeQuietly(Path path) {
        try {
            return Files.size(path);
        } catch (IOException e) {
            return 0L;
        }
    }

    private Instant lastModifiedQuietly(Path path) {
        try {
            return Files.getLastModifiedTime(path).toInstant();
        } catch (IOException e) {
            return Instant.EPOCH;
        }
    }
}
