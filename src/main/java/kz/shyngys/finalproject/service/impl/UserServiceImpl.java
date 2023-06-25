package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.UserCreateDto;
import kz.shyngys.finalproject.dto.UserEditDto;
import kz.shyngys.finalproject.dto.UserEditPasswordDto;
import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.mapper.UserCreateMapper;
import kz.shyngys.finalproject.mapper.UserEditMapper;
import kz.shyngys.finalproject.mapper.UserReadMapper;
import kz.shyngys.finalproject.model.Role;
import kz.shyngys.finalproject.model.User;
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
    private final UserCreateMapper userCreateMapper;
    private final UserReadMapper userReadMapper;
    private final UserEditMapper userEditMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserReadDto> findAll() {
        return userRepository.findAll().stream()
                .map(userReadMapper::toDto)
                .toList();
    }

    @Override
    public UserReadDto findById(Long id) {
        return userRepository.findById(id)
                .map(userReadMapper::toDto)
                .orElse(null);
    }

    @Override
    public UserReadDto findByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userReadMapper::toDto)
                .orElseThrow();
    }

    @Transactional
    @Override
    public UserReadDto createUser(UserCreateDto user) {
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
    public UserReadDto createEmployer(UserCreateDto user) {
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

    @Transactional
    @Override
    public UserReadDto updateData(Long id, UserEditDto userDto) {
        return userRepository.findById(id)
                .map(entity -> {
                    User newEntity = userEditMapper.toEntity(userDto);
                    newEntity.setId(entity.getId());
                    newEntity.setPassword(entity.getPassword());
                    newEntity.setUsername(entity.getUsername());
                    newEntity.setRole(entity.getRole());
                    return newEntity;
                })
                .map(userRepository::saveAndFlush)
                .map(userReadMapper::toDto)
                .orElse(null);
    }

    @Transactional
    @Override
    public UserReadDto updatePassword(Long id, UserEditPasswordDto userPassword) {
        return userRepository.findById(id)
                .filter(user -> passwordEncoder.matches(userPassword.getCurrentPassword(), user.getPassword()))
                .map(entity -> {
                    entity.setPassword(passwordEncoder.encode(userPassword.getNewPassword()));
                    return entity;
                })
                .map(userRepository::saveAndFlush)
                .map(userReadMapper::toDto)
                .orElse(null);
    }

    @Transactional
    @Override
    public void delete(Long id) {
         userRepository.findById(id)
                 .ifPresent(userRepository::delete);
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
