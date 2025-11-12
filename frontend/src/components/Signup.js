import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }
    
    const result = await signup(email, password);
    
    if (result.success) {
      alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Créer un compte</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-label">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            className="login-input"
            placeholder="votre.email@domaine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label htmlFor="password" className="login-label">Mot de passe</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="login-input"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 3l18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-3.42" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.88 5.08A10.44 10.44 0 0112 5c7 0 10 7 10 7a17.08 17.08 0 01-3.1 4.2M6.1 6.1A17.34 17.34 0 002 12s3 7 10 7a10.62 10.62 0 004.12-.82" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>

          <label htmlFor="confirmPassword" className="login-label">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            className="login-input"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {error && <div className="login-error" role="alert">{error}</div>}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Création...' : 'Créer le compte'}
          </button>
        </form>
        <div className="login-links">
          <Link to="/login" className="login-link">Déjà un compte ? Se connecter</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;