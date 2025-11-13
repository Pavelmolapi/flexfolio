import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { formatPeriod, formatLocation } from '../utils/dateUtils';
import { Box, Typography, Container, Grid, Paper, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import PortfolioSelector from '../components/PortfolioSelector';

const About = () => {
  const { profile, experiences, educations, skills, languages, activePortfolio } = useProfile();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Portfolio Selector at the top */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          À Propos
        </Typography>
        <PortfolioSelector />
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, position: 'sticky', top: 20 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img 
                src={profile.profileImage} 
                alt={profile.fullName} 
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid',
                  borderColor: 'primary.main'
                }}
              />
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                {profile.fullName}
              </Typography>
              <Typography color="primary" sx={{ mb: 2 }}>
                {profile.jobTitle}
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ textAlign: 'left', mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon color="primary" sx={{ mr: 1 }} />
                  <Typography>{profile.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon color="primary" sx={{ mr: 1 }} />
                  <Typography>{profile.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                  <Typography>{profile.location}</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <WorkIcon color="primary" sx={{ mr: 1 }} />
              À propos de moi
            </Typography>
            <Typography paragraph>
              {profile.about}
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <WorkIcon color="primary" sx={{ mr: 1 }} />
              Expérience Professionnelle
            </Typography>
            {experiences.length > 0 ? (
              experiences.map((exp) => (
                <Box key={exp.idExp} sx={{ mb: 3 }}>
                  <Typography variant="h6">{exp.position}</Typography>
                  {exp.employer && (
                    <Typography color="primary" sx={{ fontWeight: 'medium' }}>{exp.employer}</Typography>
                  )}
                  <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {formatPeriod(exp.startDate, exp.endDate, exp.ongoing)}
                  </Typography>
                  {(exp.city || exp.country) && (
                    <Typography color="text.secondary">
                      <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                      {formatLocation(exp.city, exp.country)}
                    </Typography>
                  )}
                  {exp.responsibilities && (
                    <Typography sx={{ mt: 1 }}>{exp.responsibilities}</Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">Aucune expérience professionnelle renseignée</Typography>
            )}
          </Paper>

          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon color="primary" sx={{ mr: 1 }} />
              Formation
            </Typography>
            {educations.length > 0 ? (
              educations.map((edu) => (
                <Box key={edu.idEdu} sx={{ mb: 3 }}>
                  <Typography variant="h6">{edu.titleOfQualification}</Typography>
                  {edu.training && (
                    <Typography color="primary" sx={{ fontWeight: 'medium' }}>{edu.training}</Typography>
                  )}
                  <Typography color="text.secondary">
                    {formatPeriod(edu.startDate, edu.endDate, edu.ongoing)}
                  </Typography>
                  {(edu.city || edu.country) && (
                    <Typography color="text.secondary">
                      <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                      {formatLocation(edu.city, edu.country)}
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">Aucune formation renseignée</Typography>
            )}
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CodeIcon color="primary" sx={{ mr: 1 }} />
                  Compétences
                </Typography>
                <Grid container spacing={2}>
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <Grid item xs={12} sm={6} key={skill.id}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>{skill.title}</Typography>
                          {skill.technologies && (
                            <Typography variant="body2" color="text.secondary">
                              {skill.technologies}
                            </Typography>
                          )}
                          {skill.description && (
                            <Typography variant="body2">{skill.description}</Typography>
                          )}
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Typography color="text.secondary">Aucune compétence renseignée</Typography>
                  )}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <LanguageIcon color="primary" sx={{ mr: 1 }} />
                  Langues
                </Typography>
                <Grid container spacing={2}>
                  {languages.length > 0 ? (
                    languages.map((lang) => (
                      <Grid item xs={12} sm={6} key={lang.id}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography>{lang.title || 'Langue'}</Typography>
                          {lang.level && (
                            <Typography color="text.secondary">{lang.level}</Typography>
                          )}
                        </Box>
                        {lang.description && (
                          <Typography variant="body2" color="text.secondary">
                            {lang.description}
                          </Typography>
                        )}
                      </Grid>
                    ))
                  ) : (
                    <Typography color="text.secondary">Aucune langue renseignée</Typography>
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
