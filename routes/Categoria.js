const express = require("express");
const router = express.Router();
const Categoria = require('../controllers/Categoria_controller');

router.get("/", Categoria.mostrarCategorias);
router.post('/create', Categoria.aniadirCategoria);
router.get("/all", Categoria.listar);
router.get("/find/:id", Categoria.buscarCategoria);
router.put("/edit", Categoria.modificarCategoria);
router.delete('/delete/:id', Categoria.eliminarCategoria);

module.exports = router;