import { Peticiones } from "./fetch_script.js";

var txtNombre = document.getElementById("txtNombre");
var txtUsuario = document.getElementById("txtUsuario");
var txtDireccion = document.getElementById("txtDireccion");
var txtCedula = document.getElementById("txtCedula");
var txtPassword = document.getElementById("txtPassword");
var txtRepeatPassword = document.getElementById("txtRepeatPassword");
var btnSubmit = document.getElementById("btnSubmit");
var txtEmail = document.getElementById("txtEmail");

var nombre;
var usuario;
var direccion;
var cedula;
var password;
var passwordRepeat;
var rol;
var email;

btnSubmit.addEventListener('click',(event)=>{
    event.preventDefault();
    validarPassword();
});

function validarPassword(){
    passwordRepeat = txtRepeatPassword.value;
    password = txtPassword.value;
    alert(passwordRepeat+" "+password);
    if(passwordRepeat==password){
        crearUsuario();
    }else{
        alert("Las contraseñas no coinciden");
    }
}

function obtenerDatos(){
    nombre = txtNombre.value;
    usuario = txtUsuario.value;
    direccion = txtDireccion.value;
    cedula = txtCedula.value;
    password = txtPassword.value;
    email = txtEmail.value;
    rol = "administrador"

    const newUser = {
        usuario: usuario, 
        password: password, 
        nombre: nombre, 
        direccion: direccion, 
        cedula: cedula, 
        rol: rol,
        email: email
    }
    return newUser;
}

function crearUsuario(){
    const Usuario = obtenerDatos();
    Peticiones.create("/usuarios/create", Usuario).then(usuarios => {
        if(usuarios==undefined){
            alert("El nombre de usuario ya existe");
        }else{
            console.log(usuarios);
            Peticiones.retrieveByCredentials("/usuarios/findByCredential/",usuarios.usuario,usuarios.password).then((usuarios)=>{
                if(usuarios == undefined){
                    alert("Usuario o contraseña incorrectos");
                    return;
                }else{
                    //alert(usuarios);
                    sessionStorage.setItem("id",usuarios[0].id);
                    sessionStorage.setItem("usuario",usuarios[0].usuario);
                    sessionStorage.setItem("password",usuarios[0].password);
                    sessionStorage.setItem("nombre",usuarios[0].nombre);
        
                    window.location.href = "http://localhost:3000/blogs/posts";
                    
                }
  
            });
        }
    });
}