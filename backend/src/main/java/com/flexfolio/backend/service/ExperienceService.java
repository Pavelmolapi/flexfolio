package com.flexfolio.backend.service;

import com.flexfolio.backend.model.ExperienceEntity;
import com.flexfolio.backend.model.PortfolioEntity;
import com.flexfolio.backend.repository.ExperienceRepository;
import com.flexfolio.backend.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    /**
     * Create a new experience for a portfolio
     */
    public ExperienceEntity createExperience(ExperienceEntity experience, Long portfolioId) {
        PortfolioEntity portfolio = portfolioRepository.findById(portfolioId)
            .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + portfolioId));
        experience.setPortfolio(portfolio);
        experience.validateOngoing();
        return experienceRepository.save(experience);
    }

    /**
     * Get experience by ID
     */
    public Optional<ExperienceEntity> getExperienceById(Long id) {
        return experienceRepository.findById(id);
    }

    /**
     * Get all experiences for a specific portfolio
     */
    public List<ExperienceEntity> getExperiencesByPortfolioId(Long portfolioId) {
        return experienceRepository.findByPortfolioId(portfolioId);
    }

    /**
     * Get all experiences
     */
    public List<ExperienceEntity> getAllExperiences() {
        return experienceRepository.findAll();
    }

    /**
     * Update experience
     */
    public ExperienceEntity updateExperience(Long id, ExperienceEntity experienceDetails) {
        return experienceRepository.findById(id).map(experience -> {
            if (experienceDetails.getPosition() != null) {
                experience.setPosition(experienceDetails.getPosition());
            }
            if (experienceDetails.getEmployer() != null) {
                experience.setEmployer(experienceDetails.getEmployer());
            }
            if (experienceDetails.getCity() != null) {
                experience.setCity(experienceDetails.getCity());
            }
            if (experienceDetails.getCountry() != null) {
                experience.setCountry(experienceDetails.getCountry());
            }
            if (experienceDetails.getStartDate() != null) {
                experience.setStartDate(experienceDetails.getStartDate());
            }
            if (experienceDetails.getEndDate() != null) {
                experience.setEndDate(experienceDetails.getEndDate());
            }
            if (experienceDetails.getResponsibilities() != null) {
                experience.setResponsibilities(experienceDetails.getResponsibilities());
            }
            if (experienceDetails.getOngoing() != null) {
                experience.setOngoing(experienceDetails.getOngoing());
            }
            experience.validateOngoing();
            return experienceRepository.save(experience);
        }).orElseThrow(() -> new RuntimeException("Experience not found with id: " + id));
    }

    /**
     * Delete experience by ID
     */
    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }
}

