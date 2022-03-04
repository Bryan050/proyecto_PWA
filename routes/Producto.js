const express = require("express");
const router = express.Router();
const Producto = require('../controllers/Producto_contoller');

router.get("/", Producto.mostrarProductos);
router.get("/catalogo", Producto.mostrarCatalogo);
router.post('/create', Producto.aniadirProducto);
router.get("/all", Producto.listar);
router.get("/find/:id", Producto.buscarProducto);
router.put("/edit", Producto.modificarProducto);
router.delete('/delete/:id', Producto.eliminarProducto);


module.exports = router;