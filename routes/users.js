const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

//User Model
const User = require('../models/User')

//Login
router.get('/login', (req, res) => {
    res.render('login')
})
//Register
router.get('/register', (req, res) => {
    res.render('register')
})

//Register Handle
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;

    let errors = [];

    //Check required Fields
    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'})
    }

    //Check Password matchign
    if (password !== password2) {
        errors.push({msg: 'Password do not match'})
    }

    //Check if Password is longer than 6 char
    if (password.length < 6) {
        errors.push({msg: 'Password should be greater than 6 characters'})
    }

    if (errors.length > 0) {
        res.render('register',
            {
                errors,
                name,
                email,
                password,
                password2
            }
        )
        ;
    } else {
        User.findOne({email: email})
            .then(user => {
                if (user) {
                    errors.push({msg: 'Email is already registered'})
                    res.render('register',
                        {
                            errors,
                            name,
                            email,
                            password,
                            password2
                        })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    console.log(newUser)
                    res.send('Hello')
                }
            });
    }
});

module.exports = router;
