package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.CompanyCreateEditDto;
import kz.shyngys.finalproject.dto.CompanyFilter;
import kz.shyngys.finalproject.dto.CompanyReadDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CompanyService {

    Page<CompanyReadDto> findAll(CompanyFilter companyFilter, Pageable pageable);

    CompanyReadDto findById(Long id);

    CompanyReadDto findByUserId(Long id);

    byte[] findAvatar(Long id);

    CompanyReadDto create(CompanyCreateEditDto company);

    CompanyReadDto update(Long id, CompanyCreateEditDto company);
}
