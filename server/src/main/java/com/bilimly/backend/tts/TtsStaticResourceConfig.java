package com.bilimly.backend.tts;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;

@Configuration
public class TtsStaticResourceConfig implements WebMvcConfigurer {
    private final Path storageDir;
    private final Resource storageLocation;

    public TtsStaticResourceConfig(@Value("${tts.storage-dir:${java.io.tmpdir}/bilimly-audio}") String storageDir) throws MalformedURLException {
        this.storageDir = Path.of(storageDir).toAbsolutePath().normalize();
        this.storageLocation = new UrlResource(this.storageDir.toUri());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/audio/**")
                .addResourceLocations(storageDir.toUri().toString())
                .setCachePeriod(31536000)
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected boolean checkResource(Resource resource, Resource location) throws IOException {
                        return super.checkResource(resource, location)
                                && resource.getURL().toString().startsWith(storageLocation.getURL().toString());
                    }
                });
    }
}
