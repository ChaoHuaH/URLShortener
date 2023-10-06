package com.comp539.shorturl.controller;

import com.comp539.shorturl.dto.ToShortURLResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class URLConversionController {

    @GetMapping("to-shortURL")
    public ToShortURLResponse toShortURL(String longURL){
        return new ToShortURLResponse(longURL+"TestTest");
    }

    @RequestMapping("redirect-longURL")
    public RedirectView redirectLongURL() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://www.yahoo.com");
        return redirectView;
    }
}
