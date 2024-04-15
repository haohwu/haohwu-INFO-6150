const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use(express.static('public'));

app.use(session({
    secret: 'your_secret_key', 
    resave: false,             
    saveUninitialized: false,  
    cookie: { secure: true }   
}));


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

let jobs = [];
let users = [];
app.post('/register', (req, res) => {
    const { username, password, type } = req.body;

    if (!username || !password || !type) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!['admin', 'employee'].includes(type)) {
        return res.status(400).json({ message: 'Invalid user type' });
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = { username, password, type };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully', user: { username, type } });
});


// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = { username: user.username, type: user.type };
        res.json({
            message: 'Login successful',
            username: user.username,
            type: user.type
        });
    } else {
        // If credentials are wrong
        res.status(401).json({ message: 'Authentication failed: Invalid username or password' });
    }
});

app.get('/jobs', (req, res) => {
    if (!req.session.user) {
        res.status(401).json({ message: 'You must be logged in to view jobs' });
    } else {
        res.json(jobs);
    }
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
    res.json(jobs);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
