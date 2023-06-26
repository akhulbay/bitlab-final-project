package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.JobCreateEditDto;
import kz.shyngys.finalproject.dto.JobReadDto;
import kz.shyngys.finalproject.mapper.JobCreateEditMapper;
import kz.shyngys.finalproject.mapper.JobReadMapper;
import kz.shyngys.finalproject.model.Company;
import kz.shyngys.finalproject.repository.CompanyRepository;
import kz.shyngys.finalproject.repository.JobRepository;
import kz.shyngys.finalproject.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;

    private final JobReadMapper jobReadMapper;
    private final JobCreateEditMapper jobCreateEditMapper;

    @Override
    public List<JobReadDto> findAll() {
        return jobRepository.findAll().stream()
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
    public JobReadDto create(JobCreateEditDto job) {
        return Optional.of(job)
                .map(jobCreateEditMapper::toEntity)
                .map(entity -> {
                    Company company = companyRepository.findById(job.getCompanyId())
                            .orElseThrow();
                    entity.setCompany(company);
                    return entity;
                })
                .map(jobRepository::save)
                .map(jobReadMapper::toDto)
                .orElse(null);
    }

    @Override
    public JobReadDto update(Long id, JobCreateEditDto job) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
