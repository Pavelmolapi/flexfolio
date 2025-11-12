import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { formatPeriod, formatLocation } from '../utils/dateUtils';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Chip,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PortfolioSelector from '../components/PortfolioSelector';

const Portfolio = () => {
  const { experiences, educations, skills, languages, activePortfolio } = useProfile();
  const [activeTab, setActiveTab] = useState('experiences');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Render Experience Card
  const renderExperienceCard = (exp) => (
    <Grid item xs={12} md={6} key={exp.idExp}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WorkIcon color="primary" sx={{ mr: 1 }} />
            <Chip label="Expérience" color="primary" size="small" />
          </Box>
          <Typography variant="h6" gutterBottom>
            {exp.position}
          </Typography>
          <Typography color="primary" gutterBottom sx={{ fontWeight: 'medium' }}>
            {exp.employer}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {formatPeriod(exp.startDate, exp.endDate, exp.ongoing)}
          </Typography>
          {(exp.city || exp.country) && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <LocationOnIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
              {formatLocation(exp.city, exp.country)}
            </Typography>
          )}
          {exp.responsibilities && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              {exp.responsibilities}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  // Render Education Card
  const renderEducationCard = (edu) => (
    <Grid item xs={12} md={6} key={edu.idEdu}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SchoolIcon color="secondary" sx={{ mr: 1 }} />
            <Chip label="Formation" color="secondary" size="small" />
          </Box>
          <Typography variant="h6" gutterBottom>
            {edu.titleOfQualification}
          </Typography>
          <Typography color="secondary" gutterBottom sx={{ fontWeight: 'medium' }}>
            {edu.training}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {formatPeriod(edu.startDate, edu.endDate, edu.ongoing)}
          </Typography>
          {(edu.city || edu.country) && (
            <Typography variant="body2" color="text.secondary">
              <LocationOnIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
              {formatLocation(edu.city, edu.country)}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  // Render Skill Card
  const renderSkillCard = (skill) => (
    <Grid item xs={12} sm={6} md={4} key={skill.id}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CodeIcon color="success" sx={{ mr: 1 }} />
            <Chip label="Compétence" color="success" size="small" />
          </Box>
          <Typography variant="h6" gutterBottom>
            {skill.title}
          </Typography>
          {skill.technologies && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {skill.technologies}
            </Typography>
          )}
          {skill.description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {skill.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  // Render Language Card
  const renderLanguageCard = (lang) => (
    <Grid item xs={12} sm={6} md={4} key={lang.id}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LanguageIcon color="info" sx={{ mr: 1 }} />
            <Chip label="Langue" color="info" size="small" />
          </Box>
          <Typography variant="h6" gutterBottom>
            {lang.title}
          </Typography>
          {lang.level && (
            <Typography variant="body2" color="text.secondary">
              Niveau: {lang.level}
            </Typography>
          )}
          {lang.description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {lang.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Mon Portfolio
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Découvrez mon parcours professionnel, mes formations et mes compétences
          </Typography>
        </Box>
        <PortfolioSelector />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          centered
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

      <Grid container spacing={3}>
        {activeTab === 'experiences' && (
          experiences.length > 0 ? (
            experiences.map(renderExperienceCard)
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <WorkIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Aucune expérience professionnelle
                </Typography>
                <Typography color="text.secondary">
                  Ajoutez vos expériences depuis le tableau de bord administrateur
                </Typography>
              </Paper>
            </Grid>
          )
        )}

        {activeTab === 'educations' && (
          educations.length > 0 ? (
            educations.map(renderEducationCard)
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <SchoolIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Aucune formation
                </Typography>
                <Typography color="text.secondary">
                  Ajoutez vos formations depuis le tableau de bord administrateur
                </Typography>
              </Paper>
            </Grid>
          )
        )}

        {activeTab === 'skills' && (
          skills.length > 0 ? (
            skills.map(renderSkillCard)
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <CodeIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Aucune compétence
                </Typography>
                <Typography color="text.secondary">
                  Les compétences sont stockées localement (non synchronisées avec le backend)
                </Typography>
              </Paper>
            </Grid>
          )
        )}

        {activeTab === 'languages' && (
          languages.length > 0 ? (
            languages.map(renderLanguageCard)
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <LanguageIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Aucune langue
                </Typography>
                <Typography color="text.secondary">
                  Les langues sont stockées localement (non synchronisées avec le backend)
                </Typography>
              </Paper>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default Portfolio;
