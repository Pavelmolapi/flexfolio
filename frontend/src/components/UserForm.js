import React, { useState } from 'react';
import { userService } from '../services/api';
import './UserForm.css';

function UserForm() {
  // Champs saisis par l'utilisateur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // États techniques (chargement, messages)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswords, setShowPasswords] = useState(false); // Permet d'afficher/masquer les 2 mots de passe

  // Quand on clique sur "Créer": on vérifie les champs puis on envoie au serveur
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // on efface l'ancien message d'erreur
    setSuccess(''); // on efface l'ancien message de succès

    // 1) Vérifications simples du formulaire
    if (!email.trim()) {
      setError('Veuillez renseigner un email.');
      return;
    }
    if (!password.trim() || password.trim().length < 6) {
      setError('Veuillez saisir un mot de passe (6 caractères minimum).');
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      setLoading(true); // 2) On indique que ça travaille
      // 3) Appel au service: on envoie les infos au serveur (ou au mode simulé)
      await userService.createUser({
        email: email.trim(),
        password: password.trim(),
      });
      // 4) Si tout s'est bien passé
      setSuccess('Utilisateur créé avec succès.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      // 5) En cas d'erreur, on affiche un message simple
      console.error('Erreur lors de la création:', err);
      const msg = (err && err.response && err.response.data && err.response.data.message) || err.message || "Échec de la création de l'utilisateur.";
      setError(msg);
    } finally {
      setLoading(false); // 6) On remet l'état "chargement" à faux
    }
  };

  // Petites vérifications pour activer/désactiver le bouton
  const mismatch = confirmPassword && password && password.trim() !== confirmPassword.trim(); // vrai si les 2 mots de passe sont différents
  const emailValid = !!email.trim(); // vrai si l'email n'est pas vide
  const passwordValid = password.trim().length >= 6; // vrai si le mot de passe est assez long
  const isFormValid = emailValid && passwordValid && !mismatch; // le formulaire est prêt si tout est bon

  // Force du mot de passe: très simple (faible/moyenne/forte)
  const getPasswordStrength = (pwd) => {
    const p = pwd.trim();
    let score = 0;
    if (p.length >= 6) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[A-Z]|[^a-zA-Z0-9]/.test(p)) score++;
    if (score <= 1) return { label: 'Faible', cls: 'strength-weak' };
    if (score === 2) return { label: 'Moyenne', cls: 'strength-medium' };
    return { label: 'Forte', cls: 'strength-strong' };
  };
  const strength = getPasswordStrength(password);

  return (
    <div className="user-form">
      {/* Titre de la page */}
      <h2>Créer un utilisateur</h2>

      {/* Zone des messages (affichés seulement s'il y en a) */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Le formulaire à remplir */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemple@domaine.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          {/* On empile le champ, l'indicateur de force et la case juste en dessous */}
          <div className="field-col">
            <input
              id="password"
              type={showPasswords ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6 caractères minimum"
            />
            {/* Indicateur de force (3 points lumineux, juste après le champ) */}
            {password && (
              <div className={`strength-dots ${strength.cls}`} aria-label={`Force du mot de passe: ${strength.label}`}>
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            )}
          </div>
        </div>

        {/* Confirmer le mot de passe */}
        {(() => {
          return (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              {/* On empile le champ et le message juste en dessous */}
              <div className="field-col">
                <input
                  id="confirmPassword"
                  type={showPasswords ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={mismatch ? 'input-error' : ''}
                  placeholder="Retapez le mot de passe"
                />
                {/* Case pour afficher/masquer les mots de passe (contrôle unique pour les 2 champs) */}
                <label className="checkbox" style={{ marginTop: 6 }}>
                  <input
                    type="checkbox"
                    checked={showPasswords}
                    onChange={(e) => setShowPasswords(e.target.checked)}
                  />
                  <span>Afficher les mots de passe</span>
                </label>
                {/* La case pour afficher/masquer est au-dessus (sous le premier champ) */}
                {mismatch && (
                  <div className="field-error">Les mots de passe ne correspondent pas.</div>
                )}
              </div>
            </div>
          );
        })()}

        <div className="actions">
          <div className="actions-left">
            <button
              type="button"
              className="link-button"
              onClick={() => { /* placeholder: single-page form, no navigation */ }}
              disabled={loading}
            >
              Vous avez déjà un compte ?
            </button>
          </div>
          <div className="actions-right">
            {/* Bouton pour envoyer le formulaire (désactivé tant que le formulaire n'est pas valide) */}
            <button type="submit" disabled={loading || !isFormValid}>
              {loading ? 'Création…' : 'Créer'}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => { setEmail(''); setPassword(''); setConfirmPassword(''); setError(''); setSuccess(''); }} // Bouton pour tout effacer
              disabled={loading}
            >
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
