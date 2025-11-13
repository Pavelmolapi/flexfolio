/**
 * Utility functions to convert between frontend period formats and backend date formats
 * 
 * Frontend format: "2020 - Présent" or "2020 - 2022"
 * Backend format: { startDate: "2020-01-01", endDate: "2022-12-31" | null, ongoing: true | false }
 */

/**
 * Convert backend date format to frontend period string
 * @param {string} startDate - ISO date string (YYYY-MM-DD)
 * @param {string|null} endDate - ISO date string (YYYY-MM-DD) or null
 * @param {boolean} ongoing - Whether the position/education is ongoing
 * @returns {string} Period string like "2020 - Présent" or "2020 - 2022"
 */
export const formatPeriod = (startDate, endDate, ongoing) => {
  if (!startDate) return '';
  
  const startYear = new Date(startDate).getFullYear();
  
  if (ongoing || !endDate) {
    return `${startYear} - Présent`;
  }
  
  const endYear = new Date(endDate).getFullYear();
  return `${startYear} - ${endYear}`;
};

/**
 * Convert frontend period string to backend date format
 * @param {string} period - Period string like "2020 - Présent" or "2020 - 2022"
 * @returns {object} { startDate: string, endDate: string|null, ongoing: boolean }
 */
export const parsePeriod = (period) => {
  if (!period) {
    return { startDate: null, endDate: null, ongoing: false };
  }

  const parts = period.split('-').map(p => p.trim());
  
  if (parts.length < 2) {
    // Invalid format, return current year
    const currentYear = new Date().getFullYear();
    return {
      startDate: `${currentYear}-01-01`,
      endDate: null,
      ongoing: true
    };
  }

  const startYear = parts[0];
  const endPart = parts[1].toLowerCase();
  
  const startDate = `${startYear}-01-01`;
  
  // Check if ongoing (Présent, Present, present, Actuel, actuel, etc.)
  const ongoingKeywords = ['présent', 'present', 'actuel', 'actuellement', 'now', 'current'];
  const isOngoing = ongoingKeywords.some(keyword => endPart.includes(keyword.toLowerCase()));
  
  if (isOngoing) {
    return {
      startDate,
      endDate: null,
      ongoing: true
    };
  }
  
  // Parse end year
  const endYear = parts[1];
  const endDate = `${endYear}-12-31`;
  
  return {
    startDate,
    endDate,
    ongoing: false
  };
};

/**
 * Format location from city and country
 * @param {string} city 
 * @param {string} country 
 * @returns {string} "City, Country" or just "City" or "Country"
 */
export const formatLocation = (city, country) => {
  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;
  return '';
};

/**
 * Parse location string into city and country
 * @param {string} location - "City, Country" or "City"
 * @returns {object} { city: string, country: string }
 */
export const parseLocation = (location) => {
  if (!location) return { city: '', country: '' };
  
  const parts = location.split(',').map(p => p.trim());
  
  if (parts.length >= 2) {
    return {
      city: parts[0],
      country: parts[1]
    };
  }
  
  // If no comma, assume it's a city
  return {
    city: parts[0],
    country: ''
  };
};

/**
 * Format a date for display in French format
 * @param {string} isoDate - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date like "15 janvier 2020"
 */
export const formatDate = (isoDate) => {
  if (!isoDate) return '';
  
  const date = new Date(isoDate);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get current date in ISO format
 * @returns {string} Current date as YYYY-MM-DD
 */
export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
