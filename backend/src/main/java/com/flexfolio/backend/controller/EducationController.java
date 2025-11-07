package com.flexfolio.backend.controller;

import com.flexfolio.backend.dto.EducationDto;
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
    public ResponseEntity<EducationDto> createEducation(@PathVariable Long portfolioId, @RequestBody EducationEntity education) {
        try {
            EducationDto createdEducation = educationService.createEducation(education, portfolioId);
            return new ResponseEntity<>(createdEducation, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Get education by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<EducationDto> getEducationById(@PathVariable Long id) {
        return educationService.getEducationById(id)
            .map(education -> new ResponseEntity<>(education, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Get all educations for a portfolio
     */
    @GetMapping("/portfolio/{portfolioId}")
    public ResponseEntity<List<EducationDto>> getEducationsByPortfolioId(@PathVariable Long portfolioId) {
        List<EducationDto> educations = educationService.getEducationsByPortfolioId(portfolioId);
        return new ResponseEntity<>(educations, HttpStatus.OK);
    }

    /**
     * Get all educations
     */
    @GetMapping
    public ResponseEntity<List<EducationDto>> getAllEducations() {
        List<EducationDto> educations = educationService.getAllEducations();
        return new ResponseEntity<>(educations, HttpStatus.OK);
    }

    /**
     * Update education
     */
    @PutMapping("/{id}")
    public ResponseEntity<EducationDto> updateEducation(@PathVariable Long id, @RequestBody EducationEntity educationDetails) {
        try {
            EducationDto updatedEducation = educationService.updateEducation(id, educationDetails);
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


