package com.comp539.shorturl.controller;

import com.comp539.shorturl.dto.ToShortURLResponse;
import com.comp539.shorturl.service.URLConversionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class URLConversionController {

    private URLConversionService urlConversionService;

    URLConversionController(URLConversionService urlConversionService){
        this.urlConversionService = urlConversionService;
    }

    @GetMapping("to-shortURL")
    public ToShortURLResponse toShortURL(String longURL){
        String shortUrl = urlConversionService.toShortUrl(longURL);
        return new ToShortURLResponse(shortUrl);
    }

    @RequestMapping("/rl/{shortUrl}")
    public RedirectView redirectLongURL(@PathVariable("shortUrl") String shortUrl) {
        String longUrl = urlConversionService.toLongUrl(shortUrl);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(longUrl);
        return redirectView;
    }

    @GetMapping("custom-shortURL")
    public ResponseEntity<?> customShortURL(String longURL, String alias){
        boolean success = urlConversionService.createCustomShortUrl(longURL, alias);
        if(success){
            return ResponseEntity.ok(new ToShortURLResponse(alias));
        }
        else{
            return ResponseEntity.badRequest().body("Alias already in use. Please try another one.");
        }
    }
}
