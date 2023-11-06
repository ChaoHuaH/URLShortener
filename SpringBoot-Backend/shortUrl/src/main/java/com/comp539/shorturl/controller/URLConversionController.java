package com.comp539.shorturl.controller;

import com.comp539.shorturl.dto.ToShortURLResponse;
import com.comp539.shorturl.service.URLConversionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


@RestController
public class URLConversionController {

    private URLConversionService urlConversionService;

    URLConversionController(URLConversionService urlConversionService){
        this.urlConversionService = urlConversionService;
    }

    @GetMapping("to-shortURL")
    @ResponseBody
    public ResponseEntity<ToShortURLResponse> toShortURL(String longURL){
        String shortUrl = urlConversionService.toShortUrl(longURL);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "http://localhost:3000");
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(new ToShortURLResponse(shortUrl));
    }

    @RequestMapping("/rl/{shortUrl}")
    public RedirectView redirectLongURL(@PathVariable("shortUrl") String shortUrl) {
        String longUrl = urlConversionService.toLongUrl(shortUrl);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(longUrl);
        return redirectView;
    }
}
