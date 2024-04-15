import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './userSlice'  
import { Button, TextField, CircularProgress, Alert, Container, Typography } from '@mui/material';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(setUser({ username: data.username, type: data.type }));
        } else {
            throw new Error(data.message || 'Failed to login');
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>Login</Typography>
      <div style={{ marginTop: '20px' }}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
        />
        {error && <Alert severity="error" style={{ margin: '20px 0' }}>{error}</Alert>}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          style={{ marginTop: '20px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </div>
    </Container>
  );
}

export default LoginPage;


