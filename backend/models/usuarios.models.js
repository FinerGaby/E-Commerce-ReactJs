const mongoose = require('mongoose')

const {Schema} = mongoose;


// crear mas archivos models para cada base de datos
// creacion de la base de datos, datos
const UsuariosSchema = new Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    }
})


// exportando modulos
module.exports = mongoose.model('Usuarios', UsuariosSchema)