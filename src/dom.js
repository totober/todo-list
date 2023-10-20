export {taskElementAdded, projectElementCreator, getProjectData, getTaskData}

import { Task } from "./to-do.js"
import { storage } from "./storage.js"


let elements = {
    project: {
        createBtn: document.querySelector(".btn-project")
        .addEventListener("click", projectDialog),
        addBtn: document.querySelector(".btn-project-add")
        .addEventListener("click", projectElementCreator),
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


function projectElementCreator (e) {

   // e.preventDefault();
    
    let list = document.createElement("li")
    let projectEl = document.createElement("div")
    projectEl.classList.add("project-element")
    projectEl.addEventListener("click",  mainRender /* taskRender*/)

    let title = document.createElement("p")
    title.textContent = getProjectData()

    let deleteProjectBtn = document.createElement("button")
    deleteProjectBtn.classList.add("delete-project-btn")
    deleteProjectBtn.addEventListener("click", deleteProject)


    projectEl.appendChild(title)
    projectEl.appendChild(deleteProjectBtn)
    list.appendChild(projectEl)

    projectList.appendChild(list)

    elements.project.dialog.close()

    //return title
    
}


function mainCreator () {


    /*   let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    taskContainer.classList.add(e.target.textContent) */

   /*  let createTaskBtn = document.createElement("button")
            createTaskBtn.classList.add("create-task-btn")
            
            createTaskBtn.textContent = "Add task"
            createTaskBtn.addEventListener("click", taskDialog)

    /* taskContainer.appendChild(createTaskBtn) */

   // return /* taskContainer */ createTaskBtn 
}


function mainRender(e){


    let taskContainer = document.querySelector(".task-container")
    let createTaskBtn = document.querySelector(".create-task-btn")

    taskContainer.innerHTML = "";

    let mainTitle = document.querySelector(".main-title")
    mainTitle.textContent = e.target.textContent || "Title";
    
    console.log(taskContainer)
   // taskContainer.setAttribute("data-id", e.target.textContent)
    taskContainer.setAttribute("data-id", storage.getId(this.textContent))
    console.log(this)

    createTaskBtn.setAttribute("data-id", e.target.textContent)
    //taskContainer.appendChild(mainCreator())
    taskRender()
}

function taskRender (e) {
    
    let mainTitle = document.querySelector(".main-title").textContent
    console.log(mainTitle)
    let proj = storage.retrieveObj(mainTitle)
    console.log(proj)
    console.log(proj.list)

    proj.list.forEach(task => {
        taskElementCreator(task.title, task.date)         
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

function taskElementCreator (title, date) {

    let taskContainer = document.querySelector(".task-container")

    let taskEl = document.createElement("div")
    taskEl.classList.add("task-element")

    let check = document.createElement("span")
    check.classList.add("uncheck")
    check.addEventListener("click", isChecked)

    let titleEl = document.createElement("p")
    titleEl.textContent =  title

    let dateEl = document.createElement("p")
    dateEl.textContent =  date

    let deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.classList.add("delete-task-btn")
    deleteTaskBtn.addEventListener("click", deleteTask)

    taskEl.appendChild(check)
    taskEl.appendChild(titleEl)
    taskEl.appendChild(dateEl)
    taskEl.appendChild(deleteTaskBtn)
    //taskContainer.insertBefore(taskEl, createTaskBtn)
    taskContainer.appendChild(taskEl)

    //elements.task.dialog.close()

   // return {title, date}
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

function isChecked (e) {
    if(e.target.className === "uncheck") {
        e.target.className = "checked"
    } else {
        e.target.className = "uncheck"
    }
}


function deleteProject(e) {

    e.target.parentElement.remove()
    storage.deleteObj(this.parentElement.textContent)
}

 function deleteTask(e) {

    e.target.parentElement.remove()
    storage.deleteObjTask(this)
} 

/* function mainCreator () {

    let container = document.createElement("section");
    let titleContainer = document.createElement("div")
    let title = document.createElement("h1");
    let addTask = document.createElement("button")

    container.classList.add("main-container");
    titleContainer.classList.add("title-container");
    title.classList.add("title-task");
    addTask.classList.add("btn-task");

    main.appendChild(container);
    container.appendChild(titleContainer);
    container.appendChild(addTask);
    titleContainer.appendChild(title);
    
} */

/* function projectElement (e) {

    e.preventDefault();
    
    let list = document.createElement("li")
    let projectEl = document.createElement("div")
    projectEl.classList.add("project-element")
    projectEl.addEventListener("click", mainRender)

    let title = document.createElement("p")
    title.textContent = projectTitle.value

    let deleteProjectBtn = document.createElement("button")
    deleteProjectBtn.classList.add("delete-project-btn")
    deleteProjectBtn.addEventListener("click", deleteEl)


    projectEl.appendChild(title)
    projectEl.appendChild(deleteProjectBtn)
    list.appendChild(projectEl)

    projectList.appendChild(list)

    dialog.close()   
} */