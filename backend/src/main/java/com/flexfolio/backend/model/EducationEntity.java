package com.flexfolio.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "Education")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEdu;

    @Column(nullable = false, length = 50)
    private String titleOfQualification;

    @Column(length = 100)
    private String training;

    @Column
    private Boolean ongoing;

    @Column(length = 50)
    private String city;

    @Column(length = 50)
    private String country;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "id_portfolio", nullable = false)
    private PortfolioEntity portfolio;

    /**
     * Validation method: if ongoing = true, set endDate = null
     */
    @PostLoad
    @PrePersist
    @PreUpdate
    public void validateOngoing() {
        if (ongoing != null && ongoing) {
            this.endDate = null;
        }
    }
}

