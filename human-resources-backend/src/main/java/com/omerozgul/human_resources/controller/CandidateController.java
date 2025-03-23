package com.omerozgul.human_resources.controller;

import com.omerozgul.human_resources.model.Candidate;
import com.omerozgul.human_resources.service.CandidateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "*")
public class CandidateController {

    private final CandidateService candidateService;

    @Autowired
    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        return ResponseEntity.ok(candidateService.getAllCandidates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
        return candidateService.getCandidateById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Candidate> saveCandidate(@Valid @RequestBody Candidate candidate) {
        return new ResponseEntity<>(candidateService.saveCandidate(candidate), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidate) {
        return candidateService.getCandidateById(id)
                .map(existingCandidate -> {
                    candidate.setId(id);
                    return ResponseEntity.ok(candidateService.saveCandidate(candidate));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
        return candidateService.getCandidateById(id)
                .map(candidate -> {
                    candidateService.deleteCandidate(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(ResponseEntity.notFound().build());

    }

    @PostMapping("/{id}/cv")
    public ResponseEntity<Map<String, String>> uploadCV(@PathVariable Long id,
                                           @RequestParam("file") MultipartFile file) {
        try {

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get("uploads");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // save cv file
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // set candidate's cv filename
            Optional<Candidate> optionalCandidate = candidateService.getCandidateById(id);
            Candidate candidate = optionalCandidate.get();
            candidate.setCv(fileName);
            candidateService.saveCandidate(candidate);

            Map<String, String> response = new HashMap<>();
            response.put("message", "File uploaded successfully: " + fileName);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Could not upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/test_data")
    public ResponseEntity<List<Candidate>> test() {
        candidateService.test();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/ping")
    public String ping(){
        return "pong";
    }

}
