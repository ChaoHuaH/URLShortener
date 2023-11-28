package com.comp539.shorturl.gateway;

import com.comp539.shorturl.service.GenerateKey;
import com.google.cloud.bigtable.data.v2.models.Mutation;
import com.google.cloud.bigtable.data.v2.models.Row;
import com.google.cloud.bigtable.data.v2.models.RowCell;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class URLMapGateway extends BigTableAbstarctGateway {
    private static final String URL_TABLE = "team3_URLMap";
    private static final String FAMILIY_NAME = "longUrl";
    private static final String COLUMN_NAME = "longUrl";

    public String getLongUrl(String shortUrl){
        Row longUrlRow = readRow(URL_TABLE, shortUrl);
        List<RowCell> cells = longUrlRow.getCells(FAMILIY_NAME, COLUMN_NAME);
        String longUrl = cells.get(0).getValue().toStringUtf8();
        return longUrl;
    }

    public boolean insertUrlMap(String shortUrl, String longUrl){
        Mutation mutation = Mutation.create().setCell(FAMILIY_NAME, COLUMN_NAME, longUrl);
        boolean notExist = mutateWhenNotExist(URL_TABLE, shortUrl, mutation);
        return notExist;
    }

    public boolean insertUrlMapWithRetries(String shortUrl, String longUrl, int numOfRetries){
        for(int i = 0; i < numOfRetries; i++){
            boolean notExist = insertUrlMap(shortUrl, longUrl);
            if(!notExist){
                break;
            }
        }
        return false;
    }


    public boolean existShortUrl(String shortUrl) {
        Row result = readRow(URL_TABLE, shortUrl);
        return result != null && !result.getCells().isEmpty();
    }
    public boolean insertUrlMapWithRetries(String shortUrl, String longUrl, int numOfRetries, GenerateKey keyGenerator){
        for(int i = 0; i < numOfRetries; i++){
            boolean notExist = insertUrlMap(shortUrl, longUrl);
            if(!notExist){
                break;
            }
            shortUrl = keyGenerator.generateKey(longUrl);
        }
        return false;
    }
}
