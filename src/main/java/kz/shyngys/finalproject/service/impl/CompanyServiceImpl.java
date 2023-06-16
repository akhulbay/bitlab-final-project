package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.CompanyCreateEditDto;
import kz.shyngys.finalproject.dto.CompanyReadDto;
import kz.shyngys.finalproject.mapper.CompanyCreateEditMapper;
import kz.shyngys.finalproject.mapper.CompanyReadMapper;
import kz.shyngys.finalproject.repository.CompanyRepository;
import kz.shyngys.finalproject.service.CompanyService;
import kz.shyngys.finalproject.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    
    private final ImageService imageService;

    private final CompanyRepository companyRepository;

    private final CompanyCreateEditMapper companyCreateEditMapper;
    private final CompanyReadMapper companyReadMapper;

    @Override
    public List<CompanyReadDto> findAll() {
        return null;
    }

    @Override
    public CompanyReadDto findById(Long id) {
        return null;
    }

    @Override
    public CompanyReadDto save(CompanyCreateEditDto company) {
        return Optional.of(company)
                .map(dto -> {
                    uploadImage(dto.getImage());
                    return companyCreateEditMapper.map(dto);
                })
                .map(companyRepository::save)
                .map(companyReadMapper::map)
                .orElseThrow();
    }

    @Override
    public boolean isEmailExists(String email) {
        return companyRepository.findByEmail(email).isPresent();
    }

    @SneakyThrows
    private void uploadImage(MultipartFile image) {
        if (!image.isEmpty()) {
            imageService.upload(image.getOriginalFilename(), image.getInputStream());
        }
    }


}
