package com.flexfolio.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "Porfolio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPortfolio;

    @ManyToOne
    @JoinColumn(name = "Id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "portfolio")
    private List<ExperienceEntity> experiences;

    @OneToMany(mappedBy = "portfolio")
    private List<EducationEntity> educations;

}

