// Función Tirada para almacenar el resultado de una tirada de moneda
function Tirada() {
    // Contador de resultados "Cara"
    this.cara = 0;
    // Contador de resultados "Cruz"
    this.cruz = 0;
    // Arreglo para almacenar los resultados
    this.resultados = [];
}

// Función para reiniciar los resultados y estadísticas (AC= All clear)
function AC() {

    // Eliminar resultados existentes
    document.getElementById("resultados").innerHTML = "";

    // Restablecer estadísticas
    document.getElementById("estadisticas").innerText = "";
}

// Uso de operador ternario para simular una tirada de moneda
Tirada.prototype.tirar = function (numTiradas) {
    for (let i = 0; i < numTiradas; i++) {
        // Genera un número aleatorio
        let resultado = Math.random();
        // Si el número es menor a 0.5, es una "Cara"
        this.resultados.push(resultado < 0.5 ? "Cara" : "Cruz");
    }
};

// operador de aumento (++) para contar los resultados "Cara" y "Cruz"
Tirada.prototype.contarResultados = function () {
    let caras = 0, cruces = 0;
    this.resultados.forEach(function (resultado) {
        // Incrementa el contador correspondiente
        resultado === "Cara" ? caras++ : cruces++;
    });
    // Asigna los contadores a las propiedades de la clase
    this.cara = caras;
    this.cruz = cruces;
};

// Función que se ejecuta cuando se hace clic en el botón
class Moneda {
    constructor() {
        this.resultado = '';
    }

    lanzar() {
        const random = Math.random();
        this.resultado = random < 0.5 ? 'Cara' : 'Cruz';
    }
}

function tirarMoneda() {
    let numTiradas = document.getElementById("numTiradas").value || 100;

    if (isNaN(numTiradas)) {
        const displayMessage = document.createElement("p");
        Swal.fire({
            title: "Error!",
            text: "Por favor ingrese un número valido",
            icon: "error",
            width: 500,
        });
        document.body.appendChild(displayMessage);
        return;
    }

    numTiradas = parseInt(numTiradas);
    let resultados = [];

    const moneda = new Moneda();

    for (let i = 0; i < numTiradas; i++) {
        moneda.lanzar();
        resultados.push(moneda.resultado);
    }

    let caras = resultados.filter(resultado => resultado === 'Cara').length;
    let cruces = numTiradas - caras;

    let resultadosList = document.getElementById("resultados");
    resultadosList.innerHTML = '';

    resultados.forEach(function (resultado) {
        let li = document.createElement("li");
        li.innerText = resultado;
        resultadosList.appendChild(li);
    });

    let estadisticasDiv = document.getElementById("estadisticas");
    estadisticasDiv.innerText = "Salieron " + caras + " caras y " + cruces + " cruces";
}


//Dark mode con JSON/
const botonColorMode = document.querySelector("#color-mode");
const body = document.getElementById("body");

let darkMode = JSON.parse(localStorage.getItem("dark-mode")) || {};

function activarDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", JSON.stringify({ activado: true }));
}

function desactivarDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", JSON.stringify({ activado: false }));
}

if (darkMode.activado) {
    activarDarkMode();
} else {
    desactivarDarkMode();
}

botonColorMode.addEventListener("click", () => {
    darkMode = JSON.parse(localStorage.getItem("dark-mode")) || {};
    if (darkMode.activado) {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
});

//Carga de datos de API falsa de jsonplaceholder con manejo de fetch
const urlUsuarios = "https://jsonplaceholder.typicode.com/users";
const listaUsuarios = document.querySelector("#lista-usuarios");

fetch(urlUsuarios)
    .then( (response) => response.json() )
    .then( (data) => {
        data.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = usuario.name;
            listaUsuarios.append(li);
        })
    } )