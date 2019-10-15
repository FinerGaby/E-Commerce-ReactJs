const express = require('express');

const router = express.Router();

const Categorias = require('../models/categoria.models')

router.get('/', async (req, res) => {
    const getCategorias = await Categorias.find();
    res.json(getCategorias)
})

module.exports = router