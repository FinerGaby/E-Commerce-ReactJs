const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();


const Usuarios = require('../models/usuarios.models')

router.get('/', async (req, res) => {
    const getUsuarios = await Usuarios.find();
    res.json(getUsuarios)
})

router.post('/', async (req, res) => {
    console.log(req.body)
    var reqBodys = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const usuarioNew = new Usuarios(reqBodys)
    await usuarioNew.save()
    res.json({ status: 'Usuario registrado'})
})

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, users, info) => {
    if(err) {
      console.log(err);
    }
    //validacion de los mensajes
    if(info !== undefined) {
       if(info.message === 'Error usuario no encontrado')
          // usuario no encontrado
          res.send(info.message)
       else {
         //contraseña incorrecta
         res.send(info.message)
       }
    } else {
    req.logIn(users, async (err) => {
      const usuarioFind = await Usuarios.findOne({name: users.name})
      const token = jwt.sign({ id: usuarioFind.id }, 'clavesecreta', {
        expiresIn: 60 * 60,
      });
      console.log(token)
      res.status(200).send({
        auth: true,
        token,
        message: 'usuario logeado',
      });
    });
  }

  })(req, res, next);
});


router.get('/datosuser', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, users, info) => {
    /* if(err) {
      console.log(err);
    }
    const usuarioFind = await Usuarios.findOne({name: users.name})
    res.status(200).send({
      auth: true,
      first_name: usuarioFind.first_name,
      email: usuarioFind.email,
      message: 'user found in db',
    }); */
  })(req, res, next);
});





/* 
  router.post('/login',
passport.authenticate('login', { failureRedirect: '/login' }),
function(req, res) {
  console.log(req.body)
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send({ message: 'temandoeltoken'})
}); */


module.exports = router