package com.bilimly.backend.tts;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
public class TtsStaticResourceConfig implements WebMvcConfigurer {
    private final Path storageDir;

    public TtsStaticResourceConfig(@Value("${tts.storage-dir:${java.io.tmpdir}/bilimly-audio}") String storageDir) {
        this.storageDir = Path.of(storageDir).toAbsolutePath().normalize();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/audio/**")
                .addResourceLocations(storageDir.toUri().toString())
                .setCachePeriod(31536000);
    }
}
