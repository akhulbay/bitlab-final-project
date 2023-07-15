package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.BlogCreateEditDto;
import kz.shyngys.finalproject.dto.records.BlogFilter;
import kz.shyngys.finalproject.dto.BlogReadDto;
import kz.shyngys.finalproject.mapper.BlogCreateEditMapper;
import kz.shyngys.finalproject.mapper.BlogReadMapper;
import kz.shyngys.finalproject.model.Blog;
import kz.shyngys.finalproject.model.BlogCategory;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.repository.BlogCategoryRepository;
import kz.shyngys.finalproject.repository.BlogRepository;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.BlogService;
import kz.shyngys.finalproject.service.ImageService;
import kz.shyngys.finalproject.specification.BlogSpecification;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Optional;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final BlogCategoryRepository blogCategoryRepository;

    private final ImageService imageService;

    private final BlogReadMapper blogReadMapper;
    private final BlogCreateEditMapper blogCreateEditMapper;

    @Override
    public Page<BlogReadDto> findAll(BlogFilter blogFilter, Pageable pageable) {
        Specification<Blog> spec = BlogSpecification.withFilter(blogFilter);
        return blogRepository.findAll(spec, pageable)
                .map(blogReadMapper::toDto);
    }

    @Override
    public BlogReadDto findById(Long id) {
        return blogRepository.findById(id)
                .map(blogReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Override
    public byte[] findAvatar(Long id) {
        return blogRepository.findById(id)
                .map(Blog::getImage)
                .filter(StringUtils::hasText)
                .flatMap(imageService::get)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public BlogReadDto create(BlogCreateEditDto blog) {
        return Optional.of(blog)
                .map(dto -> {
                    uploadImage(dto.getImage());
                    return blogCreateEditMapper.toEntity(dto);
                })
                .map(entity -> {
                    entity.setCreatedAt(LocalDate.now());
                    entity.setUser(getUserById(blog.getUserId()));
                    entity.setBlogCategory(getBlogCategoryById(blog.getBlogCategoryId()));
                    return entity;
                })
                .map(blogRepository::save)
                .map(blogReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Override
    public BlogReadDto update(Long id, BlogCreateEditDto blog) {
        return Optional.of(blog)
                .map(dto -> {
                    uploadImage(dto.getImage());
                    return blogCreateEditMapper.toEntity(dto);
                })
                .map(entity -> {
                    entity.setId(id);
                    entity.setCreatedAt(LocalDate.now());
                    entity.setUser(getUserById(blog.getUserId()));
                    entity.setBlogCategory(getBlogCategoryById(blog.getBlogCategoryId()));
                    return entity;
                })
                .map(blogRepository::save)
                .map(blogReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public void delete(Long id) {
        blogRepository.findById(id)
                .ifPresent(blog -> blogRepository.deleteById(id));
    }

    @SneakyThrows
    private void uploadImage(MultipartFile image) {
        if (!image.isEmpty()) {
            imageService.upload(image.getOriginalFilename(), image.getInputStream());
        }
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    private BlogCategory getBlogCategoryById(Long categoryId) {
        return blogCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }
}
