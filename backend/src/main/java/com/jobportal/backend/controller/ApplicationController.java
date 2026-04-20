package com.jobportal.backend.controller;

import com.jobportal.backend.entity.JobApplication;
import com.jobportal.backend.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private JobApplicationRepository applicationRepository;

    @PostMapping
    public JobApplication apply(@RequestBody JobApplication application) {
        return applicationRepository.save(application);
    }

    @GetMapping("/job/{jobId}")
    public List<JobApplication> getApplicationsForJob(@PathVariable Long jobId) {
        // Used by Recruiter to see who applied
        return applicationRepository.findByJob_Id(jobId);
    }

    @GetMapping("/employee/{employeeId}")
    public List<JobApplication> getApplicationsByEmployee(@PathVariable Long employeeId) {
        // Used by Employee to see where they applied
        return applicationRepository.findByEmployee_Id(employeeId);
    }
    
    @GetMapping
    public List<JobApplication> getAllApplications() {
        // Used by Admin
        return applicationRepository.findAll();
    }

    @PutMapping("/{id}/status")
    public JobApplication updateStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> payload) {
        JobApplication application = applicationRepository.findById(id).orElseThrow();
        application.setStatus(payload.get("status"));
        return applicationRepository.save(application);
    }
}
