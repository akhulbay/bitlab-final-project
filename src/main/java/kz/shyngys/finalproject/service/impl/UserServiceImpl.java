package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.*;
import kz.shyngys.finalproject.mapper.UserCreateMapper;
import kz.shyngys.finalproject.mapper.UserEditMapper;
import kz.shyngys.finalproject.mapper.UserReadMapper;
import kz.shyngys.finalproject.model.Role;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.UserService;
import kz.shyngys.finalproject.specification.UserSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private static final boolean USER_IS_NOT_BLOCKED = false;
    private static final boolean USER_IS_BLOCKED = true;

    private final UserRepository userRepository;
    private final UserCreateMapper userCreateMapper;
    private final UserReadMapper userReadMapper;
    private final UserEditMapper userEditMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public Page<UserReadDto> findAll(UserFilter userFilter, Pageable pageable) {
        Specification<User> spec = UserSpecification.withFilter(userFilter);
        return userRepository.findAll(spec, pageable)
                .map(userReadMapper::toDto);
    }

    @Override
    public UserReadDto findById(Long id) {
        return userRepository.findById(id)
                .map(userReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public UserReadDto create(UserCreateDto user) {
        return Optional.of(user)
                .map(userCreateMapper::toEntity)
                .map(entity -> {
                    entity.setBlocked(USER_IS_NOT_BLOCKED);
                    entity.setPassword(passwordEncoder.encode(entity.getPassword()));
                    return entity;
                })
                .map(userRepository::save)
                .map(userReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public UserReadDto createUser(UserCreateDto user) {
        return Optional.of(user)
                .map(userCreateMapper::toEntity)
                .map(entity -> {
                    entity.setBlocked(USER_IS_NOT_BLOCKED);
                    entity.setRole(Role.ROLE_USER);
                    entity.setPassword(passwordEncoder.encode(entity.getPassword()));
                    return entity;
                })
                .map(userRepository::save)
                .map(userReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public UserReadDto createEmployer(UserCreateDto user) {
        return Optional.of(user)
                .map(userCreateMapper::toEntity)
                .map(entity -> {
                    entity.setBlocked(USER_IS_NOT_BLOCKED);
                    entity.setRole(Role.ROLE_EMPLOYER);
                    entity.setPassword(passwordEncoder.encode(entity.getPassword()));
                    return entity;
                })
                .map(userRepository::save)
                .map(userReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
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
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
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
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public String updateRole(Long id, String role) {
        return userRepository.findById(id)
                .map(entity -> {
                    entity.setRole(Enum.valueOf(Role.class, role));
                    return entity;
                })
                .map(userRepository::saveAndFlush)
                .map(entity -> entity.getRole().name())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public void block(Long id) {
        userRepository.findById(id)
                .map(entity -> {
                    entity.setBlocked(USER_IS_BLOCKED);
                    return entity;
                })
                .map(userRepository::saveAndFlush)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public void unblock(Long id) {
        userRepository.findById(id)
                .map(entity -> {
                    entity.setBlocked(USER_IS_NOT_BLOCKED);
                    return entity;
                })
                .map(userRepository::saveAndFlush)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
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
