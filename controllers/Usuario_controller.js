const db = require('../models');
const ApiError = require('../error/ApiError');
const multer = require("multer");
const path = require("path");
//const async = require('hbs/lib/async');
module.exports = {
    aniadirUsuario: async (req, res, next)=>{
       
        const {usuario, password, nombre, direccion, cedula, rol, email} = await req.body;
        const Usuario = await db.usuario.create({
            usuario: usuario,
            password: password,
            nombre: nombre,
            direccion: direccion,
            cedula: cedula,
            rol: rol,
            email: email,
            foto: req.files.foto.data
        }).catch(error=>next(ApiError.internal(error.message)));    
        await res.status(201).send(Usuario);
    },

    listar: async(req, res, next)=>{
        const usuarios = await db.usuario.findAll().catch(error=>next(ApiError.internal(error.message)));
        if(usuarios.length === 0){
            next(ApiError.notFound("No se han añadido usuarios"));
            return;
        }
        await res.send(usuarios);
    },
    
    buscarUsuario: async(req, res, next)=>{
        const usuarios = await db.usuario.findAll({
            where: {
                id: req.params.id
            }
        }
        ).catch(error=>next(ApiError.internal(error.message)));
        if(usuarios.length === 0){
            next(ApiError.badRequest("Usuario no encontrado"));
            return;
        }
        await res.send(usuarios);
    },

    buscarPorCredencial: async(req, res, next)=>{
        console.log("PARAMETROS"+req.params);
        const usuarios = await db.usuario.findAll({
            where: {
                usuario: req.params.usuario,
                password: req.params.password
            }
        }
        ).catch(error=>next(ApiError.internal(error.message)));
        if(usuarios.length === 0){
            next(ApiError.badRequest("Usuario no encontrado"));
            return;
        }
        await res.send(usuarios);
    },
    
    modificarUsuario: async(req, res, next)=>{
        
        const {id, usuario, password, nombre, direccion, cedula, email} = await req.body;
        const modificados = await db.usuario.update({
            usuario: usuario,
            password: password,
            nombre: nombre,
            direccion: direccion,
            cedula: cedula,
            email: email,
            foto: req.files.foto.data
        },
        {
            where: {id: id}
        }).catch(error=>next(ApiError.internal(error.message)));
        if(modificados.length === 0){
            next(ApiError.badRequest("Usuario no encontrado"));
            return;
        }
        await res.send(modificados);
    },
    
    eliminarUsuario: async(req, res, next)=>{
        const eliminados = await db.usuario.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error=>next(ApiError.internal(error.message)));
        
        if(eliminados === 0){
            next(ApiError.badRequest("Usuario no encontrado"));
            return;
        }
        await res.send("Eliminado exitosamente");
    },
    
};