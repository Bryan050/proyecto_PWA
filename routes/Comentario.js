const express = require("express");
const router = express.Router();
const Comentario = require('../controllers/Comentario_controller');

router.post('/create', Comentario.aniadirComentario);
router.get("/all", Comentario.listar);
router.get("/find/:id", Comentario.buscarComentario);
router.put("/edit", Comentario.modificarComentario);
router.delete('/delete/:id', Comentario.eliminarComentario);

module.exports = router;