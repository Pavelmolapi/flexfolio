import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../services/api';

// Entités et rôles (en mots simples):
// - userService: les fonctions pour récupérer les utilisateurs.
// - users: la liste des utilisateurs à afficher.
// - loading: indique si on est en train de charger.
// - error: le message si quelque chose ne va pas.
// - fetchUsers: va chercher les utilisateurs.
// - useEffect: lance fetchUsers quand la page s'ouvre.
// - Link: bouton/lien pour aller vers la page de création.
// Objectif du fichier: afficher simplement la liste des utilisateurs récupérée du serveur
// Cette page montre la liste des utilisateurs
function UserList() {
  // États affichés à l'écran
  // - users: la liste récupérée
  // - loading: vrai pendant le chargement
  // - error: texte à montrer si un problème arrive
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // On va chercher les utilisateurs (auprès du serveur ou du mode simulé)
  const fetchUsers = async () => {
    try {
      setLoading(true); // 1) on affiche "chargement"
      const res = await userService.getAllUsers(); // 2) on demande la liste au service
      setUsers(res.data || []); // 3) on met à jour la liste (ou une liste vide)
      setError(''); // 4) on efface un éventuel message d'erreur précédent
    } catch (e) {
      console.error(e); // en cas de souci, on loggue pour le développeur
      setError('Impossible de récupérer les utilisateurs. Lance le backend sur 8080.'); // message simple pour l'utilisateur
    } finally {
      setLoading(false); // 5) quoi qu'il arrive, on arrête l'état "chargement"
    }
  };

  // On lance la récupération des données quand la page s'ouvre
  useEffect(() => {
    fetchUsers(); // appelé une seule fois au montage du composant
  }, []);

  // Affichages spéciaux pendant le chargement ou en cas d'erreur
  if (loading) return <div>Chargement…</div>;
  if (error) return <div style={{ color: '#d32f2f' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', padding: 10 }}>
      {/* Bandeau en haut de la liste: titre + lien pour créer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Titre et bouton pour aller créer un utilisateur */}
        <h2>Utilisateurs</h2>
        <Link to="/add-user" style={{ textDecoration: 'none' }}>➕ Créer</Link>
      </div>
      {users.length === 0 ? (
        // Message si la liste est vide
        <div>Aucun utilisateur. Créez-en un.</div>
      ) : (
        // Tableau avec les informations principales
        <table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {/* Colonnes du tableau */}
              <th align="left">ID</th>
              <th align="left">Nom</th>
              <th align="left">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              // Une ligne par utilisateur
              <tr key={u.id} style={{ borderTop: '1px solid #eee' }}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
