package com.comp539.shorturl.service;

import com.comp539.shorturl.model.User;
import com.comp539.shorturl.gateway.UserGateway;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private UserGateway userGateway;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    public UserService (
            UserGateway userGateway,
            BCryptPasswordEncoder bCryptPasswordEncoder,
            JwtTokenProvider jwtTokenProvider) {
        this.userGateway = userGateway;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public String authenticateUser(String email, String password) {
        User user = userGateway.getUser(email);
        if (user != null && bCryptPasswordEncoder.matches(password, user.getPassword())) {
            // Generate JWT token
            return jwtTokenProvider.createToken(user.getEmail());
        }
        throw new RuntimeException("Invalid email/password supplied");
    }

    public void registerUser(String email, String password, String name) {
        String hashedPassword = bCryptPasswordEncoder.encode(password);
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(hashedPassword);
        newUser.setName(name);
        boolean failToCreate = userGateway.insertUser(newUser);
        if (failToCreate) {
            throw new RuntimeException("Email already in use");
        }
    }
}
