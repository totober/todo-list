import {Project, Task, methods} from "./to-do.js"
import {storage} from "./storage.js"
import {taskElement, projectElementCreator, getTaskData, getProjectData} from "./dom.js"




let btnTaskAdd = document.querySelector(".btn-task-add")
btnTaskAdd.addEventListener("click", test)

let btnProjectAdd = document.querySelector(".btn-project-add");
btnProjectAdd.addEventListener("click", test2)


function test2 (e) {
    let title = getProjectData()
    console.log(title)
    let id = localStorage.length
    console.log(id)

   let prx = new Project(title, id)

   storage.storeObj(prx)

   return prx
}

 function test(e) {

    let mainTitle = document.querySelector(".main-title")

    let {title, date} = getTaskData()


   let pro = new Task(title, date)
    console.log(pro)
 

  // let retr = storage.retrieveObj(e.target.parentElement.parentElement.parentElement.firstElementChild.textContent)
  let retr = storage.retrieveObj(mainTitle.textContent)
    console.log(retr) 

   
   retr.add(pro)

  

    storage.storeObj(retr)

} 








