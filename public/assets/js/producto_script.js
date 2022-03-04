import { Peticiones } from "./fetch_script.js";

var btnGuardar = document.getElementById("guardar");
var btnSubmit = document.getElementById("submit");
var btnAction = document.querySelectorAll(".btnAction");
var btnActionArr = Array.from(btnAction);
document.getElementById('modalForm').addEventListener('submit', validateMyForm);
document.getElementById('eliminar').addEventListener('click',()=>{
  eliminar(true);
});

var select = document.getElementById('categoria');

var id;
var nombre;
var descripcion;
var precio;
var idCategoria;
var nombreCategoria;
var isCrear = false;
var isModificar = false;


var lblUsuario = document.getElementById("lblUser");
document.addEventListener("DOMContentLoaded", function(event) {
    var usuario = sessionStorage.getItem("usuario");
    lblUsuario.innerHTML = usuario;
}); 

document.addEventListener("DOMContentLoaded", function(event) {
  listarCategorias();
}); 

btnGuardar.addEventListener("click", handleClick);

btnActionArr.forEach(element => {
  element.addEventListener('click', (td)=>{
    getAction(td.target);
    getSelectedRow(td.target);
  });
});

async function handleClick() {
  btnSubmit.click();
}

function validateMyForm() {
  const data = leerDatos();
  if (data.nombre.length == 0) {
    return false;
  }
  if(isCrear){
    isCrear = false;
    crear();
  }else if(isModificar){
    isModificar = false;
    modificar(true);
  }
  return true;
}

function leerDatos() {
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const precio = document.getElementById('precio').value;
  const idCategoria = parseInt(document.getElementById('categoria').options[select.selectedIndex].value);
  const producto = {
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    categoriumId: idCategoria
  };
  return producto;
}

function getAction(td){
  let action = td.getAttribute("class").split(" ", 3).reverse()[0];
  console.log(action);
  if(action == "btnAniadir"){
    isModificar = false;
    isCrear = true;
  }else if(action == "btnModificar"){
    isModificar = true;
    isCrear = false;
  }
}

function getSelectedRow(td) {
  let selectedRow = td.parentElement.parentElement.parentElement;
  id = selectedRow.cells[0].innerHTML;
  nombre = selectedRow.cells[2].innerHTML;
  descripcion = selectedRow.cells[3].innerHTML;
  precio = selectedRow.cells[4].innerHTML;
  idCategoria = selectedRow.cells[5].innerHTML;
  nombreCategoria = selectedRow.cells[6].innerHTML;
  console.log(td);
  vaciarFormulario();
  if(isModificar){
    cargarFormulario();
  }
}

function cargarFormulario(){
    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('precio').value = precio;
    for(let i =0; i<select.options.length; i++){
      if(select.options[i].value == idCategoria){
        select.options[i].setAttribute("selected", "true");
      }
    }
}
function vaciarFormulario(){
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
    for(let i =0; i<select.options.length; i++){
      select.options[i].removeAttribute("selected");
    }
    //document.getElementById('categoria').options[0].setAttribute("selected", "true");
}

function crear(){
  Peticiones.create("/productos/create",leerDatos());
}

function modificar(confirmacion){
  const datos = leerDatos();
  const producto = {
    id: id,
    nombre: datos.nombre,
    descripcion: datos.descripcion,
    precio: datos.precio,
    categoriumId: datos.categoriumId
  }
  console.log(producto)
  if (confirmacion & (id != null)) {
    Peticiones.update("/productos/edit",producto);
  }
}

function eliminar(confirmacion){
  if (confirmacion & (id != null)) {
    
    Peticiones.delete("/productos/delete/",id);   
  }
}

function limpiarCategorias(){
  for (let i = select.options.length; i >= 0; i--) {
    select.remove(i);
  }
}

function listarCategorias(){
  Peticiones.list("/categorias/all").then(categorias =>{
    limpiarCategorias();
    var opt = document.createElement('option');
    opt.value = -1;
    opt.innerHTML = 'Categorias';
    select.append(opt);
    categorias.forEach((element)=>{
      opt = document.createElement('option');
      opt.value = element.id;
      opt.innerHTML = element.nombre;
      select.append(opt);
    });
  });
  
}