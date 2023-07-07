package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.UserProfileCreateEditAvatarDto;
import kz.shyngys.finalproject.dto.UserProfileCreateEditDto;
import kz.shyngys.finalproject.dto.UserProfileReadDto;
import kz.shyngys.finalproject.mapper.UserProfileCreateEditMapper;
import kz.shyngys.finalproject.mapper.UserProfileReadMapper;
import kz.shyngys.finalproject.model.GeneralCategory;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.model.UserProfile;
import kz.shyngys.finalproject.repository.GeneralCategoryRepository;
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
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static java.util.function.Predicate.not;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;
    private final GeneralCategoryRepository generalCategoryRepository;

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
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Override
    public byte[] findAvatar(Long id) {
        return userProfileRepository.findById(id)
                .map(UserProfile::getImage)
                .filter(StringUtils::hasText)
                .flatMap(imageService::get)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public UserProfileReadDto save(UserProfileCreateEditDto userProfile) {
        return Optional.of(userProfile)
                .map(userProfileCreateEditMapper::toEntity)
                .map(entity -> {
                    User newUser = getUserById(userProfile.getUserId());
                    GeneralCategory newAccountType = getGeneralCategoryById(userProfile.getAccountType());
                    entity.setAccountType(newAccountType);
                    entity.setUser(newUser);
                    return entity;
                })
                .map(userProfileRepository::saveAndFlush)
                .map(userProfileReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public UserProfileReadDto update(Long id, UserProfileCreateEditDto userProfile) {
        return userProfileRepository.findById(id)
                .map(entity -> {
                    mapUpdatedData(userProfile, entity);
                    return entity;
                })
                .map(userProfileRepository::saveAndFlush)
                .map(userProfileReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public byte[] updateAvatar(Long id, UserProfileCreateEditAvatarDto userProfileAvatar) {
        return userProfileRepository.findById(id)
                .map(entity -> {
                    uploadImage(userProfileAvatar.getImage());
                    entity.setImage(getImage(userProfileAvatar.getImage()));
                    return entity;
                })
                .map(userProfileRepository::saveAndFlush)
                .map(UserProfile::getImage)
                .filter(StringUtils::hasText)
                .flatMap(imageService::get)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public void delete(Long id) {
        userProfileRepository.findById(id)
                .ifPresent(userProfile -> userProfileRepository.deleteById(id));
    }

    @SneakyThrows
    private void uploadImage(MultipartFile image) {
        if (!image.isEmpty()) {
            imageService.upload(image.getOriginalFilename(), image.getInputStream());
        }
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    private String getImage(MultipartFile image) {
        return Optional.ofNullable(image)
                .filter(not(MultipartFile::isEmpty))
                .map(MultipartFile::getOriginalFilename)
                .orElse(null);
    }

    private void mapUpdatedData(UserProfileCreateEditDto fromObject, UserProfile toObject) {
        toObject.setAboutUser(fromObject.getAboutUser());
        toObject.setPhoneNumber(fromObject.getPhoneNumber());
        toObject.setAccountType(getGeneralCategoryById(fromObject.getAccountType()));
        toObject.setLanguages(fromObject.getLanguages());
        toObject.setLocation(fromObject.getLocation());
        toObject.setFacebookLink(fromObject.getFacebookLink());
        toObject.setTelegramLink(fromObject.getTelegramLink());
        toObject.setLinkedinLink(fromObject.getLinkedinLink());
        toObject.setGithubLink(fromObject.getGithubLink());
        toObject.setSkills(fromObject.getSkills());
        toObject.setDegree(fromObject.getDegree());
        toObject.setUniversity(fromObject.getUniversity());
        toObject.setFaculty(fromObject.getFaculty());
        toObject.setMajor(fromObject.getMajor());
        toObject.setYearOfAdmission(fromObject.getYearOfAdmission());
        toObject.setYearOfGraduation(fromObject.getYearOfGraduation());
        toObject.setExperienceYears(fromObject.getExperienceYears());
        toObject.setAboutExperience(fromObject.getAboutExperience());
        toObject.setUser(getUserById(fromObject.getUserId()));
    }

    private GeneralCategory getGeneralCategoryById(Long generalCategoryId) {
        return generalCategoryRepository.findById(generalCategoryId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }
}
