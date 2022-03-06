import { Peticiones } from "./fetch_script.js";

var btnSubmit = document.getElementById("btnSubmit");
var txtUsuario = document.getElementById("txtUsuario");
var txtPassword = document.getElementById("txtPassword");

var usuario;
var password;

var form = document.querySelector("form");

btnSubmit.addEventListener('click', (event)=>{
    event.preventDefault();
    buscarUsuario()
});

function buscarUsuario(){
    usuario = txtUsuario.value;
    password = txtPassword.value;

    Peticiones.retrieveByCredentials("/usuarios/findByCredential/",usuario,password).then((usuarios)=>{
        if(usuarios == undefined){
            alert("Usuario o contraseña incorrectos");
            return;
        }else{
            //alert(usuarios);
            sessionStorage.setItem("id",usuarios[0].id);
            sessionStorage.setItem("usuario",usuarios[0].usuario);
            sessionStorage.setItem("password",usuarios[0].password);
            sessionStorage.setItem("nombre",usuarios[0].nombre);
            //sessionStorage.setItem("foto",usuarios[0].foto.data);
/*
            let imgData = new Blob(usuarios[0].imagen.data, { type: 'image/png' });
            let link = URL.createObjectURL(imgData);

            let img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(link);
                resolve(img)
            }
            img.src = link;
            console.log(img);


            console.log(typeof usuarios[0].imagen.type);
            console.log(usuarios[0].imagen.data.toString('base64'));
           // alert(sessionStorage.getItem("fotoPerfil"));
           */
            window.location.href = "http://localhost:3000/blogs/posts";
            
        }
    });
}