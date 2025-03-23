package com.omerozgul.human_resources;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.omerozgul.human_resources.model.Candidate;
import com.omerozgul.human_resources.repository.CandidateRepository;

@SpringBootApplication
public class HumanResourcesApplication {

	public static void main(String[] args) {
		SpringApplication.run(HumanResourcesApplication.class, args);
	}

	@Bean
	public CommandLineRunner initDatabase(CandidateRepository candidateRepository) {
		return args -> {
			if (candidateRepository.count() == 0) {
				candidateRepository.save(new Candidate(null, "John", "Doe", "Java Developer", "Completed", "2 Weeks", "+1-555-123-4567", "john.doe@example.com", "john_cv.pdf"));
				candidateRepository.save(new Candidate(null, "Jane", "Smith", "Project Manager", "Exempted", "1 Month", "+1-555-234-5678", "jane.smith@example.com", "jane_cv.pdf"));
				candidateRepository.save(new Candidate(null, "Michael", "Johnson", "UI/UX Designer", "Completed", "No Notice", "+1-555-345-6789", "michael.johnson@example.com", "michael_cv.pdf"));
				candidateRepository.save(new Candidate(null, "Emily", "Williams", "QA Engineer", "Deferred", "2 Weeks", "+1-555-456-7890", "emily.williams@example.com", "emily_cv.pdf"));
				candidateRepository.save(new Candidate(null, "David", "Brown", "DevOps Engineer", "Completed", "1 Month", "+1-555-567-8901", "david.brown@example.com", "david_cv.pdf"));
				candidateRepository.save(new Candidate(null, "Sarah", "Taylor", "Full Stack Developer", "Exempted", "2 Weeks", "+1-555-678-9012", "sarah.taylor@example.com", "sarah_cv.pdf"));
				candidateRepository.save(new Candidate(null, "James", "Miller", "Product Manager", "Completed", "1 Month", "+1-555-789-0123", "james.miller@example.com", "james_cv.pdf"));
				candidateRepository.save(new Candidate(null, "Jessica", "Anderson", "Data Scientist", "Deferred", "No Notice", "+1-555-890-1234", "jessica.anderson@example.com", "jessica_cv.pdf"));
				candidateRepository.save(new Candidate(null, "Robert", "Thomas", "Mobile Developer", "Completed", "2 Weeks", "+1-555-901-2345", "robert.thomas@example.com", "robert_cv.pdf"));
				candidateRepository.save(new Candidate(null, "Jennifer", "Jackson", "Frontend Developer", "Exempted", "1 Month", "+1-555-012-3456", "jennifer.jackson@example.com", "jennifer_cv.pdf"));

				System.out.println("Demo data has been initialized with 10 candidates.");
			} else {
				System.out.println("Database already contains data, skipping initialization.");
			}
		};
	}

}
