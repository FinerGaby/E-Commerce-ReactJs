const express = require('express');

const router = express.Router();

//busco los modelos de la base de datos
const Producto = require('../models/productos.models')

var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/img')
  },
  filename: function (req, file, cb) {
      cb(null, req.body.title.toUpperCase() + file.originalname);        
  }
})

var upload = multer({ storage: storage })



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
router.post('/',upload.array('file'), async (req, res) => {
    var filenames = req.files.map(function(file) {
        return file.filename; // return name files
      });
      console.log(req.body)
    var precioNumber = parseInt(req.body.precio);
    var jsonParseArrayTalle = JSON.parse(req.body.talle)
    var jsonParseArrayColor =JSON.parse(req.body.color)
   
    console.log(typeof precioNumber)
    const reqBodys = {
        title: req.body.title,
        descripcion: req.body.description,
        precio: precioNumber,
        color: jsonParseArrayColor,
        talle: jsonParseArrayTalle,
        categoria: req.body.categoria,
        imagen: filenames
    }
     const newProducto = new Producto(reqBodys);
    console.log(newProducto)
    await newProducto.save();
    res.json({ status: 'Producto Save'})  
})

// "DELETE" borrar producto por id
router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    await Producto.findByIdAndRemove(req.params.id)
    res.json({ status: 'Producto borrado' })
})


// "PUT" editar producto por id
router.put('/:id',upload.array('file'), async (req, res) => {
  
    if (Array.isArray(req.files) && req.files.length) {
        var nameFiles = req.files.map(function(file) {
            return file.filename; // return name files
        });
            console.log(typeof req.body.file)
        if(typeof req.body.file === "string") {
                var arr = new Array(req.body.file)
                var filenames = arr.concat(nameFiles)
        } else {
                var filenames = req.body.file.concat(nameFiles)
            }
        } else {
                var filenames = req.body.file
    }

    var precioNumber = parseInt(req.body.precio);
    var jsonParseArrayTalle = JSON.parse(req.body.talle)
    var jsonParseArrayColor =JSON.parse(req.body.color)
   
    console.log(typeof precioNumber)
    const reqBodys = {
        title: req.body.title,
        descripcion: req.body.description,
        precio: precioNumber,
        color: jsonParseArrayColor,
        talle: jsonParseArrayTalle,
        categoria: req.body.categoria,
        imagen: filenames
    }
    await Producto.findByIdAndUpdate(req.params.id, reqBodys)
    res.json({ status: 'Producto editado'})
})



//modulo exporto
module.exports = router;