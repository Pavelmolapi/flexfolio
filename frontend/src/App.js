import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUser, FiBriefcase, FiMail, FiGithub, FiLinkedin, FiSettings } from 'react-icons/fi';
import { Box, Container } from '@mui/material';
import './App.css';
import AdminDashboard from './components/Admin/AdminDashboard';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import { ProfileProvider, useProfile } from './context/ProfileContext';

// Composant pour le contenu de l'application
const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { profile } = useProfile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`app ${isMenuOpen ? 'menu-open' : ''}`}>
      {/* Bouton du menu mobile */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Menu latéral */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="profile-picture">
            <img 
              src={profile.profileImage || '/profile.jpg'} 
              alt={profile.fullName || 'Photo de profil'}
              onError={(e) => {e.target.onerror = null; e.target.src='https://via.placeholder.com/150'}}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
          <h2>{profile.fullName || 'Votre Nom'}</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            {profile.jobTitle || 'Poste'}
          </p>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/about" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            <FiUser className="nav-icon" />
            <span>À propos</span>
          </Link>
          <Link to="/portfolio" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            <FiBriefcase className="nav-icon" />
            <span>Portfolio</span>
          </Link>
          <Link to="/contact" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            <FiMail className="nav-icon" />
            <span>Contact</span>
          </Link>
          <Link to="/admin" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            <FiSettings className="nav-icon" />
            <span>Admin</span>
          </Link>
        </nav>
        
        <div className="social-links">
          <a href={profile.socialLinks?.github || 'https://github.com'} target="_blank" rel="noopener noreferrer">
            <FiGithub />
          </a>
          <a href={profile.socialLinks?.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer">
            <FiLinkedin />
          </a>
        </div>
      </aside>

      <main className="main-content">
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
};

// Composant App principal qui enveloppe tout avec le Provider
function App() {
  return (
    <ProfileProvider>
      <Router>
        <AppContent />
      </Router>
    </ProfileProvider>
  );
}

export default App;