package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.JobCreateEditDto;
import kz.shyngys.finalproject.dto.JobFilter;
import kz.shyngys.finalproject.dto.JobReadDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface JobService {

    Page<JobReadDto> findAll(JobFilter filter, Pageable pageable);

    List<JobReadDto> findAllByCompanyId(Long companyId);

    JobReadDto findById(Long id);

    Integer countByCompanyId(Long id);

    JobReadDto create(JobCreateEditDto job);

    JobReadDto update(Long id, JobCreateEditDto job);

    void delete(Long id);

}
