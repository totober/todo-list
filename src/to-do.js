import {storage} from "./storage.js"

export {createProject, createTask, methods}

function createProject (title) {
    return {title}
}

function createTask (title, description, dueDate, isPriority, isChecked) {

    let task = {title, description, dueDate, isPriority, isChecked}
    storage.storeObj(task)
    return task
}



let methods = {
   delete: function () {
    //this.remove()
    console.log("deleted")
   },
   create: function () {
    //this.createProject()
    console.log("created")
   }
}

/* let taskMethods = {

} */

function edit () {

}


//let pro = createProject("OLA")
let task = createTask("pasear perro", "salir a camniar con el picho", "18-10-23", false, false)

console.log(task)

//Object.assign(pro, methods )
Object.assign(task, methods)

function addMethods (obj, meth) {
   return Object.assign(obj, meth)
}
