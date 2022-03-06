const db = require('../models');
const ApiError = require('../error/ApiError');

module.exports = {
    aniadirBlog: async (req, res, next)=>{
        const today = new Date().toISOString().slice(0, 10);
        const {autor, titulo,  contenido, estado, usuario, categoria, producto} = await req.body;
        const Blog = await db.blog.create({
            autor: autor,
            titulo: titulo,
            contenido: contenido,
            fecha_publicacion: today,
            estado: estado,
            categoriumId: categoria,
            usuarioId: usuario
        }).catch(error=>next(ApiError.internal(error.message)));    
        await res.status(201).send(Blog);
    },

    mostrarEditor: async (req, res, next)=>{
        await res.render('text_editor.hbs');
    },

    listar: async(req, res, next)=>{
        const blogs = await db.blog.findAll().catch(error=>next(ApiError.internal(error.message)));
        if(blogs.length === 0){
            next(ApiError.notFound("No se han añadido blogs"));
            return;
        }
        await res.send(blogs);
    },

    mostrarBlogs: async(req, res, next)=>{
        const blogs = await db.blog.findAll({
            raw:true
        }).catch(error=>next(ApiError.internal(error.message)));
        if(blogs.length === 0){
            next(ApiError.notFound("No se han añadido blogs"));
            return;
        }

        await res.render('entradas_blog.hbs', {blogs});
    },

    mostrarPublicados: async(req, res, next)=>{
        const blogs = await db.blog.findAll({
            raw:true,
            where: {
                estado: "publicado"
            }
        }).catch(error=>next(ApiError.internal(error.message)));
        if(blogs.length === 0){
            next(ApiError.notFound("No se han añadido blogs"));
            return;
        }

        await res.render('blogs.hbs', {blogs});
    },
    
    buscarBlog: async(req, res, next)=>{
        const blogs = await db.blog.findAll({
            where: {
                id: req.params.id
            }
        }).catch(error=>next(ApiError.internal(error.message)));
        if(blogs.length === 0){
            next(ApiError.badRequest("Blog no encontrada"));
            return;
        }
        await res.send(blogs);
    },
    buscarPorCategoria: async(req, res, next)=>{
        const blogs = await db.blog.findAll({
            where: {
                categoriumId: req.params.id
            }
        }).catch(error=>next(ApiError.internal(error.message)));
        if(blogs.length === 0){
            next(ApiError.badRequest("Blog no encontrada"));
            return;
        }
        await res.send(blogs);
    },
    
    modificarBlog: async(req, res, next)=>{
        const {id,autor, titulo, contenido, estado, producto, categoria, comentario, usuario} = await req.body;
        console.log(req.body);
        const modificados = await db.blog.update({
            autor: autor,
            titulo: titulo,
            contenido: contenido,
            estado: estado,
            productoId: producto,
            categoriumId: categoria,
            comentarioId: comentario,
            usuarioId: usuario,         
        },
        {
            where: {id: id}
        }).catch(error=>next(ApiError.internal(error.message)));
        if(modificados.length === 0){
            next(ApiError.badRequest("Blog no encontrada"));
            return;
        }
        await res.send(modificados);
    },
    
    eliminarBlog: async(req, res, next)=>{
        const eliminados = await db.blog.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error=>next(ApiError.internal(error.message)));
        
        if(eliminados === 0){
            next(ApiError.badRequest("Blog no encontrada"));
            return;
        }
        await res.send("Eliminado exitosamente");
    },
    lastEntry: async (req, res, next)=>{
        await db.blog.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
          }).then(function(entries){
            res.send(entries);
          }); 
    }
};