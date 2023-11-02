package com.comp539.shorturl.utils;

import io.seruco.encoding.base62.Base62;
import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

@Component
public class HashingUtil {

    private static Base62 base62 = Base62.createInstance();
    private static MessageDigest md5;
    private static final Random RANDOM = new SecureRandom();

    static {
        try {
            md5 = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateBase62Hash(String longUrl){
        byte[] md5HashedBytes = getMD5Hash(longUrl);
        return convertToBase62(md5HashedBytes);
    }

    public byte[] getMD5Hash(String str){
        byte[] saltedLongUrl = getSalted(str);
        md5.update(saltedLongUrl);
        byte[] digest = md5.digest();
        return digest;
    }

    public byte[] getSalted(String str){
        byte[] salt = getNextSalt();
        byte[] bytes = str.getBytes();
        byte[] saltedBytes = new byte[salt.length + bytes.length];
        System.arraycopy(salt, 0, saltedBytes , 0, salt.length);
        System.arraycopy(bytes, 0, saltedBytes, salt.length, bytes.length);
        return saltedBytes;
    }

    public String convertToBase62(byte[] bytes){
        return new String(base62.encode(bytes));
    }

    public static byte[] getNextSalt() {
        byte[] salt = new byte[16];
        RANDOM.nextBytes(salt);
        return salt;
    }
}
