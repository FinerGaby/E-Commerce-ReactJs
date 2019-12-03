const express = require('express');
const router = express.Router();
const mercadopago = require ('mercadopago');

router.post('/pagar', (req, res, next) => {
    console.log(req.body.items[0].name)
    const { name, mount } = req.body.items[0];
    // Agrega credenciales
    mercadopago.configure({
        sandbox: true,
        access_token: 'TOKENTUYO'
    });
  
  // Crea un objeto de preferencia
    let preference = {
        items: [
        {
            title: name,
            unit_price: mount,
            quantity: 1,
        }
        ]
    };

    mercadopago.preferences.create(preference)
    .then(function(response){
        console.log(response)
    // Este valor reemplazará el string "$$init_point$$" en tu HTML
    //global.init_point = response.body.init_point;
    }).catch(function(error){
    console.log(error);
    });

})

module.exports = router