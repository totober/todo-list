import {createProject, createTask, methods} from "./to-do.js"
import {storage} from "./storage.js"

window.addEventListener("storage", (e) => {
    console.log(e)
})

let task = createTask("pasear perro", "salir a camniar con el picho", "18-10-23", false, false)

console.log(task);



