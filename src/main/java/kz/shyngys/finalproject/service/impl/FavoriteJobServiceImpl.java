package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.FavoriteJobCreateEditDto;
import kz.shyngys.finalproject.dto.records.FavoriteJobFilter;
import kz.shyngys.finalproject.dto.FavoriteJobReadDto;
import kz.shyngys.finalproject.mapper.FavoriteJobCreateEditMapper;
import kz.shyngys.finalproject.mapper.FavoriteJobReadMapper;
import kz.shyngys.finalproject.model.FavoriteJob;
import kz.shyngys.finalproject.model.Job;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.repository.FavoriteJobRepository;
import kz.shyngys.finalproject.repository.JobRepository;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.FavoriteJobService;
import kz.shyngys.finalproject.specification.FavoriteJobSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FavoriteJobServiceImpl implements FavoriteJobService {

    private final FavoriteJobRepository favoriteJobRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    private final FavoriteJobCreateEditMapper favoriteJobCreateEditMapper;
    private final FavoriteJobReadMapper favoriteJobReadMapper;

    @Override
    public List<FavoriteJobReadDto> findAll(FavoriteJobFilter filter) {
        Specification<FavoriteJob> spec = FavoriteJobSpecification.withFilter(filter);
        return favoriteJobRepository.findAll(spec).stream()
                .map(favoriteJobReadMapper::toDto)
                .toList();
    }

    @Override
    public FavoriteJobReadDto findById(Long id) {
        return favoriteJobRepository.findById(id)
                .map(favoriteJobReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public FavoriteJobReadDto create(FavoriteJobCreateEditDto favoriteJob) {
        return Optional.of(favoriteJob)
                .map(favoriteJobCreateEditMapper::toEntity)
                .map(entity -> {
                    User user = getUserById(favoriteJob.getUserId());
                    Job job = getJobById(favoriteJob.getJobId());
                    entity.setUser(user);
                    entity.setJob(job);
                    return entity;
                })
                .map(favoriteJobRepository::save)
                .map(favoriteJobReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public FavoriteJobReadDto update(Long id, FavoriteJobCreateEditDto favoriteJob) {
        return Optional.of(favoriteJob)
                .map(favoriteJobCreateEditMapper::toEntity)
                .map(entity -> {
                    User user = getUserById(favoriteJob.getUserId());
                    Job job = getJobById(favoriteJob.getJobId());
                    entity.setUser(user);
                    entity.setJob(job);
                    entity.setId(id);
                    return entity;
                })
                .map(favoriteJobRepository::saveAndFlush)
                .map(favoriteJobReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public void delete(Long id) {
        favoriteJobRepository.findById(id)
                .ifPresent(entity -> favoriteJobRepository.deleteById(id));
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    private Job getJobById(Long jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }
}
