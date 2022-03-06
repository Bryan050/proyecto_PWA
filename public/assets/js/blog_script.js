import { Peticiones } from "./fetch_script.js";

var btnAniadir = document.getElementById("aniadir");
var datosBlog = document.querySelectorAll(".datosBlog");
var lblUsuario = document.getElementById("lblUser");
var btnEliminar = document.querySelectorAll(".btnEliminar");
var btnAceptar = document.getElementById("btnAceptar");
var select = document.getElementById("categoria");
btnAceptar.addEventListener("click", handleClick);

var id;
var idUsuario;
var idCategoria;

document.addEventListener("DOMContentLoaded", function(event) {
    idUsuario = sessionStorage.getItem("id");
    var usuario = sessionStorage.getItem("usuario");
    lblUsuario.innerHTML = usuario;
    listarCategorias();
    cargarFotoUsuario();
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
    idCategoria = parseInt(
        document.getElementById("categoria").options[select.selectedIndex].value
    );
    crear();
}

document.getElementById('eliminar').addEventListener('click',()=>{
    eliminar(true);
});

function crear(){
    const categoria = idCategoria; 
    const autor = sessionStorage.getItem("nombre");
    alert(categoria);
    const blog = {
        "autor": autor,
        "titulo": "(Sin titulo)",
        "contenido": "",
        "estado": "Borrador",
        "productoId": "",
        "categoria": categoria,
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

  function cargarFotoUsuario(){
    Peticiones.retrieve('/usuarios/find/'+idUsuario).then(usuarios=>{
      var data = new Uint8Array(usuarios[0].foto.data);
      var blob = new Blob([data], { type: "image/jpg" });
      var url = URL.createObjectURL(blob);
      
      fotoPerfil.setAttribute('src', url);
    });
    
  }

  function limpiarCategorias() {
    for (let i = select.options.length; i >= 0; i--) {
      select.remove(i);
    }
  }

  function listarCategorias() {
    Peticiones.list("/categorias/all").then((categorias) => {
      limpiarCategorias();
      var opt = document.createElement("option");
      opt.value = -1;
      opt.innerHTML = "Categorias";
      select.append(opt);
      categorias.forEach((element) => {
        opt = document.createElement("option");
        opt.value = element.id;
        opt.innerHTML = element.nombre;
        select.append(opt);
      });
    });
  }
