export {projectDialog, projectElement}

let btnProject = document.querySelector(".btn-project")
let dialog = document.querySelector(".project-dialog")
btnProject.addEventListener("click", projectDialog)

let main = document.querySelector("main")
let projectList = document.querySelector(".project-list")
let projectTitle = document.querySelector(".project-title")

let btnProjectAdd = document.querySelector(".btn-project-add")
btnProjectAdd.addEventListener("click", projectElement)
let btnProjectCancel = document.querySelector(".btn-project-cancel")
btnProjectCancel.addEventListener("click", projectDialogClose)

let btnTask = document.querySelector(".btn-task")
let dialog2 = document.querySelector(".task-dialog")
btnTask.addEventListener("click", taskDialog)

let btnTaskAdd = document.querySelector(".btn-task-add")
btnTaskAdd.addEventListener("click", taskElement)
let btnTaskCancel = document.querySelector(".btn-task-cancel")
btnTaskCancel.addEventListener("click", taskDialogClose)



function projectDialog(e) {
    projectTitle.value = "";
    dialog.showModal()
}

function projectDialogClose(e) {
    e.preventDefault()
    dialog.close()
}

function projectElement (e) {

    e.preventDefault();
    
    let list = document.createElement("li")
    let projectEl = document.createElement("div")
    projectEl.classList.add("project-element")

    let title = document.createElement("p")
    title.textContent = projectTitle.value
    title.addEventListener("click", mainRender)

    let deleteProjectBtn = document.createElement("button")
    deleteProjectBtn.textContent = "x"
    deleteProjectBtn.classList.add("delete-project-btn")

    projectEl.appendChild(title)
    projectEl.appendChild(deleteProjectBtn)
    list.appendChild(projectEl)

    projectList.appendChild(list)

    dialog.close()
    
}

function mainRender (e) {
   


    let mainTitle = document.querySelector(".main-title")
    mainTitle.textContent = e.target.textContent

    let taskContainer = document.querySelector(".task-container")
    /* main.insertBefore(taskContainer, btnTask) */
    console.log(taskContainer)

   

}


function taskElement (e) {

    e.preventDefault()

    let taskTitle = document.querySelector(".task-title")
    let taskDate = document.querySelector(".task-date")
    //let taskContainer = document.querySelector(".task-container")
    let taskContainer = document.createElement("div")
    taskContainer.classList.add("task-container")

    let taskEl = document.createElement("div")
    taskEl.classList.add("task-element")

    let title = document.createElement("p")
    title.textContent = taskTitle.value

    let date = document.createElement("p")
    date.textContent = taskDate.value

    let deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.textContent = "x"
    deleteTaskBtn.classList.add("delete-task-btn")

    taskEl.appendChild(title)
    taskEl.appendChild(date)
    taskEl.appendChild(deleteTaskBtn)
    taskContainer.appendChild(taskEl)
    main.insertBefore(taskContainer, btnTask)

    dialog2.close()

}

function taskDialog(e){

    let taskTitle = document.querySelector(".task-title")
    taskTitle.value = ""
    let taskDate = document.querySelector(".task-date")
    taskDate.value = ""
    let taskNotes = document.querySelector(".task-notes")
    taskNotes.value = ""
    dialog2.showModal()
}

function taskDialogClose (e) {
    e.preventDefault()
    dialog2.close()
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