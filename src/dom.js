export {taskElementAdded, projectElementCreator, getProjectData, getTaskData, mainRender, 
        taskElementCreator, deleteTask};

import { Task } from "./to-do.js";
import { storage } from "./storage.js";
import {subDays, addDays, format, parseISO} from "date-fns";


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
};

let projectList = document.querySelector(".project-list");
let projectTitle = document.querySelector(".project-title");
projectTitle.addEventListener("input", getProjectData);
window.addEventListener("load", sideRender);

let main = document.querySelector("main");
let createTaskBtn = document.querySelector("#create-task-btn");
createTaskBtn.addEventListener("click", taskDialog);
let taskContainer = document.querySelector(".task-container");



/// PROJECTS ///

function projectDialog(e) {
    projectTitle.value = ""; 
    elements.project.dialog.showModal();
};

function projectDialogClose(e) {
    e.preventDefault();
    elements.project.dialog.close();
};

function getProjectData(e) {
    let titleName = projectTitle.value;
    return titleName
};

function projectElementAdded (e) {

    projectElementCreator(getProjectData());
    elements.project.dialog.close();
};

function projectElementCreator (title) {
    
    let list = document.createElement("li");
    let projectEl = document.createElement("div");
    projectEl.classList.add("project-element");
    projectEl.addEventListener("click", taskRender);

    let titleEl = document.createElement("p");
    titleEl.textContent = title;

    let deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.classList.add("delete-project-btn");
    deleteProjectBtn.addEventListener("click", deleteProject);

    projectEl.appendChild(titleEl);
    projectEl.appendChild(deleteProjectBtn);
    list.appendChild(projectEl);
    projectList.appendChild(list);   
};

function sideRender(e) {

    let projectArray = storage.retrieveProjectsObj();
    projectArray.forEach(project => {
        projectElementCreator(project.title)
    });
};

function mainRender(e){

    taskContainer.innerHTML = "";

    let mainTitle = document.querySelector(".main-title");
    mainTitle.textContent = e.target.textContent || "Please, create or select a project";
};

/// TASKS ///

function taskRender (e) {

    mainRender(e);

    // show add task button //
    if(createTaskBtn.classList.contains("hidden")){
        createTaskBtn.classList.toggle("hidden")
    }
    //let taskContainer = document.querySelector(".task-container")

    //let mainTitle = document.querySelector(".main-title").textContent
    //console.log(mainTitle)
    //let project = storage.retrieveProject(mainTitle)
    let project = storage.retrieveProject(this.textContent);

    project.list.forEach(task => {
        taskElementCreator(task.title, task.date, task.isChecked, task.isPriority)         
    });

    let projectId = storage.getProjectId(this.textContent);
    taskContainer.setAttribute("data-id", projectId );
  
}

function getTaskData (){
   
    let taskDate = document.querySelector(".task-date");
    let date = taskDate.value; 
    let dateFormat = format(parseISO(date), "dd/MM/yyyy");

    let taskTitle = document.querySelector(".task-title");
    let title = taskTitle.value;

    return {title, dateFormat}
};

function taskElementAdded (e) {

    //let mainTitle = document.querySelector(".main-title").textContent

    let {title, dateFormat} = getTaskData();
    taskElementCreator(title, dateFormat);
    
    elements.task.dialog.close();

};

function taskElementCreator (title, dateFormat, isChecked, isPriority) {

    //let taskContainer = document.querySelector(".task-container")
    //let taskContainerId = taskContainer.getAttribute("data-id")

    let taskEl = document.createElement("div");
    taskEl.classList.add("task-element");
   // taskEl.setAttribute("data-id", taskContainerId)

    let check = document.createElement("span");
    check.classList.add("uncheck");
    if(isChecked === false) {
         check.classList.add("uncheck")
    } else if (isChecked === true) {
        check.classList.add("check")
    };
    check.addEventListener("click", taskChecked);

    let titleEl = document.createElement("p");
    titleEl.textContent =  title;

    let dateEl = document.createElement("p");
    dateEl.textContent =  dateFormat;

    let priorityEl = document.createElement("div");
    priorityEl.setAttribute("id", "star-element");
    priorityEl.className = "not-priority";
    if (isPriority === false){
        priorityEl.className = "not-priority";
    } else if(isPriority === true) {
        priorityEl.className = "priority";
    };
    priorityEl.addEventListener("click", taskPriority);

    let editEl = document.createElement("div");
    editEl.classList.add("edit-task")
    //editEl.addEventListener("click", openEditDialog) stand by upgrade elements
    //editEl.addEventListener("click", getEditObject) stand by upgrade elements

    let deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("delete-task-btn");
    deleteTaskBtn.addEventListener("click", deleteTask);

    taskEl.appendChild(check);
    taskEl.appendChild(titleEl);
    taskEl.appendChild(dateEl);
    taskEl.appendChild(priorityEl);
    taskEl.appendChild(editEl);
    taskEl.appendChild(deleteTaskBtn);
    taskContainer.appendChild(taskEl);
};

function taskDialog(e){

    let taskTitle = document.querySelector(".task-title");
    taskTitle.value = "";
    let taskDate = document.querySelector(".task-date");
    taskDate.value = "";
    let taskNotes = document.querySelector(".task-notes");
    taskNotes.value = "";
    elements.task.dialog.showModal();
};

function taskDialogClose (e) {
    e.preventDefault();
    elements.task.dialog.close();
};

function taskChecked (e) {

    let {returnedProject, returnedTask} = storage.retrieveTask(this);

    if(e.target.className === "uncheck") {
        e.target.className = "check";
        returnedTask.isChecked = true;
        storage.storeObj(returnedProject);
    } else {
        e.target.className = "uncheck";
        returnedTask.isChecked = false;
        storage.storeObj(returnedProject);
    };

    //return returnedTask.isChecked
};

function taskPriority (e) {
    let {returnedProject, returnedTask} = storage.retrieveTask(this);

    if(e.target.className === "priority") {
        e.target.className = "not-priority";
        returnedTask.isPriority = false;
        storage.storeObj(returnedProject);
    } else {
        e.target.className = "priority";
        returnedTask.isPriority = true;
        storage.storeObj(returnedProject);
    };

    //return returnedTask.isPriority
};

function deleteProject(e) {
    
    e.target.parentElement.remove();
    storage.deleteObj(this.parentElement.textContent);
    storage.uploadProjectId();

    // cant make it work...
     if(!createTaskBtn.classList.contains("hidden")){
        createTaskBtn.classList.toggle("hidden")
    } 

};

function deleteTask(e) {

    e.target.parentElement.remove();
    storage.deleteObjTask(this);
};



//// UPDATE ELEMENTS IN STAND BY ////

/* 
let editDialog = document.querySelector(".edit-dialog")

let btnEditAdd = document.querySelector(".btn-edit-add")
btnEditAdd.addEventListener("click", updateData)

let btnEditCancel = document.querySelector(".btn-edit-cancel")
btnEditCancel.addEventListener("click", closeEditDialog )



function openEditDialog(e) {
  editDialog.showModal();
}

function closeEditDialog(e){
    editDialog.close()
}

function getEditData () {
    let editTitle = document.querySelector(".edit-title")
    console.log(editTitle)
    let title = editTitle.textContent
    console.log(title)

    let editDate = document.querySelector("edit-date")
    console.log(editDate)
    let date = editDate.value; 
    console.log(date)
    let dateFormat = format(parseISO(date), "dd/MM/yyyy");
    console.log(dateFormat)

    return {title, dateFormat}
}

function getEditObject (e) {
    //console.log(this)
    //console.log(this.parentElement.firstElementChild.nextElementSibling.textContent)

    let {returnedProject, returnedTask, returnedTaskId} = storage.retrieveTask(this)
     
   return {returnedProject, returnedTask, returnedTaskId}
}

function updateData (e) {

    console.log(this)
   let taskEl = this.parentElement.firstElementChild.nextElementSibling.textContent
   console.log(taskEl)
   let {returnedProject, returnedTask, returnedTaskId} = getEditObject()
   console.log(returnedProject)
   console.log(returnedTask)
   console.log(returnedTaskId)

  // let {title, dateFormat} = getEditData()


   returnedTask.title = title
   returnedTask.date = dateFormat  

  // storeObj(returnedProject)



  closeEditDialog()
}

function elementUpdated() {
    console.log("wisconsin")

    closeEditDialog()
} */

