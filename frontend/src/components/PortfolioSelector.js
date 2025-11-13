import React from 'react';
import {
  Box,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  Typography
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useProfile } from '../context/ProfileContext';

const PortfolioSelector = ({ variant = 'standard', showLabel = true }) => {
  const { portfolios, activePortfolioId, switchPortfolio, activePortfolio } = useProfile();

  const handleChange = (event) => {
    switchPortfolio(event.target.value);
  };

  const getPortfolioStats = (portfolio) => {
    if (!portfolio) return 0;
    const total = 
      (portfolio.experiences?.length || 0) +
      (portfolio.educations?.length || 0) +
      (portfolio.skills?.length || 0) +
      (portfolio.languages?.length || 0);
    return total;
  };

  if (portfolios.length === 1 && !showLabel) {
    return null; // Don't show selector if only one portfolio and label hidden
  }

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth variant={variant} size="small">
        {showLabel && (
          <InputLabel id="portfolio-selector-label">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FolderIcon sx={{ fontSize: 18 }} />
              Portfolio
            </Box>
          </InputLabel>
        )}
        <Select
          labelId="portfolio-selector-label"
          id="portfolio-selector"
          value={activePortfolioId}
          label={showLabel ? "Portfolio" : undefined}
          onChange={handleChange}
          renderValue={(selected) => {
            const portfolio = portfolios.find(p => p.id === selected);
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FolderIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {portfolio?.name}
                </Typography>
                <Chip 
                  label={getPortfolioStats(portfolio)} 
                  size="small" 
                  sx={{ height: 20, fontSize: '0.7rem' }}
                />
              </Box>
            );
          }}
        >
          {portfolios.map((portfolio) => (
            <MenuItem 
              key={portfolio.id} 
              value={portfolio.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FolderIcon sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {portfolio.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {portfolio.experiences?.length || 0} exp. · {portfolio.educations?.length || 0} form. · 
                    {portfolio.skills?.length || 0} comp. · {portfolio.languages?.length || 0} lang.
                  </Typography>
                </Box>
              </Box>
              {portfolio.id === activePortfolioId && (
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PortfolioSelector;
