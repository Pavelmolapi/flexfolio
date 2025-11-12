import React, { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InputAdornment from '@mui/material/InputAdornment';
import { PortfolioForm, PortfolioList } from './PortfolioForm';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
};

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const { profile, updateProfile } = useProfile();
  const [profileData, setProfileData] = useState({ ...profile });
  const [activeTab, setActiveTab] = useState('profile');
  
  // Synchroniser profileData avec les mises à jour du contexte
  useEffect(() => {
    setProfileData(profile);
  }, [profile]);
  
  // Gestion du portfolio avec le contexte
  const { portfolios, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useProfile();
  const [portfolioDialogOpen, setPortfolioDialogOpen] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Catégories disponibles pour le portfolio
  const categories = [
    { id: 'all', label: 'Tous', icon: <WorkIcon /> },
    { id: 'experience', label: 'Expériences', icon: <WorkIcon /> },
    { id: 'education', label: 'Formations', icon: <SchoolIcon /> },
    { id: 'competence', label: 'Compétences', icon: <CodeIcon /> },
    { id: 'langue', label: 'Langues', icon: <LanguageIcon /> },
    { id: 'projet', label: 'Projets', icon: <CodeIcon /> }
  ];
  
  const navigate = useNavigate();
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Gestion des informations personnelles
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileData);
    alert('Profil mis à jour avec succès !');
  };
  
  // Gestion du portfolio
  const handlePortfolioOpen = (portfolio = null) => {
    if (portfolio) {
      setCurrentPortfolio(portfolio);
    } else {
      setCurrentPortfolio({
        title: '',
        description: '',
        imageUrl: 'https://via.placeholder.com/300x200',
        technologies: '',
        category: activeCategory === 'all' ? 'experience' : activeCategory,
        projectUrl: '',
        githubUrl: '',
        company: '',
        period: '',
        location: '',
        institution: '',
        level: ''
      });
    }
    setPortfolioDialogOpen(true);
  };

  const handlePortfolioClose = () => {
    setPortfolioDialogOpen(false);
    setCurrentPortfolio(null);
  };

  const handlePortfolioSubmit = (portfolio) => {
    if (portfolio.id) {
      // Mise à jour d'un portfolio existant
      updatePortfolioItem(portfolio.id, portfolio);
    } else {
      // Ajout d'un nouveau portfolio
      addPortfolioItem(portfolio);
    }
    setPortfolioDialogOpen(false);
  };

  const handleDeletePortfolio = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      deletePortfolioItem(id);
    }
  };

  // Fonctions pour gérer les projets
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Projet 1',
      description: 'Description du projet 1',
      imageUrl: 'https://via.placeholder.com/300x200',
      technologies: 'React, Node.js, MongoDB',
      projectUrl: 'https://projet1.com',
      githubUrl: 'https://github.com/projet1',
      category: 'web'
    },
    {
      id: 2,
      title: 'Projet 2',
      description: 'Description du projet 2',
      imageUrl: 'https://via.placeholder.com/300x200',
      technologies: 'React, Node.js, MongoDB',
      projectUrl: 'https://projet2.com',
      githubUrl: 'https://github.com/projet2',
      category: 'mobile'
    }
  ]);
  const [currentProject, setCurrentProject] = useState(null);
  const [projectCategory, setProjectCategory] = useState('all');
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  const handleProjectOpen = (project = null) => {
    if (project) {
      setCurrentProject(project);
    } else {
      setCurrentProject({
        title: '',
        description: '',
        imageUrl: 'https://via.placeholder.com/300x200',
        technologies: '',
        projectUrl: '',
        githubUrl: '',
        category: projectCategory === 'all' ? 'web' : projectCategory
      });
    }
    setProjectDialogOpen(true);
  };

  const handleProjectClose = () => {
    setProjectDialogOpen(false);
    setCurrentProject(null);
  };

  const handleProjectSubmit = (project) => {
    if (project.id) {
      // Mise à jour d'un projet existant
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      // Ajout d'un nouveau projet
      const newProject = {
        ...project,
        id: Math.max(0, ...projects.map(p => p.id)) + 1
      };
      setProjects([...projects, newProject]);
    }
    setProjectDialogOpen(false);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Tableau de bord administrateur
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="onglets administration"
          variant="fullWidth"
        >
          <Tab icon={<PersonIcon />} label="Informations Personnelles" {...a11yProps(0)} />
          <Tab icon={<WorkIcon />} label="Portfolio" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* Onglet Informations Personnelles */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            aria-label="onglets profil"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Profil" value="profile" />
            <Tab label="À propos" value="about" />
            <Tab label="Contact" value="contact" />
            <Tab label="Réseaux Sociaux" value="social" />
          </Tabs>
        </Box>

        <form onSubmit={handleSaveProfile}>
          {/* Section Profil */}
          {activeTab === 'profile' && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Box
                    component="img"
                    src={profileData.profileImage}
                    alt="Photo de profil"
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      mb: 2,
                      border: '3px solid',
                      borderColor: 'primary.main'
                    }}
                  />
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<PhotoCameraIcon />}
                  >
                    Changer la photo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Nom complet"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Poste"
                  name="jobTitle"
                  value={profileData.jobTitle}
                  onChange={handleProfileChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Localisation"
                  name="location"
                  value={profileData.location}
                  onChange={handleProfileChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
          )}

          {/* Section À propos */}
          {activeTab === 'about' && (
            <Box>
              <TextField
                fullWidth
                label="À propos de moi"
                name="about"
                value={profileData.about}
                onChange={handleProfileChange}
                multiline
                rows={8}
                margin="normal"
                required
              />
            </Box>
          )}

          {/* Section Contact */}
          {activeTab === 'contact' && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
          )}

          {/* Section Réseaux Sociaux */}
          {activeTab === 'social' && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="GitHub"
                  name="socialLinks.github"
                  value={profileData.socialLinks.github}
                  onChange={handleProfileChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><GitHubIcon /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="LinkedIn"
                  name="socialLinks.linkedin"
                  value={profileData.socialLinks.linkedin}
                  onChange={handleProfileChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LinkedInIcon /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Twitter"
                  name="socialLinks.twitter"
                  value={profileData.socialLinks.twitter}
                  onChange={handleProfileChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><TwitterIcon /></InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Enregistrer les modifications
            </Button>
          </Box>
        </form>
      </TabPanel>

      {/* Onglet Portfolio */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, justifyContent: 'center' }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'contained' : 'outlined'}
              onClick={() => setActiveCategory(category.id)}
              startIcon={category.icon}
              color={
                category.id === 'experience' ? 'primary' :
                category.id === 'education' ? 'secondary' :
                category.id === 'competence' ? 'success' :
                category.id === 'langue' ? 'warning' :
                category.id === 'projet' ? 'info' : 'default'
              }
            >
              {category.label}
            </Button>
          ))}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              // Si la catégorie active est 'projet', on pré-remplit avec cette catégorie
              const newItem = {
                title: '',
                description: '',
                imageUrl: 'https://via.placeholder.com/300x200',
                technologies: '',
                category: activeCategory === 'all' ? 'experience' : activeCategory,
                projectUrl: '',
                githubUrl: '',
                company: '',
                period: '',
                location: '',
                institution: '',
                level: ''
              };
              handlePortfolioOpen(newItem);
            }}
            sx={{ ml: 'auto' }}
          >
            Ajouter {activeCategory === 'all' ? '' : 'un '}
            {activeCategory === 'experience' ? 'Expérience' :
             activeCategory === 'education' ? 'Formation' :
             activeCategory === 'competence' ? 'Compétence' :
             activeCategory === 'langue' ? 'Langue' :
             activeCategory === 'projet' ? 'Projet' : 'Élément'}
          </Button>
        </Box>
        
        <PortfolioList 
          portfolios={activeCategory === 'all' 
            ? portfolios 
            : portfolios.filter(item => item.category === activeCategory)
          } 
          onEdit={handlePortfolioOpen}
          onDelete={handleDeletePortfolio}
        />
      </TabPanel>


{/* Dialogue Portfolio */}
      <PortfolioForm
        open={portfolioDialogOpen}
        onClose={handlePortfolioClose}
        portfolio={currentPortfolio}
        onSubmit={handlePortfolioSubmit}
      />
    </Container>
  );
};

export default AdminDashboard;