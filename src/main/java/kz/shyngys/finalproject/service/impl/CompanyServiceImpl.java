package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.CompanyCreateEditAvatarDto;
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

import java.time.LocalDate;
import java.util.NoSuchElementException;
import java.util.Optional;

import static java.util.function.Predicate.not;

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
        return companyRepository.findById(id)
                .map(entity -> {
                    mapUpdatedData(company, entity);
                    return entity;
                })
                .map(companyRepository::saveAndFlush)
                .map(companyReadMapper::toDto)
                .orElse(null);
    }

    @Transactional
    @Override
    public byte[] updateAvatar(Long id, CompanyCreateEditAvatarDto companyAvatar) {
        return companyRepository.findById(id)
                .map(entity -> {
                    uploadImage(companyAvatar.getImage());
                    entity.setImage(getImage(companyAvatar.getImage()));
                    return entity;
                })
                .map(companyRepository::saveAndFlush)
                .map(Company::getImage)
                .filter(StringUtils::hasText)
                .flatMap(imageService::get)
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

    private String getImage(MultipartFile image) {
        return Optional.ofNullable(image)
                .filter(not(MultipartFile::isEmpty))
                .map(MultipartFile::getOriginalFilename)
                .orElse(null);
    }

    private void mapUpdatedData(CompanyCreateEditDto fromObject, Company toObject) {
        toObject.setName(fromObject.getName());
        toObject.setAboutCompany(fromObject.getAboutCompany());
        toObject.setLocation(fromObject.getLocation());
        toObject.setWebsite(fromObject.getWebsite());
        toObject.setEstablishDate(LocalDate.parse(fromObject.getEstablishDate()));
        toObject.setEmployeesNumber(fromObject.getEmployeesNumber());
        toObject.setWhatsappLink(fromObject.getWhatsappLink());
        toObject.setLinkedinLink(fromObject.getLinkedinLink());
        toObject.setOwnerName(fromObject.getOwnerName());
        toObject.setUser(getUserById(fromObject.getUserId()));
    }


}
