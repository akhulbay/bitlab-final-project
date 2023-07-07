package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.BlogCategoryReadDto;
import kz.shyngys.finalproject.service.BlogCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/blog-categories")
@RequiredArgsConstructor
public class BlogCategoryController {

    private final BlogCategoryService blogCategoryService;

    @GetMapping
    public List<BlogCategoryReadDto> findAll() {
        return blogCategoryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogCategoryReadDto> findById(@PathVariable("id") Long id) {
        BlogCategoryReadDto blog = blogCategoryService.findById(id);
        return ResponseEntity.ok(blog);
    }
}
