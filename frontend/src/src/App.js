import React from 'react';
import './App.css';
import PortfolioHub from './components/PortfolioHub';
import UserForm from './components/UserForm';
import { Routes, Route } from 'react-router-dom';

// Entités et rôles (en mots simples):
// - React: permet d'écrire l'interface.
// - PortfolioHub: une page simple avec 2 boutons (voir/ajouter un portfolio).
// - UserForm: la page pour créer un utilisateur.
// - Routes/Route: définissent les adresses /user et /portfolio.
// - App: la page principale qui affiche un titre et le contenu.
// - header / main: le haut de la page et la zone de contenu.
// C'est le composant principal de notre application
function App() {
  return (
    <div className="App">
      {/* Haut de la page (le bandeau avec le titre) */}
      <header className="App-header">
        <h1>FlexFolio</h1>
      </header>
      {/* Le contenu principal de la page */}
      <main className="App-main">
        {/* Ici, on choisit quoi afficher selon l'adresse */}
        <Routes>
          {/* Accueil: la page avec 2 boutons (portfolio) */}
          <Route path="/" element={<PortfolioHub />} />
          {/* Page portfolio simple */}
          <Route path="/portfolio" element={<PortfolioHub />} />
          {/* Page de création d'utilisateur */}
          <Route path="/user" element={<UserForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
