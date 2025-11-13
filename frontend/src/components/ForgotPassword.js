import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/api';
import './Login.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await authService.forgotPassword({ email });
      setSuccess("Si un compte existe pour cet e-mail, un lien de réinitialisation a été envoyé.");
    } catch (err) {
      setError("Impossible d'envoyer l'e-mail de réinitialisation pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Mot de passe oublié</h2>
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
          {error && <div className="login-error" role="alert">{error}</div>}
          {success && <div className="login-success" role="status">{success}</div>}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Envoi...' : 'Envoyer le lien'}
          </button>
        </form>
        <div className="login-links">
          <Link to="/login" className="login-link">Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;