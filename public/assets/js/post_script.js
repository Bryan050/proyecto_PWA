import { Peticiones } from "./fetch_script.js";

var lblTitulo = document.getElementById("lblTitulo");
var lblAutor = document.getElementById("lblAutor");
var lblFechaPublicacion = document.getElementById("lblFechaPublicacion");
var contenido = document.getElementById("contenido");
var txtAutorComentario = document.getElementById("txtNombre");
var txtComentario = document.getElementById("txtComentario");
var btnSubmit = document.getElementById("btnSubmit");
var btnReplay = document.querySelectorAll(".btnReplay");
var idComentario = document.getElementById("idComentario");
var idRespuesta = document.getElementById("idRespuesta");
var ctnComentario = document.getElementById("ctnComentario");
var ctnRespuesta = document.getElementById("ctnRespuesta");
var ctnComentarioCompleto = document.getElementById("ctnComentarioCompleto");
var ctnSeccionComentario = document.querySelector("#ctnSeccionComentario");
var txtEmail = document.getElementById("txtEmail");
var frmComentario = document.getElementById("frmComentario");
var btnCancelarRespuesta = document.getElementById("btnCancelarRespuesta");

var idBlog;
var autorComentario;
var comentario;
var email;

btnSubmit.addEventListener("click", () => {
  agregarComentarios();
});

document.addEventListener("DOMContentLoaded", function (event) {
  getParameters();
  cargarContenido();
  cargarComentarios();
});

function getParameters() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  idBlog = url.searchParams.get("id");
}
function cargarContenido() {
  Peticiones.retrieve("/blogs/find/" + idBlog).then((blog) => {
    lblTitulo.innerHTML = blog[0].titulo;
    lblAutor.innerHTML = blog[0].autor;

    var fechaArray = blog[0].fecha_publicacion.split("-").reverse();
    var dia = fechaArray[0];
    var mes = getMonth(fechaArray[1]);
    var anio = fechaArray[2];

    var fecha = dia + " " + mes + " " + anio;

    lblFechaPublicacion.innerHTML = fecha;
    contenido.innerHTML = blog[0].contenido;
  });
}

function obtenerComentario() {
  autorComentario = txtAutorComentario.value;
  comentario = txtComentario.value;
  email = txtEmail.value;
  const comentarios = {
    autor: autorComentario,
    email: email,
    contenido: comentario,
    blogId: idBlog,
  };
  return comentarios;
}

function agregarComentarios() {
  const comentarios = obtenerComentario();
  Peticiones.create("/comentarios/create", comentarios).then(comenatrios => {
    window.location.reload();
  });
}

function agregarRespuesta(respuesta) {
  Peticiones.create("/comentarios/create", respuesta).then((respuesta) => {
    window.location.reload();
  });
}

function cargarComentarios() {
  var divAux;
  var comentarioId;
  var btnSubmitRespuesta;
  Peticiones.retrieve("/comentarios/findfk/" + idBlog).then((comentarios) => {
    comentarios.forEach((comentario) => {
      console.log(comentario);
      if (comentario.respuesta == null) {
        var bloqueComentario =
          '<div class="col-md-10 col-lg-8 mx-auto ctnComentarioCompleto " style="margin-bottom: 5px;">' +
          "</div>";

        var fechaArray = comentario.fecha.split("-").reverse();
        var dia = fechaArray[0];
        var mes = getMonth(fechaArray[1]);
        var anio = fechaArray[2];

        var fecha = dia + " " + mes + " " + anio;

        divAux = document.createElement("div");
        divAux.innerHTML = bloqueComentario.trim();
        var bloqueComentarioDOM = divAux.firstChild;

        ctnSeccionComentario.appendChild(bloqueComentarioDOM);

        var nuevoComentario =
          '<span id="' +
          comentario.id +
          '" style="display: none;">' +
          comentario.id +
          "</span>" +
          '<div class="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11">' +
          '<div class="card-body">' +
          ' <h6 class="text-muted mb-2" id="lblAutorComentario"><b>' +
          comentario.autor +
          "</b></br></br>" +
          fecha +
          "</h6>" +
          '<p style="font-size: 14px;margin-top: 0;margin-bottom: 0;">' +
          comentario.contenido +
          "<br></p>" +
          '<div><button class="btn shadow-none btnReplay" type="button" style="background: rgb(239,239,239);padding: 0;">Responder</button></div>' +
          "</div>" +
          "</div>" +
          '<div id = "frmComentario' +
          comentario.id +
          '"></div>';

        divAux = document.createElement("div");
        divAux.innerHTML = nuevoComentario.trim();
        var nuevoComentarioDOM = divAux;

        bloqueComentarioDOM.appendChild(nuevoComentarioDOM);
      } else {
        var bloqueRespuesta =
          ' <div class="col-md-10 col-lg-8 mx-auto ctnRespuesta " style="margin: 0px;padding-left: 57px;margin-bottom: 5px;">' +
          "</div>";
        divAux = document.createElement("div");
        divAux.innerHTML = bloqueRespuesta.trim();
        var bloqueRespuestaDOM = divAux.firstChild;

        var fechaArray = comentario.fecha.split("-").reverse();
        var dia = fechaArray[0];
        var mes = getMonth(fechaArray[1]);
        var anio = fechaArray[2];

        var fecha = dia + " " + mes + " " + anio;

        const respuesta =
          '<span class="idRespuesta" style="display: none;">' +
          comentario.id +
          "</span>" +
          '<div class="card" style="background: rgb(239,239,239);">' +
          '<div class="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11">' +
          '<div class="card-body">' +
          '<h6><b>' +
          comentario.autor +
          '</b>'
        +"</h6>" +
        '<span style="font-size: 13px">'+
          fecha
        +"</span>" +
          '<p style="font-size: 14px;margin-top: 0;margin-bottom: 0;">' +
          comentario.contenido +
          "<br></p>" +
          "</div>" +
          "</div>" +
          "</div>";

        var targetaComentario = document.getElementById(comentario.respuesta)
          .parentElement.parentElement;

        var bloqueRespuesta =
          ' <div class="col-md-10 col-lg-8 ctnRespuesta " style="margin: 0px;padding-left: 57px;margin-bottom: 5px;">' +
          "</div>";
        divAux = document.createElement("div");
        divAux.innerHTML = bloqueRespuesta.trim();
        var bloqueRespuestaDOM = divAux.firstChild;

        targetaComentario.appendChild(bloqueRespuestaDOM);

        divAux = document.createElement("div");
        divAux.innerHTML = respuesta.trim();
        var respuestaDOM = divAux;

        bloqueRespuestaDOM.appendChild(respuestaDOM);

        //bloqueRespuestaDOM.appendChild(respuestaDOM);
      }
    });

    btnReplay = document.querySelectorAll(".btnReplay");
    btnReplay.forEach((btn) => {
      btn.addEventListener("click", (element) => {
        var anterior = document.getElementById("frmComentario" + comentarioId);

        if (isNaN(anterior)) {
          document.getElementById("frmComentario" + comentarioId).innerHTML =
            "";
        }
        var comentarioTarget =
          element.target.parentElement.parentElement.parentElement
            .parentElement;
        comentarioId = comentarioTarget.firstChild.innerHTML;

        var frmTarget = document.getElementById("frmComentario" + comentarioId);

        var frmRespuesta =
          "<form>" +
          '<h1 style="font-size: 29px;margin-bottom: 18px;">Poner un comentario</h1>' +
          '<a href="#" id="btnCancelarRespuesta">Cancelar respuesta</a>' +
          '<textarea class="form-control" id="txtComentario" placeholder="Comentario" style="margin-bottom: 5px;height: 106px;resize: none;"></textarea><input class="form-control" type="text" id="txtNombre" placeholder="Nombre" style="margin-bottom: 5px;"><input class="form-control" type="email" id="txtEmail" placeholder="Correo" style="margin-bottom: 5px;">' +
          '<div style="text-align: right;"><button class="btn btn-primary" type="button" style="padding: 0;margin: 0;padding-right: 20px;padding-left: 21px;padding-top: 12px;padding-bottom: 12px;" id="btnSubmitRespuesta">Enviar respuesta</button></div>' +
          "</form>";

        divAux = document.createElement("div");
        divAux.innerHTML = frmRespuesta.trim();
        var frmRespuestaDOM = divAux.firstChild;
        frmTarget.appendChild(frmRespuestaDOM); //Añadimos el comentario de respuesta

        frmComentario.innerHTML = "";

        txtComentario = document.getElementById("txtComentario");

        btnCancelarRespuesta = document.getElementById("btnCancelarRespuesta");
        console.log(btnCancelarRespuesta);
        btnCancelarRespuesta.addEventListener("click", (event) => {
          console.log("cancelar");
          event.preventDefault();
          frmTarget.innerHTML = "";

          var frmInicialComentario =
            "<form>" +
            '<h1 style="font-size: 29px;margin-bottom: 18px;">Poner un comentario</h1><textarea class="form-control" id="txtComentario" placeholder="Comentario" style="margin-bottom: 5px;height: 106px;resize: none;"></textarea><input class="form-control" type="text" id="txtNombre" placeholder="Nombre" style="margin-bottom: 5px;"><input class="form-control" type="email" id="txtEmail" placeholder="Correo" style="margin-bottom: 5px;">' +
            '<div style="text-align: right;"><button class="btn btn-primary" type="button" style="padding: 0;margin: 0;padding-right: 20px;padding-left: 21px;padding-top: 12px;padding-bottom: 12px;" id="btnSubmit">Enviar comentario</button></div>';
          +"</form>";
          divAux = document.createElement("div");
          divAux.innerHTML = frmInicialComentario;
          var frmInicialComentarioDOM = divAux.firstChild;
          frmComentario.appendChild(frmInicialComentarioDOM);
        });

        btnSubmitRespuesta = frmTarget.querySelector("#btnSubmitRespuesta");
        btnSubmitRespuesta.addEventListener("click", () => {
          //alert("Soy un alert");
          txtAutorComentario = document.getElementById("txtNombre");
          txtComentario = document.getElementById("txtComentario");
          txtEmail = document.getElementById("txtEmail");
          const Respuesta = {
            autor: txtAutorComentario.value,
            email: txtEmail.value,
            contenido: txtComentario.value,
            respuesta: comentarioId,
            blogId: idBlog,
          };
          agregarRespuesta(Respuesta);
        });

        txtComentario.focus();
      });
    });
  });
}

function getMonth(monthNumbre) {
  var opt = parseInt(monthNumbre);
  var month = "";
  switch (opt) {
    case 1:
      month = "Enero";
      break;
    case 2:
      month = "Febrero";
      break;
    case 3:
      month = "Marzo";
      break;
    case 4:
      month = "Abril";
      break;
    case 5:
      month = "Mayo";
      break;
    case 6:
      month = "Junio";
      break;
    case 7:
      month = "Julio";
      break;
    case 8:
      month = "Agosto";
      break;
    case 9:
      month = "Septiembre";
      break;
    case 10:
      month = "Octubre";
      break;
    case 11:
      month = "Noviembre";
      break;
    case 12:
      month = "Diciembre";
      break;
  }
  return month;
}
