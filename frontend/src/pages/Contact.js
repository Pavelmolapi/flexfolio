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
  Box,
  InputAdornment
} from '@mui/material';
import './Contact.css';
// ✅ Importer chaque icône individuellement (default import)
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';

const Contact = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    // TODO: Ajouter la logique d'envoi du formulaire
  };

  return (
    <Container maxWidth="lg" className="contact-container"> {/* AJOUT: Classe pour blobs */}
      <Typography 
        variant="h4" 
        component="h1" 
        className="contact-title" // AJOUT: Animation fadeInDown
      >
        ✨ Contactez-nous {/* AJOUT: Emoji comme dans HTML */}
      </Typography>
     
      <Grid container spacing={4} justifyContent="center" className="contact-grid"> {/* AJOUT: Classe pour grille */}
        {/* Carte d'informations de contact */}
        <Grid item xs={12} md={5}>
          <Card className="contact-card"> {/* AJOUT: Animation fadeInUp avec delay */}
            <Box className="contact-card-header"> {/* AJOUT: shimmer effect via CSS */}
              <Typography variant="h6" component="h2">
                📞 Nos Coordonnées {/* AJOUT: Emoji */}
              </Typography>
            </Box>
            <CardContent className="contact-card-content">
              {/* Email */}
              <Box className="contact-item"> {/* AJOUT: Animation slideInLeft avec delay */}
                <div className="contact-item-avatar">
                  <EmailIcon className="contact-item-icon" />
                </div>
                <Box className="contact-item-content">
                  <div className="contact-item-label">Email</div>
                  <div className="contact-item-value">{profile?.email || 'contact@example.com'}</div>
                </Box>
              </Box>
             
              {/* Téléphone */}
              <Box className="contact-item contact-item-delay-2"> {/* AJOUT: Classe pour delay */}
                <div className="contact-item-avatar">
                  <PhoneIcon className="contact-item-icon" />
                </div>
                <Box className="contact-item-content">
                  <div className="contact-item-label">Téléphone</div>
                  <div className="contact-item-value">{profile?.phone || '+33 1 23 45 67 89'}</div>
                </Box>
              </Box>
             
              {/* Adresse */}
              <Box className="contact-item contact-item-delay-3"> {/* AJOUT: Classe pour delay */}
                <div className="contact-item-avatar">
                  <LocationOnIcon className="contact-item-icon" />
                </div>
                <Box className="contact-item-content">
                  <div className="contact-item-label">Adresse</div>
                  <div className="contact-item-value">
                    {profile?.address || '123 Rue de la Paix'}<br />
                    {profile?.city ? `${profile.city}, ${profile.country || ''}` : '75000 Paris, France'}
                  </div>
                </Box>
              </Box>
             
              {/* Message de bienvenue */}
              <div className="contact-welcome-message">
                Nous sommes disponibles 24/7 pour répondre à vos questions. N'hésitez pas à nous contacter ! {/* AJOUT: Texte du HTML */}
              </div>
            </CardContent>
          </Card>
        </Grid>
       
        {/* Carte du formulaire de contact */}
        <Grid item xs={12} md={7}>
          <Card className="contact-card contact-card-delay"> {/* AJOUT: Delay pour animation */}
            <Box className="contact-card-header">
              <Typography variant="h6" component="h2">
                ✉️ Envoyez-nous un message {/* AJOUT: Emoji */}
              </Typography>
            </Box>
            <CardContent className="contact-card-content">
              <form onSubmit={handleSubmit} className="contact-form">
                <TextField
                  className="contact-input-field" // AJOUT: Pour overrides
                  fullWidth
                  label="Prénom" // AJOUT: Label comme HTML (ajustez si besoin pour "Votre nom")
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Votre prénom" // AJOUT: Placeholder du HTML
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* AJOUT: Séparez en Prénom/Nom si vous voulez matcher exactement le HTML (ajoutez un autre TextField pour "Nom") */}
                <TextField
                  className="contact-input-field"
                  fullWidth
                  label="Votre email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="votre.email@example.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="contact-input-field contact-form-field-full"
                  fullWidth
                  label="Sujet"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Sujet de votre message"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SubjectIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="contact-input-field contact-form-field-full contact-form-textarea"
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={5} // AJOUT: rows=5 comme HTML
                  variant="outlined"
                  placeholder="Écrivez votre message ici..."
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  endIcon={<SendIcon />}
                  className="contact-submit-btn"
                >
                  Envoyer le Message {/* AJOUT: Majuscules comme HTML */}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;