package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.JobCreateEditDto;
import kz.shyngys.finalproject.dto.JobFilter;
import kz.shyngys.finalproject.dto.JobReadDto;

import java.util.List;

public interface JobService {

    List<JobReadDto> findAll(JobFilter filter);

    List<JobReadDto> findAllByCompanyId(Long companyId);

    JobReadDto findById(Long id);

    JobReadDto create(JobCreateEditDto job);

    JobReadDto update(Long id, JobCreateEditDto job);

    void delete(Long id);

}
