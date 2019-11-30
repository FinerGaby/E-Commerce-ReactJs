const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");
const passport = require('passport');

const app = express();
//database
const { mongoose } = require('../database');
require('../config/passport');


//te transforma todo en json body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Settings
app.set("port", process.env.PORT || 8080);

// Middlawares
app.use(morgan('dev'));
//te transforma todo en json
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



//Habilitar CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');

    next();
  });


// Routes de la la base
// Api Productos
app.use('/api/productos', require('../routes/productos.routes'))

// Api Categorias
app.use('/api/categorias', require('../routes/categoria.routes'))

// Api Usuarios
app.use('/api/registrarse', require('../routes/registrarse.routes'))




// Starting The Server
app.listen(app.get('port'), () =>{
    console.log('server online');
});