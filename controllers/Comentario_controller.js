const db = require('../models');
const ApiError = require('../error/ApiError');

module.exports = {
    aniadirComentario: async (req, res, next)=>{
        const today = new Date().toISOString().slice(0, 10);
        //console.log(today);
        const {autor, contenido} = await req.body;
        const Comentario = await db.comentario.create({
            autor: autor,
            contenido: contenido,
            fecha: today
        }).catch(error=>next(ApiError.internal(error.message)));    
        await res.status(201).send(Comentario);
    },

    listar: async(req, res, next)=>{
        const comentarios = await db.comentario.findAll().catch(error=>next(ApiError.internal(error.message)));
        if(comentarios.length === 0){
            next(ApiError.notFound("No se han añadido comentarios"));
            return;
        }
        await res.send(comentarios);
    },
    
    mostrarCategorias: async(req, res, next)=>{
        const comentarios = await db.comentario.findAll({
            raw:true
        }).catch(error=>next(ApiError.internal(error.message)));
        if(categorias.length === 0){
            next(ApiError.notFound("No se han añadido categorias"));
            return;
        }
        await res.render('comentarios.hbs', {comentarios});
    },

    buscarComentario: async(req, res, next)=>{
        const comentarios = await db.comentario.findAll({
            where: {
                id: req.params.id
            }
        }
        ).catch(error=>next(ApiError.internal(error.message)));
        if(comentarios.length === 0){
            next(ApiError.badRequest("Comentario no encontrado"));
            return;
        }
        await res.send(comentarios);
    },
    
    modificarComentario: async(req, res, next)=>{
        const {id, contenido} = await req.body;
        const modificados = db.comentario.update({
            contenido: contenido
        },
        {
            where: {id: id}
        }).catch(error=>next(ApiError.internal(error.message)));
        if(modificados.length === 0){
            next(ApiError.badRequest("Comentario no encontrado"));
            return;
        }
        await res.send(modificados);
    },
    
    eliminarComentario: async(req, res, next)=>{
        const eliminados = await db.comentario.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error=>next(ApiError.internal(error.message)));
        
        if(eliminados === 0){
            next(ApiError.badRequest("Comentario no encontrado"));
            return;
        }
        await res.send("Eliminado exitosamente");
    }
};