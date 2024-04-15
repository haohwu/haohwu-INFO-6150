const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const multer = require('multer');
const PORT = process.env.PORT || 1000;

mongoose.connect('mongodb://localhost:27017/myapp', {});

const User = mongoose.model('User', {
    fullName: String,
    password: String,
    email: String,
    imagePath: String,
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/');  
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ 
    storage: storage, 
    fileFilter: function(req, file, cb) {
        const filePath = path.extname(file.originalname);
        if (!['.png', '.jpg', '.jpeg', '.gif'].includes(filePath)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

app.use(express.json());

app.post('/user/create', async(req, res) => {
    const {fullName, password, email} = req.body;
    if (!fullName || fullName.length < 3) {
        return res.status(400).json({error: 'Full name must be at least 3 characters long'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({error: 'Invalid email'});
    }

    if (!password || password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return res.status(400).json({error: "Password must be at least 8 characters long and include both letters and numbers"});
    }

    const newUser = new User({
        fullName,
        password,
        email,
    });

    await newUser.save();
    res.status(201).json({message: 'User created successfully'});
});

app.put('/user/edit', async(req, res) => {
    const {fullName, password, email} = req.body;

    if (!fullName || fullName.length < 3) {
        return res.status(400).json({error: 'Full name must be at least 3 characters long'});
    }

    if (!password || password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return res.status(400).json({error: "Password must be at least 8 characters long and include both letters and numbers"});
    }

    const updatedUser = await User.findOneAndUpdate({email}, {
        fullName, 
        password,
    }, {new: true});

    if (!updatedUser) {
        return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json({message: 'User details updated successfully'});
});

app.delete('/user/delete', async(req, res) => {
    const { email } = req.body;
    const result = await User.deleteOne({ email });
    if (result.deletedCount === 0) {
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json({message: 'User deleted successfully'});
});

app.get('/user/getAll', async(req, res) => {
    const users = await User.find({}, 'fullName email password');
    res.status(200).json(users);
});

app.post('/user/uploadImage', upload.single('image'), (req, res) => {
    const email = req.body.email;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        user.imagePath = req.file.path;
        user.save().then(() => res.status(200).json({message: 'Image uploaded successfully', path: req.file.path}));
    }).catch(err => {
        res.status(400).json({error: err.message});
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});