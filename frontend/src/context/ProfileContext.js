import { createContext, useContext, useState, useEffect } from 'react';
import { portfolioService } from '../services/api';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  // Migrate legacy data if needed
  useEffect(() => {
    const migrateOldData = () => {
      // Check if old structure exists
      const oldExperiences = localStorage.getItem('experiences');
      const oldEducations = localStorage.getItem('educations');
      const oldSkills = localStorage.getItem('skills');
      const oldLanguages = localStorage.getItem('languages');
      
      // If old data exists and no new portfolios structure
      if ((oldExperiences || oldEducations || oldSkills || oldLanguages) && !localStorage.getItem('portfolios')) {
        console.log('Migrating old localStorage data to new portfolio structure...');
        
        const portfolio = {
          id: 1,
          name: 'Portfolio Principal',
          experiences: oldExperiences ? JSON.parse(oldExperiences) : [],
          educations: oldEducations ? JSON.parse(oldEducations) : [],
          skills: oldSkills ? JSON.parse(oldSkills) : [],
          languages: oldLanguages ? JSON.parse(oldLanguages) : []
        };
        
        localStorage.setItem('portfolios', JSON.stringify([portfolio]));
        localStorage.setItem('activePortfolioId', '1');
        
        // Clean up old keys
        localStorage.removeItem('experiences');
        localStorage.removeItem('educations');
        localStorage.removeItem('skills');
        localStorage.removeItem('languages');
        
        console.log('Migration complete!');
      }
    };
    
    migrateOldData();
  }, []);

  // Profile data (localStorage only - NOT synced with backend)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('profile');
    return saved ? JSON.parse(saved) : {
      fullName: 'John Doe',
      jobTitle: 'Développeur Full Stack',
      email: 'john.doe@example.com',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      about: 'Développeur passionné avec 5 ans d\'expérience dans le développement web et mobile.',
      profileImage: 'https://i.pravatar.cc/150?img=12',
      socialLinks: {
        github: 'https://github.com/username',
        linkedin: 'https://linkedin.com/in/username',
        twitter: 'https://twitter.com/username'
      }
    };
  });

  // Portfolios list (each portfolio contains experiences, educations, skills, languages)
  const [portfolios, setPortfolios] = useState(() => {
    const saved = localStorage.getItem('portfolios');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure all portfolios have valid IDs
          const validatedPortfolios = parsed.map((p, index) => ({
            ...p,
            id: p.id || p.backendId || (index + 1),
            // Preserve backendId if it exists
            backendId: p.backendId,
            name: p.name || `Portfolio ${index + 1}`,
            experiences: p.experiences || [],
            educations: p.educations || [],
            skills: p.skills || [],
            languages: p.languages || []
          }));
          console.log('📦 Loaded portfolios from localStorage:', validatedPortfolios);
          return validatedPortfolios;
        }
      } catch (e) {
        console.error('Error parsing portfolios from localStorage:', e);
      }
    }
    return [
      { id: 1, name: 'Portfolio Principal', experiences: [], educations: [], skills: [], languages: [] }
    ];
  });

  // Active portfolio ID
  const [activePortfolioId, setActivePortfolioId] = useState(() => {
    const saved = localStorage.getItem('activePortfolioId');
    if (saved) {
      const parsed = parseInt(saved);
      return !isNaN(parsed) ? parsed : 1;
    }
    return 1;
  });

  // Get active portfolio
  const activePortfolio = portfolios.find(p => p.id === activePortfolioId) || portfolios[0];

  // Ensure activePortfolioId is always valid
  useEffect(() => {
    if (portfolios.length === 0) {
      console.error('⚠️ No portfolios in state! Creating default portfolio...');
      const defaultPortfolio = {
        id: 1,
        name: 'Portfolio Principal',
        experiences: [],
        educations: [],
        skills: [],
        languages: []
      };
      setPortfolios([defaultPortfolio]);
      setActivePortfolioId(1);
      return;
    }
    
    // Validate all portfolios have IDs
    const invalidPortfolios = portfolios.filter(p => p.id == null);
    if (invalidPortfolios.length > 0) {
      console.error('⚠️ Found portfolios with invalid IDs:', invalidPortfolios);
      // Fix portfolios by assigning IDs
      const fixedPortfolios = portfolios.map((p, index) => ({
        ...p,
        id: p.id || p.backendId || Date.now() + index,
        name: p.name || `Portfolio ${index + 1}`
      }));
      console.log('✅ Fixed portfolios:', fixedPortfolios);
      setPortfolios(fixedPortfolios);
    }
    
    if (portfolios.length > 0 && !portfolios.find(p => p.id === activePortfolioId)) {
      // If active portfolio doesn't exist, switch to first portfolio
      console.log('⚠️ Active portfolio not found, switching to first portfolio');
      setActivePortfolioId(portfolios[0]?.id || 1);
    }
  }, [portfolios, activePortfolioId]);

  // Experiences array (from active portfolio)
  const experiences = activePortfolio?.experiences || [];
  const setExperiences = (newExperiences) => {
    setPortfolios(prev => prev.map(p => 
      p.id === activePortfolioId 
        ? { ...p, experiences: typeof newExperiences === 'function' ? newExperiences(p.experiences) : newExperiences }
        : p
    ));
  };

  // Educations array (from active portfolio)
  const educations = activePortfolio?.educations || [];
  const setEducations = (newEducations) => {
    setPortfolios(prev => prev.map(p => 
      p.id === activePortfolioId 
        ? { ...p, educations: typeof newEducations === 'function' ? newEducations(p.educations) : newEducations }
        : p
    ));
  };

  // Skills array (from active portfolio)
  const skills = activePortfolio?.skills || [];
  const setSkills = (newSkills) => {
    setPortfolios(prev => prev.map(p => 
      p.id === activePortfolioId 
        ? { ...p, skills: typeof newSkills === 'function' ? newSkills(p.skills) : newSkills }
        : p
    ));
  };

  // Languages array (from active portfolio)
  const languages = activePortfolio?.languages || [];
  const setLanguages = (newLanguages) => {
    setPortfolios(prev => prev.map(p => 
      p.id === activePortfolioId 
        ? { ...p, languages: typeof newLanguages === 'function' ? newLanguages(p.languages) : newLanguages }
        : p
    ));
  };

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    // Validate portfolios before saving
    const validPortfolios = portfolios.filter(p => p.id != null);
    if (validPortfolios.length !== portfolios.length) {
      console.error('⚠️ Found portfolios with invalid IDs, filtering them out');
    }
    
    console.log('💾 Saving portfolios to localStorage:', validPortfolios);
    localStorage.setItem('portfolios', JSON.stringify(validPortfolios));
  }, [portfolios]);

  useEffect(() => {
    if (activePortfolioId !== undefined && activePortfolioId !== null) {
      localStorage.setItem('activePortfolioId', activePortfolioId.toString());
    }
  }, [activePortfolioId]);

  // Load user's portfolios from backend on mount
  useEffect(() => {
    const loadPortfoliosFromBackend = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.userId) {
          console.log('No user logged in, skipping backend portfolio load');
          return; // No user logged in
        }
        
        console.log('Loading portfolios from backend for user:', user.userId);
        
        // Fetch user's portfolios from backend
        const response = await portfolioService.getUserPortfolios(user.userId);
        const backendPortfolios = response.data;
        
        if (backendPortfolios && backendPortfolios.length > 0) {
          // Transform backend portfolios to local format
          const transformedPortfolios = backendPortfolios.map(p => {
            // Backend can return either 'idPort' or 'id' depending on the endpoint
            const portfolioId = p.idPort || p.id;
            if (!portfolioId) {
              console.error('⚠️ Portfolio from backend missing ID:', p);
            }
            return {
              id: portfolioId,
              backendId: portfolioId, // Keep backend ID for API calls
              name: p.name || 'Portfolio',
              experiences: p.experiences || [],
              educations: p.educations || [],
              skills: [], // Skills not in backend yet
              languages: [] // Languages not in backend yet
            };
          }).filter(p => p.id != null); // Filter out portfolios without valid IDs
          
          console.log('✅ Transformed backend portfolios:', transformedPortfolios);
          setPortfolios(transformedPortfolios);
          
          // Set active portfolio to first one if current doesn't exist
          if (!transformedPortfolios.find(p => p.id === activePortfolioId)) {
            setActivePortfolioId(transformedPortfolios[0].id);
          }
          
          console.log('Loaded', transformedPortfolios.length, 'portfolios from backend');
        }
      } catch (error) {
        console.error('Error loading portfolios from backend:', error);
        // Continue with localStorage data
      }
    };
    
    loadPortfoliosFromBackend();
  }, []); // Run once on mount

  const updateProfile = (newData) => {
    const updated = { ...profile, ...newData };
    setProfile(updated);
  };

  // Portfolio management functions (with backend sync)
  const createPortfolio = async (name) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (user.userId) {
        // Create portfolio in backend with name
        const portfolioData = {
          name: name || `Portfolio ${portfolios.length + 1}`
        };
        
        const response = await portfolioService.createPortfolio(user.userId, portfolioData);
        const backendPortfolio = response.data;
        
        // Backend can return either 'idPort' or 'id' depending on the endpoint
        const portfolioId = backendPortfolio.idPort || backendPortfolio.id;
        
        // Transform to local format
        const newPortfolio = {
          id: portfolioId,
          backendId: portfolioId,
          name: backendPortfolio.name || name || `Portfolio ${portfolios.length + 1}`,
          experiences: backendPortfolio.experiences || [],
          educations: backendPortfolio.educations || [],
          skills: [], // Skills not in backend yet
          languages: [] // Languages not in backend yet
        };
        
        setPortfolios(prev => [...prev, newPortfolio]);
        setActivePortfolioId(newPortfolio.id);
        console.log('Portfolio created in backend:', newPortfolio);
        return newPortfolio;
      } else {
        // Fallback to local only
        const newPortfolio = {
          id: Date.now(),
          name: name || `Portfolio ${portfolios.length + 1}`,
          experiences: [],
          educations: [],
          skills: [],
          languages: []
        };
        setPortfolios(prev => [...prev, newPortfolio]);
        setActivePortfolioId(newPortfolio.id);
        return newPortfolio;
      }
    } catch (error) {
      console.error('Error creating portfolio:', error);
      alert('Erreur lors de la création du portfolio. Vérifiez que le backend est démarré.');
      // Fallback to local only
      const newPortfolio = {
        id: Date.now(),
        name: name || `Portfolio ${portfolios.length + 1}`,
        experiences: [],
        educations: [],
        skills: [],
        languages: []
      };
      setPortfolios(prev => [...prev, newPortfolio]);
      setActivePortfolioId(newPortfolio.id);
      return newPortfolio;
    }
  };

  const updatePortfolio = async (id, updates) => {
    try {
      const portfolio = portfolios.find(p => p.id === id);
      const backendId = portfolio?.backendId || id;
      
      // Update in backend
      await portfolioService.updatePortfolio(backendId, updates);
      
      // Update local state
      setPortfolios(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    } catch (error) {
      console.error('Error updating portfolio:', error);
      // Fallback to local only
      setPortfolios(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }
  };

  const deletePortfolio = (id) => {
    console.log('🗑️ DELETE PORTFOLIO CALLED with id:', id);
    console.log('📊 Current portfolios:', portfolios);
    console.log('📊 Portfolios length:', portfolios.length);
    
    if (portfolios.length === 1) {
      console.log('❌ Cannot delete - only one portfolio left');
      alert('Vous devez avoir au moins un portfolio');
      return;
    }
    
    const portfolio = portfolios.find(p => p.id === id);
    console.log('📁 Found portfolio to delete:', portfolio);
    
    if (!portfolio) {
      console.error('❌ Portfolio not found with id:', id);
      alert('Portfolio introuvable');
      return;
    }
    
    // Use backendId if available, otherwise try to use id as backendId
    const backendId = portfolio.backendId || (typeof portfolio.id === 'number' && portfolio.id > 1000 ? portfolio.id : null);
    console.log('🔑 Backend ID:', backendId);
    
    // Update local state immediately for better UX
    const updatedPortfolios = portfolios.filter(p => p.id !== id);
    console.log('📝 Updated portfolios (after filter):', updatedPortfolios);
    console.log('📝 Updated portfolios length:', updatedPortfolios.length);
    
    setPortfolios(updatedPortfolios);
    console.log('✅ setPortfolios called');
    
    // Switch to another portfolio if we deleted the active one
    if (activePortfolioId === id && updatedPortfolios.length > 0) {
      console.log('🔄 Switching active portfolio from', id, 'to', updatedPortfolios[0].id);
      setActivePortfolioId(updatedPortfolios[0].id);
    }
    
    // Delete from backend in background (fire and forget)
    if (backendId) {
      console.log('🌐 Deleting from backend with ID:', backendId);
      portfolioService.deletePortfolio(backendId)
        .then(() => {
          console.log('✅ Portfolio deleted from backend successfully');
        })
        .catch((error) => {
          console.error('❌ Error deleting portfolio from backend:', error);
          // Don't show alert here as the local deletion already happened
        });
    } else {
      console.log('⚠️ No backendId - skipping backend deletion (local-only portfolio)');
    }
    
    console.log('🏁 deletePortfolio function completed');
  };

  const switchPortfolio = (id) => {
    setActivePortfolioId(id);
  };

  // Experience management functions (with backend sync)
  const addExperience = async (experience) => {
    try {
      // Get the backend portfolio ID for the active portfolio
      const portfolioId = activePortfolio?.backendId || activePortfolio?.id;
      
      // Check if portfolio has a valid backend ID
      // A portfolio is synced if it has a backendId (not undefined/null)
      if (!portfolioId) {
        console.warn('Portfolio has no valid ID');
        alert('Le portfolio n\'a pas d\'identifiant valide. Veuillez créer un nouveau portfolio.');
        throw new Error('Portfolio has no valid ID');
      }
      
      // Check if this is a local-only portfolio (created with Date.now(), so very large ID without backendId)
      if (!activePortfolio?.backendId && portfolioId > 1000000000000) {
        console.warn('Portfolio not synced with backend (local-only portfolio with timestamp ID)');
        alert('Le portfolio n\'est pas synchronisé avec le backend. Veuillez créer un nouveau portfolio via l\'interface Admin.');
        throw new Error('Portfolio not synced with backend');
      }
      
      console.log('Adding experience to portfolio:', portfolioId, experience);
      
      // Call backend API
      const response = await portfolioService.createExperience(portfolioId, experience);
      const newExperience = response.data;
      
      console.log('Experience created in backend:', newExperience);
      
      // Update local state with backend response ONLY on success
      setExperiences(prev => [...prev, newExperience]);
      return newExperience;
    } catch (error) {
      console.error('Error adding experience:', error);
      
      // Show specific error message
      if (error.response?.status === 403) {
        alert('Accès refusé. Veuillez vous reconnecter.');
      } else if (error.response?.status === 404) {
        alert('Portfolio introuvable dans le backend. Veuillez créer un nouveau portfolio.');
      } else if (error.message === 'Portfolio not synced with backend' || error.message === 'Portfolio has no valid ID') {
        // Already shown alert above
      } else {
        alert('Erreur lors de l\'ajout de l\'expérience. Vérifiez que le backend est démarré et que vous êtes connecté.');
      }
      
      // DO NOT add to local state on error
      throw error; // Re-throw to prevent form from closing
    }
  };

  const updateExperience = async (idExp, updates) => {
    try {
      console.log('Updating experience:', idExp, updates);
      
      // Call backend API
      const response = await portfolioService.updateExperience(idExp, updates);
      const updatedExperience = response.data;
      
      console.log('Experience updated in backend:', updatedExperience);
      
      // Update local state with backend response ONLY on success
      setExperiences(prev => 
        prev.map(exp => exp.idExp === idExp ? updatedExperience : exp)
      );
    } catch (error) {
      console.error('Error updating experience:', error);
      
      // Show specific error message
      if (error.response?.status === 403) {
        alert('Accès refusé. Veuillez vous reconnecter.');
      } else if (error.response?.status === 404) {
        alert('Expérience introuvable dans le backend.');
      } else {
        alert('Erreur lors de la mise à jour de l\'expérience. Vérifiez que le backend est démarré et que vous êtes connecté.');
      }
      
      throw error; // Re-throw to prevent form from closing
    }
  };

  const deleteExperience = async (idExp) => {
    try {
      console.log('Deleting experience:', idExp);
      
      // Call backend API
      await portfolioService.deleteExperience(idExp);
      
      console.log('Experience deleted from backend');
      
      // Update local state ONLY on success
      setExperiences(prev => prev.filter(exp => exp.idExp !== idExp));
    } catch (error) {
      console.error('Error deleting experience:', error);
      
      // Show specific error message
      if (error.response?.status === 403) {
        alert('Accès refusé. Veuillez vous reconnecter.');
      } else if (error.response?.status === 404) {
        alert('Expérience introuvable dans le backend.');
      } else {
        alert('Erreur lors de la suppression de l\'expérience. Vérifiez que le backend est démarré et que vous êtes connecté.');
      }
      
      throw error; // Re-throw to prevent action completion
    }
  };

  // Education management functions (with backend sync)
  const addEducation = async (education) => {
    try {
      // Get the backend portfolio ID for the active portfolio
      const portfolioId = activePortfolio?.backendId || activePortfolio?.id;
      
      // Check if portfolio has a valid backend ID
      // A portfolio is synced if it has a backendId (not undefined/null)
      if (!portfolioId) {
        console.warn('Portfolio has no valid ID');
        alert('Le portfolio n\'a pas d\'identifiant valide. Veuillez créer un nouveau portfolio.');
        throw new Error('Portfolio has no valid ID');
      }
      
      // Check if this is a local-only portfolio (created with Date.now(), so very large ID without backendId)
      if (!activePortfolio?.backendId && portfolioId > 1000000000000) {
        console.warn('Portfolio not synced with backend (local-only portfolio with timestamp ID)');
        alert('Le portfolio n\'est pas synchronisé avec le backend. Veuillez créer un nouveau portfolio via l\'interface Admin.');
        throw new Error('Portfolio not synced with backend');
      }
      
      console.log('Adding education to portfolio:', portfolioId, education);
      
      // Call backend API
      const response = await portfolioService.createEducation(portfolioId, education);
      const newEducation = response.data;
      
      console.log('Education created in backend:', newEducation);
      
      // Update local state with backend response ONLY on success
      setEducations(prev => [...prev, newEducation]);
      return newEducation;
    } catch (error) {
      console.error('Error adding education:', error);
      
      // Show specific error message
      if (error.response?.status === 403) {
        alert('Accès refusé. Veuillez vous reconnecter.');
      } else if (error.response?.status === 404) {
        alert('Portfolio introuvable dans le backend. Veuillez créer un nouveau portfolio.');
      } else if (error.message === 'Portfolio not synced with backend' || error.message === 'Portfolio has no valid ID') {
        // Already shown alert above
      } else {
        alert('Erreur lors de l\'ajout de la formation. Vérifiez que le backend est démarré et que vous êtes connecté.');
      }
      
      // DO NOT add to local state on error
      throw error; // Re-throw to prevent form from closing
    }
  };

  const updateEducation = async (idEdu, updates) => {
    try {
      console.log('Updating education:', idEdu, updates);
      
      // Call backend API
      const response = await portfolioService.updateEducation(idEdu, updates);
      const updatedEducation = response.data;
      
      console.log('Education updated in backend:', updatedEducation);
      
      // Update local state with backend response ONLY on success
      setEducations(prev => 
        prev.map(edu => edu.idEdu === idEdu ? updatedEducation : edu)
      );
    } catch (error) {
      console.error('Error updating education:', error);
      
      // Show specific error message
      if (error.response?.status === 403) {
        alert('Accès refusé. Veuillez vous reconnecter.');
      } else if (error.response?.status === 404) {
        alert('Formation introuvable dans le backend.');
      } else {
        alert('Erreur lors de la mise à jour de la formation. Vérifiez que le backend est démarré et que vous êtes connecté.');
      }
      
      throw error; // Re-throw to prevent form from closing
    }
  };

  const deleteEducation = async (idEdu) => {
    try {
      console.log('Deleting education:', idEdu);
      
      // Call backend API
      await portfolioService.deleteEducation(idEdu);
      
      console.log('Education deleted from backend');
      
      // Update local state ONLY on success
      setEducations(prev => prev.filter(edu => edu.idEdu !== idEdu));
    } catch (error) {
      console.error('Error deleting education:', error);
      
      // Show specific error message
      if (error.response?.status === 403) {
        alert('Accès refusé. Veuillez vous reconnecter.');
      } else if (error.response?.status === 404) {
        alert('Formation introuvable dans le backend.');
      } else {
        alert('Erreur lors de la suppression de la formation. Vérifiez que le backend est démarré et que vous êtes connecté.');
      }
      
      throw error; // Re-throw to prevent action completion
    }
  };

  // Skill management functions (localStorage only)
  const addSkill = (skill) => {
    const newSkill = { ...skill, id: Date.now() };
    setSkills(prev => [...prev, newSkill]);
    return newSkill;
  };

  const updateSkill = (id, updates) => {
    setSkills(prev => 
      prev.map(skill => skill.id === id ? { ...skill, ...updates } : skill)
    );
  };

  const deleteSkill = (id) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  // Language management functions (localStorage only)
  const addLanguage = (language) => {
    const newLanguage = { ...language, id: Date.now() };
    setLanguages(prev => [...prev, newLanguage]);
    return newLanguage;
  };

  const updateLanguage = (id, updates) => {
    setLanguages(prev => 
      prev.map(lang => lang.id === id ? { ...lang, ...updates } : lang)
    );
  };

  const deleteLanguage = (id) => {
    setLanguages(prev => prev.filter(lang => lang.id !== id));
  };

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      updateProfile,
      // Portfolio management
      portfolios,
      activePortfolioId,
      activePortfolio,
      createPortfolio,
      updatePortfolio,
      deletePortfolio,
      switchPortfolio,
      // Current portfolio data
      experiences,
      educations,
      addExperience,
      updateExperience,
      deleteExperience,
      addEducation,
      updateEducation,
      deleteEducation,
      // localStorage-only data
      skills,
      languages,
      addSkill,
      updateSkill,
      deleteSkill,
      addLanguage,
      updateLanguage,
      deleteLanguage
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
