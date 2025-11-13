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
  Grid,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatPeriod, formatLocation } from '../../utils/dateUtils';

// Experience Form
export const ExperienceForm = ({ open, onClose, experience, onSubmit }) => {
  const [formData, setFormData] = useState({
    position: '', employer: '', city: '', country: '',
    startDate: '', endDate: '', responsibilities: '', ongoing: false
  });

  useEffect(() => {
    if (experience) {
      // Include idExp when editing
      setFormData({
        ...experience,
        idExp: experience.idExp // Ensure ID is preserved
      });
    } else {
      setFormData({
        position: '', employer: '', city: '', country: '',
        startDate: '', endDate: '', responsibilities: '', ongoing: false
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{experience ? 'Modifier' : 'Ajouter'} une expérience</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField name="position" label="Poste" fullWidth value={formData.position} onChange={handleChange} required inputProps={{ maxLength: 50 }} helperText={`${formData.position.length}/50`} />
            <TextField name="employer" label="Entreprise" fullWidth value={formData.employer} onChange={handleChange} required inputProps={{ maxLength: 50 }} helperText={`${formData.employer.length}/50`} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><TextField name="city" label="Ville" fullWidth value={formData.city} onChange={handleChange} inputProps={{ maxLength: 50 }} /></Grid>
              <Grid item xs={12} md={6}><TextField name="country" label="Pays" fullWidth value={formData.country} onChange={handleChange} inputProps={{ maxLength: 50 }} /></Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><TextField name="startDate" label="Date de début" type="date" fullWidth value={formData.startDate} onChange={handleChange} required InputLabelProps={{ shrink: true }} /></Grid>
              <Grid item xs={12} md={6}><TextField name="endDate" label="Date de fin" type="date" fullWidth value={formData.endDate} onChange={handleChange} disabled={formData.ongoing} InputLabelProps={{ shrink: true }} /></Grid>
            </Grid>
            <FormControlLabel control={<Checkbox checked={formData.ongoing} onChange={handleChange} name="ongoing" />} label="Poste actuel" />
            <TextField name="responsibilities" label="Responsabilités" multiline rows={4} fullWidth value={formData.responsibilities} onChange={handleChange} inputProps={{ maxLength: 350 }} helperText={`${formData.responsibilities.length}/350`} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">Annuler</Button>
          <Button type="submit" color="primary" variant="contained">{experience ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// Education Form
export const EducationForm = ({ open, onClose, education, onSubmit }) => {
  const [formData, setFormData] = useState({
    titleOfQualification: '', training: '', city: '', country: '',
    startDate: '', endDate: '', ongoing: false
  });

  useEffect(() => {
    if (education) {
      // Include idEdu when editing
      setFormData({
        ...education,
        idEdu: education.idEdu // Ensure ID is preserved
      });
    } else {
      setFormData({ titleOfQualification: '', training: '', city: '', country: '', startDate: '', endDate: '', ongoing: false });
    }
  }, [education]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{education ? 'Modifier' : 'Ajouter'} une formation</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField name="titleOfQualification" label="Diplôme" fullWidth value={formData.titleOfQualification} onChange={handleChange} required inputProps={{ maxLength: 50 }} helperText={`${formData.titleOfQualification.length}/50`} />
            <TextField name="training" label="Établissement" fullWidth value={formData.training} onChange={handleChange} inputProps={{ maxLength: 100 }} helperText={`${formData.training.length}/100`} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><TextField name="city" label="Ville" fullWidth value={formData.city} onChange={handleChange} inputProps={{ maxLength: 50 }} /></Grid>
              <Grid item xs={12} md={6}><TextField name="country" label="Pays" fullWidth value={formData.country} onChange={handleChange} inputProps={{ maxLength: 50 }} /></Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><TextField name="startDate" label="Date de début" type="date" fullWidth value={formData.startDate} onChange={handleChange} required InputLabelProps={{ shrink: true }} /></Grid>
              <Grid item xs={12} md={6}><TextField name="endDate" label="Date de fin" type="date" fullWidth value={formData.endDate} onChange={handleChange} disabled={formData.ongoing} InputLabelProps={{ shrink: true }} /></Grid>
            </Grid>
            <FormControlLabel control={<Checkbox checked={formData.ongoing} onChange={handleChange} name="ongoing" />} label="Formation en cours" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">Annuler</Button>
          <Button type="submit" color="primary" variant="contained">{education ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// Skill Form
export const SkillForm = ({ open, onClose, skill, onSubmit }) => {
  const [formData, setFormData] = useState({ title: '', technologies: '', description: '' });

  useEffect(() => {
    if (skill) setFormData(skill);
    else setFormData({ title: '', technologies: '', description: '' });
  }, [skill]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); onClose(); };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{skill ? 'Modifier' : 'Ajouter'} une compétence</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField name="title" label="Compétence" fullWidth value={formData.title} onChange={handleChange} required />
            <TextField name="technologies" label="Technologies" fullWidth value={formData.technologies} onChange={handleChange} placeholder="Ex: React, Node.js" />
            <TextField name="description" label="Description" multiline rows={3} fullWidth value={formData.description} onChange={handleChange} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">Annuler</Button>
          <Button type="submit" color="primary" variant="contained">{skill ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// Language Form
export const LanguageForm = ({ open, onClose, language, onSubmit }) => {
  const [formData, setFormData] = useState({ title: '', level: '', description: '' });

  useEffect(() => {
    if (language) setFormData(language);
    else setFormData({ title: '', level: '', description: '' });
  }, [language]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); onClose(); };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{language ? 'Modifier' : 'Ajouter'} une langue</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField name="title" label="Langue" fullWidth value={formData.title} onChange={handleChange} required />
            <FormControl fullWidth required>
              <InputLabel>Niveau</InputLabel>
              <Select name="level" value={formData.level} label="Niveau" onChange={handleChange}>
                <MenuItem value="Débutant">Débutant (A1-A2)</MenuItem>
                <MenuItem value="Intermédiaire">Intermédiaire (B1-B2)</MenuItem>
                <MenuItem value="Avancé">Avancé (C1)</MenuItem>
                <MenuItem value="Courant">Courant (C2)</MenuItem>
                <MenuItem value="Bilingue">Bilingue</MenuItem>
                <MenuItem value="Natif">Natif</MenuItem>
              </Select>
            </FormControl>
            <TextField name="description" label="Notes" multiline rows={2} fullWidth value={formData.description} onChange={handleChange} placeholder="Ex: Certificat TOEFL..." />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">Annuler</Button>
          <Button type="submit" color="primary" variant="contained">{language ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// Lists
export const ExperienceList = ({ experiences, onEdit, onDelete }) => (
  experiences.length === 0 ? <Box sx={{ textAlign: 'center', py: 4 }}><WorkIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} /><Typography variant="subtitle1" color="textSecondary">Aucune expérience</Typography></Box> :
  <Grid container spacing={3}>{experiences.map(exp => <Grid item xs={12} md={6} key={exp.idExp}><Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><WorkIcon color="primary" sx={{ mr: 1 }} /><Typography variant="h6">{exp.position}</Typography></Box><Typography color="primary" gutterBottom>{exp.employer}</Typography><Typography variant="body2" color="text.secondary">{formatPeriod(exp.startDate, exp.endDate, exp.ongoing)}</Typography>{(exp.city || exp.country) && <Typography variant="body2" color="text.secondary"><LocationOnIcon sx={{ fontSize: 14, verticalAlign: 'middle' }} />{formatLocation(exp.city, exp.country)}</Typography>}{exp.responsibilities && <Typography variant="body2" sx={{ mt: 1 }}>{exp.responsibilities}</Typography>}</CardContent><CardActions sx={{ justifyContent: 'flex-end' }}><IconButton size="small" color="primary" onClick={() => onEdit(exp)}><EditIcon fontSize="small" /></IconButton><IconButton size="small" color="error" onClick={() => onDelete(exp.idExp)}><DeleteIcon fontSize="small" /></IconButton></CardActions></Card></Grid>)}</Grid>
);

export const EducationList = ({ educations, onEdit, onDelete }) => (
  educations.length === 0 ? <Box sx={{ textAlign: 'center', py: 4 }}><SchoolIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} /><Typography variant="subtitle1" color="textSecondary">Aucune formation</Typography></Box> :
  <Grid container spacing={3}>{educations.map(edu => <Grid item xs={12} md={6} key={edu.idEdu}><Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><SchoolIcon color="secondary" sx={{ mr: 1 }} /><Typography variant="h6">{edu.titleOfQualification}</Typography></Box><Typography color="secondary" gutterBottom>{edu.training}</Typography><Typography variant="body2" color="text.secondary">{formatPeriod(edu.startDate, edu.endDate, edu.ongoing)}</Typography>{(edu.city || edu.country) && <Typography variant="body2" color="text.secondary"><LocationOnIcon sx={{ fontSize: 14, verticalAlign: 'middle' }} />{formatLocation(edu.city, edu.country)}</Typography>}</CardContent><CardActions sx={{ justifyContent: 'flex-end' }}><IconButton size="small" color="primary" onClick={() => onEdit(edu)}><EditIcon fontSize="small" /></IconButton><IconButton size="small" color="error" onClick={() => onDelete(edu.idEdu)}><DeleteIcon fontSize="small" /></IconButton></CardActions></Card></Grid>)}</Grid>
);

export const SkillList = ({ skills, onEdit, onDelete }) => (
  skills.length === 0 ? <Box sx={{ textAlign: 'center', py: 4 }}><CodeIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} /><Typography variant="subtitle1" color="textSecondary">Aucune compétence</Typography></Box> :
  <Grid container spacing={3}>{skills.map(skill => <Grid item xs={12} sm={6} md={4} key={skill.id}><Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CodeIcon color="success" sx={{ mr: 1 }} /><Typography variant="h6">{skill.title}</Typography></Box>{skill.technologies && <Typography variant="body2" color="text.secondary">{skill.technologies}</Typography>}{skill.description && <Typography variant="body2" sx={{ mt: 1 }}>{skill.description}</Typography>}</CardContent><CardActions sx={{ justifyContent: 'flex-end' }}><IconButton size="small" color="primary" onClick={() => onEdit(skill)}><EditIcon fontSize="small" /></IconButton><IconButton size="small" color="error" onClick={() => onDelete(skill.id)}><DeleteIcon fontSize="small" /></IconButton></CardActions></Card></Grid>)}</Grid>
);

export const LanguageList = ({ languages, onEdit, onDelete }) => (
  languages.length === 0 ? <Box sx={{ textAlign: 'center', py: 4 }}><LanguageIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} /><Typography variant="subtitle1" color="textSecondary">Aucune langue</Typography></Box> :
  <Grid container spacing={3}>{languages.map(lang => <Grid item xs={12} sm={6} md={4} key={lang.id}><Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><LanguageIcon color="info" sx={{ mr: 1 }} /><Typography variant="h6">{lang.title}</Typography></Box><Typography variant="body2" color="text.secondary">Niveau: {lang.level}</Typography>{lang.description && <Typography variant="body2" sx={{ mt: 1 }}>{lang.description}</Typography>}</CardContent><CardActions sx={{ justifyContent: 'flex-end' }}><IconButton size="small" color="primary" onClick={() => onEdit(lang)}><EditIcon fontSize="small" /></IconButton><IconButton size="small" color="error" onClick={() => onDelete(lang.id)}><DeleteIcon fontSize="small" /></IconButton></CardActions></Card></Grid>)}</Grid>
);
