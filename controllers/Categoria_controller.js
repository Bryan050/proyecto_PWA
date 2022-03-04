const db = require('../models');
const ApiError = require('../error/ApiError');
module.exports = {
    aniadirCategoria: async (req, res, next)=>{
        const {nombre} = await req.body;
        const Categoria = await db.categoria.create({
            nombre: nombre
        }).catch(error=>next(ApiError.internal(error.message)));    
        await res.status(201).send(Categoria);
    },

    listar: async(req, res, next)=>{
        const categorias = await db.categoria.findAll().catch(error=>next(ApiError.internal(error.message)));
        if(categorias.length === 0){
            next(ApiError.notFound("No se han añadido categorias"));
            return;
        }
        await res.send(categorias);
    },

    mostrarCategorias: async(req, res, next)=>{
        const categorias = await db.categoria.findAll({
            raw:true
        }).catch(error=>next(ApiError.internal(error.message)));
        if(categorias.length === 0){
            next(ApiError.notFound("No se han añadido categorias"));
            return;
        }
        await res.render('categorias.hbs', {categorias});
    },

    buscarCategoria: async(req, res, next)=>{
        const categorias = await db.categoria.findAll({
            where: {
                id: req.params.id
            }
        }
        ).catch(error=>next(ApiError.internal(error.message)));
        if(categorias.length === 0){
            next(ApiError.badRequest("Categoria no encontrada"));
            return;
        }
        await res.send(categorias);
    },
    
    modificarCategoria: async(req, res, next)=>{
        const {id, nombre} = await req.body;
        const modificados = db.categoria.update({
            nombre: nombre
        },
        {
            where: {id: id}
        }).catch(error=>next(ApiError.internal(error.message)));
        if(modificados.length === 0){
            next(ApiError.badRequest("Categoria no encontrada"));
            return;
        }
        await res.send(modificados);
    },
    
    eliminarCategoria: async(req, res, next)=>{
        const eliminados = await db.categoria.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error=>next(ApiError.internal(error.message)));
        
        if(eliminados === 0){
            next(ApiError.badRequest("Categoria no encontrada"));
            return;
        }
        await res.send("Eliminado exitosamente");
    }
};