package com.flexfolio.backend.service;

import com.flexfolio.backend.dto.PortfolioDto;
import com.flexfolio.backend.mapper.EntityMapper;
import com.flexfolio.backend.model.PortfolioEntity;
import com.flexfolio.backend.model.UserEntity;
import com.flexfolio.backend.repository.PortfolioRepository;
import com.flexfolio.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final EntityMapper entityMapper;

    /**
     * Create a new portfolio for a user
     */
    @Transactional
    public PortfolioDto createPortfolio(PortfolioEntity portfolio, Long userId) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        portfolio.setUser(user);
        PortfolioEntity savedPortfolio = portfolioRepository.save(portfolio);
        return entityMapper.toPortfolioDto(savedPortfolio);
    }

    /**
     * Get portfolio by ID
     */
    @Transactional
    public Optional<PortfolioDto> getPortfolioById(Long id) {
        return portfolioRepository.findById(id)
            .map(entityMapper::toPortfolioDto);
    }

    /**
     * Get all portfolios for a specific user
     */
    @Transactional
    public List<PortfolioDto> getPortfoliosByUserId(Long userId) {
        List<PortfolioEntity> portfolios = portfolioRepository.findByUserId(userId);
        return entityMapper.toPortfolioDtoList(portfolios);
    }

    /**
     * Get all portfolios
     */
    @Transactional
    public List<PortfolioDto> getAllPortfolios() {
        List<PortfolioEntity> portfolios = portfolioRepository.findAll();
        return entityMapper.toPortfolioDtoList(portfolios);
    }

    /**
     * Update portfolio
     */
    @Transactional
    public PortfolioDto updatePortfolio(Long id, PortfolioEntity portfolioDetails) {
        PortfolioEntity updatedPortfolio = portfolioRepository.findById(id).map(portfolio -> {
            if (portfolioDetails.getUser() != null) {
                portfolio.setUser(portfolioDetails.getUser());
            }
            return portfolioRepository.save(portfolio);
        }).orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + id));

        return entityMapper.toPortfolioDto(updatedPortfolio);
    }

    /**
     * Delete portfolio by ID
     */
    @Transactional
    public void deletePortfolio(Long id) {
        portfolioRepository.deleteById(id);
    }
}

