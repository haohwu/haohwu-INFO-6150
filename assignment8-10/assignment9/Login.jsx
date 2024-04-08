import React, {userState} from 'react';
import {userHistory} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const histoty = userHistory();

    const handelLogin = async () => {
        try {
            const response = await axios.post('/login', {
                username,
                password
            });
            console.log(response.data);
        } catch (error) {
            console.error("Login error: " + error.response.data.errorMessage);
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={handelLogin}>Login</button>
                {error && <p>{error}</p>}
            </form>
            <button onClick={() => histoty.push('/job')}>Job</button>
            <button onClick={() => histoty.push('/job/listen')}>Job Listen</button>
            <button onClick={() => histoty.push('/company')}>Company</button>
        </div>
        )
}
export default Login;