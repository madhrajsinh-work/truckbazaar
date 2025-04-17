import React from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      phone: Yup.string().required('Phone number is required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Username"
            name="username"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Phone Number"
            name="phone"
            type="tel"
            variant="outlined"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
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

        <Grid container spacing={1}>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
          <Typography variant="caption">
            Already have an account?{' '}
            <Button
              onClick={() => navigate('/')}
              size="small"
              sx={{ fontSize: '0.75rem', textTransform: 'none' }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
