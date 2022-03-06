const express = require("express");
const router = express.Router();
const Blog = require('../controllers/Blog_controller');

router.get("/posts", Blog.mostrarBlogs);
router.get("/home", Blog.mostrarPublicados);
router.get("/editor", Blog.mostrarEditor);
router.post('/create', Blog.aniadirBlog);
router.get("/all", Blog.listar);
router.get("/find/:id", Blog.buscarBlog);
router.get("/findByCategory/:id", Blog.buscarPorCategoria);
router.get("/lastEntry", Blog.lastEntry);
router.put("/edit", Blog.modificarBlog);
router.delete('/delete/:id', Blog.eliminarBlog);

router.get('/contactenos',(req, res)=>{
    res.render('contact.hbs');
});

router.get('/post',(req, res)=>{
    res.render('post.hbs');
});

module.exports = router;