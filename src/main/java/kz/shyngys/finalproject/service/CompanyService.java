package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.CompanyCreateEditDto;
import kz.shyngys.finalproject.dto.CompanyReadDto;

import java.util.List;

public interface CompanyService {

    List<CompanyReadDto> findAll();

    CompanyReadDto findById(Long id);

    CompanyReadDto findByUserId(Long id);

    byte[] findAvatar(Long id);

    CompanyReadDto create(CompanyCreateEditDto company);

    CompanyReadDto update(Long id, CompanyCreateEditDto company);
}
