const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const multer = require('multer');
const PORT = process.env.PORT || 1000;


mongoose.connect('mongodb://localhost:27017/myapp', {
});

const user = mongoose.model('User', {
    username: String,
    password: String,
    email: String,
    imagePath: String,
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, req);
    },
    filename: function(req, file, cb) {
        cb(null, path.extname(file.originalname));
    },
});

const upload = multer({ 
    storage: storage, 
    fileFilter: function(req, file, cb) {
        const filePath = path.extname(file.originalname);
        if (filePath!== '.png' && filePath!== '.jpg' && filePath!== '.jpeg' && filePath!== '.gif') {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

app.use(express.json());

app.post('/user/create', async(req, res) =>{
    const {username, password, email} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({error: 'Invalid email'});
    }

    if (password.length < 6){
        return res.status(400),json({error: "At least 6 characters required"});
    }

    const newUser = new User({
        username: username,
        password: password,
        email: email,
    })

    await newUser.save();
    res.status(200).json({message: 'Saved'});
});

app.post('/user/edit', async(req, res) =>{
    const {username, password, email} = req.body;
    
    if(!username){
        return res.status(400).json({error: 'Username is required'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({error: 'Invalid email'});
    }

    if (password.length < 6){
        return res.status(400),json({error: "At least 6 characters required"});
    }

    const newUser = new User({
        username: username,
        password: password,
        email: email,
    })

    await newUser.save();
    res.status(200).json({message: 'Saved'});
});

app.delete('/user/delete', async(req, res) => {
    const email= req.body.email;
    const result = await User.deleteOne({email});
    if (result.deleteCount === 0) {
        return res.status(400).json({error: 'User not found'});
    }
    res.status(200).json({message: 'Deleted'});
});

app.get('/user/retrieve', async(req, res) => {
    const user  = await User.find({}, 'username, password, email');
    res.json(user);
});

app.post('/user/image', (req, res) => {
    upload(req, res, async function (err){
        if (err instanceof multer.MulterError) {
            return res.status(400).json({error: err.message});
        }
        const email = req.body.email;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }
        user.imagePath = req.file.path;
        await user.save();
        res.status(200).json({message: 'Saved'});
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
