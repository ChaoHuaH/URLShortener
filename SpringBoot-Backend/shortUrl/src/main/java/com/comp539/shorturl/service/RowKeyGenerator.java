package com.comp539.shorturl.service;

import com.comp539.shorturl.utils.HashingUtil;
import org.springframework.stereotype.Component;

@Component
public class RowKeyGenerator implements GenerateKey{
    private HashingUtil hashingUtil;
    RowKeyGenerator(HashingUtil hashingUtil){
        this.hashingUtil = hashingUtil;
    }

    @Override
    public String generateKey(String base) {
        return hashingUtil.generateBase62Hash(base);
    }
}
