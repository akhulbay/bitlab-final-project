package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.*;
import kz.shyngys.finalproject.dto.records.CompanyFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CompanyService {

    Page<CompanyReadDto> findAll(CompanyFilter companyFilter, Pageable pageable);

    CompanyReadDto findById(Long id);

    CompanyReadDto findByUserId(Long id);

    byte[] findAvatar(Long id);

    CompanyReadDto create(CompanyCreateEditDto company);

    CompanyReadDto update(Long id, CompanyCreateEditDto company);

    byte[] updateAvatar(Long id, CompanyCreateEditAvatarDto companyAvatar);

    void delete(Long id);
}
