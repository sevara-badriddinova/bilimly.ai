package ai.ielts;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

@RestController
@RequestMapping("/api/i18n")
public class I18nController {

    @GetMapping(value = "/{lang}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> getTranslations(@PathVariable("lang") String lang) {
        Locale locale = switch (lang.toLowerCase()) {
            case "uz" -> new Locale("uz");
            case "en" -> Locale.ENGLISH;
            default -> Locale.ENGLISH;
        };

        ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
        Map<String, String> map = new HashMap<>();
        Enumeration<String> keys = bundle.getKeys();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            map.put(key, bundle.getString(key));
        }
        return map;
    }
}


