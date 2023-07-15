package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.BlogCreateEditDto;
import kz.shyngys.finalproject.dto.records.BlogFilter;
import kz.shyngys.finalproject.dto.BlogReadDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BlogService {

    Page<BlogReadDto> findAll(BlogFilter blogFilter, Pageable pageable);

    BlogReadDto findById(Long id);

    byte[] findAvatar(Long id);

    BlogReadDto create(BlogCreateEditDto blog);

    BlogReadDto update(Long id, BlogCreateEditDto blog);

    void delete(Long id);
}
