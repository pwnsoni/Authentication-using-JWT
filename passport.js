const passport = require('passport');

var localStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

    const User = require("./models/user");
    require('./auth/auth');

passport.use('signup', new localStrategy({
    usernameField : 'username',
    passwordField : 'password'
    },
    async (username, password, done) => {
        try {
            const user = await User.create({ username, password });
            return done(null, user);
          } catch (error) {
            done(error);
          }
    }
));

passport.use('login', new localStrategy({
    usernameField : 'username',
    passwordField : 'password'
  }, async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if( !user ){
        return done(null, false, { message : 'User not found'});
      }
    const validate = await user.isValidPassword(password);
      if( !validate ){
        return done(null, false, { message : 'Wrong Password'});
      }

      return done(null, user, { message : 'Logged in Successfully'});
    } 
    catch (error) {
      return done(error);
    }
  }));