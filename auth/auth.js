const passport = require('passport');

const JWTstrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy({
  secretOrKey : 'top_secret',
  //we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));