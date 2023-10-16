export {/* storeObj, deleteObj, retrieveObj */ storage}
import {methods} from "./to-do.js"

let storage = {
     storeObj (obj){
        let objStr = JSON.stringify(obj)
        localStorage.setItem(`${obj.title}`, objStr)
    },
    
    deleteObj (obj) {
        localStorage.removeItem(`${obj.title}`)
    },
    
    retrieveObj (obj) {
       let objStr = localStorage.getItem(`${obj.title}`)
       let objParse = JSON.parse(objStr)
       Object.assign(objParse, methods )
    
       return objParse
    }
}

function listenObj () {
    window.addEventListener("storage", (e) => {
        console.log(e)
    })
}

/* function storeObj (obj){
    let objStr = JSON.stringify(obj)
    localStorage.setItem(`${obj.title}`, objStr)
}

function deleteObj (obj) {
    localStorage.removeItem(`${obj.title}`)
}

function retrieveObj (obj) {
   let objStr = localStorage.getItem(`${obj.title}`)
   let objParse = JSON.parse(objStr)

   return objParse
} */