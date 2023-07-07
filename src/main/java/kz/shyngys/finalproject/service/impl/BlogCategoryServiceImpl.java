package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.BlogCategoryReadDto;
import kz.shyngys.finalproject.mapper.BlogCategoryReadMapper;
import kz.shyngys.finalproject.repository.BlogCategoryRepository;
import kz.shyngys.finalproject.service.BlogCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BlogCategoryServiceImpl implements BlogCategoryService {

    private final BlogCategoryRepository blogCategoryRepository;

    private final BlogCategoryReadMapper blogCategoryReadMapper;

    @Override
    public List<BlogCategoryReadDto> findAll() {
        return blogCategoryRepository.findAll().stream()
                .map(blogCategoryReadMapper::toDto)
                .toList();
    }

    @Override
    public BlogCategoryReadDto findById(Long id) {
        return blogCategoryRepository.findById(id)
                .map(blogCategoryReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }
}
