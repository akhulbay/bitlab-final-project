package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.GeneralCategoryReadDto;

import java.util.List;

public interface GeneralCategoryService {

    List<GeneralCategoryReadDto> findAll();

    GeneralCategoryReadDto findById(Long id);
}
