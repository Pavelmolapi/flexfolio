import React, { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Tabs,
  Tab,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
} from '@mui/material';
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
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { 
  ExperienceForm, 
  EducationForm, 
  SkillForm, 
  LanguageForm,
  ExperienceList,
  EducationList,
  SkillList,
  LanguageList
} from './PortfolioForm';

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
  const { 
    profile, 
    updateProfile,
    portfolios,
    activePortfolio,
    activePortfolioId,
    experiences,
    educations,
    skills,
    languages,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    switchPortfolio
  } = useProfile();
  
  const [profileData, setProfileData] = useState({ ...profile });
  const [activeTab, setActiveTab] = useState('profile');
  
  // Dialog states for each entity type
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [educationDialogOpen, setEducationDialogOpen] = useState(false);
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  
  // Current item being edited
  const [currentExperience, setCurrentExperience] = useState(null);
  const [currentEducation, setCurrentEducation] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  
  // Active portfolio sub-tab
  const [portfolioTab, setPortfolioTab] = useState('experiences');
  
  // Portfolio management dialog
  const [portfolioDialogOpen, setPortfolioDialogOpen] = useState(false);
  const [portfolioDialogMode, setPortfolioDialogMode] = useState('create'); // 'create' or 'rename'
  const [portfolioDialogValue, setPortfolioDialogValue] = useState('');
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
  
  // Synchroniser profileData avec les mises à jour du contexte
  useEffect(() => {
    setProfileData(profile);
  }, [profile]);
  
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
  
  // Experience handlers
  const handleExperienceOpen = (experience = null) => {
    setCurrentExperience(experience);
    setExperienceDialogOpen(true);
  };

  const handleExperienceClose = () => {
    setExperienceDialogOpen(false);
    setCurrentExperience(null);
  };

  const handleExperienceSubmit = async (experience) => {
    try {
      if (experience.idExp) {
        await updateExperience(experience.idExp, experience);
      } else {
        await addExperience(experience);
      }
      // Only close dialog on success
      handleExperienceClose();
    } catch (error) {
      // Error already shown to user, keep dialog open
      console.error('Failed to submit experience:', error);
    }
  };

  const handleDeleteExperience = async (idExp) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
      try {
        await deleteExperience(idExp);
      } catch (error) {
        // Error already shown to user
        console.error('Failed to delete experience:', error);
      }
    }
  };

  // Education handlers
  const handleEducationOpen = (education = null) => {
    setCurrentEducation(education);
    setEducationDialogOpen(true);
  };

  const handleEducationClose = () => {
    setEducationDialogOpen(false);
    setCurrentEducation(null);
  };

  const handleEducationSubmit = async (education) => {
    try {
      if (education.idEdu) {
        await updateEducation(education.idEdu, education);
      } else {
        await addEducation(education);
      }
      // Only close dialog on success
      handleEducationClose();
    } catch (error) {
      // Error already shown to user, keep dialog open
      console.error('Failed to submit education:', error);
    }
  };

  const handleDeleteEducation = async (idEdu) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await deleteEducation(idEdu);
      } catch (error) {
        // Error already shown to user
        console.error('Failed to delete education:', error);
      }
    }
  };

  // Skill handlers
  const handleSkillOpen = (skill = null) => {
    setCurrentSkill(skill);
    setSkillDialogOpen(true);
  };

  const handleSkillClose = () => {
    setSkillDialogOpen(false);
    setCurrentSkill(null);
  };

  const handleSkillSubmit = (skill) => {
    if (skill.id) {
      updateSkill(skill.id, skill);
    } else {
      addSkill(skill);
    }
  };

  const handleDeleteSkill = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      deleteSkill(id);
    }
  };

  // Language handlers
  const handleLanguageOpen = (language = null) => {
    setCurrentLanguage(language);
    setLanguageDialogOpen(true);
  };

  const handleLanguageClose = () => {
    setLanguageDialogOpen(false);
    setCurrentLanguage(null);
  };

  const handleLanguageSubmit = (language) => {
    if (language.id) {
      updateLanguage(language.id, language);
    } else {
      addLanguage(language);
    }
  };

  const handleDeleteLanguage = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette langue ?')) {
      deleteLanguage(id);
    }
  };

  // Portfolio management handlers
  const handleOpenCreatePortfolio = () => {
    setPortfolioDialogMode('create');
    setPortfolioDialogValue('');
    setPortfolioDialogOpen(true);
  };

  const handleOpenRenamePortfolio = (portfolio) => {
    setPortfolioDialogMode('rename');
    setPortfolioDialogValue(portfolio.name);
    setSelectedPortfolioId(portfolio.id);
    setPortfolioDialogOpen(true);
  };

  const handleClosePortfolioDialog = () => {
    setPortfolioDialogOpen(false);
    setPortfolioDialogValue('');
    setSelectedPortfolioId(null);
  };

  const handleSubmitPortfolioDialog = () => {
    if (!portfolioDialogValue.trim()) {
      alert('Le nom du portfolio ne peut pas être vide');
      return;
    }

    if (portfolioDialogMode === 'create') {
      createPortfolio(portfolioDialogValue.trim());
    } else if (portfolioDialogMode === 'rename') {
      updatePortfolio(selectedPortfolioId, { name: portfolioDialogValue.trim() });
    }

    handleClosePortfolioDialog();
  };

  const handleDeletePortfolio = (portfolioId) => {
    console.log('🎯 handleDeletePortfolio called with:', portfolioId);
    console.log('📊 Current portfolios count:', portfolios.length);
    
    if (portfolios.length <= 1) {
      console.log('❌ Blocked: Cannot delete last portfolio');
      alert('Vous ne pouvez pas supprimer le dernier portfolio');
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce portfolio ? Toutes les données seront perdues.')) {
      console.log('✅ User confirmed deletion, calling deletePortfolio...');
      deletePortfolio(portfolioId);
      console.log('✅ deletePortfolio returned');
    } else {
      console.log('❌ User cancelled deletion');
    }
  };

  const handleSwitchPortfolio = (portfolioId) => {
    switchPortfolio(portfolioId);
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
          <Tab icon={<FolderIcon />} label="Mes Portfolios" {...a11yProps(1)} />
          <Tab icon={<WorkIcon />} label="Contenu du Portfolio" {...a11yProps(2)} />
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

      {/* Onglet Mes Portfolios */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">
              Gestion des Portfolios
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenCreatePortfolio}
            >
              Créer un nouveau portfolio
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {portfolios.map((portfolio) => {
              const isActive = portfolio.id === activePortfolioId;
              const expCount = portfolio.experiences?.length || 0;
              const eduCount = portfolio.educations?.length || 0;
              const skillCount = portfolio.skills?.length || 0;
              const langCount = portfolio.languages?.length || 0;
              const totalCount = expCount + eduCount + skillCount + langCount;

              return (
                <Grid item xs={12} md={6} key={portfolio.id}>
                  <Card 
                    sx={{ 
                      border: isActive ? '2px solid' : '1px solid',
                      borderColor: isActive ? 'primary.main' : 'divider',
                      position: 'relative'
                    }}
                  >
                    {isActive && (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Actif"
                        color="success"
                        size="small"
                        sx={{ position: 'absolute', top: 16, right: 16 }}
                      />
                    )}
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <FolderIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                        <Box>
                          <Typography variant="h6" component="div">
                            {portfolio.name}
                          </Typography>
                          <Chip 
                            label={`${totalCount} élément${totalCount !== 1 ? 's' : ''}`} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                      
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <WorkIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                          {expCount} expérience{expCount !== 1 ? 's' : ''}
                          {' • '}
                          <SchoolIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                          {eduCount} formation{eduCount !== 1 ? 's' : ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <CodeIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                          {skillCount} compétence{skillCount !== 1 ? 's' : ''}
                          {' • '}
                          <LanguageIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                          {langCount} langue{langCount !== 1 ? 's' : ''}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Box>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenRenamePortfolio(portfolio)}
                          title="Renommer"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeletePortfolio(portfolio.id)}
                          disabled={portfolios.length <= 1}
                          title={portfolios.length <= 1 ? "Impossible de supprimer le dernier portfolio" : "Supprimer"}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      {!isActive && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleSwitchPortfolio(portfolio.id)}
                        >
                          Activer
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </TabPanel>

      {/* Onglet Contenu du Portfolio */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">
            Contenu: {activePortfolio?.name || 'Portfolio'}
          </Typography>
          <Chip 
            icon={<CheckCircleIcon />}
            label="Portfolio actif" 
            color="success"
            variant="outlined"
          />
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={portfolioTab} 
            onChange={(e, newValue) => setPortfolioTab(newValue)}
            variant="fullWidth"
          >
            <Tab 
              label="Expériences" 
              value="experiences" 
              icon={<WorkIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Formations" 
              value="educations" 
              icon={<SchoolIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Compétences" 
              value="skills" 
              icon={<CodeIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Langues" 
              value="languages" 
              icon={<LanguageIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Experiences Tab */}
        {portfolioTab === 'experiences' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleExperienceOpen()}
              >
                Ajouter une expérience
              </Button>
            </Box>
            <ExperienceList 
              experiences={experiences}
              onEdit={handleExperienceOpen}
              onDelete={handleDeleteExperience}
            />
          </Box>
        )}

        {/* Educations Tab */}
        {portfolioTab === 'educations' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => handleEducationOpen()}
              >
                Ajouter une formation
              </Button>
            </Box>
            <EducationList 
              educations={educations}
              onEdit={handleEducationOpen}
              onDelete={handleDeleteEducation}
            />
          </Box>
        )}

        {/* Skills Tab */}
        {portfolioTab === 'skills' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Les compétences sont stockées localement (non synchronisées avec le backend)
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={() => handleSkillOpen()}
              >
                Ajouter une compétence
              </Button>
            </Box>
            <SkillList 
              skills={skills}
              onEdit={handleSkillOpen}
              onDelete={handleDeleteSkill}
            />
          </Box>
        )}

        {/* Languages Tab */}
        {portfolioTab === 'languages' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Les langues sont stockées localement (non synchronisées avec le backend)
              </Typography>
              <Button
                variant="contained"
                color="info"
                startIcon={<AddIcon />}
                onClick={() => handleLanguageOpen()}
              >
                Ajouter une langue
              </Button>
            </Box>
            <LanguageList 
              languages={languages}
              onEdit={handleLanguageOpen}
              onDelete={handleDeleteLanguage}
            />
          </Box>
        )}
      </TabPanel>

      {/* Dialogs for each entity type */}
      <ExperienceForm
        open={experienceDialogOpen}
        onClose={handleExperienceClose}
        experience={currentExperience}
        onSubmit={handleExperienceSubmit}
      />
      
      <EducationForm
        open={educationDialogOpen}
        onClose={handleEducationClose}
        education={currentEducation}
        onSubmit={handleEducationSubmit}
      />
      
      <SkillForm
        open={skillDialogOpen}
        onClose={handleSkillClose}
        skill={currentSkill}
        onSubmit={handleSkillSubmit}
      />
      
      <LanguageForm
        open={languageDialogOpen}
        onClose={handleLanguageClose}
        language={currentLanguage}
        onSubmit={handleLanguageSubmit}
      />
      
      {/* Portfolio Management Dialog */}
      <Dialog open={portfolioDialogOpen} onClose={handleClosePortfolioDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {portfolioDialogMode === 'create' ? 'Créer un nouveau portfolio' : 'Renommer le portfolio'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom du portfolio"
            type="text"
            fullWidth
            variant="outlined"
            value={portfolioDialogValue}
            onChange={(e) => setPortfolioDialogValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmitPortfolioDialog();
              }
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePortfolioDialog}>
            Annuler
          </Button>
          <Button onClick={handleSubmitPortfolioDialog} variant="contained" color="primary">
            {portfolioDialogMode === 'create' ? 'Créer' : 'Renommer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;