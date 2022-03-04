const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser')
const apiErrorHandler = require('./error/api_error_handler');
const path = require('path');

require('./helpers/helper');

const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: '123465789',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname +'/public'));
hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');

const routesUsuario = require("./routes/Usuario");
app.use("/usuarios", routesUsuario);

const routesCategoria = require("./routes/Categoria");
app.use("/categorias", routesCategoria);

const routesProducto = require("./routes/Producto");
app.use("/productos", routesProducto);

const routesBlog = require("./routes/Blog");
app.use("/blogs", routesBlog);

const routesComentario = require("./routes/Comentario");
app.use("/comentarios", routesComentario);

app.use(apiErrorHandler);

app.use('imagesUpload', express.static('./imagesUpload'));


db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=>{
        console.log('listening on: http://localhost:'+PORT);
    })
});

//app.listen(3000,()=>console.log("Escuchando en el puerto 3000"));