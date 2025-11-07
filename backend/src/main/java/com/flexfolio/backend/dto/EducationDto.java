package com.flexfolio.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationDto {
    private Long id;
    private String titleOfQualification;
    private String training;
    private String city;
    private String country;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean ongoing;
    private Long portfolioId;
}

