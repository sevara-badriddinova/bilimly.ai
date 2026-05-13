package com.bilimly.backend.admin.tts;

import com.bilimly.backend.admin.dto.TtsCacheItemResponse;
import com.bilimly.backend.admin.dto.TtsSummaryResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/tts")
public class AdminTtsController {
    private final AdminTtsService adminTtsService;

    @GetMapping("/summary")
    public TtsSummaryResponse summary() {
        return adminTtsService.summary();
    }

    @GetMapping("/cache")
    public List<TtsCacheItemResponse> cache() {
        return adminTtsService.cacheItems();
    }

    @DeleteMapping("/cache/{cacheKey}")
    public Map<String, String> delete(@PathVariable String cacheKey, Authentication authentication, HttpServletRequest request) {
        adminTtsService.delete(cacheKey, authentication.getName(), request);
        return Map.of("status", "deleted");
    }
}
