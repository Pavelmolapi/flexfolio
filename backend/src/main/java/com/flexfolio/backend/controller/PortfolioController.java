package com.flexfolio.backend.controller;

import com.flexfolio.backend.dto.PortfolioDto;
import com.flexfolio.backend.model.PortfolioEntity;
import com.flexfolio.backend.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    /**
     * Create a new portfolio for a user
     */
    @PostMapping("/{userId}")
    public ResponseEntity<PortfolioDto> createPortfolio(@PathVariable Long userId, @RequestBody PortfolioEntity portfolio) {
        try {
            PortfolioDto createdPortfolio = portfolioService.createPortfolio(portfolio, userId);
            return new ResponseEntity<>(createdPortfolio, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Get portfolio by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<PortfolioDto> getPortfolioById(@PathVariable Long id) {
        return portfolioService.getPortfolioById(id)
            .map(portfolio -> new ResponseEntity<>(portfolio, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Get all portfolios for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PortfolioDto>> getPortfoliosByUserId(@PathVariable Long userId) {
        List<PortfolioDto> portfolios = portfolioService.getPortfoliosByUserId(userId);
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }

    /**
     * Get all portfolios
     */
    @GetMapping
    public ResponseEntity<List<PortfolioDto>> getAllPortfolios() {
        List<PortfolioDto> portfolios = portfolioService.getAllPortfolios();
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }

    /**
     * Update portfolio
     */
    @PutMapping("/{id}")
    public ResponseEntity<PortfolioDto> updatePortfolio(@PathVariable Long id, @RequestBody PortfolioEntity portfolioDetails) {
        try {
            PortfolioDto updatedPortfolio = portfolioService.updatePortfolio(id, portfolioDetails);
            return new ResponseEntity<>(updatedPortfolio, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Delete portfolio
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


