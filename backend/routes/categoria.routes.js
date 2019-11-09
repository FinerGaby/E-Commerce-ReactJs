const express = require('express');

const router = express.Router();

const Categorias = require('../models/categoria.models')

router.get('/', async (req, res) => {
    const getCategorias = await Categorias.find();
    res.json(getCategorias)
})

router.post('/', async (req, res) => {
    var reqBodys = {
        name: req.body.name,
        description: req.body.description
    }
    const categoriaNew = new Categorias(reqBodys)
    await categoriaNew.save()
    res.json({ status: 'Categoria guardada'})
})

module.exports = router