const express = require("express");
const router = express.Router();
const Usuario = require('../controllers/Usuario_controller');

router.post('/create', Usuario.aniadirUsuario);
router.get("/all", Usuario.listar);
router.get("/find/:id", Usuario.buscarUsuario);
router.get("/findByCredential/:usuario/:password", Usuario.buscarPorCredencial);
router.put("/edit",Usuario.modificarUsuario);
router.delete('/delete/:id', Usuario.eliminarUsuario);


router.get('/perfil', (req, res)=>{
    res.render('profile.hbs');
});

router.get('/register',(req, res)=>{
    res.render('register.hbs');
});

router.get('/login', (req, res)=>{
    res.render('login.hbs');
});


module.exports = router;