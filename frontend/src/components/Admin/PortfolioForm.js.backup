import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export const PortfolioForm = ({ open, onClose, portfolio, onSubmit }) => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'experience',
    technologies: '',
    projectUrl: '',
    githubUrl: '',
    company: '',
    period: '',
    location: '',
    institution: '',
    level: ''
  });

  // Mettre à jour le formulaire quand le portfolio change
  useEffect(() => {
    if (portfolio) {
      setFormData(portfolio);
      // Définir l'onglet actif en fonction de la catégorie
      const categoryIndex = ['experience', 'education', 'competence', 'langue', 'projet'].indexOf(portfolio.category);
      setTabValue(categoryIndex >= 0 ? categoryIndex : 0);
    } else {
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        category: 'experience',
        technologies: '',
        projectUrl: '',
        githubUrl: '',
        company: '',
        period: '',
        location: '',
        institution: '',
        level: ''
      });
      setTabValue(0);
    }
  }, [portfolio]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const categories = ['experience', 'education', 'competence', 'langue', 'projet'];
    setFormData(prev => ({
      ...prev,
      category: categories[newValue] || 'experience',
      // Réinitialiser les champs spécifiques à la catégorie précédente
      company: '',
      period: '',
      location: '',
      institution: '',
      level: '',
      projectUrl: '',
      githubUrl: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // Nettoyer les données en fonction de la catégorie
    const cleanedData = { ...formData };
    
    // Supprimer les champs inutiles selon la catégorie
    const categoryFields = {
      experience: ['company', 'period', 'location'],
      education: ['institution', 'period', 'location'],
      competence: ['technologies', 'level'],
      langue: ['level']
    };

    // Garder uniquement les champs pertinents pour la catégorie
    const fieldsToKeep = ['title', 'description', 'imageUrl', 'category', 'projectUrl', ...(categoryFields[formData.category] || [])];
    Object.keys(cleanedData).forEach(key => {
      if (!fieldsToKeep.includes(key)) {
        delete cleanedData[key];
      }
    });

    onSubmit(cleanedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmitForm}>
        <DialogTitle>
          {portfolio ? 'Modifier' : 'Ajouter'} {getCategoryLabel(formData.category)}
        </DialogTitle>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="portfolio tabs" variant="scrollable" scrollButtons="auto">
            <Tab icon={<WorkIcon />} label="Expérience" />
            <Tab icon={<SchoolIcon />} label="Formation" />
            <Tab icon={<CodeIcon />} label="Compétence" />
            <Tab icon={<LanguageIcon />} label="Langue" />
            <Tab icon={<CodeIcon />} label="Projet" />
          </Tabs>
        </Box>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {/* Champs communs à toutes les catégories */}
            <TextField
              name="title"
              label={formData.category === 'langue' ? 'Langue' : 'Titre'}
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <TextField
              name="description"
              label={
                formData.category === 'langue' ? 'Niveau' : 
                formData.category === 'competence' ? 'Description des compétences' :
                'Description'
              }
              multiline
              rows={formData.category === 'langue' ? 1 : 3}
              fullWidth
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              required
            />

            {/* Champs spécifiques à chaque catégorie */}
            {(formData.category === 'experience' || formData.category === 'education') && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={formData.category === 'experience' ? 6 : 12}>
                  <TextField
                    name={formData.category === 'experience' ? 'company' : 'institution'}
                    label={formData.category === 'experience' ? 'Entreprise' : 'Établissement'}
                    fullWidth
                    variant="outlined"
                    value={formData[formData.category === 'experience' ? 'company' : 'institution'] || ''}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="period"
                    label="Période"
                    fullWidth
                    variant="outlined"
                    value={formData.period || ''}
                    onChange={handleChange}
                    placeholder="Ex: 2020 - Présent"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="location"
                    label="Lieu"
                    fullWidth
                    variant="outlined"
                    value={formData.location || ''}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )}

            {formData.category === 'competence' && (
              <TextField
                name="technologies"
                label="Technologies et compétences (séparées par des virgules)"
                fullWidth
                variant="outlined"
                value={formData.technologies || ''}
                onChange={handleChange}
                required
              />
            )}

            {formData.category === 'langue' && (
              <FormControl fullWidth>
                <InputLabel id="level-label">Niveau</InputLabel>
                <Select
                  labelId="level-label"
                  name="level"
                  value={formData.level || ''}
                  label="Niveau"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Débutant">Débutant</MenuItem>
                  <MenuItem value="Intermédiaire">Intermédiaire</MenuItem>
                  <MenuItem value="Avancé">Avancé</MenuItem>
                  <MenuItem value="Courant">Courant</MenuItem>
                  <MenuItem value="Bilingue">Bilingue</MenuItem>
                  <MenuItem value="Natif">Natif</MenuItem>
                </Select>
              </FormControl>
            )}

            <TextField
              name="imageUrl"
              label="URL de l'image (facultatif)"
              fullWidth
              variant="outlined"
              value={formData.imageUrl || ''}
              onChange={handleChange}
            />

            {formData.category !== 'langue' && (
              <TextField
                name="projectUrl"
                label={
                  formData.category === 'experience' ? 'Lien vers le site de l\'entreprise' :
                  formData.category === 'education' ? 'Lien vers le site de l\'établissement' :
                  'Lien vers le projet ou démonstration'
                }
                fullWidth
                variant="outlined"
                value={formData.projectUrl || ''}
                onChange={handleChange}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">
            Annuler
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {portfolio ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// Fonction utilitaire pour obtenir le label de la catégorie
const getCategoryLabel = (category) => {
  switch (category) {
    case 'experience':
      return 'une expérience professionnelle';
    case 'education':
      return 'une formation';
    case 'competence':
      return 'une compétence';
    case 'langue':
      return 'une langue';
    case 'projet':
      return 'un projet';
    default:
      return 'un élément';
  }
};

export const PortfolioList = ({ portfolios, onEdit, onDelete }) => {
  if (portfolios.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Aucun élément à afficher
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {portfolios.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {item.imageUrl && (
              <Box sx={{ height: 140, overflow: 'hidden' }}>
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {e.target.onerror = null; e.target.src='https://via.placeholder.com/300x200'}}
                />
              </Box>
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {item.description}
              </Typography>
              
              {/* Champs spécifiques aux projets */}
              {item.category === 'projet' && (
                <>
                  {item.technologies && (
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                      <strong>Technologies :</strong> {item.technologies}
                    </Typography>
                  )}
                  {item.period && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Réalisé en :</strong> {item.period}
                    </Typography>
                  )}
                  {item.projectUrl && (
                    <Typography variant="caption" color="primary" display="block" sx={{ mt: 1 }}>
                      <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                        Voir le projet
                      </a>
                    </Typography>
                  )}
                  {item.githubUrl && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                        Code source sur GitHub
                      </a>
                    </Typography>
                  )}
                </>
              )}
              
              {/* Champs pour les expériences professionnelles */}
              {item.category === 'experience' && (
                <>
                  {item.company && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Entreprise :</strong> {item.company}
                    </Typography>
                  )}
                  {item.period && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Période :</strong> {item.period}
                    </Typography>
                  )}
                  {item.location && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Lieu :</strong> {item.location}
                    </Typography>
                  )}
                </>
              )}
              
              {/* Champs pour les formations */}
              {item.category === 'education' && (
                <>
                  {item.institution && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Établissement :</strong> {item.institution}
                    </Typography>
                  )}
                  {item.period && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Période :</strong> {item.period}
                    </Typography>
                  )}
                  {item.location && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Lieu :</strong> {item.location}
                    </Typography>
                  )}
                </>
              )}
              
              {/* Champs pour les compétences */}
              {item.category === 'competence' && item.technologies && (
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  <strong>Technologies :</strong> {item.technologies}
                </Typography>
              )}
              
              {/* Champs pour les langues */}
              {item.category === 'langue' && item.level && (
                <Typography variant="caption" color="text.secondary" display="block">
                  <strong>Niveau :</strong> {item.level}
                </Typography>
              )}
            </CardContent>
            
            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
              <IconButton 
                size="small" 
                color="primary" 
                onClick={() => onEdit(item)}
                aria-label="Modifier"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                color="error" 
                onClick={() => onDelete(item.id)}
                aria-label="Supprimer"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
