import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import { Google, Facebook, Twitter } from '@mui/icons-material';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    phone: Yup.string().required('Phone number is required'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error on value change
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      alert(JSON.stringify(formData, null, 2));
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 1,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 3,
          width: '100%',
          borderRadius: 3,
          backgroundColor: '#f9fafb',
        }}
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" fontWeight="600" color="#0d47a1" gutterBottom>
            TruckBazaar 🚚
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create account to continue
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Username"
            name="username"
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Phone Number"
            name="phone"
            type="tel"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <Button
            fullWidth
            type="submit"
            size="small"
            variant="contained"
            sx={{
              mt: 2,
              py: 1,
              fontWeight: 'bold',
              fontSize: '0.9rem',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>

        <Divider sx={{ my: 2, fontSize: '0.75rem' }}>Or sign up with</Divider>

        <Grid container spacing={1} display="flex" justifyContent="center">
          <Grid>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              startIcon={<Google fontSize="small" />}
              sx={{
                color: '#db4437',
                borderColor: '#db4437',
                fontSize: '0.75rem',
              }}
            >
              Google
            </Button>
          </Grid>
          <Grid>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              startIcon={<Facebook fontSize="small" />}
              sx={{
                color: '#3b5998',
                borderColor: '#3b5998',
                fontSize: '0.75rem',
              }}
            >
              Facebook
            </Button>
          </Grid>
          <Grid>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              startIcon={<Twitter fontSize="small" />}
              sx={{
                color: '#1DA1F2',
                borderColor: '#1DA1F2',
                fontSize: '0.75rem',
              }}
            >
              Twitter
            </Button>
          </Grid>
        </Grid>

        <Box mt={2} textAlign="center">
            <MuiLink
              component={RouterLink}
               variant="body2"
              underline="hover"
              to="/"
            >
             Already have an account? Login
            </MuiLink>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
