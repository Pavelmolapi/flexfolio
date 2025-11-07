// Entités et rôles (en mots simples):
// - React: permet d'écrire l'interface.
// - ReactDOM: affiche l'interface dans la page web.
// - App: notre application.
// - root: l'endroit de la page où on met l'application.
// On importe ce dont on a besoin
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// On récupère l'endroit dans la page où l'application va s'afficher
const root = ReactDOM.createRoot(document.getElementById('root'));

// On affiche l'application à l'écran
// (le "mode strict" aide à repérer des soucis pendant le développement)
root.render(
  <React.StrictMode>
    {/* Voici notre application */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
