const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

var localStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require("./models/user");
require('./auth/auth');
require('./passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("on root route!!!!!");
});

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

app.use('/', routes);
app.use('/user', passport.authenticate('jwt', {session : false}), secureRoute);
  
  

app.listen(3000, (err) => {
    if(!err){
        console.log("on 3000!!!!!!!!!!!!");
    }
});