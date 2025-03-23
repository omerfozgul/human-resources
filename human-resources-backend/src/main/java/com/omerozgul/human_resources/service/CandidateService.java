package com.omerozgul.human_resources.service;

import com.omerozgul.human_resources.model.Candidate;
import com.omerozgul.human_resources.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidateService {
    private final CandidateRepository candidateRepository;

    @Autowired
    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Optional<Candidate> getCandidateById(Long id) {
        return candidateRepository.findById(id);
    }

    public Candidate saveCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    public void deleteCandidate(Long id) {
        candidateRepository.deleteById(id);
    }

    public List<Candidate> getCandidateByPosition(String name) {
        return candidateRepository.findByPosition(name);
    }

    public List<Candidate> getCandidateByMilitaryStatus(String name) {
        return candidateRepository.findByMilitaryStatus(name);
    }

    public List<Candidate> getCandidateByNoticePeriod(String name) {
        return candidateRepository.findByNoticePeriod(name);
    }

    public void test() {
        candidateRepository.save(new Candidate(null, "Ali", "Yılmaz", "Java Developer", "Tamamlandı", "2 Hafta", "555-123-4567", "ali.yilmaz@email.com", "ali_cv.pdf"));
        candidateRepository.save(new Candidate(null, "Ayşe", "Kaya", "Frontend Developer", "Muaf", "1 Ay", "555-234-5678", "ayse.kaya@email.com", "ayse_cv.pdf"));
        candidateRepository.save(new Candidate(null, "Mehmet", "Demir", "DevOps Engineer", "Tecilli", "2 Ay", "555-345-6789", "mehmet.demir@email.com", "mehmet_cv.pdf"));
        candidateRepository.save(new Candidate(null, "Zeynep", "Şahin", "UI/UX Designer", "Muaf", "2 Hafta", "555-456-7890", "zeynep.sahin@email.com", "zeynep_cv.pdf"));
        candidateRepository.save(new Candidate(null, "Emre", "Çelik", "Backend Developer", "Tamamlandı", "1 Hafta", "555-567-8901", "emre.celik@email.com", "emre_cv.pdf"));
        candidateRepository.save(new Candidate(null, "Selin", "Yıldız", "Data Scientist", "Muaf", "3 Ay", "555-678-9012", "selin.yildiz@email.com", "selin_cv.pdf"));
        candidateRepository.save(new Candidate(null, "Burak", "Aydın", "Project Manager", "Tamamlandı", "1 Ay", "555-789-0123", "burak.aydin@email.com", "burak_cv.pdf"));
        candidateRepository.save(new Candidate(null, "Deniz", "Öztürk", "QA Engineer", "Tecilli", "2 Hafta", "555-890-1234", "deniz.ozturk@email.com", "deniz_cv.pdf"));
        candidateRepository.save(new Candidate(null, "Ceren", "Kara", "System Administrator", "Muaf", "Hemen", "555-901-2345", "ceren.kara@email.com", "ceren_cv.pdf"));
        candidateRepository.save(new Candidate(null, "Onur", "Aksoy", "Mobile Developer", "Tamamlandı", "3 Hafta", "555-012-3456", "onur.aksoy@email.com", "onur_cv.pdf"));
    }
}
