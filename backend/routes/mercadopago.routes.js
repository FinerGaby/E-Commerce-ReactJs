const express = require('express');
const router = express.Router();
const mercadopago = require ('mercadopago');

router.post('/pagar', (req, res, next) => {
    console.log(req.body)
    // Agrega credenciales
    mercadopago.configure({
        sandbox: true,
        access_token: 'TEST-2250780401322990-091821-2fc3c319cc00c9e1b6e20ab983373dac-427886898'
    });
  
  // Crea un objeto de preferencia
    let preference = {
        items: req.body
    };

    mercadopago.preferences.create(preference)
  
     .then(response => {
         res.status(200).json(response.body)
        // modo sandbox: sandbox_init_point
        // modo producion: init_point
    // Este valor reemplazará el string "$$init_point$$" en tu HTML
    //global.init_point = response.body.init_point;
    }).catch(function(error){
    console.log(error);
    });

})

module.exports = router