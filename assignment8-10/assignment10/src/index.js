const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let jobs = [];
let users = [
    { username: "admin", password: "password123", type: "admin" }
];

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).json({ username: user.username, type: user.type, message: 'Login successful' });
    } else {
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
