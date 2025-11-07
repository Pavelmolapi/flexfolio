package com.flexfolio.backend.repository;

import com.flexfolio.backend.model.EducationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<EducationEntity, Long> {
    List<EducationEntity> findByPortfolioId(Long id);
}