package com.flexfolio.backend.mapper;

import com.flexfolio.backend.dto.EducationDto;
import com.flexfolio.backend.dto.ExperienceDto;
import com.flexfolio.backend.dto.PortfolioDto;
import com.flexfolio.backend.dto.UserDto;
import com.flexfolio.backend.model.EducationEntity;
import com.flexfolio.backend.model.ExperienceEntity;
import com.flexfolio.backend.model.PortfolioEntity;
import com.flexfolio.backend.model.UserEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Simple mapper to convert between Entities and DTOs
 * No external dependencies required
 */
@Component
public class EntityMapper {

    /**
     * Convert UserEntity to UserDto
     */
    public UserDto toUserDto(UserEntity user) {
        if (user == null) {
            return null;
        }
        return new UserDto(
            user.getId(),
            user.getEmail(),
            user.getCreatedAt()
        );
    }

    /**
     * Convert UserDto to UserEntity
     */
    public UserEntity toUserEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }
        UserEntity user = new UserEntity();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setCreatedAt(dto.getCreatedAt());
        return user;
    }

    /**
     * Convert PortfolioEntity to PortfolioDto (without nested collections)
     */
    public PortfolioDto toPortfolioDto(PortfolioEntity portfolio) {
        if (portfolio == null) {
            return null;
        }
        return new PortfolioDto(
            portfolio.getId(),
            portfolio.getUser() != null ? portfolio.getUser().getId() : null,
            portfolio.getExperiences() != null ?
                portfolio.getExperiences().stream()
                    .map(this::toExperienceDto)
                    .collect(Collectors.toList()) : null,
            portfolio.getEducations() != null ?
                portfolio.getEducations().stream()
                    .map(this::toEducationDto)
                    .collect(Collectors.toList()) : null
        );
    }

    /**
     * Convert PortfolioDto to PortfolioEntity
     */
    public PortfolioEntity toPortfolioEntity(PortfolioDto dto) {
        if (dto == null) {
            return null;
        }
        PortfolioEntity portfolio = new PortfolioEntity();
        portfolio.setId(dto.getId());
        return portfolio;
    }

    /**
     * Convert ExperienceEntity to ExperienceDto
     */
    public ExperienceDto toExperienceDto(ExperienceEntity experience) {
        if (experience == null) {
            return null;
        }
        return new ExperienceDto(
            experience.getIdExp(),
            experience.getPosition(),
            experience.getEmployer(),
            experience.getCity(),
            experience.getCountry(),
            experience.getStartDate(),
            experience.getEndDate(),
            experience.getResponsibilities(),
            experience.getOngoing(),
            experience.getPortfolio() != null ? experience.getPortfolio().getId() : null
        );
    }

    /**
     * Convert ExperienceDto to ExperienceEntity
     */
    public ExperienceEntity toExperienceEntity(ExperienceDto dto) {
        if (dto == null) {
            return null;
        }
        ExperienceEntity experience = new ExperienceEntity();
        experience.setIdExp(dto.getId());
        experience.setPosition(dto.getPosition());
        experience.setEmployer(dto.getEmployer());
        experience.setCity(dto.getCity());
        experience.setCountry(dto.getCountry());
        experience.setStartDate(dto.getStartDate());
        experience.setEndDate(dto.getEndDate());
        experience.setResponsibilities(dto.getResponsibilities());
        experience.setOngoing(dto.getOngoing());
        return experience;
    }

    /**
     * Convert EducationEntity to EducationDto
     */
    public EducationDto toEducationDto(EducationEntity education) {
        if (education == null) {
            return null;
        }
        return new EducationDto(
            education.getIdEdu(),
            education.getTitleOfQualification(),
            education.getTraining(),
            education.getCity(),
            education.getCountry(),
            education.getStartDate(),
            education.getEndDate(),
            education.getOngoing(),
            education.getPortfolio() != null ? education.getPortfolio().getId() : null
        );
    }

    /**
     * Convert EducationDto to EducationEntity
     */
    public EducationEntity toEducationEntity(EducationDto dto) {
        if (dto == null) {
            return null;
        }
        EducationEntity education = new EducationEntity();
        education.setIdEdu(dto.getId());
        education.setTitleOfQualification(dto.getTitleOfQualification());
        education.setTraining(dto.getTraining());
        education.setCity(dto.getCity());
        education.setCountry(dto.getCountry());
        education.setStartDate(dto.getStartDate());
        education.setEndDate(dto.getEndDate());
        education.setOngoing(dto.getOngoing());
        return education;
    }

    /**
     * Convert list of UserEntity to list of UserDto
     */
    public List<UserDto> toUserDtoList(List<UserEntity> users) {
        if (users == null) {
            return null;
        }
        return users.stream()
            .map(this::toUserDto)
            .collect(Collectors.toList());
    }

    /**
     * Convert list of PortfolioEntity to list of PortfolioDto
     */
    public List<PortfolioDto> toPortfolioDtoList(List<PortfolioEntity> portfolios) {
        if (portfolios == null) {
            return null;
        }
        return portfolios.stream()
            .map(this::toPortfolioDto)
            .collect(Collectors.toList());
    }

    /**
     * Convert list of ExperienceEntity to list of ExperienceDto
     */
    public List<ExperienceDto> toExperienceDtoList(List<ExperienceEntity> experiences) {
        if (experiences == null) {
            return null;
        }
        return experiences.stream()
            .map(this::toExperienceDto)
            .collect(Collectors.toList());
    }

    /**
     * Convert list of EducationEntity to list of EducationDto
     */
    public List<EducationDto> toEducationDtoList(List<EducationEntity> educations) {
        if (educations == null) {
            return null;
        }
        return educations.stream()
            .map(this::toEducationDto)
            .collect(Collectors.toList());
    }
}

