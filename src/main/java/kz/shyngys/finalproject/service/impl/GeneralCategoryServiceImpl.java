package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.GeneralCategoryReadDto;
import kz.shyngys.finalproject.mapper.GeneralCategoryReadMapper;
import kz.shyngys.finalproject.repository.GeneralCategoryRepository;
import kz.shyngys.finalproject.service.GeneralCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GeneralCategoryServiceImpl implements GeneralCategoryService {

    private final GeneralCategoryRepository generalCategoryRepository;

    private final GeneralCategoryReadMapper generalCategoryReadMapper;

    @Override
    public List<GeneralCategoryReadDto> findAll() {
        return generalCategoryRepository.findAll().stream()
                .map(generalCategoryReadMapper::toDto)
                .toList();
    }

    @Override
    public GeneralCategoryReadDto findById(Long id) {
        return generalCategoryRepository.findById(id)
                .map(generalCategoryReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }
}
