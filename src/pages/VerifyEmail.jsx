import React, { useRef, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    Paper,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
    const location = useLocation();
    const email = location.state?.email || '';

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [resendTimer, setResendTimer] = useState(60);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
        const timer =
            resendTimer > 0 &&
            setInterval(() => setResendTimer((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return;

        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);
        setError('');

        if (value && index < 5) {
            setTimeout(() => {
                inputRefs.current[index + 1]?.focus();
            }, 10);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const updatedCode = [...code];

            if (code[index] === '' && index > 0) {
                updatedCode[index - 1] = '';
                inputRefs.current[index - 1].focus();
            } else {
                updatedCode[index] = '';
            }

            setCode(updatedCode);
        }
    };

    const handleFocus = (index) => {
        if (index > 0 && code[index - 1] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullCode = code.join('');
      
        if (fullCode.length < 6) {
          setError('Please enter all 6 digits to verify.');
          return;
        }
      
        const payload = {
          email,
          code: fullCode,
        };
      
        console.log('Final JSON payload:', payload);
      
        setError('');
      };
      

    const handleResend = () => {
        setResendTimer(60);
        console.log('Resend code triggered');
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
                <Box textAlign="center" mb={2}>
                    <Typography variant="h6" fontWeight="600">
                        Verify Your Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        We’ve sent a 6-digit code to <strong>{email}</strong>
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" justifyContent="space-between" gap={1} mb={2}>
                        {code.map((digit, index) => (
                            <TextField
                                key={index}
                                inputRef={(el) => (inputRefs.current[index] = el)}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={() => handleFocus(index)}
                                inputProps={{
                                    maxLength: 1,
                                    style: {
                                        textAlign: 'center',
                                        fontSize: '1.5rem',
                                        width: '3rem',
                                    },
                                }}
                            />
                        ))}
                    </Box>

                    {error && (
                        <Typography color="error" textAlign="center" mb={1}>
                            {error}
                        </Typography>
                    )}

                    <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
                        Verify
                    </Button>

                    <Box textAlign="center">
                        {resendTimer > 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                Resend code in <strong>{resendTimer}s</strong>
                            </Typography>
                        ) : (
                            <Button variant="text" onClick={handleResend}>
                                Resend Code
                            </Button>
                        )}
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default VerifyEmail;
