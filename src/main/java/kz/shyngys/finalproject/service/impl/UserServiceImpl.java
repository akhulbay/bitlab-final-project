package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserReadDto> findAll() {
        return null;
    }

    @Override
    public UserReadDto findById() {
        return null;
    }

    @Override
    public UserReadDto save() {
        return null;
    }

    @Override
    public UserReadDto update() {
        return null;
    }

    @Override
    public void delete() {

    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
