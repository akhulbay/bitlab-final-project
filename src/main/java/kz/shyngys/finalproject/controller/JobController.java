package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.JobCreateEditDto;
import kz.shyngys.finalproject.dto.JobFilter;
import kz.shyngys.finalproject.dto.JobReadDto;
import kz.shyngys.finalproject.dto.PageResponse;
import kz.shyngys.finalproject.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public PageResponse<JobReadDto> findAll(JobFilter filter, Pageable pageable) {
        Page<JobReadDto> jobs = jobService.findAll(filter, pageable);
        return PageResponse.of(jobs);
    }

    @GetMapping("/company/{id}")
    public List<JobReadDto> findAllByCompanyId(@PathVariable("id") Long companyId) {
        return jobService.findAllByCompanyId(companyId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobReadDto> findById(@PathVariable("id") Long id) {
        JobReadDto job = jobService.findById(id);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/count/{id}")
    public Integer countByCompanyId(@PathVariable("id") Long id) {
        return jobService.countByCompanyId(id);
    }

    @PostMapping
    public ResponseEntity<JobReadDto> create(@RequestBody JobCreateEditDto job) {
        JobReadDto newJob = jobService.create(job);
        return new ResponseEntity<>(newJob, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobReadDto> update(@PathVariable("id") Long id,
                                             @RequestBody JobCreateEditDto job) {
        JobReadDto newJob = jobService.update(id, job);
        return ResponseEntity.ok(newJob);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        jobService.delete(id);
    }

}
