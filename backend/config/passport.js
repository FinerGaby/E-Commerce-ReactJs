//ACA CREO MIS ESTRAGIAS
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/usuarios.models')



passport.use('login', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, name, password, done) => {
  const userFind = await User.findOne({name: name, password: password});
  console.log(userFind)
  if(!userFind) {
    return done(null, false, {message: 'Error usuario no encontrado'})
  }
 /* no funciona?? probar luego if(user.password === password) {
    console.log('estoy aca')
    return done(null, false, {message: 'Error contraseña incorrecta'})
  } */
  return done(null, userFind);
}));

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'clavesecreta',
};

passport.use(
  'jwt',
  new JWTstrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload)
   const userId = await User.findById(jwt_payload.id)
    if (userId) {
      console.log('user found in db in passport');
      done(null, userId);
    } else {
      console.log('user not found in db');
      done(null, false);
    } 
  }),
);



/* 

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('login', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, name, password, done) => {
  const user = await User.findOne({name: name});
  console.log(user)
  if(!user) {
    return done(null, false, {message: 'no usuario'});
  }
  return done(null, user);
}));
 */