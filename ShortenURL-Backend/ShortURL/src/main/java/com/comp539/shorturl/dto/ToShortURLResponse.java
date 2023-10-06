package com.comp539.shorturl.dto;

public class ToShortURLResponse {
    private String shortenedURL;
    public ToShortURLResponse(String shortenedURL) {
        this.shortenedURL = shortenedURL;
    }

    public String getShortenedURL() {
        return shortenedURL;
    }

    public void setShortenedURL(String shortenedURL) {
        this.shortenedURL = shortenedURL;
    }
}
