let procesos = [];

let indice = 0;

let intervalo = null;

const tabla = document.getElementById("tablaProcesos");

const registro = document.getElementById("registro");

const critica = document.getElementById("seccionCritica");

document.getElementById("btnIniciar").onclick = iniciar;

document.getElementById("btnReiniciar").onclick = reiniciar;

document.getElementById("btnPausar").onclick = pausar;

function iniciar(){

    if(intervalo!=null) return;

    procesos=[];

    tabla.innerHTML="";

    registro.innerHTML="";

    critica.innerHTML="Ningún proceso";

    let cantidad=parseInt(document.getElementById("cantidadProcesos").value);

    for(let i=1;i<=cantidad;i++){

        procesos.push({

            nombre:"P"+i,

            ticket:Math.floor(Math.random()*50)+1,

            estado:"Esperando"

        });

    }

    procesos.sort((a,b)=>a.ticket-b.ticket);

    mostrarTabla();

    escribir("Todos los procesos solicitan entrar.");

    intervalo=setInterval(simular,2500);

}

function simular(){

    if(indice>0){

        procesos[indice-1].estado="Finalizado";

    }

    if(indice>=procesos.length){

        escribir("Simulación terminada.");

        critica.innerHTML="Ningún proceso";

        clearInterval(intervalo);

        intervalo=null;

        mostrarTabla();

        indice=0;

        return;

    }

    procesos[indice].estado="Sección Crítica";

    critica.innerHTML=procesos[indice].nombre;

    escribir(

        procesos[indice].nombre+

        " entra con Ticket "+procesos[indice].ticket

    );

    mostrarTabla();

    indice++;

}

function mostrarTabla(){

    tabla.innerHTML="";

    procesos.forEach(p=>{

        let clase="";

        if(p.estado=="Esperando") clase="estado-esperando";

        if(p.estado=="Sección Crítica") clase="estado-critica";

        if(p.estado=="Finalizado") clase="estado-finalizado";

        tabla.innerHTML+=`

        <tr>

            <td>${p.nombre}</td>

            <td>${p.ticket}</td>

            <td class="${clase}">${p.estado}</td>

        </tr>

        `;

    });

}

function escribir(texto){

    registro.innerHTML+=texto+"<br>";

    registro.scrollTop=registro.scrollHeight;

}

function reiniciar(){

    clearInterval(intervalo);

    intervalo=null;

    indice=0;

    procesos=[];

    tabla.innerHTML="";

    critica.innerHTML="Ningún proceso";

    registro.innerHTML="Esperando iniciar simulación...";

}

function pausar(){

    clearInterval(intervalo);

    intervalo=null;

    escribir("Simulación pausada.");

}