package com.flexfolio.backend.service;

import com.flexfolio.backend.model.EducationEntity;
import com.flexfolio.backend.model.PortfolioEntity;
import com.flexfolio.backend.repository.EducationRepository;
import com.flexfolio.backend.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    /**
     * Create a new education for a portfolio
     */
    public EducationEntity createEducation(EducationEntity education, Long portfolioId) {
        PortfolioEntity portfolio = portfolioRepository.findById(portfolioId)
            .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + portfolioId));
        education.setPortfolio(portfolio);
        education.validateOngoing();
        return educationRepository.save(education);
    }

    /**
     * Get education by ID
     */
    public Optional<EducationEntity> getEducationById(Long id) {
        return educationRepository.findById(id);
    }

    /**
     * Get all educations for a specific portfolio
     */
    public List<EducationEntity> getEducationsByPortfolioId(Long portfolioId) {
        return educationRepository.findByPortfolioId(portfolioId);
    }

    /**
     * Get all educations
     */
    public List<EducationEntity> getAllEducations() {
        return educationRepository.findAll();
    }

    /**
     * Update education
     */
    public EducationEntity updateEducation(Long id, EducationEntity educationDetails) {
        return educationRepository.findById(id).map(education -> {
            if (educationDetails.getTitleOfQualification() != null) {
                education.setTitleOfQualification(educationDetails.getTitleOfQualification());
            }
            if (educationDetails.getTraining() != null) {
                education.setTraining(educationDetails.getTraining());
            }
            if (educationDetails.getCity() != null) {
                education.setCity(educationDetails.getCity());
            }
            if (educationDetails.getCountry() != null) {
                education.setCountry(educationDetails.getCountry());
            }
            if (educationDetails.getStartDate() != null) {
                education.setStartDate(educationDetails.getStartDate());
            }
            if (educationDetails.getEndDate() != null) {
                education.setEndDate(educationDetails.getEndDate());
            }
            if (educationDetails.getOngoing() != null) {
                education.setOngoing(educationDetails.getOngoing());
            }
            education.validateOngoing();
            return educationRepository.save(education);
        }).orElseThrow(() -> new RuntimeException("Education not found with id: " + id));
    }

    /**
     * Delete education by ID
     */
    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);
    }
}

