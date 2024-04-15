const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let jobs = [];
let users = [];
app.post('/register', (req, res) => {
    const { username, password, type } = req.body;

    // Check if all fields are provided
    if (!username || !password || !type) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user type is valid
    if (!['admin', 'employee'].includes(type)) {
        return res.status(400).json({ message: 'Invalid user type' });
    }

    // Simulate checking if the user already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    // Simulate saving the user
    const newUser = { username, password, type };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully', user: { username, type } });
});


// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.type === 'admin') {
            res.status(200).json({ 
                message: 'Login successful',
                username: user.username,
                type: user.type
            });
        } else {
            // User is found but not an admin
            res.status(401).json({ message: 'Login failed: User is not an admin' });
        }
    } else {
        // User not found or password does not match
        res.status(401).json({ message: 'Authentication failed' });
    }
});

// Fetch jobs route
app.get('/jobs', (req, res) => {
    res.status(200).json(jobs);
});

// Create job route
app.post('/create/job', (req, res) => {
    const { companyName, jobTitle, description, salary } = req.body;
    if (!companyName || !jobTitle || !description || !salary) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const newJob = { id: jobs.length + 1, companyName, jobTitle, description, salary };
    jobs.push(newJob);
    res.status(201).json(newJob);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
