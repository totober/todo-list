export {storage}
import {methods} from "./to-do.js"


let storage = {
     storeObj (obj){
        let objStr = JSON.stringify(obj)
        localStorage.setItem(`${obj.title}`, objStr)
    },
    
    retrieveProject (obj) {
       let objStr = localStorage.getItem(obj)
       let objParse = JSON.parse(objStr)
       Object.assign(objParse, methods )
    
       return objParse
    },

    deleteObj (obj) {
        localStorage.removeItem(obj)
    },

    retrieveTask(obj){

        let mainTitle = document.querySelector(".main-title").textContent;
        let project = storage.retrieveProject(mainTitle);

        let returnedTask

        project.list.forEach(task => {
            if(task.title === obj.parentElement.firstElementChild.nextElementSibling.textContent){
                returnedTask = task
            }
        });

        return {project, returnedTask};
    },

    deleteObjTask (obj) {

        let mainTitle = document.querySelector(".main-title").textContent
    
        let project = storage.retrieveProject(mainTitle)

        let index;
        project.list.forEach((task, i) => {
            
            if(task.title === /* e.target.parentElement.textContent */obj.parentElement.textContent){
               index = i
            }
        });

        project.list.splice(index, 1)
        storage.storeObj(project)   
    },

    retrieveProjectsObj () {
        let projectStorage = localStorage;
        let projectValues = Object.values(projectStorage);
        
         let projectArray = [];
        for (let project of projectValues) {
            
            projectArray.push(JSON.parse(project))
    
        };

        return projectArray
    },

    uploadProjectId () {
        let projectArray = storage.retrieveProjectsObj()

        projectArray.forEach((project, i) => {
               project.id = i
               storage.storeObj(project)
               //console.log(`${project.title} : ${project.id}`)
           }
       )
    },

    getProjectId (obj) {
        let project = storage.retrieveProject(obj)
        let id = project.id

        return id
    }
}

function getProjectIdFromTask(targetTask) {
    projectsObj.forEach(project => {
        project.list.forEach ((task) => {
            if(task === targetTask) {
                return project
            }
        })
})
}


