'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');


/*
@route  GET api/auth
@desc   Test route
@access Public
*/
router.get('/', auth, async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.trace('Authorization Error routes/api/auth.js');
        console.log(error.message);
        return res.status(500).json( { errors: [{msg: error.message}]} );
    }

});


/*
@route  POST api/auth
@desc   Authenticate user and get token
@access Public
*/
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    //Data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    //Get values from request body
    const {email, password} = req.body;

    try {

        //Check if the user exists
        let existingUser = undefined;
        try {
            existingUser = await User.findOne({ email: email });
            if(!existingUser){
                return res.status(400).json( { errors: [{msg: 'Invalid credentials'}] } );  //This json is to match the data valiation messages
            }
        } catch (error) {
            console.trace('Check if the user exists');
            console.log(error.message);
            return res.status(400).json( { errors: [{msg: error.message}]} )
        }        

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if(!isMatch){
            return res.status(400).json( { errors: [{msg: 'Invalid credentials password'}] } );  //This json is to match the data valiation messages
        }

        //Return jsonwebtoken
        const payload = {
            user:{
                id: existingUser.id
            }
        };

        //Sign the token and send it to the user
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {  //3600 for production
            if(err){
                throw err;
            }
            res.status(200).json({ token: token });
        }); 

    } catch (error) {
        console.trace('Authenticate user and get token Error');
        return res.status(500).json( { errors: [{msg: error.message}]});
    }

});

module.exports = router;