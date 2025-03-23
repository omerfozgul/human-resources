package com.omerozgul.human_resources.repository;

import com.omerozgul.human_resources.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByPosition(String position);
    List<Candidate> findByMilitaryStatus(String militaryStatus);
    List<Candidate> findByNoticePeriod(String noticePeriod);
}
