import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip,
  Tabs,
  Tab,
  Paper,
  Divider
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import BuildIcon from '@mui/icons-material/Build';

const Portfolio = () => {
  const { portfolios } = useProfile();
  const [activeTab, setActiveTab] = useState('all');

  // Filtrer les éléments par catégorie
  const filteredItems = activeTab === 'all' 
    ? portfolios 
    : portfolios.filter(item => item.category === activeTab);

  // Obtenir l'icône en fonction de la catégorie
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'experience':
        return <WorkIcon />;
      case 'education':
        return <SchoolIcon />;
      case 'competence':
        return <CodeIcon />;
      case 'langue':
        return <LanguageIcon />;
      case 'projet':
        return <BuildIcon />;
      default:
        return null;
    }
  };

  // Obtenir la couleur de la catégorie
  const getCategoryColor = (category) => {
    switch(category) {
      case 'experience':
        return 'primary';
      case 'education':
        return 'secondary';
      case 'competence':
        return 'success';
      case 'langue':
        return 'info';
      case 'projet':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Mon Portfolio
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Découvrez mes projets, compétences et expériences
        </Typography>
      </Box>

      <Paper sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white !important',
              borderRadius: '4px',
            }
          }}
        >
          <Tab label="Tous" value="all" />
          <Tab label="Expériences" value="experience" icon={<WorkIcon />} iconPosition="start" />
          <Tab label="Formations" value="education" icon={<SchoolIcon />} iconPosition="start" />
          <Tab label="Compétences" value="competence" icon={<CodeIcon />} iconPosition="start" />
          <Tab label="Langues" value="langue" icon={<LanguageIcon />} iconPosition="start" />
          <Tab label="Projets" value="projet" icon={<BuildIcon />} iconPosition="start" />
        </Tabs>
      </Paper>

      <Grid container spacing={4}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                }
              }}>
                {item.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl}
                    alt={item.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200';
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ 
                      backgroundColor: `${getCategoryColor(item.category)}.light`, 
                      p: 0.5, 
                      borderRadius: 1,
                      display: 'flex',
                      mr: 1
                    }}>
                      {getCategoryIcon(item.category)}
                    </Box>
                    <Typography variant="h6" component="h3">
                      {item.title}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  
                  {item.technologies && (
                    <Box sx={{ mt: 'auto', pt: 2 }}>
                      <Divider sx={{ mb: 1 }} />
                      <Typography variant="caption" color="text.secondary">
                        Technologies: {item.technologies}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Aucun élément à afficher pour le moment.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Portfolio;
