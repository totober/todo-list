import {Project, Task, methods} from "./to-do.js";
import {storage} from "./storage.js";
import {taskElement, projectElementCreator, getTaskData, getProjectData} from "./dom.js";

require("./aside.js");


let btnProjectAdd = document.querySelector(".btn-project-add").addEventListener("click", projectStorage);
let btnTaskAdd = document.querySelector(".btn-task-add").addEventListener("click", taskStorage);


function projectStorage (e) {

    let title = getProjectData();

    let id = localStorage.length;

    let project = new Project(title, id);

    storage.storeObj(project);
};

 function taskStorage(e) {

    let mainTitle = document.querySelector(".main-title");
    let taskContainerAttr = document.querySelector(".task-container").getAttribute("data-id");


    let {title, dateFormat} = getTaskData();

    let task = new Task(title, dateFormat, taskContainerAttr);

    let retr = storage.retrieveProject(mainTitle.textContent);

    retr.add(task);

    storage.storeObj(retr);
}; 









