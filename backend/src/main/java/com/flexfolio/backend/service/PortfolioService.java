package com.flexfolio.backend.service;

import com.flexfolio.backend.model.PortfolioEntity;
import com.flexfolio.backend.model.UserEntity;
import com.flexfolio.backend.repository.PortfolioRepository;
import com.flexfolio.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Create a new portfolio for a user
     */
    public PortfolioEntity createPortfolio(PortfolioEntity portfolio, Long userId) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        portfolio.setUser(user);
        return portfolioRepository.save(portfolio);
    }

    /**
     * Get portfolio by ID
     */
    public Optional<PortfolioEntity> getPortfolioById(Long id) {
        return portfolioRepository.findById(id);
    }

    /**
     * Get all portfolios for a specific user
     */
    public List<PortfolioEntity> getPortfoliosByUserId(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }

    /**
     * Get all portfolios
     */
    public List<PortfolioEntity> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    /**
     * Update portfolio
     */
    public PortfolioEntity updatePortfolio(Long id, PortfolioEntity portfolioDetails) {
        return portfolioRepository.findById(id).map(portfolio -> {
            if (portfolioDetails.getUser() != null) {
                portfolio.setUser(portfolioDetails.getUser());
            }
            return portfolioRepository.save(portfolio);
        }).orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + id));
    }

    /**
     * Delete portfolio by ID
     */
    public void deletePortfolio(Long id) {
        portfolioRepository.deleteById(id);
    }
}

