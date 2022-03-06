import { Peticiones } from "./fetch_script.js";

var linkBlog = document.querySelectorAll(".linkBlog");
var ctnCategorias = document.getElementById("ctnCategorias");
var ctnResultadosBlog = document.getElementById("ctnResultadosBlog");

var id;
var idCategoria;

document.addEventListener("DOMContentLoaded", function (event) {
  cargarCategorias();
});

linkBlog.forEach((element) => {
  element.addEventListener("click", (element) => {
    element.preventDefault();
    const contenidoTargeta = element.target.parentElement.parentElement;
    const ruta = contenidoTargeta.querySelector(".linkBlog").toString();
    id = ruta.split("/").reverse()[0];
    if (id != undefined) {
      window.location.href = "http://localhost:3000/blogs/post?id=" + id;
    }
  });
});

function cargarCategorias() {
  Peticiones.retrieve("/categorias/all").then((lCategorias) => {
    lCategorias.forEach((categoria) => {
      if (categoria != undefined) {
        var divAux = document.createElement("div");
        var aCategoria =
          '<a href="#" id="' +
          categoria.id +
          '" style="font-size: 16px; display: block;" class="btnCategoria">' +
          categoria.nombre +
          "</a>";
        divAux.innerHTML = aCategoria;
        var aCategoriaDOM = divAux.firstChild;
        ctnCategorias.appendChild(aCategoriaDOM);

        var btnCategoria = document.querySelectorAll(".btnCategoria");

        btnCategoria.forEach((btn) => {
          btn.addEventListener("click", (element) => {
            idCategoria = element.target.getAttribute("id");
            Peticiones.retrieve("/blogs/findByCategory/" + idCategoria).then(
              (blogs) => {
                ctnResultadosBlog.innerHTML = "";
                if(blogs==undefined) return;
                var divAux = document.createElement("div");
               
                blogs.forEach((blog) => {
                  var targeta =
                    '<div class="post-preview">' +
                        '<a href="'+blog.id+'" class="linkBlog">' +
                        '<h2 class="post-title">'+blog.titulo+'</h2>' +
                        '<h3 class="post-subtitle">Contenido</h3>' +
                        "</a>" +
                        '<p class="post-meta">Publicado por&nbsp;'+blog.autor+' el '+blog.fecha_publicacion+'</p>' +
                        "</div>" +'<hr>'

                  divAux.innerHTML = targeta.trim();
                  var targetaDOM = divAux;
                  ctnResultadosBlog.appendChild(targetaDOM);
                });
              }
            );
          });
        });
      }
    });
  });
}
