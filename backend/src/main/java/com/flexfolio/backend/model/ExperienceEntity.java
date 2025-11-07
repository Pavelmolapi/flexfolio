package com.flexfolio.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "Experience")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idExp;

    @Column(name = "position_", nullable = false, length = 50)
    private String position;

    @Column(length = 50)
    private String employer;

    @Column(length = 50)
    private String city;

    @Column(length = 50)
    private String country;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column(length = 350)
    private String responsibilities;

    @Column
    private Boolean ongoing;

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

