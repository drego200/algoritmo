const horaServidor = document.getElementById("horaServidor");
const clientesDiv = document.getElementById("clientes");
const registro = document.getElementById("registro");

const btnCrear = document.getElementById("btnCrear");
const btnSincronizar = document.getElementById("btnSincronizar");
const btnReiniciar = document.getElementById("btnReiniciar");

let clientes = [];


//=========================
// Hora del servidor
//=========================

function actualizarServidor(){

    const ahora = new Date();

    horaServidor.innerHTML = ahora.toLocaleTimeString();

}

setInterval(actualizarServidor,1000);

actualizarServidor();


//=========================
// Crear clientes
//=========================

btnCrear.onclick=function(){

    clientes=[];

    clientesDiv.innerHTML="";

    registro.innerHTML="Clientes creados.<br>";

    let cantidad=parseInt(document.getElementById("cantidadClientes").value);

    for(let i=1;i<=cantidad;i++){

        let desfase=Math.floor(Math.random()*61)-30;

        clientes.push({

            id:i,

            desfase:desfase,

            estado:"Normal"

        });

    }

    pintarClientes();

};


//=========================
// Dibujar clientes
//=========================

function pintarClientes(){

    clientesDiv.innerHTML="";

    clientes.forEach(c=>{

        let fecha=new Date();

        fecha.setSeconds(fecha.getSeconds()+c.desfase);

        clientesDiv.innerHTML+=`

        <div class="card-cliente">

            <h3>Cliente ${c.id}</h3>

            <div class="hora-cliente" id="hora${c.id}">

                ${fecha.toLocaleTimeString()}

            </div>

            <div class="estado ${obtenerClase(c.estado)}" id="estado${c.id}">

                ${c.estado}

            </div>

        </div>

        `;

    });

}


//=========================
// Clase CSS
//=========================

function obtenerClase(estado){

    if(estado=="Normal") return "normal";

    if(estado=="Solicitando") return "solicitando";

    if(estado=="Sincronizando") return "sincronizando";

    if(estado=="Sincronizado") return "sincronizado";

}


//=========================
// Registro
//=========================

function escribir(texto){

    registro.innerHTML+=texto+"<br>";

    registro.scrollTop=registro.scrollHeight;

}


//=========================
// Sincronización Cristian
//=========================

btnSincronizar.onclick=async function(){

    if(clientes.length==0){

        alert("Primero cree los clientes.");

        return;

    }

    escribir("====================================");

    escribir("Iniciando sincronización...");

    for(let c of clientes){

        c.estado="Solicitando";

        actualizarEstado(c);

        escribir("Cliente "+c.id+" solicita la hora.");

        await esperar(1000);

        c.estado="Sincronizando";

        actualizarEstado(c);

        let rtt=Math.floor(Math.random()*90)+20;

        escribir("Servidor responde al Cliente "+c.id);

        escribir("RTT = "+rtt+" ms");

        await esperar(1000);

        c.desfase=0;

        actualizarHora(c);

        c.estado="Sincronizado";

        actualizarEstado(c);

        escribir("Cliente "+c.id+" sincronizó correctamente.");

        await esperar(700);

    }

    escribir("Sincronización finalizada.");

    escribir("====================================");

};


//=========================
// Cambiar estado
//=========================

function actualizarEstado(cliente){

    let estado=document.getElementById("estado"+cliente.id);

    estado.className="estado "+obtenerClase(cliente.estado);

    estado.innerHTML=cliente.estado;

}


//=========================
// Actualizar hora
//=========================

function actualizarHora(cliente){

    let fecha=new Date();

    fecha.setSeconds(fecha.getSeconds()+cliente.desfase);

    document.getElementById("hora"+cliente.id).innerHTML=

    fecha.toLocaleTimeString();

}


//=========================
// Actualizar relojes
//=========================

setInterval(()=>{

    clientes.forEach(c=>{

        actualizarHora(c);

    });

},1000);


//=========================
// Espera
//=========================

function esperar(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}


//=========================
// Reiniciar
//=========================

btnReiniciar.onclick=function(){

    clientes=[];

    clientesDiv.innerHTML="";

    registro.innerHTML="Esperando iniciar simulación...";

};