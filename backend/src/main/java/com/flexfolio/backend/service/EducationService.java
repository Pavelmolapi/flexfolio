package com.flexfolio.backend.service;

import com.flexfolio.backend.dto.EducationDto;
import com.flexfolio.backend.mapper.EntityMapper;
import com.flexfolio.backend.model.EducationEntity;
import com.flexfolio.backend.model.PortfolioEntity;
import com.flexfolio.backend.repository.EducationRepository;
import com.flexfolio.backend.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository educationRepository;

    private final PortfolioRepository portfolioRepository;

    private final EntityMapper entityMapper;

    /**
     * Create a new education for a portfolio
     */
    public EducationDto createEducation(EducationEntity education, Long portfolioId) {
        PortfolioEntity portfolio = portfolioRepository.findById(portfolioId)
            .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + portfolioId));
        education.setPortfolio(portfolio);
        education.validateOngoing();
        EducationEntity savedEducation = educationRepository.save(education);
        return entityMapper.toEducationDto(savedEducation);
    }

    /**
     * Get education by ID
     */
    public Optional<EducationDto> getEducationById(Long id) {
        return educationRepository.findById(id)
            .map(entityMapper::toEducationDto);
    }

    /**
     * Get all educations for a specific portfolio
     */
    public List<EducationDto> getEducationsByPortfolioId(Long portfolioId) {
        List<EducationEntity> educations = educationRepository.findByPortfolioId(portfolioId);
        return entityMapper.toEducationDtoList(educations);
    }

    /**
     * Get all educations
     */
    public List<EducationDto> getAllEducations() {
        List<EducationEntity> educations = educationRepository.findAll();
        return entityMapper.toEducationDtoList(educations);
    }

    /**
     * Update education
     */
    public EducationDto updateEducation(Long id, EducationEntity educationDetails) {
        EducationEntity updatedEducation = educationRepository.findById(id).map(education -> {
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

        return entityMapper.toEducationDto(updatedEducation);
    }

    /**
     * Delete education by ID
     */
    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);
    }
}

