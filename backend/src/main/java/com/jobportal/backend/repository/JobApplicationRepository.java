package com.jobportal.backend.repository;

import com.jobportal.backend.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByJob_Id(Long jobId);
    List<JobApplication> findByEmployee_Id(Long employeeId);
}
