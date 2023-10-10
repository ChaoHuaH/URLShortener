package com.comp539.shorturl.service;

import com.comp539.shorturl.gateway.BigTableGateway;
import com.comp539.shorturl.utils.HashingUtil;
import com.google.cloud.bigtable.data.v2.models.Row;
import com.google.cloud.bigtable.data.v2.models.RowCell;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class URLConversionService {

    private BigTableGateway bigTableGateway;
    private HashingUtil hashingUtil;
    private static final String URL_TABLE = "urlmap1";
    private static final String FAMILIY_NAME = "longUrl";
    private static final String COLUMN_NAME = "longUrl";

    URLConversionService(BigTableGateway bigTableGateway, HashingUtil hashingUtil){
        this.bigTableGateway = bigTableGateway;
        this.hashingUtil = hashingUtil;
    }

    public String toLongUrl(String shortUrl){
        Row longUrlRow = bigTableGateway.readRow(URL_TABLE, shortUrl);
        List<RowCell> cells = longUrlRow.getCells(FAMILIY_NAME, COLUMN_NAME);
        String longUrl = cells.get(0).getValue().toStringUtf8();
        return longUrl;
    }

    public String toShortUrl(String longUrl){
        String shortUrl = hashingUtil.generateBase62Hash(longUrl);
        bigTableGateway.writeRow(URL_TABLE, FAMILIY_NAME, COLUMN_NAME, shortUrl, longUrl);
        return shortUrl;
    }
}
