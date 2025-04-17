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
import 'react-phone-input-2/lib/material.css';
import PhoneInput from 'react-phone-input-2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Enter a valid phone number', (value) => {
        if (!value) return false;

        return isValidPhoneNumber('+' + value);
      }),
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

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));

    setErrors((prev) => ({
      ...prev,
      phone: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      console.log(formData);

      navigate('/verify-email', { state: { email: formData.email } });

      setFormData({
        username: '',
        email: '',
        password: '',
        phone: '+91',
      });

      setErrors({});
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
            type="text"
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
          <Box mt={1} mb={1}>
            <PhoneInput
              country={'in'}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputStyle={{
                width: '100%',
                height: '40px',
                fontSize: '14px',
              }}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: false,
              }}
              containerStyle={{ width: '100%' }}
              specialLabel=""
              isValid={() => (errors.phone ? '' : true)}
            />
            {errors.phone && (
              <Typography variant="caption" color="error">
                {errors.phone}
              </Typography>
            )}
          </Box>

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
