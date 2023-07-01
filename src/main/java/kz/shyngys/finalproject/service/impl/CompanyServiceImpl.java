package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.CompanyCreateEditDto;
import kz.shyngys.finalproject.dto.CompanyFilter;
import kz.shyngys.finalproject.dto.CompanyReadDto;
import kz.shyngys.finalproject.mapper.CompanyCreateEditMapper;
import kz.shyngys.finalproject.mapper.CompanyReadMapper;
import kz.shyngys.finalproject.model.Company;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.repository.CompanyRepository;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.CompanyService;
import kz.shyngys.finalproject.service.ImageService;
import kz.shyngys.finalproject.specification.CompanySpecification;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompanyServiceImpl implements CompanyService {

    private final ImageService imageService;

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    private final CompanyCreateEditMapper companyCreateEditMapper;
    private final CompanyReadMapper companyReadMapper;

    @Override
    public Page<CompanyReadDto> findAll(CompanyFilter companyFilter, Pageable pageable) {
        Specification<Company> spec = CompanySpecification.withFilter(companyFilter);
        return companyRepository.findAll(spec, pageable)
                .map(companyReadMapper::toDto);
    }

    @Override
    public CompanyReadDto findById(Long id) {
        return companyRepository.findById(id)
                .map(companyReadMapper::toDto)
                .orElse(null);
    }

    @Override
    public CompanyReadDto findByUserId(Long id) {
        return companyRepository.findByUserId(id)
                .map(companyReadMapper::toDto)
                .orElse(null);
    }

    @Override
    public byte[] findAvatar(Long id) {
        return companyRepository.findById(id)
                .map(Company::getImage)
                .filter(StringUtils::hasText)
                .flatMap(imageService::get)
                .orElse(null);
    }

    @Transactional
    @Override
    public CompanyReadDto create(CompanyCreateEditDto company) {
        return Optional.of(company)
                .map(dto -> {
                    uploadImage(dto.getImage());
                    return companyCreateEditMapper.toEntity(dto);
                })
                .map(entity -> {
                    User user = getUserById(company.getUserId());
                    entity.setUser(user);
                    return entity;
                })
                .map(companyRepository::save)
                .map(companyReadMapper::toDto)
                .orElse(null);
    }

    @Transactional
    @Override
    public CompanyReadDto update(Long id, CompanyCreateEditDto company) {
        return Optional.of(company)
                .map(dto -> {
                    uploadImage(dto.getImage());
                    return companyCreateEditMapper.toEntity(dto);
                })
                .map(entity -> {
                    User user = getUserById(company.getUserId());
                    entity.setUser(user);
                    entity.setId(id);
                    return entity;
                })
                .map(companyRepository::save)
                .map(companyReadMapper::toDto)
                .orElse(null);
    }

    @SneakyThrows
    private void uploadImage(MultipartFile image) {
        if (!image.isEmpty()) {
            imageService.upload(image.getOriginalFilename(), image.getInputStream());
        }
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));
    }


}
