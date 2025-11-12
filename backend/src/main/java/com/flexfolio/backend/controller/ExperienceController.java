package com.flexfolio.backend.controller;

import com.flexfolio.backend.dto.ExperienceDto;
import com.flexfolio.backend.model.ExperienceEntity;
import com.flexfolio.backend.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "http://localhost:3000")
public class ExperienceController {

    @Autowired
    private ExperienceService experienceService;

    /**
     * Create a new experience for a portfolio
     */
    @PostMapping("/{portfolioId}")
    public ResponseEntity<ExperienceDto> createExperience(@PathVariable Long portfolioId, @RequestBody ExperienceEntity experience) {
        try {
            ExperienceDto createdExperience = experienceService.createExperience(experience, portfolioId);
            return new ResponseEntity<>(createdExperience, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Get experience by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ExperienceDto> getExperienceById(@PathVariable Long id) {
        return experienceService.getExperienceById(id)
            .map(experience -> new ResponseEntity<>(experience, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Get all experiences for a portfolio
     */
    @GetMapping("/portfolio/{portfolioId}")
    public ResponseEntity<List<ExperienceDto>> getExperiencesByPortfolioId(@PathVariable Long portfolioId) {
        List<ExperienceDto> experiences = experienceService.getExperiencesByPortfolioId(portfolioId);
        return new ResponseEntity<>(experiences, HttpStatus.OK);
    }

    /**
     * Get all experiences
     */
    @GetMapping
    public ResponseEntity<List<ExperienceDto>> getAllExperiences() {
        List<ExperienceDto> experiences = experienceService.getAllExperiences();
        return new ResponseEntity<>(experiences, HttpStatus.OK);
    }

    /**
     * Update experience
     */
    @PutMapping("/{id}")
    public ResponseEntity<ExperienceDto> updateExperience(@PathVariable Long id, @RequestBody ExperienceEntity experienceDetails) {
        try {
            ExperienceDto updatedExperience = experienceService.updateExperience(id, experienceDetails);
            return new ResponseEntity<>(updatedExperience, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Delete experience
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

