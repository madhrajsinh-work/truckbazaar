import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
  Paper,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    emailOrUsername: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};

    if (!formData.emailOrUsername.trim()) {
      tempErrors.emailOrUsername = 'Username or Email is required';
    }

    if (!formData.password.trim()) {
      tempErrors.password = 'Password is required';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={6} sx={{ p: 3, borderRadius: 3, width: '100%' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 40, height: 40 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="600" color="#0d47a1">
            TruckBazaar 🚚
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" mt={1}>
            Login
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            fullWidth
            margin="normal"
            label="Username or Email"
            name="emailOrUsername"
            size="small"
            value={formData.emailOrUsername}
            onChange={handleChange}
            error={!!errors.emailOrUsername}
            helperText={errors.emailOrUsername}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            size="small"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Box display="flex" justifyContent="end" mt={1}>
            <MuiLink href="#" variant="body2">
              Forgot password?
            </MuiLink>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 2,
              mb: 2,
              py: 1.2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.9rem',
            }}
          >
            Login
          </Button>

          <Box display="flex" justifyContent="center" mt={1}>
            <MuiLink
              component={RouterLink}
              to="/signup"
              variant="body2"
              underline="hover"
            >
              Don’t have an account? Sign Up
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
