package com.comp539.shorturl.controller;

import com.comp539.shorturl.dto.ToShortURLResponse;
import com.comp539.shorturl.service.URLConversionService;
import com.comp539.shorturl.service.ViewCountTackingService;
import com.comp539.shorturl.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


@RestController
public class URLConversionController {

    private URLConversionService urlConversionService;
    private ViewCountTackingService viewCountTackingService;

    URLConversionController(URLConversionService urlConversionService, ViewCountTackingService viewCountTackingService){
        this.urlConversionService = urlConversionService;
        this.viewCountTackingService = viewCountTackingService;
    }

    @GetMapping("to-shortURL")
    @ResponseBody
    public ResponseEntity<ToShortURLResponse> toShortURL(String longURL){
        String shortUrl = urlConversionService.toShortUrl(longURL);
        return ResponseEntity.ok()
                .headers(Constants.TEMPLATE_RESPONSE_HEADER)
                .body(new ToShortURLResponse(shortUrl));
    }

    @RequestMapping("/rl/{shortUrl}")
    public RedirectView redirectLongURL(@PathVariable("shortUrl") String shortUrl) {
        System.out.println("param is " + shortUrl);
        String longUrl = urlConversionService.toLongUrl(shortUrl);
        viewCountTackingService.addViewCount(longUrl);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(longUrl);
        return redirectView;
    }

    @GetMapping("custom-shortURL")
    @ResponseBody
    public ResponseEntity<?> customShortURL(String longURL, String alias){
        boolean success = urlConversionService.createCustomShortUrl(longURL, alias);
        if(success){
            return ResponseEntity.ok()
                    .headers(Constants.TEMPLATE_RESPONSE_HEADER)
                    .body(new ToShortURLResponse(alias));
        }
        else{
            return ResponseEntity.badRequest()
                    .headers(Constants.TEMPLATE_RESPONSE_HEADER)
                    .body("Alias already in use. Please try another one.");
        }
    }
}
