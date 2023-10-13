export {createProject, methods}

function createProject (title) {
    return {title}
}

function createTask (title, description, dueDate, isPriority, isChecked) {
    return {title, description, dueDate, isPriority, isChecked}
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


let pro = createProject("OLA")
let task = createTask("pasear perro", "salir a camniar con el picho", "18-10-23", false, false)

console.log(task)

Object.assign(pro, methods )
Object.assign(task, methods)

function addMethods (obj, meth) {
   return Object.assign(obj, meth)
}
