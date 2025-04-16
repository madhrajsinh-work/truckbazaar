import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  useMediaQuery,
  useTheme,
  Link,
  Stack,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

const AuthPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    email: '',
    mobile: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = () => {
    console.log('Login Data:', loginData);
  };

  const handleSignupSubmit = () => {
    console.log('Signup Data:', signupData);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        backgroundColor: '#ffffff', // Set clean white bg
        px: 2, // Horizontal padding for small devices
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 450,
          borderRadius: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
          {tabValue === 0 ? 'Welcome Back!' : 'Create an Account'}
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            mb: 3,
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              '&:focus': {
                outline: 'none',
              },
            },
            '& .Mui-selected': {
              fontWeight: 'bold',
            },
          }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {tabValue === 0 ? (
          <Box>
            <TextField
              label="Username or Email"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Box display="flex" justifyContent="flex-end">
              <Link href="#" underline="hover" variant="body2">
                Forgot Password?
              </Link>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
              onClick={handleLoginSubmit}
            >
              Login
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3, mb: 1 }}>
              OR Login with
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                color="error"
                startIcon={<GoogleIcon />}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<FacebookIcon />}
              >
                Facebook
              </Button>
              <Button
                variant="outlined"
                sx={{ color: '#1DA1F2', borderColor: '#1DA1F2' }}
                startIcon={<TwitterIcon />}
              >
                Twitter
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box>
            <TextField
              label="Username"
              name="username"
              value={signupData.username}
              onChange={handleSignupChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={signupData.email}
              onChange={handleSignupChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={signupData.password}
              onChange={handleSignupChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={signupData.mobile}
              onChange={handleSignupChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
              onClick={handleSignupSubmit}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default AuthPage;
