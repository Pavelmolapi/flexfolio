package com.flexfolio.backend.service;

import com.flexfolio.backend.dto.ExperienceDto;
import com.flexfolio.backend.mapper.EntityMapper;
import com.flexfolio.backend.model.ExperienceEntity;
import com.flexfolio.backend.model.PortfolioEntity;
import com.flexfolio.backend.repository.ExperienceRepository;
import com.flexfolio.backend.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    private final PortfolioRepository portfolioRepository;

    private final EntityMapper entityMapper;

    /**
     * Create a new experience for a portfolio
     */
    public ExperienceDto createExperience(ExperienceEntity experience, Long portfolioId) {
        PortfolioEntity portfolio = portfolioRepository.findById(portfolioId)
            .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + portfolioId));
        experience.setPortfolio(portfolio);
        experience.validateOngoing();
        ExperienceEntity savedExperience = experienceRepository.save(experience);
        return entityMapper.toExperienceDto(savedExperience);
    }

    /**
     * Get experience by ID
     */
    public Optional<ExperienceDto> getExperienceById(Long id) {
        return experienceRepository.findById(id)
            .map(entityMapper::toExperienceDto);
    }

    /**
     * Get all experiences for a specific portfolio
     */
    public List<ExperienceDto> getExperiencesByPortfolioId(Long portfolioId) {
        List<ExperienceEntity> experiences = experienceRepository.findByPortfolioId(portfolioId);
        return entityMapper.toExperienceDtoList(experiences);
    }

    /**
     * Get all experiences
     */
    public List<ExperienceDto> getAllExperiences() {
        List<ExperienceEntity> experiences = experienceRepository.findAll();
        return entityMapper.toExperienceDtoList(experiences);
    }

    /**
     * Update experience
     */
    public ExperienceDto updateExperience(Long id, ExperienceEntity experienceDetails) {
        ExperienceEntity updatedExperience = experienceRepository.findById(id).map(experience -> {
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

        return entityMapper.toExperienceDto(updatedExperience);
    }

    /**
     * Delete experience by ID
     */
    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }
}

