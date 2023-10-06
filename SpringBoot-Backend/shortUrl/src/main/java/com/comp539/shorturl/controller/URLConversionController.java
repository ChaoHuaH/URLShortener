package com.comp539.shorturl.controller;

import com.comp539.shorturl.dto.ToShortURLResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class URLConversionController {

    @GetMapping("to-shortURL")
    public ToShortURLResponse toShortURL(String longURL){
        return new ToShortURLResponse(longURL+"TestTest");
    }
}
