const express = require('express');

const router = express.Router();

//busco los modelos de la base de datos
const Producto = require('../models/productos.models')


//mando get ".find" parametro de mongodb, mostrar todos los user
router.get('/',async(req, res) => {
    const productoAll = await Producto.find();
    res.json(productoAll);
});

router.get('/:id', async (req, res ) => {
    const productoOne = await Producto.findById(req.params.id)
    res.json(productoOne)
})


// "POST" guardar producto
router.post('/', async (req, res) => {
    console.log(req.body)
    const { title, descripcion, imagen, precio, color, talle, categoria } = req.body;
    const newProducto = new Producto({ title, descripcion, imagen, precio, color, talle, categoria });
    await newProducto.save();
    res.json({ status: 'Producto Save'});
})

// "DELETE" borrar producto por id
router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    await Producto.findByIdAndRemove(req.params.id)
    res.json({ status: 'Producto borrado' })
})


// "PUT" editar producto por id
router.put('/:id', async (req, res) => {
    const { title, descripcion, imagen, precio, color, talle, categoria } = req.body;
    const productoEdit = { title, descripcion, imagen, precio, color, talle, categoria };
    await Producto.findByIdAndUpdate(req.params.id, productoEdit)
    res.json({ status: 'Producto editado'})
})



//modulo exporto
module.exports = router;