import React from 'react';
import { Link } from 'react-router-dom';

// Entités et rôles (en mots simples):
// - Cette page: un écran simple avec 2 boutons.
// - Bouton "Voir": mène vers la liste des portfolios.
// - Bouton "Ajouter": mène vers la page pour créer un portfolio.
// Objectif: proposer un choix simple à l'utilisateur
function PortfolioHub() {
  return (
    <div style={{ maxWidth: 600, margin: '30px auto', padding: 16, textAlign: 'center' }}>
      {/* Titre de la page */}
      <h2>Portfolios</h2>
      {/* Zone contenant les 2 boutons */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
        {/* Bouton pour afficher les portfolios existants */}
        <Link to="/portfolios" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 16px', cursor: 'pointer' }}>Afficher les portfolios</button>
        </Link>
        {/* Bouton pour ajouter un nouveau portfolio */}
        <Link to="/portfolios/add" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 16px', cursor: 'pointer' }}>Ajouter un portfolio</button>
        </Link>
      </div>
    </div>
  );
}

export default PortfolioHub;
