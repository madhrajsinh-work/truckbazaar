import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
  Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Logo from '../assets/logo.png'

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };


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

    console.log(formData);

    setFormData({
      emailOrUsername: '',
      password: '',
    });

    setErrors({});
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={6} sx={{ p: 3, borderRadius: 3, width: '100%' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            component="img"
            src={Logo}
            alt="TruckBazaar Logo"
            sx={{ width: 100, height: 100}}
          />
          <Typography variant="h7" fontWeight="600" color="#0d47a1">
            Login
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
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
            size="small"
            margin="dense"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="end">
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

          <Box display="flex" justifyContent="center">
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
