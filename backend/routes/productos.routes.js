const express = require('express');

const router = express.Router();

//busco los modelos de la base de datos
const Producto = require('../models/productos.models')

var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imagen')
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

router.post('/upload', upload.array('file'), async (req, res) => {
    console.log(req.files)
})
// "POST" guardar producto
router.post('/',upload.array('file'), async (req, res) => {
    var filenames = req.files.map(function(file) {
        return file.filename; // return name files
      });
      console.log(req.body)
    var precioNumber = parseInt(req.body.precio);
    console.log(typeof precioNumber)
    const reqBodys = {
        title: req.body.title,
        descripcion: req.body.description,
        precio: precioNumber,
        color: req.body.color,
        talle: req.body.talle,
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
router.put('/:id', async (req, res) => {
    const { title, descripcion, imagen, precio, color, talle, categoria } = req.body;
    const productoEdit = { title, descripcion, imagen, precio, color, talle, categoria };
    await Producto.findByIdAndUpdate(req.params.id, productoEdit)
    res.json({ status: 'Producto editado'})
})



//modulo exporto
module.exports = router;