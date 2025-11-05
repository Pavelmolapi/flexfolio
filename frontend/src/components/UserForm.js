import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/api';
import './UserForm.css';

function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await userService.createUser(formData);
      navigate('/users');
    } catch (err) {
      setError('Failed to create user. Make sure the backend is running.');
      console.error('Error creating user:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form">
      <h2>Add New User</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter user name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter user email"
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </button>
          <button type="button" onClick={() => navigate('/users')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
