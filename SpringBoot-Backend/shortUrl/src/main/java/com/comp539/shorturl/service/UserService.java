package com.comp539.shorturl.service;

import com.comp539.shorturl.model.User;
import com.comp539.shorturl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public String authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && bCryptPasswordEncoder.matches(password, user.getPassword())) {
            // Generate JWT token
            return jwtTokenProvider.createToken(user.getId(), user.getEmail());
        }
        throw new RuntimeException("Invalid email/password supplied");
    }

    public void registerUser(String email, String password, String name) {
        if (userRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email already in use");
        }
        String hashedPassword = bCryptPasswordEncoder.encode(password);
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(hashedPassword);
        newUser.setName(name);
        userRepository.save(newUser);
    }

    public void logoutUser(String token) {
        // JWT is stateless, so logout is generally handled on the client side.
        // If you have server-side token management, handle it here.
    }
}
