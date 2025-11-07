package com.flexfolio.backend.controller;

import com.flexfolio.backend.model.EducationEntity;
import com.flexfolio.backend.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/educations")
@CrossOrigin(origins = "http://localhost:3000")
public class EducationController {

    @Autowired
    private EducationService educationService;

    /**
     * Create a new education for a portfolio
     */
    @PostMapping("/{portfolioId}")
    public ResponseEntity<EducationEntity> createEducation(@PathVariable Long portfolioId, @RequestBody EducationEntity education) {
        try {
            EducationEntity createdEducation = educationService.createEducation(education, portfolioId);
            return new ResponseEntity<>(createdEducation, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Get education by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<EducationEntity> getEducationById(@PathVariable Long id) {
        return educationService.getEducationById(id)
            .map(education -> new ResponseEntity<>(education, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Get all educations for a portfolio
     */
    @GetMapping("/portfolio/{portfolioId}")
    public ResponseEntity<List<EducationEntity>> getEducationsByPortfolioId(@PathVariable Long portfolioId) {
        List<EducationEntity> educations = educationService.getEducationsByPortfolioId(portfolioId);
        return new ResponseEntity<>(educations, HttpStatus.OK);
    }

    /**
     * Get all educations
     */
    @GetMapping
    public ResponseEntity<List<EducationEntity>> getAllEducations() {
        List<EducationEntity> educations = educationService.getAllEducations();
        return new ResponseEntity<>(educations, HttpStatus.OK);
    }

    /**
     * Update education
     */
    @PutMapping("/{id}")
    public ResponseEntity<EducationEntity> updateEducation(@PathVariable Long id, @RequestBody EducationEntity educationDetails) {
        try {
            EducationEntity updatedEducation = educationService.updateEducation(id, educationDetails);
            return new ResponseEntity<>(updatedEducation, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Delete education
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

