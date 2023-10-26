import {storage} from "./storage.js"
import {mainRender, taskElementCreator, deleteTask} from "./dom.js"
import {addDays, format, parseISO, parse} from "date-fns"


let sideElements = {
    sideAllTasks: document.querySelector(".all-tasks")
    .addEventListener("click", allTasks),
    sideNextDays: document.querySelector(".next-days")
    .addEventListener("click", nextDays),
    sideToday: document.querySelector(".today").addEventListener("click", today),
    sideMonth: document.querySelector(".month").addEventListener("click", month),
    sidePriority: document.querySelector(".priority").addEventListener("click", priority),
    sideArr: Array.from(document.querySelectorAll(".side"))
    .forEach(element => element.addEventListener("click", hideBtn)),
    createTaskBtn: document.querySelector("#create-task-btn")
};

function allTasks(e) {

    mainRender(e)

    let projectsObj = storage.retrieveProjectsObj()

    projectsObj.forEach(project => {
        project.list.forEach(task => {
            taskElementCreator(task.title, task.date, task.isChecked, task.isPriority)  
        })
    } )
}

function nextDays(e) {
 
    mainRender(e)

    let projectsObj = storage.retrieveProjectsObj()
    let todayDate = new Date()
    let plusWeek = addDays(todayDate, 7)

    projectsObj.forEach(project => {
        project.list.forEach ((task) => {

            let taskDate = task.date
            let taskDateParsed = parse(taskDate, "dd/MM/yyyy", new Date())

           if(taskDateParsed.getTime() <= plusWeek.getTime() && taskDateParsed.getTime() >= todayDate.getTime() ){
                taskElementCreator(task.title, task.date, task.isChecked, task.isPriority) 
            } 
        })
    } )
}

function today (e) {

    mainRender(e)

    let projectsObj = storage.retrieveProjectsObj()

    let todayDate = new Date() 
    let todayDateFormat = format(todayDate, "dd/MM/yyyy" )

    projectsObj.forEach(project => {
        project.list.forEach ((task) => {

            let taskDate = task.date

           if(taskDate === todayDateFormat ){
                taskElementCreator(task.title, task.date, task.isChecked, task.isPriority) 
            }  
        })
    } )
} 

function month (e) {

    mainRender(e)

    let projectsObj = storage.retrieveProjectsObj()

    let todayDate = new Date()
    let thisMonthFormat = format(todayDate, "MM" )

    projectsObj.forEach(project => {
        project.list.forEach ((task) => {

            let taskDate = task.date
            let taskDateParsed = parse(taskDate, "dd/MM/yyyy", new Date())
            let taskDateFormat = format(taskDateParsed, "MM")

           if(taskDateFormat === thisMonthFormat ){
                taskElementCreator(task.title, task.date, task.isChecked, task.isPriority) 
            }  
        })
    } )
}

function priority(e) {

    mainRender(e)

    let projectsObj = storage.retrieveProjectsObj()

    projectsObj.forEach(project => {
        project.list.forEach ((task) => {

           if(task.isPriority === true ){
                taskElementCreator(task.title, task.date, task.isChecked, task.isPriority) 
            }
        })
    } )
}

function hideBtn (e) {
    if(!sideElements.createTaskBtn.classList.contains("hidden")){
        sideElements.createTaskBtn.classList.toggle("hidden")
    } 
}
