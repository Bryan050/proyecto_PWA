import { Peticiones } from "./fetch_script.js";

var linkBlog = document.querySelectorAll(".linkBlog");

var id;

linkBlog.forEach(element => {
    element.addEventListener('click', (element)=>{
        element.preventDefault();
        const contenidoTargeta = element.target.parentElement.parentElement;    
        const ruta = contenidoTargeta.querySelector(".linkBlog").toString();
        id = ruta.split("/").reverse()[0];
        if(id!=undefined){
            window.location.href = "http://localhost:3000/blogs/post?id="+id;
        }
    });
});
