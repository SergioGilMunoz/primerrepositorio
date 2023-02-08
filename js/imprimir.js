



let datos = localStorage.getItem("datos") ;
let obj = JSON.parse(datos);
 
document.getElementById("nombreValue").innerHTML = obj.nombre;
document.getElementById("apellidoValue").innerHTML = obj.apellido;
document.getElementById("correoValue").innerHTML = obj.correo;
document.getElementById("generoValue").innerHTML = obj.genero;
document.getElementById("paisValue").innerHTML = obj.pais;
document.getElementById("iglesiaValue").innerHTML = obj.iglesia;
document.getElementById("comentarioValue").innerHTML = obj.comentario;