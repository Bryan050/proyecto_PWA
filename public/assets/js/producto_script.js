import { Peticiones } from "./fetch_script.js";

var btnGuardar = document.getElementById("guardar");
var btnSubmit = document.getElementById("submit");
var btnAction = document.querySelectorAll(".btnAction");
var fotoPerfil = document.getElementById("fotoPerfil");

var btnActionArr = Array.from(btnAction);

document.getElementById("modalForm").addEventListener("submit", validateMyForm);
document.getElementById("eliminar").addEventListener("click", () => {
  eliminar(true);
});

var select = document.getElementById("categoria");

var id;
var nombre;
var descripcion;
var precio;
var idCategoria;
var nombreCategoria;
var isCrear = false;
var isModificar = false;
var link;
var imagen;
var idUsuario;
var usuario;

var lblUsuario = document.getElementById("lblUser");
document.addEventListener("DOMContentLoaded", function (event) {
  idUsuario = sessionStorage.getItem('id');
  lblUsuario.innerHTML = sessionStorage.getItem('usuario');
  cargarFotoUsuario();
});

document.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();
  listarCategorias();
});

btnGuardar.addEventListener("click", handleClick);

btnActionArr.forEach((element) => {
  element.addEventListener("click", (td) => {
    getAction(td.target);
    getSelectedRow(td.target);
  });
});

async function handleClick() {
  btnSubmit.click();
}

function validateMyForm(event) {
  event.preventDefault();
  const data = leerDatos();
  if (data.descripcion.length == 0) {
    return false;
  }
  
  if (isCrear) {
    isCrear = false;
    crear();
  } else if (isModificar) {
    isModificar = false;
    modificar(true);
  }
  return true;
}

function leerDatos() {
  const descripcion = document.getElementById("descripcion").value;
  const precio = document.getElementById("precio").value;
  const idCategoria = parseInt(
    document.getElementById("categoria").options[select.selectedIndex].value
  );
  const link = document.getElementById("link").value;
  const imagen = document.getElementById("imagen").value;
  const producto = {
    descripcion: descripcion,
    precio: precio,
    categoriumId: idCategoria,
    link: link,
    imagen: imagen,
  };
  return producto;
}

function getAction(td) {
  let action = td.getAttribute("class").split(" ", 3).reverse()[0];
  console.log(action);
  if (action == "btnAniadir") {
    isModificar = false;
    isCrear = true;
  } else if (action == "btnModificar") {
    isModificar = true;
    isCrear = false;
  }
}

function getSelectedRow(td) {
  let selectedRow = td.parentElement.parentElement.parentElement;
  id = selectedRow.cells[0].innerHTML;
  descripcion = selectedRow.cells[2].innerHTML;
  precio = selectedRow.cells[3].innerHTML;
  idCategoria = selectedRow.cells[4].innerHTML;
  nombreCategoria = selectedRow.cells[5].innerHTML;
  link = selectedRow.cells[6].innerHTML;
  imagen = selectedRow.cells[7].innerHTML;

  vaciarFormulario();
  if (isModificar) {
    cargarFormulario();
  }
}

function cargarFormulario() {
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("precio").value = precio;
  document.getElementById("link").value = link;
  document.getElementById("imagen").value = imagen;
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value == idCategoria) {
      select.options[i].setAttribute("selected", "true");
    }
  }
}
function vaciarFormulario() {
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("link").value = "";
  document.getElementById("imagen").value = "";
  for (let i = 0; i < select.options.length; i++) {
    select.options[i].removeAttribute("selected");
  }
  //document.getElementById('categoria').options[0].setAttribute("selected", "true");
}

function crear() {
  Peticiones.create("/productos/create", leerDatos()).then(productos=>{
    window.location.reload();
  });
}

function modificar(confirmacion) {
  const datos = leerDatos();
  const producto = {
    id: id,
    descripcion: datos.descripcion,
    precio: datos.precio,
    link: datos.link,
    imagen: datos.imagen,
    categoriumId: datos.categoriumId,
  };
  //console.log(producto);
  if (confirmacion & (id != null)) {
    Peticiones.update("/productos/edit", producto).then(blogs=>{
      window.location.reload();
    });
  }
}

function eliminar(confirmacion) {
  if (confirmacion & (id != null)) {
    Peticiones.delete("/productos/delete/", id);
  }
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

function cargarFotoUsuario(){
  Peticiones.retrieve('/usuarios/find/'+idUsuario).then(usuarios=>{
    var data = new Uint8Array(usuarios[0].foto.data);
    var blob = new Blob([data], { type: "image/jpg" });
    var url = URL.createObjectURL(blob);
    
    fotoPerfil.setAttribute('src', url);
  });
  
}