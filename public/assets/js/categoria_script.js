import { Peticiones } from "./fetch_script.js";

var btnGuardar = document.getElementById("guardar");
var btnSubmit = document.getElementById("submit");
var btnAction = document.querySelectorAll(".btnAction");
var btnActionArr = Array.from(btnAction);
document.getElementById('modalForm').addEventListener('submit', validateMyForm);
document.getElementById('eliminar').addEventListener('click',()=>{
  eliminar(true);
});

var id;
var nombre;
var isCrear = false;
var isModificar = false;


var lblUsuario = document.getElementById("lblUser");
document.addEventListener("DOMContentLoaded", function(event) {
    var usuario = sessionStorage.getItem("usuario");
    lblUsuario.innerHTML = usuario;
}); 

btnGuardar.addEventListener("click", handleClick);

btnActionArr.forEach(element => {
  element.addEventListener('click', (td)=>{
    getAction(td.target);
    getSelectedRow(td.target);
  });
});

async function handleClick() {
  /*btnSubmit.addEventListener('click',(event)=>{
    event.preventDefault();
  });*/
  btnSubmit.click();
}

function validateMyForm(event) {
  event.preventDefault();
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
  const nombre = document.getElementById("nombreCategoria").value;
  const categoria = {
    nombre: nombre,
  };
  return categoria;
}

function getAction(td){
  //console.log(td);
  let action = td.getAttribute("class").split(" ", 3).reverse()[0];
  //console.log(action+" "+action.length);
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
  vaciarFormulario();
  if(isModificar){
    cargarFormulario();
  }
}

function cargarFormulario(){
  document.getElementById("nombreCategoria").value = nombre;
}
function vaciarFormulario(){
  document.getElementById("nombreCategoria").value = '';
}

function crear(){
  Peticiones.create("/categorias/create",leerDatos()).then(categorias=>{
    //window.location.reload();
  });
}

function modificar(confirmacion){
  const categoria = {
    id : id,
    nombre : leerDatos().nombre
  }
  if (confirmacion & (id != null)) {
    Peticiones.update("/categorias/edit",categoria).then(categorias=>{
      window.location.reload();
    });
  }
}

function eliminar(confirmacion){
  if (confirmacion & (id != null)) {
    Peticiones.delete("/categorias/delete/",id);   
  }
}