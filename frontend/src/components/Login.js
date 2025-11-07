import React, { useState } from 'react'; // Import de React et du hook useState pour gérer l'état du formulaire
import { Link, useNavigate } from 'react-router-dom'; // Import de Link pour naviguer et useNavigate pour rediriger
import { authService } from '../services/api'; // Service d'API pour l'authentification
import './Login.css'; // Import de la feuille de styles spécifique à la page de connexion

function Login() { // Déclaration du composant fonctionnel Login
  const [email, setEmail] = useState(''); // État local pour stocker l'adresse mail saisie
  const [password, setPassword] = useState(''); // État local pour stocker le mot de passe saisi
  const [showPassword, setShowPassword] = useState(false); // État local pour afficher/masquer le mot de passe
  const [loading, setLoading] = useState(false); // État local pour indiquer le chargement
  const [error, setError] = useState(null); // État local pour afficher un message d'erreur
  const navigate = useNavigate(); // Hook pour rediriger après une connexion réussie

  const handleSubmit = async (e) => { // Fonction déclenchée à la soumission du formulaire
    e.preventDefault(); // Empêche le rechargement de la page par défaut du formulaire
    setLoading(true); // Active l'état de chargement
    setError(null); // Réinitialise le message d'erreur
    try {
      await authService.login({ email, password }); // Appel à l'API d'authentification
      navigate('/'); // Redirige vers la page d'accueil en cas de succès
    } catch (err) {
      setError("Identifiants invalides ou service indisponible."); // Définit un message d'erreur générique
    } finally {
      setLoading(false); // Désactive l'état de chargement
    }
  }; // Fin de handleSubmit

  return ( // Début du rendu JSX
    <div className="login-container"> {/* Conteneur principal centré */}
      <div className="login-card"> {/* Carte visuelle contenant le formulaire */}
        <div className="login-title"><strong>Login</strong></div>
        <form className="login-form" onSubmit={handleSubmit}> {/* Formulaire de connexion avec gestion de la soumission */}
          <label htmlFor="email" className="login-label">Adresse e-mail</label> {/* Label du champ e-mail */}
          <input
            id="email" // Identifiant unique du champ e-mail
            type="email" // Type e-mail pour validation native du navigateur
            className="login-input" // Classe CSS pour le style
            placeholder="votre.email@domaine.com" // Indication de format attendu
            value={email} // Valeur liée à l'état email
            onChange={(e) => setEmail(e.target.value)} // Met à jour l'état email à chaque frappe
            required // Rend le champ obligatoire
            autoComplete="email" // Active l'autocomplétion du navigateur pour l'e-mail
          /> {/* Fin de l'input e-mail */}

          <label htmlFor="password" className="login-label">Mot de passe</label> {/* Label du champ mot de passe */}
          <div className="password-wrapper"> {/* Conteneur pour le champ et le bouton afficher/masquer */}
            <input
              id="password" // Identifiant unique du champ mot de passe
              type={showPassword ? 'text' : 'password'} // Alterne l'affichage du mot de passe
              className="login-input" // Classe CSS pour le style
              placeholder="Votre mot de passe" // Texte indicatif pour l'utilisateur
              value={password} // Valeur liée à l'état password
              onChange={(e) => setPassword(e.target.value)} // Met à jour l'état password à chaque frappe
              required // Rend le champ obligatoire
              autoComplete="current-password" // Autocomplétion pour mot de passe courant
            /> {/* Fin de l'input mot de passe */}
            <button
              type="button" // Bouton sans soumission du formulaire
              className="toggle-password" // Classe CSS du bouton d'affichage
              onClick={() => setShowPassword((v) => !v)} // Inverse l'état showPassword pour afficher/masquer
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} // Accessibilité
            > {/* Début du bouton afficher/masquer */}
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
              )} {/* Icône dynamique selon l'état */}
            </button> {/* Fin du bouton afficher/masquer */}
          </div> {/* Fin du conteneur mot de passe */}
          {error && <div className="login-error" role="alert">{error}</div>} {/* Message d'erreur si présent */}
        </form> {/* Fin du formulaire */}

        <div className="login-links"> {/* Bloc des liens secondaires */}
          <Link to="/forgot-password" className="login-link">Mot de passe oublié ?</Link> {/* Lien vers la page de réinitialisation */}
        </div> {/* Fin du bloc des liens */}
      </div> {/* Fin de la carte */}
    </div> // Fin du conteneur principal
  ); // Fin du rendu JSX
} // Fin du composant Login

export default Login; // Export du composant pour utilisation dans le routeur
