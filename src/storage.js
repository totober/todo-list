export {storage}
import {methods} from "./to-do.js"


let storage = {
     storeObj (obj){
        let objStr = JSON.stringify(obj)
        localStorage.setItem(`${obj.title}`, objStr)
    },
    
    retrieveObj (obj) {
       let objStr = localStorage.getItem(obj)
       let objParse = JSON.parse(objStr)
       Object.assign(objParse, methods )
    
       return objParse
    },

    deleteObj (obj) {
        localStorage.removeItem(obj)
    },

    deleteObjTask (obj) {

        let mainTitle = document.querySelector(".main-title").textContent
    
        let project = storage.retrieveObj(mainTitle)

        let index;
        project.list.forEach((task, i) => {
            
            if(task.title === /* e.target.parentElement.textContent */obj.parentElement.textContent){
               index = i
            }
        });

        project.list.splice(index, 1)
        storage.storeObj(project)   
    },

    getId (obj) {
        let project = storage.retrieveObj(obj)
        let id = project.id

        return id
    }
}


