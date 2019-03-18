const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post("/signup", passport.authenticate('signup', {session : false}), (req, res) => {
    
    res.json({ 
        message : 'Signup successful',
        user : req.user 
      });
});

router.post('/login', async (req, res, next) => {

    passport.authenticate('login', async (err, user, info) => {
        
        console.log("2");
        try {
            if(err || !user){
                const error = new Error('An Error occured')
                return next(error);
            }
            req.login(user, { session : false }, async (error) => {
                if( error ) return next(error)
                    
                    const body = { _id : user._id, username : user.username };

                    const token = jwt.sign({ user : body },'top_secret');

                    return res.json({ token });
                });    
        } catch (error) {
        return next(error);
      }
    })(req, res, next);
});

module.exports = router;