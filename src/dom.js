export {taskElementAdded, projectElementCreator, getProjectData, getTaskData}

import { Task } from "./to-do.js"
import { storage } from "./storage.js"


let elements = {
    project: {
        createBtn: document.querySelector(".btn-project")
        .addEventListener("click", projectDialog),
        addBtn: document.querySelector(".btn-project-add")
        .addEventListener("click", projectElementAdded),
        cancelBtn: document.querySelector(".btn-project-cancel")
        .addEventListener("click", projectDialogClose),
        dialog: document.querySelector(".project-dialog")
        /* list: document.querySelector(".project-list"),
        title: document.querySelector(".project-title")
        .addEventListener("input", getProjectData) */
    },
    task: {
        /* createBtn: document.querySelector(".btn-task")
        .addEventListener("click", taskDialog), */
        addBtn: document.querySelector(".btn-task-add")
        .addEventListener("click",  taskElementAdded /* taskRender*/),
        cancelBtn: document.querySelector(".btn-task-cancel")
        .addEventListener("click", taskDialogClose),
        dialog: document.querySelector(".task-dialog"),
        date: document.querySelector(".task-date"),
        title: document.querySelector(".task-title"),
        check: document.querySelector("span")
    }
}

/* let btnProject = document.querySelector(".btn-project") // createBtn
let dialog = document.querySelector(".project-dialog") // dialog
//btnProject.addEventListener("click", projectDialog)
//elements.project.createBtn.addEventListener("click", projectDialog)*/

let projectList = document.querySelector(".project-list") //list
let projectTitle = document.querySelector(".project-title") // title
projectTitle.addEventListener("input", getProjectData)

/* let btnProjectAdd = document.querySelector(".btn-project-add") //addBtn
btnProjectAdd.addEventListener("click", projectElementCreator)

let btnProjectCancel = document.querySelector(".btn-project-cancel") //cancelBtn
btnProjectCancel.addEventListener("click", projectDialogClose)

let btnTask = document.querySelector(".btn-task") // createBtn
let dialog2 = document.querySelector(".task-dialog") // dialog
//btnTask.addEventListener("click", taskDialog)
elements.task.createBtn.addEventListener("click", taskDialog)

let btnTaskAdd = document.querySelector(".btn-task-add") //addBtn
btnTaskAdd.addEventListener("click", taskElement)
let btnTaskCancel = document.querySelector(".btn-task-cancel") //cancelBtn
btnTaskCancel.addEventListener("click", taskDialogClose)  */

//let btnTask = document.querySelector(".btn-task")

let main = document.querySelector("main")
let createTaskBtn = document.querySelector(".create-task-btn")
createTaskBtn.addEventListener("click", taskDialog)

function projectDialog(e) {
    projectTitle.value = ""; 
    elements.project.dialog.showModal()
}

function projectDialogClose(e) {
    e.preventDefault()
    elements.project.dialog.close()
}

function getProjectData(e) {
    let titleName = projectTitle.value
    return titleName
}

function projectElementAdded (e) {

    projectElementCreator(getProjectData())

    elements.project.dialog.close()
}


function projectElementCreator (title) {
    
    let list = document.createElement("li")
    let projectEl = document.createElement("div")
    projectEl.classList.add("project-element")
    projectEl.addEventListener("click",  mainRender  /*taskRender*/)

    let titleEl = document.createElement("p")
    titleEl.textContent = title

    let deleteProjectBtn = document.createElement("button")
    deleteProjectBtn.classList.add("delete-project-btn")
    deleteProjectBtn.addEventListener("click", deleteProject)


    projectEl.appendChild(titleEl)
    projectEl.appendChild(deleteProjectBtn)
    list.appendChild(projectEl)
    projectList.appendChild(list)    
}

window.addEventListener("load", homeRender)

function homeRender(e) {

    let projectArray = storage.retrieveProjectsObj()

    projectArray.forEach(project => {
        projectElementCreator(project.title)
    });

}


function mainRender(e){

    let taskContainer = document.querySelector(".task-container")

    taskContainer.innerHTML = "";

    let mainTitle = document.querySelector(".main-title")
    mainTitle.textContent = e.target.textContent || "Title";

    let projectId = storage.getProjectId(this.textContent)
    taskContainer.setAttribute("data-id", projectId )
    console.log(projectId)

    taskRender()
}

function taskRender () {
    
    
    let mainTitle = document.querySelector(".main-title").textContent
    console.log(mainTitle)
    let project = storage.retrieveProject(mainTitle)

    project.list.forEach(task => {
        taskElementCreator(task.title, task.date, task.isChecked, task.isPriority)         
    }) 
}


function getTaskData (){
   
    let taskDate = document.querySelector(".task-date")
    let date = taskDate.value

    let taskTitle = document.querySelector(".task-title")
    let title = taskTitle.value

    return {title, date}
}


function taskElementAdded (e) {

    let {title, date} = getTaskData()
    taskElementCreator(title, date)
    
    elements.task.dialog.close()

}

function taskElementCreator (title, date, isChecked, isPriority) {

    let taskContainer = document.querySelector(".task-container")

    let taskEl = document.createElement("div")
    taskEl.classList.add("task-element")

    let check = document.createElement("span")
    check.classList.add("uncheck")
    if(isChecked === false) {
         check.classList.add("uncheck")
    } else if (isChecked === true) {
        check.classList.add("check")
    }
    check.addEventListener("click", taskChecked)

    let titleEl = document.createElement("p")
    titleEl.textContent =  title

    let dateEl = document.createElement("p")
    dateEl.textContent =  date

    let priorityEl = document.createElement("div")
    priorityEl.setAttribute("id", "star-element")
    priorityEl.className = "not-priority"
    if (isPriority === false){
        priorityEl.className = "not-priority"
    } else if(isPriority === true) {
        priorityEl.className = "priority"
    }
    priorityEl.addEventListener("click", taskPriority)

    let deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.classList.add("delete-task-btn")
    deleteTaskBtn.addEventListener("click", deleteTask)

    taskEl.appendChild(check)
    taskEl.appendChild(titleEl)
    taskEl.appendChild(dateEl)
    taskEl.appendChild(priorityEl)
    taskEl.appendChild(deleteTaskBtn)
    //taskContainer.insertBefore(taskEl, createTaskBtn)
    taskContainer.appendChild(taskEl)
}

function taskDialog(e){

    let taskTitle = document.querySelector(".task-title")
    taskTitle.value = ""
    let taskDate = document.querySelector(".task-date")
    taskDate.value = ""
    let taskNotes = document.querySelector(".task-notes")
    taskNotes.value = ""
    elements.task.dialog.showModal()
}

function taskDialogClose (e) {
    e.preventDefault()
    elements.task.dialog.close()
}

function taskChecked (e) {

    let {project, returnedTask} = storage.retrieveTask(this)

    if(e.target.className === "uncheck") {
        e.target.className = "check"
        returnedTask.isChecked = true
        storage.storeObj(project)

    } else {
        e.target.className = "uncheck"
        returnedTask.isChecked = false
        storage.storeObj(project)

    }
    console.log(returnedTask.isChecked)
    return returnedTask.isChecked
}

function taskPriority (e) {
    let {project, returnedTask} = storage.retrieveTask(this)

    if(e.target.className === "priority") {
        e.target.className = "not-priority"
        returnedTask.isPriority = false
        storage.storeObj(project)
    } else {
        e.target.className = "priority"
        returnedTask.isPriority = true
        storage.storeObj(project)
    }

    return returnedTask.isPriority
}


function deleteProject(e) {

    e.target.parentElement.remove()
    storage.deleteObj(this.parentElement.textContent)
    storage.uploadProjectId()

}

 function deleteTask(e) {

    e.target.parentElement.remove()
    storage.deleteObjTask(this)
} 
