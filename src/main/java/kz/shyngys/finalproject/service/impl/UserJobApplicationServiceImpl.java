package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.*;
import kz.shyngys.finalproject.mapper.UserJobApplicationCreateEditMapper;
import kz.shyngys.finalproject.mapper.UserJobApplicationReadMapper;
import kz.shyngys.finalproject.model.Job;
import kz.shyngys.finalproject.model.UserJobApplication;
import kz.shyngys.finalproject.model.UserProfile;
import kz.shyngys.finalproject.repository.JobRepository;
import kz.shyngys.finalproject.repository.UserJobApplicationRepository;
import kz.shyngys.finalproject.repository.UserProfileRepository;
import kz.shyngys.finalproject.service.UserJobApplicationService;
import kz.shyngys.finalproject.specification.UserJobApplicationSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Optional;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserJobApplicationServiceImpl implements UserJobApplicationService {

    private static final Integer STATUS_NOT_VIEWED = 0;

    private final UserJobApplicationRepository userJobAppRepository;
    private final UserProfileRepository userProfileRepository;
    private final JobRepository jobRepository;

    private final UserJobApplicationReadMapper userJobAppReadMapper;
    private final UserJobApplicationCreateEditMapper userJobAppCreateEditMapper;

    @Override
    public Page<UserJobApplicationReadDto> findAll(UserJobApplicationFilter userJobAppFilter,
                                                   UserFilter userFilter,
                                                   UserProfileFilter userProfileFilter,
                                                   Pageable pageable) {

        Specification<UserJobApplication> spec = UserJobApplicationSpecification
                .withFilter(userJobAppFilter, userFilter, userProfileFilter);
        return userJobAppRepository.findAll(spec, pageable)
                .map(userJobAppReadMapper::toDto);
    }

    @Override
    public UserJobApplicationReadDto findById(Long id) {
        return userJobAppRepository.findById(id)
                .map(userJobAppReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Override
    public Integer findStatus(Long id) {
        return userJobAppRepository.findStatusById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Transactional
    @Override
    public UserJobApplicationReadDto create(UserJobApplicationCreateEditDto userJobApp) {
        return Optional.of(userJobApp)
                .map(userJobAppCreateEditMapper::toEntity)
                .map(entity -> {
                    Job job = getJobById(userJobApp.getJobId());
                    UserProfile userProfile = getUserProfileById(userJobApp.getUserProfileId());
                    entity.setStatus(STATUS_NOT_VIEWED);
                    entity.setJob(job);
                    entity.setUserProfile(userProfile);
                    entity.setCreatedAt(LocalDate.now());
                    return entity;
                })
                .map(userJobAppRepository::save)
                .map(userJobAppReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public UserJobApplicationReadDto update(Long id, UserJobApplicationCreateEditDto userJobApp) {
        return Optional.of(userJobApp)
                .map(userJobAppCreateEditMapper::toEntity)
                .map(entity -> {
                    Job job = getJobById(userJobApp.getJobId());
                    UserProfile userProfile = getUserProfileById(userJobApp.getUserProfileId());
                    entity.setId(id);
                    entity.setJob(job);
                    entity.setUserProfile(userProfile);
                    entity.setCreatedAt(LocalDate.now());
                    return entity;
                })
                .map(userJobAppRepository::saveAndFlush)
                .map(userJobAppReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public UserJobApplicationReadDto updateStatus(Long id, UserJobApplicationEditStatusDto userJobAppStatus) {
        return userJobAppRepository.findById(id)
                .map(entity -> {
                    entity.setStatus(userJobAppStatus.getStatus());
                    return entity;
                })
                .map(userJobAppRepository::saveAndFlush)
                .map(userJobAppReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }


    @Transactional
    @Override
    public void delete(Long id) {
        userJobAppRepository.findById(id)
                .ifPresent(userJobApp -> userJobAppRepository.deleteById(id));
    }

    @Override
    public Integer countByJobId(Long jobId) {
        return userJobAppRepository.countAllByJobId(jobId);
    }

    private Job getJobById(Long jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    private UserProfile getUserProfileById(Long userProfileId) {
        return userProfileRepository.findById(userProfileId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }
}
