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

        /* let mainTitle = document.querySelector(".main-title").textContent;
        let project = storage.retrieveProject(mainTitle); */

        let returnedTask
        let returnedProject

        let projectArray = storage.retrieveProjectsObj()

        projectArray.forEach(project => {
        project.list.forEach(task => {
            if(task.title === obj.parentElement.firstElementChild.nextElementSibling.textContent){
                returnedTask = task
                console.log(returnedTask)
                returnedProject = project
                console.log(returnedProject)
            }
        })
    });

        return {returnedProject, returnedTask};
    },

    deleteObjTask (obj) {

        let taskDelete = obj.parentElement.firstElementChild.nextElementSibling.textContent
       // let index

        let projectArray = storage.retrieveProjectsObj()
        projectArray.forEach(project => {
            project.list.forEach((task, i) =>{
                if(task.title === taskDelete) {
                    let index = i
                    console.log(index)
                    project.list.splice(index, 1)
                    storage.storeObj(project)

                }
                
            })
            
        })  
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
               project.list.forEach(task => {
                task.id = i
                storage.storeObj(project)
               })
           }
       )
    },

    getProjectId (obj) {
        let project = storage.retrieveProject(obj)
        let id = project.id

        return id
    }
}



