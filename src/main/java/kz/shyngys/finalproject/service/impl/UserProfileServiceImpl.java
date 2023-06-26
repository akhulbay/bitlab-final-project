package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.UserProfileCreateEditDto;
import kz.shyngys.finalproject.dto.UserProfileReadDto;
import kz.shyngys.finalproject.mapper.UserProfileCreateEditMapper;
import kz.shyngys.finalproject.mapper.UserProfileReadMapper;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.model.UserProfile;
import kz.shyngys.finalproject.repository.UserProfileRepository;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.ImageService;
import kz.shyngys.finalproject.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    private final UserProfileCreateEditMapper userProfileCreateEditMapper;
    private final UserProfileReadMapper userProfileReadMapper;

    private final ImageService imageService;

    @Override
    public List<UserProfileReadDto> findAll() {
        return null;
    }

    @Override
    public UserProfileReadDto findById(Long id) {
        return null;
    }

    @Override
    public UserProfileReadDto findByUserId(Long userId) {
        return userProfileRepository.findByUserId(userId)
                .map(userProfileReadMapper::toDto)
                .orElse(null);
    }

    @Override
    public byte[] findAvatar(Long id) {
        return userProfileRepository.findById(id)
                .map(UserProfile::getImage)
                .filter(StringUtils::hasText)
                .flatMap(imageService::get)
                .orElse(null);
    }

    @Transactional
    @Override
    public UserProfileReadDto save(UserProfileCreateEditDto userProfile) {
        return Optional.of(userProfile)
                .map(dto -> {
                    uploadImage(dto.getImage());
                    return userProfileCreateEditMapper.toEntity(dto);
                })
                .map(entity -> {
                    User newUser = userRepository.findById(entity.getUser().getId())
                            .orElseThrow();
                    entity.setUser(newUser);
                    return entity;
                })
                .map(userProfileRepository::saveAndFlush)
                .map(userProfileReadMapper::toDto)
                .orElse(null);
    }

    @Transactional
    @Override
    public UserProfileReadDto update(Long id, UserProfileCreateEditDto user) {
        return Optional.of(user)
                .map(dto -> {
                    uploadImage(dto.getImage());
                    return userProfileCreateEditMapper.toEntity(dto);
                })
                .map(entity -> {
                    User newUser = userRepository.findById(entity.getUser().getId())
                            .orElseThrow();
                    entity.setUser(newUser);
                    entity.setId(id);
                    return entity;
                })
                .map(userProfileRepository::saveAndFlush)
                .map(userProfileReadMapper::toDto)
                .orElse(null);
    }

    @Override
    public void delete(Long id) {

    }

    @SneakyThrows
    private void uploadImage(MultipartFile image) {
        if (!image.isEmpty()) {
            imageService.upload(image.getOriginalFilename(), image.getInputStream());
        }
    }
}
