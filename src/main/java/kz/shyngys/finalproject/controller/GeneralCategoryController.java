package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.GeneralCategoryReadDto;
import kz.shyngys.finalproject.service.GeneralCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/general-categories")
@RequiredArgsConstructor
public class GeneralCategoryController {

    private final GeneralCategoryService generalCategoryService;

    @GetMapping
    public List<GeneralCategoryReadDto> findAll() {
        return generalCategoryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeneralCategoryReadDto> findById(@PathVariable("id") Long id) {
        GeneralCategoryReadDto category = generalCategoryService.findById(id);
        return ResponseEntity.ok(category);
    }
}
