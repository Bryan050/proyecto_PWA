const db = require('../models');
const ApiError = require('../error/ApiError');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    aniadirProducto: async (req, res, next)=>{
        const {descripcion, precio,categoriumId, link, imagen} = await req.body;
        const Producto = await db.producto.create({
            descripcion: descripcion,
            precio: precio,
            categoriumId: categoriumId,
            link: link,
            imagen: imagen
        }).catch(error=>next(ApiError.internal(error.message)));    
        await res.status(201).send(Producto);
    },

    listar: async(req, res, next)=>{
        const productos = await db.producto.findAll(
            {
                include: {
                    model: db.categoria,
                    include: [ /* etc */ ]
                  }
            }
        ).catch(error=>next(ApiError.internal(error.message)));
        if(productos.length === 0){
            next(ApiError.notFound("No se han añadido productos"));
            return;
        }
        await res.send(productos);
    },
    
    mostrarProductos: async (req, res, next)=>{
        const productos = await db.producto.findAll({
            include: {
                model: db.categoria,
                include: [ /* etc */ ]
              }
        }).catch(error=>next(ApiError.internal(error.message)));
        if(productos.length === 0){
            next(ApiError.notFound("No se han añadido productos"));
            return;
        }
        
        await res.render('productos.hbs', {productos});
    },

    mostrarCatalogo: async (req, res, next)=>{
        const productos = await db.producto.findAll({
            include: {
                model: db.categoria,
                include: [ /* etc */ ]
              }
        }).catch(error=>next(ApiError.internal(error.message)));
        if(productos.length === 0){
            next(ApiError.notFound("No se han añadido productos"));
            return;
        }
        await res.render('catalogo_productos.hbs', {productos});
    },

    buscarProducto: async(req, res, next)=>{
        const productos = await db.producto.findAll({
            where: {
                id: req.params.id
            }
        }
        ).catch(error=>next(ApiError.internal(error.message)));
        if(productos.length === 0){
            next(ApiError.badRequest("Producto no encontrado"));
            return;
        }
        await res.send(productos);
    },
    buscarProductoPorDescripcion: async(req, res, next)=>{
        const productos = await db.producto.findAll({
            where: {
                descripcion: {
                  [Op.like]: '%'+req.params.buscar+'%'
                }
             },
        }
        ).catch(error=>next(ApiError.internal(error.message)));
        if(productos.length === 0){
            next(ApiError.badRequest("Producto no encontrado"));
            return;
        }
        await res.send(productos);
    },
    buscarProductoPorCategoria: async(req, res, next)=>{
        const productos = await db.producto.findAll({
            where: {
                categoriumId: req.params.id
             },
        }
        ).catch(error=>next(ApiError.internal(error.message)));
        if(productos.length === 0){
            next(ApiError.badRequest("Producto no encontrado"));
            return;
        }
        await res.send(productos);
    },
    
    modificarProducto: async(req, res, next)=>{
        const {id, descripcion, precio,categoriumId, link, imagen} = await req.body;
        const modificados = await db.producto.update({
            descripcion: descripcion,
            precio: precio,
            categoriumId: categoriumId,
            link: link,
            imagen: imagen
        },
        {
            where: {id: id}
        }).catch(error=>next(ApiError.internal(error.message)));
        if(modificados === 0){
            next(ApiError.badRequest("Producto no encontrado"));
            return;
        }
        await res.send(modificados);
    },
    
    eliminarProducto: async(req, res, next)=>{
        const eliminados = await db.producto.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error=>next(ApiError.internal(error.message)));
        
        if(eliminados === 0){
            next(ApiError.badRequest("Producto no encontrado"));
            return;
        }
        await res.send("Eliminado exitosamente");
    }
};