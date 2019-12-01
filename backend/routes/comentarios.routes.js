const express = require('express');
const router = express.Router();

const Producto = require('../models/productos.models')

router.put('/', async (req, res) => {

    const ProductoFind = await Producto.findById(req.body.id)

    if(ProductoFind.archive.length === 0) {
        const reqBodyArray = {
            "archive": {
                "usuario": req.body.usuario,
                "comment": req.body.comment
            }
        }
        await Producto.findByIdAndUpdate(req.body.id, reqBodyArray)
        res.json({ status: 'Producto editado'})
    } else {
        const reqBodyArray = {
            "usuario": req.body.usuario,
            "comment": req.body.comment
    }
        const concat = ProductoFind.archive.concat(reqBodyArray)
        const pepe = {
            "archive": concat
        }
        await Producto.findByIdAndUpdate(req.body.id, pepe)
        res.json({ status: 'Producto editado'})
    }
})

module.exports = router