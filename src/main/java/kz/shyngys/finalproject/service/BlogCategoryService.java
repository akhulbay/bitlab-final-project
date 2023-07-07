package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.BlogCategoryReadDto;

import java.util.List;

public interface BlogCategoryService {

    List<BlogCategoryReadDto> findAll();

    BlogCategoryReadDto findById(Long id);
}
