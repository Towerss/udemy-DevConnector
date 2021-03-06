'use strict';
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

/*
@route  POST api/users
@desc   Register user
@access Public
*/
router.post('/', [
    check('name', 'Name is required').not().notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    //Data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    //Get values from request body
    const {name, email, password} = req.body;

    try {

        //Check if the user exists
        try {
            let existingUser = await User.findOne({ email: email });
            if(existingUser){
                return res.status(400).json( { errors: [{msg: 'User already exists'}] } );  //This json is to match the data valiation messages
            }
        } catch (error) {
            console.trace('Check if the user exists');
            return res.status(400).json( { errors: [{msg: error.message}]} )
        }

       //Get user gravatar
        const avatar = gravatar.url(email, {
            s: '200', //size
            r: 'pg', //audience rating
            d: 'mm' //Default icon
        });

        //Create new instance of User
        const user = new User({
            name,
            email,
            avatar
        });

        //Encrypt password
        try {
            const salt = await bcrypt.genSalt(12);
            user.hashPassword = await bcrypt.hash(password, salt);
        } catch (error) {
            console.trace('Encrypt password');
            res.status(400).json( { errors: [{msg: error.message}]} );
        }

        //Save user to database
        try {
            await user.save();
        } catch (error) {
            console.trace('Save user to database');
            res.status(400).json( { errors: [{msg: error.message}]} );
        }
        
        //Return jsonwebtoken
        const payload = {
            user:{
                id: user.id
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
        console.trace('Register User Error');
        return res.status(500).json( { errors: [{msg: error.message}]});
    }

});

module.exports = router;