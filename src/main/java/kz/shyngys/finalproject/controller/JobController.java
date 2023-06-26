package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.JobCreateEditDto;
import kz.shyngys.finalproject.dto.JobReadDto;
import kz.shyngys.finalproject.service.JobService;
import lombok.RequiredArgsConstructor;
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
    public List<JobReadDto> findAll() {
        return jobService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobReadDto> findById(@PathVariable("id") Long id) {
        JobReadDto job = jobService.findById(id);
        if (job == null) {
            ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(job);
    }

    @PostMapping
    public ResponseEntity<JobReadDto> create(@RequestBody JobCreateEditDto job) {
        JobReadDto newJob = jobService.create(job);
        if (newJob == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(newJob, HttpStatus.CREATED);
    }

}
