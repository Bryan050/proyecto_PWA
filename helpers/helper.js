const hbs = require("hbs");

hbs.registerHelper("incremented", (index) => {
  index++;
  return index;
});

hbs.registerHelper("currentPage", (nombre)=>{
  console.log(nombre);
});