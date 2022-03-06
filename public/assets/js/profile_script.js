import { Peticiones } from "./fetch_script.js";

var txtUsuario = document.getElementById("username");
var txtEmail = document.getElementById("email");
var txtNombre = document.getElementById("name");
var txtCedula = document.getElementById("cedula");
var txtDireccion = document.getElementById("address");
var lblUser = document.getElementById("lblUser");
var imgFotoPerfil = document.getElementById("imgFotoPerfil");
var btnCambiarFoto = document.getElementById("btnCambiar");
var btnActualizarPerfil = document.getElementById("btnActualizarPerfil");
var btnActualizarDireccion = document.getElementById("btnActualizarDireccion");
var fotoPerfil = document.getElementById("fotoPerfil");
var btnAceptar = document.getElementById("btnAceptar");
var btnSubmitImage = document.getElementById("btnSubmitImage");
var nuevaFoto = document.getElementById("nuevaFoto");
var formImage = document.getElementById("formImage");

var id;
var nuevaFotoPerfil;

document.addEventListener("DOMContentLoaded", function(event) {
    var usuario = sessionStorage.getItem("usuario");
    lblUser.innerHTML = usuario;
    getParameters();
    cargarDatos();
}); 

btnAceptar.addEventListener('click',()=>{
    btnSubmitImage.addEventListener('click', (event)=>{
        //event.preventDefault();
    });

    var inputId = document.createElement("input");
    
    inputId.type = "text";
    inputId.value = sessionStorage.getItem("id");
    inputId.name = "id";
    inputId.style = "display: none;"
    formImage.appendChild(inputId);
    //formImage.remove
    Peticiones.updateWithImage('/usuarios/edit',formImage);
    btnSubmitImage.click();
});

btnActualizarPerfil.addEventListener('click',(event)=>{
    actualizarPerfil();
});

btnActualizarDireccion.addEventListener('click',(event)=>{
    actualizarPerfil();
});

function getParameters(){
    var url_string = "http://localhost:3000/blogs/editor?id="+sessionStorage.getItem("id");//window.location.href;
    var url = new URL(url_string);
    id = url.searchParams.get("id");
}

function cargarDatos(){
    Peticiones.retrieve('/usuarios/find/'+id).then(usuario => {
 
        if(isNaN(usuario[0].foto)){
            var data = new Uint8Array(usuario[0].foto.data);
            var blob = new Blob([data], { type: "image/jpg" });
            var url = URL.createObjectURL(blob);

            fotoPerfil.setAttribute('src', url);
            imgFotoPerfil.setAttribute('src', url);
        }
        
        txtUsuario.value = usuario[0].usuario;
        txtEmail.value = usuario[0].email;
        txtNombre.value = usuario[0].nombre;
        txtCedula.value = usuario[0].cedula;
        txtDireccion.value = usuario[0].direccion;
    });
}

function actualizarPerfil(){
    const Usuario = {
        id: id,
        usuario: txtUsuario.value,
        email: txtEmail.value,
        nombre: txtNombre.value,
        cedula: txtCedula.value,
        direccion: txtDireccion.value
    }
    Peticiones.update('/usuarios/edit', Usuario).then(usuario => {
    });
}
   