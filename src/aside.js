import {storage} from "./storage.js"
import {mainRender, taskElementCreator, deleteTask} from "./dom.js"
import {addDays, format, parseISO, parse} from "date-fns"


let sideAllTasks = document.querySelector(".all-tasks")
sideAllTasks.addEventListener("click", allTasks)

function allTasks(e) {


    mainRender(e)

    let projectsObj = storage.retrieveProjectsObj()

    projectsObj.forEach(project => {
        project.list.forEach(task => {
            taskElementCreator(task.title, task.date, task.isChecked, task.isPriority)  
        })
    } )
}


let sideNextDays = document.querySelector(".next-days")
sideNextDays.addEventListener("click", nextDays)

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

let sideToday = document.querySelector(".today").addEventListener("click", today)

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

let sideMonth = document.querySelector(".month").addEventListener("click", month)

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

let sidePriority = document.querySelector(".priority").addEventListener("click", priority)


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
