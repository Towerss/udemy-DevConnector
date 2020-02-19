'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

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

    // Data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    // Get values from request body
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
      } = req.body;
  
      // Build profile object
      let profileFields = {};
      profileFields.user = req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;
      if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
      }

      // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    // Check if the profile exists. If it exists, update.
    try {
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){

            // Update
            try {
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profile},
                    {new: true}, (err) => { console.log("Try update error:" + err); }
                );
            } catch (error) {
                console.log("Error inside profile update");
                console.log(error.message);
            }
            return res.status(200).json(profile);
        } else {
            // Create
            profile = new Profile(profileFields);

            await profile.save();

            return res.status(200).json(profile); 
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }



});


module.exports = router;