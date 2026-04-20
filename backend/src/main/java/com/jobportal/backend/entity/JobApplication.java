package com.jobportal.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Job job;

    @ManyToOne
    private User employee;

    private String status = "PENDING";

    // Personal Details
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String portfolioUrl;

    // Academic Details
    private String degree;
    private String university;
    private String graduationYear;
    private String cgpa;

    // Experience & Skills
    @Column(columnDefinition = "TEXT")
    private String skills;
    private String experienceYears;
    
    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    // Resume
    @Column(columnDefinition = "TEXT")
    private String resumeUrl;
}
