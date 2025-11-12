import { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('profile');
    return saved ? JSON.parse(saved) : {
      fullName: 'John Doe',
      jobTitle: 'Développeur Full Stack',
      email: 'john.doe@example.com',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      about: 'Développeur passionné avec 5 ans d\'expérience dans le développement web et mobile.',
      profileImage: 'https://via.placeholder.com/150',
      socialLinks: {
        github: 'https://github.com/username',
        linkedin: 'https://linkedin.com/in/username',
        twitter: 'https://twitter.com/username'
      },
      portfolios: []
    };
  });

  // Charger les portfolios depuis le localStorage au démarrage
  const [portfolios, setPortfolios] = useState(() => {
    const saved = localStorage.getItem('portfolios');
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarder les portfolios dans le localStorage lorsqu'ils changent
  useEffect(() => {
    localStorage.setItem('portfolios', JSON.stringify(portfolios));
  }, [portfolios]);

  const updateProfile = (newData) => {
    const updated = { ...profile, ...newData };
    setProfile(updated);
    localStorage.setItem('profile', JSON.stringify(updated));
  };

  // Fonctions pour gérer les portfolios
  const addPortfolioItem = (item) => {
    const newItem = { ...item, id: Date.now() };
    setPortfolios(prev => [...prev, newItem]);
    return newItem;
  };

  const updatePortfolioItem = (id, updates) => {
    setPortfolios(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  const deletePortfolioItem = (id) => {
    setPortfolios(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      updateProfile,
      portfolios,
      addPortfolioItem,
      updatePortfolioItem,
      deletePortfolioItem
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
