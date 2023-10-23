import {storage} from "./storage.js"
import { projectElementCreator, getProjectData } from "./dom.js"

export {Project, Task, methods}

class Project {

   constructor(title, id) {
    this.title = title,
    this.id = id,
    this.list = []
   }

   add (newTask) {
    this.list.push(newTask)
   }

   delete () {
    storage.deleteObj(this)
   }

}


class Task {
    constructor(title, date, isChecked = false, isPriority = false, description) {
        this.title = title,
        this.date = date,
        this.description = description,
        this.isPriority = isPriority,
        this.isChecked = isChecked
    }

    delete () {
        storage.deleteObj(this)
    }
}


let methods = {

    add (newTask) {
        this.list.push(newTask)
    }, 
    delete () {
        storage.deleteObj(this)
    },
   create: function () {
    //this.createProject()
    console.log("created")
   }
}

//let task = createTask("pasear perro", "salir a camniar con el picho", "18-10-23", false, false)


