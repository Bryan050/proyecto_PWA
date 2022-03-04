const elements = document.querySelectorAll('.btn');
const inputColor = document.getElementById('inputColor');
const btnCambiarColor = document.getElementById('btnCambiarColor');
var command;
var color;
var commandColor;

var lblUsuario = document.getElementById("lblUser");
document.addEventListener("DOMContentLoaded", function(event) {
    var usuario = sessionStorage.getItem("usuario");
    lblUsuario.innerHTML = usuario;
}); 

elements.forEach(element => {
    element.addEventListener('click', ()=>{
        command = element.dataset['element'];
        if(command == 'fontName'){
            let font = element.value;
            document.execCommand(command, false, font)
        }else if(command == 'fontSize'){
            let size = element.value;
            console.log(size);
            document.execCommand(command, false, size)
        }else if(command == 'createLink'){
            let url = prompt('URL: http://');
            console.log(url);
            document.execCommand(command, false, url)
        }else if(command == 'insertImage'){
            let url = prompt('URL: ');
            console.log(url);
            document.execCommand(command, false, url)
        }else if(command == 'insertHTML'){
            let myHtml = prompt('tag: ');
            document.execCommand(command, false, myHtml)
        }else if(command == 'foreColor'||command == 'hiliteColor'){
            commandColor = command;
        }else{
            document.execCommand(command, false, null);
        }
        
    });
});

btnCambiarColor.addEventListener('click', ()=>{
    color = inputColor.value;
    document.execCommand(commandColor, false, color);
});

/*function execCommandWithArg(){
        color = inputColor.value;

    document.execCommand(command, false, color)
}*/