package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.UserCreateEditDto;
import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.mapper.UserCreateEditMapper;
import kz.shyngys.finalproject.mapper.UserReadMapper;
import kz.shyngys.finalproject.model.Role;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserCreateEditMapper userCreateMapper;
    private final UserReadMapper userReadMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserReadDto> findAll() {
        return null;
    }

    @Override
    public UserReadDto findById() {
        return null;
    }

    @Override
    public UserReadDto findByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userReadMapper::toDto)
                .orElseThrow();
    }

    @Transactional
    @Override
    public UserReadDto saveUser(UserCreateEditDto user) {
        return Optional.of(user)
                .map(userCreateMapper::toEntity)
                .map(entity -> {
                    entity.setRole(Role.ROLE_USER);
                    entity.setPassword(passwordEncoder.encode(entity.getPassword()));
                    return entity;
                })
                .map(userRepository::save)
                .map(userReadMapper::toDto)
                .orElseThrow();
    }

    @Transactional
    @Override
    public UserReadDto saveEmployer(UserCreateEditDto user) {
        return Optional.of(user)
                .map(userCreateMapper::toEntity)
                .map(entity -> {
                    entity.setRole(Role.ROLE_EMPLOYER);
                    entity.setPassword(passwordEncoder.encode(entity.getPassword()));
                    return entity;
                })
                .map(userRepository::save)
                .map(userReadMapper::toDto)
                .orElseThrow();
    }

    @Override
    public UserReadDto update() {
        return null;
    }

    @Override
    public void delete() {

    }

    @Override
    public boolean isUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
