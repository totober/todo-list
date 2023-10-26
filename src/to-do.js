import {storage} from "./storage.js"
import { projectElementCreator, getProjectData } from "./dom.js"
import {format} from "date-fns"

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
    constructor(title, date, id, isChecked = false, isPriority = false) {
        this.title = title,
        this.date = date,
        this.id = id,
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
}



