import { Peticiones } from "./fetch_script.js";

var lblTitulo = document.getElementById("lblTitulo");
var lblAutor = document.getElementById("lblAutor");
var lblFechaPublicacion = document.getElementById("lblFechaPublicacion");
var contenido = document.getElementById("contenido");
var txtAutorComentario = document.getElementById("txtNombre");
var txtComentario = document.getElementById("txtComentario");
var btnSubmit = document.getElementById("btnSubmit");

var id;
var autorComentario;
var comentario;


btnSubmit.addEventListener('click',()=>{
    agregarComentarios();
});
document.addEventListener("DOMContentLoaded", function(event) {
    getParameters();
    cargarDatos();
}); 

function getParameters(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    id = url.searchParams.get("id");
}
function cargarDatos(){
    Peticiones.retrieve('/blogs/find/'+id).then(blog => {

        lblTitulo.innerHTML = blog[0].titulo;
        lblAutor.innerHTML = blog[0].autor;
        lblFechaPublicacion.innerHTML = blog[0].fecha_publicacion;
        contenido.innerHTML = blog[0].contenido;

    });
}

function obtenerComentario(){
    autorComentario = txtAutorComentario.value;
    comentario = txtComentario.value;
    const comentarios = {
        autor: autorComentario,
        contenido: comentario
    }
    return comentarios;
}

function agregarComentarios(){
    const comentarios = obtenerComentario();
    Peticiones.create('/comentarios/create', comentarios).then(comenatrio => {
        window.location.reload;
    });
}