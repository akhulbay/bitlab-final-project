package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.UserCreateEditDto;
import kz.shyngys.finalproject.dto.UserProfileCreateEditDto;
import kz.shyngys.finalproject.dto.UserProfileReadDto;
import kz.shyngys.finalproject.mapper.UserProfileCreateEditMapper;
import kz.shyngys.finalproject.mapper.UserProfileReadMapper;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.repository.UserProfileRepository;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    private final UserProfileCreateEditMapper userProfileCreateEditMapper;
    private final UserProfileReadMapper userProfileReadMapper;

    @Override
    public List<UserProfileReadDto> findAll() {
        return null;
    }

    @Override
    public UserProfileReadDto findById(Long id) {
        return null;
    }

    @Transactional
    @Override
    public UserProfileReadDto save(UserProfileCreateEditDto user) {
        return Optional.of(user)
                .map(userProfileCreateEditMapper::toEntity)
                .map(entity -> {
                    User newUser = userRepository.findById(entity.getUser().getId())
                            .orElseThrow();
                    entity.setUser(newUser);
                    return entity;
                })
                .map(userProfileRepository::saveAndFlush)
                .map(userProfileReadMapper::toDto)
                .orElseThrow();
    }

    @Override
    public UserProfileReadDto update(Long id, UserProfileCreateEditDto user) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
