const readlineSync = require('readline-sync');
const chalk = require('chalk');



//Definimos un array para almacenar las tareas
let listaDeTareas = [];
//Creamos las opciones que se mostraran en el menú
const opciones = ["1. Agregar Tarea", "2. Ver Tareas", "3. Marcar Tarea como Completada", "4. Eliminar", "5. Salir"];

//Función para agregar una tarea a la lista
function agregaTarea() {
    const indicador = readlineSync.question(chalk.magentaBright('Ingrese el nombre de la tarea: '));
    const descripcion = readlineSync.question(chalk.magentaBright('Describe la tarea: '));
    const estado = false; //Por defecto, colocamos la tarea como no completada

    const tarea = { indicador, descripcion, estado };
    listaDeTareas.push(tarea)
    console.log(chalk.green('Tarea agregada con exito'))
}

//Función para ver el listado completo de tareas
function verTareas() {
    listaDeTareas.forEach((tarea, index) => {
        const estado = tarea.estado ? '✅' : '❌';
        console.log(`\n${index + 1}- Indicador: ${tarea.indicador} \n   Descripcion: ${tarea.descripcion} \n   Estado: ${estado}`)
        console.log("________________________________________________________")
    })

}

//Función para marcar tareas como completadas
function marcarCompletada() {
    verTareas();
    const tareaId = readlineSync.question('Ingrese el numero de la tarea completada: ') - 1;
    if (listaDeTareas[tareaId] === undefined) return console.log(chalk.red('Numero de tarea no valido'));
    listaDeTareas[tareaId] = { ...listaDeTareas[tareaId], estado: true };
}

//Función para eliminar una tarea
function eliminaTarea() {
    verTareas();
    const tareaId = readlineSync.question(chalk.magentaBright('Ingrese el numero de la tarea a eliminar: ')) - 1;
    if (listaDeTareas[tareaId] === undefined) return console.log(chalk.red('Numero de tarea no valido'));
    listaDeTareas = listaDeTareas.filter(tarea => listaDeTareas[tareaId] !== tarea)
}


//Mostramos el menú si todo el código está correcto 
while (true) {
    console.log(chalk.yellow("\n--- Lista de Tareas ---"));
    opciones.forEach(opcion => { console.log(chalk.magentaBright(opcion)); })


    const option = readlineSync.question(chalk.cyanBright("Ingrese un numero: "));

    if (option === "1") {
        agregaTarea();
    } else if (option === "2") {
        verTareas();
    } else if (option === "3") {
        marcarCompletada();
    } else if (option === "4") {
        eliminaTarea();
    } else if (option === "5") {
        break;
    } else {
        console.log(chalk.red("Opción no válida. Por favor, elige una opción válida."));
    }

}