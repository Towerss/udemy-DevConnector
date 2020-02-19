'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

/*
@route  GET api/profile/mine
@desc   Get current user profile
@access Private
*/
router.get('/mine', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ message: 'There is no profile for this user'})
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error at api/profile/mine');
    }
});

/*
@route  POST api/profile/mine
@desc   Create or update a user's profile
@access Private
*/
router.post('/', [auth, [
    check('status', 'Status is required')
        .not()
        .notEmpty(),
    check('skills', 'Skills is required')
        .not()
        .notEmpty()
]], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
});


module.exports = router;