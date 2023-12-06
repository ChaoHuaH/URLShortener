package com.comp539.shorturl.utils;

import org.springframework.http.HttpHeaders;

public class Constants {
    public static final String ORIGIN = "https://linkpulse-dot-rice-comp-539-spring-2022.uk.r.appspot.com";
    public static final HttpHeaders TEMPLATE_RESPONSE_HEADER = new HttpHeaders();

    static{
        TEMPLATE_RESPONSE_HEADER.set("Access-Control-Allow-Origin", Constants.ORIGIN);
    }
}
