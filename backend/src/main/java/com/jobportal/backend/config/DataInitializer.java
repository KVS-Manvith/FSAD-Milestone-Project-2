package com.jobportal.backend.config;

import com.jobportal.backend.entity.Role;
import com.jobportal.backend.entity.User;
import com.jobportal.backend.entity.Job;
import com.jobportal.backend.entity.JobApplication;
import com.jobportal.backend.repository.UserRepository;
import com.jobportal.backend.repository.JobRepository;
import com.jobportal.backend.repository.JobApplicationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, JobRepository jobRepository, JobApplicationRepository applicationRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                // Create Admin
                User admin = new User(null, "Admin Supervisor", "admin@nexus.in", "admin123", Role.ADMIN, null);
                userRepository.save(admin);

                // Create Recruiter
                User recruiter = new User(null, "Tech Mahindra HR", "hr@techmahindra.com", "hr123", Role.RECRUITER, "Tech Mahindra");
                recruiter = userRepository.save(recruiter);
                
                // Create another Recruiter
                User recruiter2 = new User(null, "TCS HR", "hr@tcs.com", "hr123", Role.RECRUITER, "TCS");
                recruiter2 = userRepository.save(recruiter2);

                // Create Employee
                User employee = new User(null, "Amit Sharma", "amit@gmail.com", "emp123", Role.EMPLOYEE, null);
                employee = userRepository.save(employee);

                // Create Jobs
                Job job1 = jobRepository.save(new Job(null, "Senior Frontend Developer", "Tech Mahindra", "Bangalore, KA", "We are looking for an experienced React developer to build robust dashboards...", "₹18,00,000 LPA", "Full-time", recruiter));
                Job job2 = jobRepository.save(new Job(null, "Backend Java Engineer", "TCS", "Pune, MH", "Looking for Spring Boot expert with microservices knowledge...", "₹15,00,000 LPA", "Full-time", recruiter2));
                Job job3 = jobRepository.save(new Job(null, "UX/UI Designer", "Tech Mahindra", "Hyderabad, TS", "Design intuitive interfaces for enterprise products...", "₹12,00,000 LPA", "Contract", recruiter));

                // Create a dummy Job Application
                JobApplication app = new JobApplication();
                app.setJob(job1);
                app.setEmployee(employee);
                app.setFirstName("Amit");
                app.setLastName("Sharma");
                app.setEmail("amit@gmail.com");
                app.setPhone("+91 98765 43210");
                app.setPortfolioUrl("https://github.com/amitsharma");
                app.setDegree("B.Tech Computer Science");
                app.setUniversity("IIT Bombay");
                app.setGraduationYear("2021");
                app.setCgpa("8.9");
                app.setSkills("React, Next.js, Node.js");
                app.setExperienceYears("3-5 years");
                app.setCoverLetter("I have spent the last 3 years building scalable React platforms and would love to bring my expertise to your team.");
                app.setResumeUrl("https://amitsharma.in/resume.pdf");

                applicationRepository.save(app);
            }
        };
    }
}
