const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/secret', passport.authenticate('jwt', { session : false }), (req, res) => {
    res.json({
        message : 'You made it to the secure route',
        user : req.user,
        token : req.query.secret_token
    });
});

module.exports = router;

