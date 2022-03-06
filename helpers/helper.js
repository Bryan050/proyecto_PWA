const hbs = require("hbs");

hbs.registerHelper("incremented", (index) => {
  index++;
  return index;
});

hbs.registerHelper("currentPage", (nombre)=>{
  console.log(nombre);
});

hbs.registerHelper("splitContent", (contenido)=>{
  var newContenido;
  var contenidoArrayAux = contenido.split(' ',20);
  if(contenidoArrayAux.length>10){
    var contenidoArray = contenido.split(' ',10);
    newContenido = contenidoArray.join(' ');
  }else{
    newContenido = contenido;
  }
  return newContenido;
});