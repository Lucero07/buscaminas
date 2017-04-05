// variables de configuración
var segTranscurridos = 0;
var ancho = parseInt(prompt("¿cuantas colunmas quieres?"));
var alto = parseInt(prompt("¿cuantas filas quieres?"));
var numMinas = parseInt(prompt("¿cuantas minas quieres?"));
var numIntentos = (ancho * alto) - numMinas;
var iniciar = document.getElementById('iniciar');
iniciar.onclick = iniciarJuego;
//var imagen = document.createElement("img");
//imagen.src = "assets/bomba.jpg";


function iniciarJuego() {


    //se determina el tiempo en milisegundos para ir cambiando
    setInterval(function() {
        segTranscurridos += 1;
        document.getElementById('cronometro').innerHTML = "Tiempo: " + segTranscurridos;
    }, 1000);



    //mando llamar la funcion para dibujar solo las minas
    dibujarMinas(ancho, alto, 'bombas');
    campoJuego = crearCampoJuego(ancho, alto, numMinas);

    var botonsitos = document.getElementsByName('botonsitos');

    for (var i = 0; i < botonsitos.length; i++) {
        document.getElementById(botonsitos[i].id).onclick = posicionactual;
    }
    segTranscurridos = 0;
};
//
function posicionactual() {

    //posicion de donde se ejecuta el click
    var point = event.target.id.split('-');
    //console.log(point);
    event.target.value = campoJuego[parseInt(point[0])][parseInt(point[1])];

    if (campoJuego[parseInt(point[0])][parseInt(point[1])] == 'BOOM!!') {
        alert('Game Over!');
        location.href = 'index.html';
    };
    event.target.disabled = "true";
    numIntentos--;
    if (!numIntentos) {
        alert('Felicidades Ganaste!');
        location.href = 'index.html';
    };
};

//hacer dinamico con el random
function crearCampoJuego(ancho, alto, minasTotales) {
    var campoActual = hacerTablaJuego(ancho, alto);
    var contadorMinas = 0;

    while (contadorMinas < minasTotales) {
        var minaDinamica = aleatorio(0, 1);
        var posicionDinamica = [aleatorio(0, ancho - 1), aleatorio(0, alto - 1)];

        if (!campoActual[posicionDinamica[0]][posicionDinamica[1]]) {
            contadorMinas += (minaDinamica) ? 1 : 0;
            if (minaDinamica) {
                campoActual[posicionDinamica[0]][posicionDinamica[1]] = 'BOOM!!';

                for (var posicionX = (posicionDinamica[0] - 1); posicionX <= (posicionDinamica[0] + 1); posicionX++) {
                    for (var posicionY = (posicionDinamica[1] - 1); posicionY <= (posicionDinamica[1] + 1); posicionY++) {
                        //Busque porque al generar todo aleatorio para algunos numeros me creaba un error y encontre que para poder realizar acciones debemos decirle a la computadora vuelve a ejecutar el evento
                        try { //Las sentencias que serán ejecutadas
                            campoActual[posicionX][posicionY] += (campoActual[posicionX][posicionY] != 'BOOM!!') ? 1 : '';
                        } catch (e) {} //Sentencias que son ejecutadas si una excepción es lanzada en el bloque try.
                    };
                };
            };
        };
    };
    return campoActual;
};

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
};
//creando el Arreglo
function hacerTablaJuego(ancho, alto) {
    var campoJuego = new Array(alto);
    //recorrer el arreglo.
    for (var i = 0; i < alto; i++) {
        campoJuego[i] = new Array(ancho);
        for (var j = 0; j < ancho; j++) {
            campoJuego[i][j] = 0;
        };
    };
    return campoJuego;
};

function dibujarMinas(ancho, alto, elemnto) {
    var div = document.getElementById(elemnto);
    div.innerHTML = '';

    for (var i = 0; i < alto; i++) {
        for (var j = 0; j < ancho; j++) {
            div.innerHTML += '<input type="button" name="botonsitos" id="' + i + '-' + j + '" style="width:50px; height:50px" value=" "/>';
        };
        div.innerHTML += '<br/>';
    };
};
