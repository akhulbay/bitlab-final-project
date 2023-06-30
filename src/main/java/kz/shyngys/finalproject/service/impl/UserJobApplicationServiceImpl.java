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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserJobApplicationServiceImpl implements UserJobApplicationService {

    private final UserJobApplicationRepository userJobAppRepository;
    private final UserProfileRepository userProfileRepository;
    private final JobRepository jobRepository;

    private final UserJobApplicationReadMapper userJobAppReadMapper;
    private final UserJobApplicationCreateEditMapper userJobAppCreateEditMapper;

    @Override
    public List<UserJobApplicationReadDto> findAll(UserJobApplicationFilter userJobAppFilter,
                                                   UserFilter userFilter,
                                                   UserProfileFilter userProfileFilter) {
        Specification<UserJobApplication> spec = UserJobApplicationSpecification
                .withFilter(userJobAppFilter, userFilter, userProfileFilter);
        return userJobAppRepository.findAll(spec).stream()
                .map(userJobAppReadMapper::toDto)
                .toList();
    }

    @Override
    public UserJobApplicationReadDto findById(Long id) {
        return userJobAppRepository.findById(id)
                .map(userJobAppReadMapper::toDto)
                .orElse(null);
    }

    @Transactional
    @Override
    public UserJobApplicationReadDto create(UserJobApplicationCreateEditDto userJobApp) {
        return Optional.of(userJobApp)
                .map(userJobAppCreateEditMapper::toEntity)
                .map(entity -> {
                    Job job = jobRepository.findById(userJobApp.getJobId())
                            .orElseThrow();
                    UserProfile userProfile = userProfileRepository.findById(userJobApp.getUserProfileId())
                            .orElseThrow();
                    entity.setJob(job);
                    entity.setUserProfile(userProfile);
                    entity.setCreatedAt(LocalDate.now());
                    return entity;
                })
                .map(userJobAppRepository::save)
                .map(userJobAppReadMapper::toDto)
                .orElse(null);
    }

    @Transactional
    @Override
    public UserJobApplicationReadDto update(Long id, UserJobApplicationCreateEditDto userJobApp) {
        return Optional.of(userJobApp)
                .map(userJobAppCreateEditMapper::toEntity)
                .map(entity -> {
                    Job job = jobRepository.findById(userJobApp.getJobId())
                            .orElseThrow();
                    UserProfile userProfile = userProfileRepository.findById(userJobApp.getUserProfileId())
                            .orElseThrow();
                    entity.setId(id);
                    entity.setJob(job);
                    entity.setUserProfile(userProfile);
                    entity.setCreatedAt(LocalDate.now());
                    return entity;
                })
                .map(userJobAppRepository::saveAndFlush)
                .map(userJobAppReadMapper::toDto)
                .orElse(null);
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
}
