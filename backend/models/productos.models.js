const mongoose = require('mongoose')

const {Schema} = mongoose;

// crear mas archivos models para cada base de datos
// creacion de la base de datos, datos
const ProductoSchema = new Schema({
    title: {
        type: String, required: true
    },
    precio: {
        type: String, required: true
    },
    categoria: {
        type: String, required: true
    },
    descripcion: {
        type: String, required: true
    },
    color: {
        type: Array, required: true
    },
    talle: {
        type: Array, required: true
    },
    imagen: {
        type: Array, required: true
    }
});

// exportando modulos
module.exports = mongoose.model('Producto', ProductoSchema)