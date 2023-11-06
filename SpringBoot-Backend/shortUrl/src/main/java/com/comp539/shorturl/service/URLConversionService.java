package com.comp539.shorturl.service;

import com.comp539.shorturl.gateway.URLMapGateway;
import com.comp539.shorturl.utils.HashingUtil;
import com.comp539.shorturl.utils.URLDecodingUtil;
import org.springframework.stereotype.Service;

@Service
public class URLConversionService {

    private URLMapGateway urlMapGateway;
    private HashingUtil hashingUtil;
    private URLDecodingUtil urlDecodingUtil;

    URLConversionService(URLMapGateway urlMapGateway, HashingUtil hashingUtil, URLDecodingUtil urlDecodingUtil){
        this.urlMapGateway = urlMapGateway;
        this.hashingUtil = hashingUtil;
        this.urlDecodingUtil = urlDecodingUtil;
    }

    public String toLongUrl(String shortUrl){
        return urlMapGateway.getLongUrl(shortUrl);
    }

    public String toShortUrl(String longUrl){
        String shortUrl = hashingUtil.generateBase62Hash(longUrl).substring(0,6);
        String decodedLongUrl = urlDecodingUtil.decodeUrl(longUrl);
        urlMapGateway.insertUrlMapWithRetries(shortUrl, decodedLongUrl, 3);
        return shortUrl;
    }

    public boolean createCustomShortUrl(String longUrl, String alias){
        if(urlMapGateway.existShortUrl(alias)){
            return false;
        }
        else{
            String decodedLongUrl = urlDecodingUtil.decodeUrl(longUrl);
            urlMapGateway.insertUrlMapWithRetries(alias, decodedLongUrl, 3);
            return true;
        }
    }

}
