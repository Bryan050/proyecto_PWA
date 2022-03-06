import { Peticiones } from "./fetch_script.js";
var btnBuscar = document.getElementById("btnBuscar");
var txtBusqueda = document.getElementById("txtBusqueda");
var contenedorProductos = document.getElementById("contenedorProductos");
var categorias = document.getElementById("categorias");

var criterioBusqueda;
var idCategoria;

document.addEventListener("DOMContentLoaded", function (event) {
  listarCategorias();
});

btnBuscar.addEventListener("click", () => {
  criterioBusqueda = txtBusqueda.value;
  buscarProductoPorDescripcion(criterioBusqueda);
});

function buscarProductoPorDescripcion(criterioBusqueda) {
  Peticiones.retrieve("/productos/findByDescription/" + criterioBusqueda).then(
    (productos) => {
      if (productos == undefined) {
        alert("Nose encontró productos con el nombre descrito");
      } else {
        var divAux = document.createElement("div");
        contenedorProductos.innerHTML = "";

        productos.forEach((producto) => {
          var targeta =
            '<div class="col-4">' +
            '<div class="card" style="width: 18rem; height: 25rem">' +
            '<div class="card-body">' +
            '<div class="row">' +
            '<div class="col-12"><img src="' +
            producto.imagen +
            '" style="max-width: 100%;max-height: 100%;"></div>' +
            '<div class="col-12"><a href="' +
            producto.link +
            '" target="_blank" style="font-size: 16px;font-weight: bold;">' +
            producto.descripcion +
            "</a>" +
            '<p style="margin: 0;font-size: 16px;">' +
            producto.precio +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

          divAux.innerHTML = targeta.trim();
          var targetaDOM = divAux.firstChild;
          contenedorProductos.appendChild(targetaDOM);
        });
      }
    }
  );
}

function listarCategorias() {
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
        categorias.appendChild(aCategoriaDOM);

        var btnCategoria = document.querySelectorAll(".btnCategoria");
        btnCategoria.forEach((btn) => {
          btn.addEventListener("click", (element) => {
            idCategoria = element.target.getAttribute("id");
            Peticiones.retrieve(
              "/productos/findByCategory/" + idCategoria
            ).then((productos) => {
                console.log(productos);
              var divAux = document.createElement("div");
              contenedorProductos.innerHTML = "";
              productos.forEach((producto) => {
                var targeta =
                  '<div class="col-4">' +
                  '<div class="card" style="width: 18rem; height: 25rem">' +
                  '<div class="card-body">' +
                  '<div class="row">' +
                  '<div class="col-12"><img src="' +
                  producto.imagen +
                  '" style="max-width: 100%;max-height: 100%;"></div>' +
                  '<div class="col-12"><a href="' +
                  producto.link +
                  '" target="_blank" style="font-size: 16px;font-weight: bold;">' +
                  producto.descripcion +
                  "</a>" +
                  '<p style="margin: 0;font-size: 16px;">' +
                  producto.precio +
                  "</p>" +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  "</div>";

                divAux.innerHTML = targeta.trim();
                var targetaDOM = divAux.firstChild;
                contenedorProductos.appendChild(targetaDOM);
              });
            });
          });
        });
      }
    });
  });
}
