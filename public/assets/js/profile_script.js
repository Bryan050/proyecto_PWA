import { Peticiones } from "./fetch_script.js";

var txtUsuario = document.getElementById("username");
var txtEmail = document.getElementById("email");
var txtNombre = document.getElementById("name");
var txtCedula = document.getElementById("cedula");
var txtDireccion = document.getElementById("address");
var lblUser = document.getElementById("lblUser");
var imgFotoPerfil = document.getElementById("imgFotoPerfil");
var btnCambiarFoto = document.getElementById("btnCambiar");

var id;

document.addEventListener("DOMContentLoaded", function(event) {
    var usuario = sessionStorage.getItem("usuario");
    const rutaFotoPerfil = sessionStorage.getItem("fotoPerfil");
    lblUser.innerHTML = usuario;
    imgFotoPerfil.setAttribute('src','../'+rutaFotoPerfil);
    getParameters();
    cargarDatos();
}); 

function getParameters(){
    var url_string = "http://localhost:3000/blogs/editor?id="+sessionStorage.getItem("id");//window.location.href;
    var url = new URL(url_string);
    id = url.searchParams.get("id");
}

function cargarDatos(){
    Peticiones.retrieve('/usuarios/find/'+id).then(usuario => {
        console.log(usuario[0]);
        txtUsuario.value = usuario[0].usuario;
        txtEmail.value = usuario[0].email;
        txtNombre.value = usuario[0].nombre;
        txtCedula.value = usuario[0].cedula;
        txtDireccion.value = usuario[0].direccion;
    });
   }
   