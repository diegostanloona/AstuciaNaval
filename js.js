//-------------------------------------------------
//--------CREACIÓN DINÁMICA DEL FRONTEND-----------
//-------------------------------------------------

let tablero = [];
let barcos = [];
let letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let btns = [];

const crearTablero = () => {
    for (let i = 0; i < 10; i++) {
        let fila = [];
        for (let j = 0; j < 10; j++) {
            fila.push("-");
        }
        tablero.push(fila);
    }

}

const crearBotones = () => {
    const divAstucia = document.getElementById("astuciaNaval");

    for (let i = 0; i < tablero.length; i++) { //Crea dinámicamente los botones

        for (let j = 0; j < tablero[i].length + 1 && i == 0; j++) {
            divAstucia.innerHTML += "<button class='label'>" + j + "</button>";
        }

        divAstucia.innerHTML += "<br><button class='label'>" + letras[i] + "</button>";


        for (let j = 0; j < tablero[i].length; j++) {
            divAstucia.innerHTML += "<button class='celda'><br></button>";
        }

    }

    crearArrayBtns();

}


const crearArrayBtns = () => {
    let arr = document.getElementsByClassName("celda");
    for (let i = 0; i < 10; i++) {
        let fila = [];
        for (let j = 0; j < 10; j++) {
            fila.push(arr[(i * 10) + j]);
        }
        btns.push(fila);
    }
}



const reiniciar = () => { //Recarga el sitio web
    window.location.replace("index.html");
}

const jugar = () => {
    const txtjugada = document.getElementById("comandotxt").value.toUpperCase();

    const jugada = [parseInt(txtjugada.length == 3 ? txtjugada[1] + txtjugada[2] : txtjugada[1]) - 1, hallarPosicionLetra(txtjugada[0])];

    if (tablero[jugada[1]][jugada[0]] == "B") {
        btns[jugada[1]][jugada[0]].innerHTML = "O"
        tablero[jugada[1]][jugada[0]] = "O"
        if (validarVictoria()) {
            alert("Victoria!");
            reiniciar();
        }
    } else if (tablero[jugada[1]][jugada[0]] == "-") {
        btns[jugada[1]][jugada[0]].innerHTML = "X";
        tablero[jugada[1]][jugada[0]] = "X";
    }




    document.getElementById("comandotxt").value = "";


}

const hallarPosicionLetra = l => {
    for (let i = 0; i < letras.length; i++) {
        if (letras[i] == l) {
            return i;
        }
    }
}

const validarVictoria = () => {
    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i].includes("B")) {
            return false;
        }
    }
    return true;
}


const generarBarcos = () => {
    for (let i = 0; i < 5;) {
        if (generarBarcoRandom() == 1) {
            i++;
        }
    }
}


const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}

const generarBarcoRandom = () => {
    const x1 = getRandomInt(6);
    const y1 = getRandomInt(6);
    const dir = getRandomInt(2);

    return ponerBarco(x1, y1, dir);
}

const ponerBarco = (x1, y1, dir) => {

    if (x1 > 5) {
        dir = 1
    }

    if (y1 > 5) {
        dir = 0
    }

    if (dir == 0) {
        let barco = [
            [x1, y1],
            [x1 + 1, y1],
            [x1 + 2, y1],
            [x1 + 3, y1]
        ];
        for (let i = 0; i < barco.length; i++) {
            if (tablero[barco[i][0]][barco[i][1]] == "B") {
                return 0;
            }
        }
        barcos.push(barco);
        actualizarTablero(barco);
        return 1;
    }
    if (dir == 1) {
        let barco = [
            [x1, y1],
            [x1, y1 + 1],
            [x1, y1 + 2],
            [x1, y1 + 3]
        ];
        for (let i = 0; i < barco.length; i++) {
            if (tablero[barco[i][0]][barco[i][1]] == "B") {
                return 0;
            }
        }
        barcos.push(barco)
        actualizarTablero(barco)
        return 1;
    }
    console.log("Error")
    return 0;
}

const actualizarTablero = barco => {
    for (let i = 0; i < barco.length; i++) {
        tablero[barco[i][0]][barco[i][1]] = "B";
    }
}

crearTablero();
crearBotones();
generarBarcos();
