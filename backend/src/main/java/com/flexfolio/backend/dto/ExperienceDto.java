package com.flexfolio.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceDto {
    private Long id;
    private String position;
    private String employer;
    private String city;
    private String country;
    private LocalDate startDate;
    private LocalDate endDate;
    private String responsibilities;
    private Boolean ongoing;
    private Long portfolioId;
}

