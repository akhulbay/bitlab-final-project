package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.JobCreateEditDto;
import kz.shyngys.finalproject.dto.JobFilter;
import kz.shyngys.finalproject.dto.JobReadDto;
import kz.shyngys.finalproject.mapper.JobCreateEditMapper;
import kz.shyngys.finalproject.mapper.JobReadMapper;
import kz.shyngys.finalproject.model.Company;
import kz.shyngys.finalproject.model.GeneralCategory;
import kz.shyngys.finalproject.model.Job;
import kz.shyngys.finalproject.repository.CompanyRepository;
import kz.shyngys.finalproject.repository.GeneralCategoryRepository;
import kz.shyngys.finalproject.repository.JobRepository;
import kz.shyngys.finalproject.service.JobService;
import kz.shyngys.finalproject.specification.JobSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final GeneralCategoryRepository generalCategoryRepository;

    private final JobReadMapper jobReadMapper;
    private final JobCreateEditMapper jobCreateEditMapper;

    @Override
    public Page<JobReadDto> findAll(JobFilter filter, Pageable pageable) {
        Specification<Job> spec = JobSpecification.withFilter(filter);
        return jobRepository.findAll(spec, pageable)
                .map(jobReadMapper::toDto);
    }

    @Override
    public List<JobReadDto> findAllByCompanyId(Long companyId) {
        return jobRepository.findAllByCompanyId(companyId).stream()
                .map(jobReadMapper::toDto)
                .toList();
    }

    @Override
    public JobReadDto findById(Long id) {
        return jobRepository.findById(id)
                .map(jobReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @Override
    public Integer countByCompanyId(Long id) {
        return jobRepository.countByCompanyId(id);
    }

    @Override
    public Integer countByCategoryId(Long id) {
        return jobRepository.countByCategoryId(id);
    }

    @Transactional
    @Override
    public JobReadDto create(JobCreateEditDto job) {
        return Optional.of(job)
                .map(jobCreateEditMapper::toEntity)
                .map(entity -> {
                    Company company = getCompanyById(job.getCompanyId());
                    GeneralCategory category = getGeneralCategoryById(job.getCategoryId());
                    entity.setCategory(category);
                    entity.setCompany(company);
                    entity.setCreatedAt(LocalDate.now());
                    return entity;
                })
                .map(jobRepository::save)
                .map(jobReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public JobReadDto update(Long id, JobCreateEditDto job) {
        return Optional.of(job)
                .map(jobCreateEditMapper::toEntity)
                .map(entity -> {
                    Company company = getCompanyById(job.getCompanyId());
                    entity.setCategory(getGeneralCategoryById(job.getCategoryId()));
                    entity.setCompany(company);
                    entity.setId(id);
                    entity.setCreatedAt(LocalDate.now());
                    return entity;
                })
                .map(jobRepository::save)
                .map(jobReadMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    }

    @Transactional
    @Override
    public void delete(Long id) {
        jobRepository.findById(id)
                .ifPresent(job -> jobRepository.deleteById(id));
    }

    private Company getCompanyById(Long companyId) {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    private GeneralCategory getGeneralCategoryById(Long generalCategoryId) {
        return generalCategoryRepository.findById(generalCategoryId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }
}

