import React, { useState } from 'react';
import { loginUser } from '../assignment9/api/';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password);
            console.log('Login Successful', response.data);
        } catch (error) {
            console.error('Login Failed', error);
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
