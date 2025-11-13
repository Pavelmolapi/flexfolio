import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Divider,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  InputAdornment
} from '@mui/material';

// ✅ Importer chaque icône individuellement (default import)
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';

const Contact = () => {
  const { profile } = useProfile();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 'bold' }}>
        Contactez-nous
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {/* Carte d'informations de contact */}
        <Grid item xs={12} md={5}>
          <Card 
            elevation={3} 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'translateY(-5px)' }
            }}
          >
            <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, textAlign: 'center' }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                Nos Coordonnées
              </Typography>
            </Box>

            <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                  <EmailIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                  <Typography variant="body1">{profile?.email || 'contact@example.com'}</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                  <PhoneIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Téléphone</Typography>
                  <Typography variant="body1">{profile?.phone || '+33 1 23 45 67 89'}</Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar sx={{ bgcolor: 'primary.light', mr: 2, mt: 0.5 }}>
                  <LocationOnIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Adresse</Typography>
                  <Typography variant="body1">
                    {profile?.address || '123 Rue Example'}<br />
                    {profile?.city ? `${profile.city}, ${profile.country || ''}` : '75000 Paris, France'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 'auto', pt: 3 }}>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body2" color="text.secondary" align="center">
                  N'hésitez pas à nous contacter pour toute question ou demande d'information.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Carte du formulaire de contact */}
        <Grid item xs={12} md={7}>
          <Card 
            elevation={3} 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'translateY(-5px)' }
            }}
          >
            <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, textAlign: 'center' }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                Envoyez-nous un message
              </Typography>
            </Box>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Votre nom"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Votre email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Sujet"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SubjectIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Votre message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      endIcon={<SendIcon />}
                      sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                    >
                      Envoyer le message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
