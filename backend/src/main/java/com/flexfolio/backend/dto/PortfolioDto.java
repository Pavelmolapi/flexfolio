package com.flexfolio.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioDto {
    private Long id;
    private Long userId;
    private List<ExperienceDto> experiences;
    private List<EducationDto> educations;
}

