package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.JobCreateEditDto;
import kz.shyngys.finalproject.dto.JobFilter;
import kz.shyngys.finalproject.dto.JobReadDto;
import kz.shyngys.finalproject.mapper.JobCreateEditMapper;
import kz.shyngys.finalproject.mapper.JobReadMapper;
import kz.shyngys.finalproject.model.Company;
import kz.shyngys.finalproject.model.Job;
import kz.shyngys.finalproject.repository.CompanyRepository;
import kz.shyngys.finalproject.repository.JobRepository;
import kz.shyngys.finalproject.service.JobService;
import kz.shyngys.finalproject.specification.JobSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;

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
                .orElse(null);
    }

    @Override
    public Integer countByCompanyId(Long id) {
        return jobRepository.countByCompanyId(id);
    }

    @Transactional
    @Override
    public JobReadDto create(JobCreateEditDto job) {
        return Optional.of(job)
                .map(jobCreateEditMapper::toEntity)
                .map(entity -> {
                    Company company = companyRepository.findById(job.getCompanyId())
                            .orElseThrow();
                    entity.setCompany(company);
                    entity.setCreatedAt(LocalDate.now());
                    return entity;
                })
                .map(jobRepository::save)
                .map(jobReadMapper::toDto)
                .orElse(null);
    }

    @Transactional
    @Override
    public JobReadDto update(Long id, JobCreateEditDto job) {
        return Optional.of(job)
                .map(jobCreateEditMapper::toEntity)
                .map(entity -> {
                    Company company = companyRepository.findById(job.getCompanyId())
                            .orElseThrow();
                    entity.setCompany(company);
                    entity.setId(id);
                    entity.setCreatedAt(LocalDate.now());
                    return entity;
                })
                .map(jobRepository::save)
                .map(jobReadMapper::toDto)
                .orElse(null);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        jobRepository.findById(id)
                .ifPresent(job -> jobRepository.deleteById(id));
    }
}

