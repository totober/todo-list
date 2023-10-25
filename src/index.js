import {Project, Task, methods} from "./to-do.js"
import {storage} from "./storage.js"
import {taskElement, projectElementCreator, getTaskData, getProjectData} from "./dom.js"

require("./aside.js")



let btnTaskAdd = document.querySelector(".btn-task-add")
btnTaskAdd.addEventListener("click", taskStorage)

let btnProjectAdd = document.querySelector(".btn-project-add");
btnProjectAdd.addEventListener("click", projectStorage)

function projectStorage (e) {

    let title = getProjectData()

    let id = localStorage.length

    let project = new Project(title, id)

    storage.storeObj(project)

}

 function taskStorage(e) {

    let mainTitle = document.querySelector(".main-title")
    let createTaskBtn = document.querySelector(".create-task-btn")
    let btnAttr = createTaskBtn.getAttribute("data-id")

    let {title, dateFormat} = getTaskData()

    let task = new Task(title, dateFormat, btnAttr)

  // let retr = storage.retrieveObj(e.target.parentElement.parentElement.parentElement.firstElementChild.textContent)
    let retr = storage.retrieveProject(mainTitle.textContent)

    retr.add(task)

    storage.storeObj(retr)

} 

function deleteEl(e) {
    e.target.parentElement.remove()
    storage.deleteObj(e.target.textContent)
}








