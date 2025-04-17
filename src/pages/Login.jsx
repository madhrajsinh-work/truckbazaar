import React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
    },
    validationSchema: Yup.object({
      emailOrUsername: Yup.string().required('Username or Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });   

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
            {/* Please enter your credentials to access your trucking dashboard */}
            Login
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit} mt={2}>
          <TextField
            fullWidth
            margin="normal"
            label="Username or Email"
            name="emailOrUsername"
            size="small"
            value={formik.values.emailOrUsername}
            onChange={formik.handleChange}
            error={formik.touched.emailOrUsername && Boolean(formik.errors.emailOrUsername)}
            helperText={formik.touched.emailOrUsername && formik.errors.emailOrUsername}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            size="small"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
            <Box display="flex" justifyContent="end" mt={1}>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
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
            
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/signup')}
            >
              Don’t have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
