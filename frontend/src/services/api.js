import axios from 'axios';

const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';
// Prefer env var; otherwise use relative path so CRA proxy can handle it in dev
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Request Interceptor - Ajoute le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios Response Interceptor - Gère les erreurs d'authentification
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide - déconnecter l'utilisateur
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// On définit des fonctions qui parlent au vrai serveur
const realUserService = {
  getAllUsers: () => api.get('/users'), // Demande la liste de tous les utilisateurs
  getUserById: (id) => api.get(`/users/${id}`), // Demande les infos d'un utilisateur précis
  createUser: (user) => api.post('/users', user), // Demande de créer un nouvel utilisateur
  updateUser: (id, user) => api.put(`/users/${id}`, user), // Demande de modifier un utilisateur
  deleteUser: (id) => api.delete(`/users/${id}`), // Demande de supprimer un utilisateur
};

// On a aussi un mode "simulé" (sans vrai serveur), stocké dans le navigateur
const LS_KEY = 'ff_users'; // Nom utilisé pour sauvegarder dans le navigateur
// Petites aides pour lire/écrire et attendre un peu (comme un vrai réseau)
const readUsers = () => { // Lire la liste des utilisateurs depuis le navigateur
  try {
    const raw = localStorage.getItem(LS_KEY); // On récupère ce qui est stocké
    return raw ? JSON.parse(raw) : []; // On transforme le texte en liste, sinon liste vide
  } catch (_) {
    return []; // Si problème, on renvoie une liste vide
  }
};
const writeUsers = (users) => { // Écrire la liste d'utilisateurs dans le navigateur
  localStorage.setItem(LS_KEY, JSON.stringify(users)); // On transforme en texte et on sauvegarde
};
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms)); // Petite attente pour faire comme si le réseau prenait du temps

const mockUserService = { // Les mêmes fonctions mais en mode simulé
  async getAllUsers() { // Donner la liste des utilisateurs
    await delay(); // On attend un peu
    const data = readUsers(); // On lit ce qui est stocké
    return { data }; // On renvoie la liste
  },
  async getUserById(id) { // Donner un utilisateur précis
    await delay(); // On attend un peu
    const users = readUsers(); // On lit la liste
    const user = users.find((u) => String(u.id) === String(id)); // On cherche par identifiant
    if (!user) { // Si on ne trouve pas
      return { data: null }; // On dit qu'il n'y a rien
    }
    return { data: user }; // On renvoie l'utilisateur trouvé
  },
  async createUser(user) { // Ajouter un nouvel utilisateur
    await delay(); // On attend un peu
    const users = readUsers(); // On lit la liste
    const nextId = users.length ? Math.max(...users.map((u) => Number(u.id) || 0)) + 1 : 1; // On calcule un nouvel identifiant
    const newUser = { id: nextId, name: user.name, email: user.email, ...user }; // On prépare l'utilisateur à ajouter
    // On évite d'avoir deux fois le même email
    if (users.some((u) => u.email === newUser.email)) { // Si l'email existe déjà
      const err = new Error('Email already exists'); // On crée une erreur
      err.response = { status: 400, data: { message: 'Email already exists' } }; // On précise le message
      throw err; // On arrête et on renvoie l'erreur
    }
    users.push(newUser); // On ajoute dans la liste
    writeUsers(users); // On sauvegarde
    return { data: newUser }; // On renvoie l'utilisateur créé
  },
  async updateUser(id, user) { // Modifier un utilisateur existant
    await delay(); // On attend un peu
    const users = readUsers(); // On lit la liste
    const idx = users.findIndex((u) => String(u.id) === String(id)); // On cherche où il est
    if (idx === -1) { // Si on ne le trouve pas
      const err = new Error('User not found'); // On dit qu'il n'existe pas
      err.response = { status: 404 }; // On précise le type d'erreur
      throw err; // On arrête et on renvoie l'erreur
    }
    // On vérifie que l'email ne soit pas déjà pris par quelqu'un d'autre
    if (user.email && users.some((u, i) => i !== idx && u.email === user.email)) {
      const err = new Error('Email already exists'); // Email déjà pris
      err.response = { status: 400 };
      throw err;
    }
    users[idx] = { ...users[idx], ...user, id: users[idx].id }; // On met à jour ses infos (on garde le même id)
    writeUsers(users); // On sauvegarde
    return { data: users[idx] }; // On renvoie l'utilisateur mis à jour
  },
  async deleteUser(id) { // Supprimer un utilisateur
    await delay(); // On attend un peu
    const users = readUsers(); // On lit la liste
    const filtered = users.filter((u) => String(u.id) !== String(id)); // On enlève celui qui correspond
    writeUsers(filtered); // On sauvegarde la nouvelle liste
    return { data: {} }; // On renvoie un petit objet vide pour dire "c'est bon"
  },
};


// Auth service for login, signup and forgot password
const realAuthService = {
  login: ({ email, password }) => api.post('/auth/login', { email, password }),
  signup: ({ email, password }) => api.post('/auth/register', { email, password }),
  forgotPassword: ({ email }) => api.post('/auth/forgot-password', { email }),
  validateToken: () => api.post('/auth/validate'),
};

const mockAuthService = {
  async login({ email, password }) {
    await delay();
    // Accept any email/password for mock, return fake token matching backend format
    if (!email || !password) {
      const err = new Error('Missing credentials');
      err.response = { status: 400, data: { message: 'Missing credentials' } };
      throw err;
    }
    // Match backend JwtResponseDto format
    return { 
      data: { 
        accessToken: 'mock-jwt-token-' + Date.now(),
        tokenType: 'Bearer',
        userId: 1,
        email: email,
        expiresIn: 86400000 // 24 hours in milliseconds
      } 
    };
  },
  async signup({ email, password }) {
    await delay();
    if (!email || !password) {
      const err = new Error('Missing credentials');
      err.response = { status: 400, data: { message: 'Missing credentials' } };
      throw err;
    }
    // Check if user already exists (mock)
    const users = readUsers();
    if (users.some(u => u.email === email)) {
      const err = new Error('Email already exists');
      err.response = { status: 400, data: { message: 'Cet email est déjà utilisé' } };
      throw err;
    }
    // Create new user (mock) - Match backend UserDto format
    const newUser = { 
      id: users.length + 1, 
      email: email,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    writeUsers(users);
    return { data: newUser };
  },
  async forgotPassword({ email }) {
    await delay();
    if (!email) {
      const err = new Error('Missing email');
      err.response = { status: 400, data: { message: 'Missing email' } };
      throw err;
    }
    return { data: { message: 'Reset link sent (mock)' } };
  },
  async validateToken() {
    await delay();
    // Mock token validation - always return true for mock
    return { data: true };
  },
};

export const userService = USE_MOCK ? mockUserService : realUserService;
export const authService = USE_MOCK ? mockAuthService : realAuthService;

// Portfolio service
const realPortfolioService = {
  // Portfolio endpoints
  getAllPortfolios: () => api.get('/portfolios'),
  getPortfolioById: (id) => api.get(`/portfolios/${id}`),
  getUserPortfolios: (userId) => api.get(`/portfolios/user/${userId}`),
  createPortfolio: (userId, portfolioData) => api.post(`/portfolios/${userId}`, portfolioData),
  updatePortfolio: (id, portfolio) => api.put(`/portfolios/${id}`, portfolio),
  deletePortfolio: (id) => api.delete(`/portfolios/${id}`),
  
  // Experience endpoints
  getAllExperiences: () => api.get('/experiences'),
  getExperienceById: (id) => api.get(`/experiences/${id}`),
  createExperience: (portfolioId, experience) => api.post(`/experiences/${portfolioId}`, experience),
  updateExperience: (id, experience) => api.put(`/experiences/${id}`, experience),
  deleteExperience: (id) => api.delete(`/experiences/${id}`),
  
  // Education endpoints
  getAllEducations: () => api.get('/educations'),
  getEducationById: (id) => api.get(`/educations/${id}`),
  createEducation: (portfolioId, education) => api.post(`/educations/${portfolioId}`, education),
  updateEducation: (id, education) => api.put(`/educations/${id}`, education),
  deleteEducation: (id) => api.delete(`/educations/${id}`),
};

const mockPortfolioService = {
  // Portfolio endpoints (mock)
  async getAllPortfolios() {
    await delay();
    const portfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    return { data: portfolios };
  },
  async getPortfolioById(id) {
    await delay();
    const portfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    const portfolio = portfolios.find(p => p.id === id);
    return { data: portfolio || null };
  },
  async getUserPortfolios(userId) {
    await delay();
    const portfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    // In mock mode, return all portfolios for any user
    return { data: portfolios };
  },
  async createPortfolio(userId, portfolioData) {
    await delay();
    const portfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    const newPortfolio = {
      id: Date.now(),
      userId: userId,
      ...portfolioData,
      experiences: [],
      educations: []
    };
    portfolios.push(newPortfolio);
    localStorage.setItem('portfolios', JSON.stringify(portfolios));
    return { data: newPortfolio };
  },
  async updatePortfolio(id, portfolio) {
    await delay();
    const portfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    const index = portfolios.findIndex(p => p.id === id);
    if (index !== -1) {
      portfolios[index] = { ...portfolios[index], ...portfolio };
      localStorage.setItem('portfolios', JSON.stringify(portfolios));
      return { data: portfolios[index] };
    }
    throw new Error('Portfolio not found');
  },
  async deletePortfolio(id) {
    await delay();
    const portfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    const filtered = portfolios.filter(p => p.id !== id);
    localStorage.setItem('portfolios', JSON.stringify(filtered));
    return { data: {} };
  },
  
  // Experience endpoints (mock)
  async getAllExperiences() {
    await delay();
    const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    return { data: experiences };
  },
  async getExperienceById(id) {
    await delay();
    const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    const experience = experiences.find(e => e.id === id);
    return { data: experience || null };
  },
  async createExperience(portfolioId, experience) {
    await delay();
    const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    const newExperience = {
      id: Date.now(),
      ...experience,
      portfolioId: portfolioId
    };
    experiences.push(newExperience);
    localStorage.setItem('experiences', JSON.stringify(experiences));
    return { data: newExperience };
  },
  async updateExperience(id, experience) {
    await delay();
    const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    const index = experiences.findIndex(e => e.id === id);
    if (index !== -1) {
      experiences[index] = { ...experiences[index], ...experience };
      localStorage.setItem('experiences', JSON.stringify(experiences));
      return { data: experiences[index] };
    }
    throw new Error('Experience not found');
  },
  async deleteExperience(id) {
    await delay();
    const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    const filtered = experiences.filter(e => e.id !== id);
    localStorage.setItem('experiences', JSON.stringify(filtered));
    return { data: {} };
  },
  
  // Education endpoints (mock)
  async getAllEducations() {
    await delay();
    const educations = JSON.parse(localStorage.getItem('educations') || '[]');
    return { data: educations };
  },
  async getEducationById(id) {
    await delay();
    const educations = JSON.parse(localStorage.getItem('educations') || '[]');
    const education = educations.find(e => e.id === id);
    return { data: education || null };
  },
  async createEducation(portfolioId, education) {
    await delay();
    const educations = JSON.parse(localStorage.getItem('educations') || '[]');
    const newEducation = {
      id: Date.now(),
      ...education,
      portfolioId: portfolioId
    };
    educations.push(newEducation);
    localStorage.setItem('educations', JSON.stringify(educations));
    return { data: newEducation };
  },
  async updateEducation(id, education) {
    await delay();
    const educations = JSON.parse(localStorage.getItem('educations') || '[]');
    const index = educations.findIndex(e => e.id === id);
    if (index !== -1) {
      educations[index] = { ...educations[index], ...education };
      localStorage.setItem('educations', JSON.stringify(educations));
      return { data: educations[index] };
    }
    throw new Error('Education not found');
  },
  async deleteEducation(id) {
    await delay();
    const educations = JSON.parse(localStorage.getItem('educations') || '[]');
    const filtered = educations.filter(e => e.id !== id);
    localStorage.setItem('educations', JSON.stringify(filtered));
    return { data: {} };
  },
};

export const portfolioService = USE_MOCK ? mockPortfolioService : realPortfolioService;
export default api;

