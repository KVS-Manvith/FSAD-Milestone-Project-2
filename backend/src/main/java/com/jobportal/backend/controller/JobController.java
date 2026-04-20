package com.jobportal.backend.controller;

import com.jobportal.backend.entity.Job;
import com.jobportal.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public List<Job> getAllJobs(@RequestParam(required = false) String search, @RequestParam(required = false) Long recruiterId) {
        if (recruiterId != null) {
            return jobRepository.findByRecruiter_Id(recruiterId);
        }
        if (search != null && !search.isEmpty()) {
            return jobRepository.findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCase(search, search);
        }
        return jobRepository.findAll();
    }

    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        if (jobRepository.existsById(id)) {
            jobRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
