const db = require('../models');
const ApiError = require('../error/ApiError');

module.exports = {
    aniadirProducto: async (req, res, next)=>{
        const {nombre, descripcion, precio,categoriumId, link} = await req.body;
        const Producto = await db.producto.create({
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoriumId: categoriumId,
            link: link
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
    
    modificarProducto: async(req, res, next)=>{
        const {id, nombre, descripcion, precio,categoriumId, link} = await req.body;
        const modificados = await db.producto.update({
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoriumId: categoriumId,
            link: link
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