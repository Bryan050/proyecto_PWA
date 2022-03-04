import { Peticiones } from "./fetch_script.js";
var txtTitulo = document.getElementById("txtTitulo");
var txtContenido = document.querySelector("#txtContenido");
var btnGuardar = document.getElementById("btnGuardar");
var btnPublicar = document.getElementById("btnPublicar");
var lblNombreProducto = document.getElementById("lblNombreProducto");
var lblDescripcionProducto = document.getElementById("lblDescripcionProducto");
var lblPrecio = document.getElementById("lblPrecio");
var btnProducto = document.getElementById("btnProductos");
var cardContainer = document.querySelector("#cardContainer");
var lblUsuario = document.getElementById("lblUser");
var id;
var titulo;
var contenido;
var estado;

var bPreguntar = true;
window.onbeforeunload = preguntarAntesDeSalir;
function preguntarAntesDeSalir()
{
    if (bPreguntar)
    return "¿Seguro que quieres salir?";
}

document.addEventListener("DOMContentLoaded", function(event) {
    var usuario = sessionStorage.getItem("usuario");
    lblUsuario.innerHTML = usuario;
    getParameters();
    cargarDatos();
}); 

function getParameters(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    id = url.searchParams.get("id");
}

btnProducto.addEventListener('click', (element)=>{
    listarProductos();
});

function cargarDatos(){
 Peticiones.retrieve('/blogs/find/'+id).then(blog => {
     //console.log(blog);
     if(blog[0].titulo=='(Sin titulo)'){
         return;
     }
     txtTitulo.value = blog[0].titulo;
     txtContenido.innerHTML = blog[0].contenido;
 });
}

btnPublicar.addEventListener('click',()=>{
    estado = "Publicado";
    modificar();
});

btnGuardar.addEventListener('click',()=>{
    modificar();
});

function obtenerCambios(){
    titulo = txtTitulo.value;
    contenido = txtContenido.innerHTML;
}

function modificar(){
    obtenerCambios();
    const autor = sessionStorage.getItem("nombre");
    //console.log(contenido);
    const blog = {
        "id": id,
        "autor": autor,
        "titulo": titulo,
        "contenido": contenido,
        "estado": estado,
        "productoId": "",
        "categoriumId": "",
        "comentarioId": "",
        "usuarioId": ""
    }
    Peticiones.update("/blogs/edit", blog);
}


function listarProductos(){
    Peticiones.list('/productos/all').then(productos=>{
        cardContainer.innerHTML = "";
        productos.forEach(producto=>{
            //console.log(producto.precio);
            var targeta = '<div class="col-6 col-md-6" >'
                +'<div class="card">'
                    +'<div class="row">'
                        +'<div class="col-12">'
                            +'<img>'
                        +'</div>'
                        +'<div class="col-12">'
                            +'<div class="card-body cb-producto"  data-bs-dismiss="modal">'
                                +'<p style="margin: 0;font-size: 14px;font-weight: bold;">"'+producto.nombre+'"</p>'
                                +'<p style="margin: 0;font-size: 14px;">'+producto.descripcion+'</p>'
                                +'<p style="padding: 0;font-size: 14px;">'+producto.precio+'</p>'
                            +'</div>'
                        +'</div>'
                    +'</div>'
                +'</div>'
            +'</div>'
            cardContainer.innerHTML += targeta;
        });
        var producto = document.querySelectorAll(".cb-producto");

        producto.forEach(element => {
            element.addEventListener('click', (element)=>{
                var targeta = element.target.parentElement.parentElement.parentElement;
                //document.designMode = 'Off';
                var datos = targeta.lastChild.firstChild.innerHTML;
                //console.log(datos);
                targeta.lastChild.innerHTML ='<div class="card-body border border-secondary " style="width: 18rem;">'
                    +datos
                +'</div>'

                //var pAnterior = document.createElement('p');
                //pAnterior.innerHTML = ".";
                var producto = document.createElement('div');
                producto.setAttribute('contenteditable','false');
                producto.setAttribute('style', 'display: block; margin-left: auto;margin-right: auto;');
                producto.appendChild(targeta);
                console.log(producto);
/*
                var row = document.createElement('div');
                row.setAttribute('class', 'row');

                var colIzq = document.createElement('div');
                colIzq.setAttribute('class', 'col-4');

                var colCent = document.createElement('div');
                colCent.setAttribute('class', 'col-4');

                colCent.setAttribute('style', 'pointer-events: none');
                colCent.innerHTML = targeta.parentElement.innerHTML;

                var colDer = document.createElement('div');
                colDer.setAttribute('class', 'col-4');

        
                var pPosterior = document.createElement('p');
                pPosterior.innerHTML = ".";

                row.appendChild(colIzq);
                row.appendChild(colCent);
                row.appendChild(colDer);
                producto.appendChild(row);
                producto.setAttribute('contenteditable','false');
                producto.setAttribute('id','parent');*/
                
                //producto.insertAdjacentElement("beforebegin", pAnterior);
                
                //console.log(producto);
                txtContenido.appendChild(producto);//.lastChild.firstChild);
                //var product = document.getElementById('parent');
                //var parentDiv = product.parentNode;
                //pAnterior.insertBefore(producto);
                //parentDiv.insertBefore(pPosterior, product.nextSibling);
                //parentDiv.insertBefore(pAnterior, product);
            });
          });
        
    });
}