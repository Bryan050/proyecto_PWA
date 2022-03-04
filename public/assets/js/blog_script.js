import { Peticiones } from "./fetch_script.js";

var btnAniadir = document.getElementById("aniadir");
var datosBlog = document.querySelectorAll(".datosBlog");
var lblUsuario = document.getElementById("lblUser");
var btnEliminar = document.querySelectorAll(".btnEliminar");
btnAniadir.addEventListener("click", handleClick);

var id;

document.addEventListener("DOMContentLoaded", function(event) {
    var usuario = sessionStorage.getItem("usuario");
    lblUsuario.innerHTML = usuario;
}); 

datosBlog.forEach(element => {
    element.addEventListener('click', (element)=>{
        var targeta = element.target.parentElement.parentElement;
        id = targeta.firstElementChild.innerHTML;
        window.location.href = "http://localhost:3000/blogs/editor?id="+id;
    });
  });

btnEliminar.forEach(boton => {
    boton.addEventListener('click', (element)=>{
        var targeta = element.target.parentElement.parentElement.parentElement.parentElement;
        //let id = document.querySelector(".idEliminar");
        var idEntrada = targeta.querySelector(".idEntrada");
        id = idEntrada.innerHTML;
    });
});

function handleClick() {
    crear();
}

document.getElementById('eliminar').addEventListener('click',()=>{
    eliminar(true);
});

function crear(){
    const autor = sessionStorage.getItem("nombre");
    const blog = {
        "autor": autor,
        "titulo": "(Sin titulo)",
        "contenido": "",
        "estado": "Borrador",
        "productoId": "",
        "categoriumId": "",
        "comentarioId": "",
        "usuarioId": ""
    }
    Peticiones.create("/blogs/create",blog).then(blogCreado=>{
        Peticiones.lastEntry('/blogs/lastEntry').then(ultimoBlog=>{
            id = ultimoBlog[0].id;
            window.location.href = "http://localhost:3000/blogs/editor?id="+id;
        });
    });
}

function eliminar(confirmacion){
    if (confirmacion & (id != null)) {
      Peticiones.delete("/blogs/delete/",id);   
    }
  }