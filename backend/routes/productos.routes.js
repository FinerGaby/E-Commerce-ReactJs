const express = require('express');

const router = express.Router();

//busco los modelos de la base de datos
const Producto = require('../models/productos.models')


//mando get "User.find" parametro de mongodb, mostrar todos los user
router.get('/',async(req, res) => {
    const users = await Producto.find();
    res.json(users);
});


// "POST" guardar producto
router.post('/', async(req, res) => {
    console.log(req.body)
    const { title, descripcion, imagen, precio, color, talle, categoria } = req.body;
    const newProducto = new Producto({ title, descripcion, imagen, precio, color, talle, categoria });
    await newProducto.save();
    res.json({ status: 'Producto Save'});
})




//modulo exporto
module.exports = router;