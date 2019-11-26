const express = require('express');

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





module.exports = router