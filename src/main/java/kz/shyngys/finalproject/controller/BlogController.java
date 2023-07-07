package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.BlogCreateEditDto;
import kz.shyngys.finalproject.dto.BlogFilter;
import kz.shyngys.finalproject.dto.BlogReadDto;
import kz.shyngys.finalproject.dto.PageResponse;
import kz.shyngys.finalproject.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public PageResponse<BlogReadDto> findAll(BlogFilter blogFilter,
                                             Pageable pageable) {
        Page<BlogReadDto> blogs = blogService.findAll(blogFilter, pageable);
        return PageResponse.of(blogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogReadDto> findById(@PathVariable("id") Long id) {
        BlogReadDto blog = blogService.findById(id);
        return ResponseEntity.ok(blog);
    }

    @GetMapping("/{id}/avatar")
    public ResponseEntity<byte[]> findAvatar(@PathVariable Long id) {
        byte[] image = blogService.findAvatar(id);
        return ResponseEntity.ok(image);
    }

    @PostMapping
    public ResponseEntity<BlogReadDto> create(BlogCreateEditDto blog) {
        BlogReadDto newBlog = blogService.create(blog);
        return new ResponseEntity<>(newBlog, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogReadDto> update(@PathVariable("id") Long id,
                                              BlogCreateEditDto blog) {
        BlogReadDto newBlog = blogService.update(id, blog);
        return ResponseEntity.ok(newBlog);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        blogService.delete(id);
    }
}
