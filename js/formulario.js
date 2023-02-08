
    //manejo de DOMdv


let  displayRadioValue = (val) => {
        let ele = document.getElementsByName(val);
          
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked)
            
                return ele[i].value;
        }
}


let AgregaSelectorIglesias = ( mostrar) => {
   // let div = document.getElementById("select_iglesia"); 
    let html ="";
    let options ="";


    if (mostrar) {
        html = ` <label for="Si">Seleccione su Iglesia</label> 
                <select name="select" id="iglesia" onchange='OtraIglesia(this)'>  ` ;

        $.ajax({
            url: "http://localhost:3000/api/iglesias",
            type: "GET",
            dataType: 'json',
            success: function(result) { 
                $.each(result.data, function(key, value) {
                    
                    options +=" <option value='"+value.name+"'>"+  value.name  +"</option> " ; 
                 });

                 html += options +` </select>` ;
                 //div.html (html); 
                 document.getElementById("select_iglesia").innerHTML =html
            }
        });   
    }
    else {

       // div.html (''); 
       document.getElementById("select_iglesia").innerHTML=''

    } 
};

// registrar contacto


let Validacion = (e)=> {

    e.preventDefault();

    if (  document.getElementById("nombre").value ==""){
    
    Swal.fire({
    icon: 'error',
    title: 'Datos incompletos...',
    text: 'Ingrese el nombre!',
    footer: '<a href="">Ingrese el nombre</a>'
    })

    return ;
}



if ( document.getElementById("apellido").value ==""){
Swal.fire({
    icon: 'error',
    title: 'Datos incompletos...',
    text: 'Ingrese el apellido!',
    footer: '<a href="">Ingrese el apellido</a>'
    })

    return ;
}

if (document.getElementById("correo").value==""){
    Swal.fire({
    icon: 'error',
    title: 'Datos incompletos...',
    text: 'Ingrese el correo!',
    footer: '<a href="">Ingrese el correo</a>'
    })

return ;
}



    Swal.fire({
    title: 'Seguro de continuar con el registro del formulario?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    denyButtonText: `No enviar`,
    }).then((result) => {
    
    if (result.isConfirmed) {
        RegistraFormulario()
       
    } else if (result.isDenied) {
        Swal.fire('Se cancelo el registro', '', 'info')
    }
})


}

let RegistraFormulario = ()=> {
    debugger

    let  NombreIglesia ="";

    if ( displayRadioValue('pregunta_iglesia') =='si'){
            if (document.getElementById("iglesia").value =="Otro"){
                NombreIglesia = document.getElementById("otra_iglesia").value  ;

            }else {
                NombreIglesia = document.getElementById("iglesia").value;
            }
        
    } else {
        NombreIglesia = ''
    }
   
    let datax = {
        nombre: document.getElementById("nombre").value,
        apellido:document.getElementById("apellido").value,
        correo: document.getElementById("correo").value,
        genero: displayRadioValue('pregunta_genero'),
        pais : document.getElementById("pais").value,
        miembro: displayRadioValue('pregunta_iglesia'),
        comentario: document.getElementById('comentario').value,
        iglesia: NombreIglesia
    } ;

    guardarnavegador("datos",JSON.stringify(datax));

    $.ajax({
        url: "/api/registrar",
        type: "POST",
        data:datax,
        dataType: 'json',
            success: function(result) {

                Swal.fire('Enviado!', '', 'success')

 
                
                Swal.fire({
                    title: 'Desea Imprimir Formulario?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Imprimir',
                    denyButtonText: `No`,
                    }).then((result) => {
                    
                    if (result.isConfirmed) {
                        
                        window.location.href = "imprimir.html";


                    } else if (result.isDenied) {
                        Swal.fire('Se cancelo la impresion', '', 'info')
                    }
                })






                AgregaSelectorIglesias(false)
                OtraIglesia('')
                document.getElementById("form").reset()
            }
    });  




    

}   
let OtraIglesia = (value)=> {


//let div =  document.getElementById("input_iglesia");

if (value.value=='Otro'){

let html = "<label>Ingrese su iglesia:</label><input id='otra_iglesia' type='text'>"
  
document.getElementById("input_iglesia").innerHTML =html
}
else {
 
document.getElementById("input_iglesia").innerHTML = ''
}
}
const guardarnavegador = (clave,valor) => {
    
    localStorage.setItem(clave,valor)
console.log(valor);

} ;

 