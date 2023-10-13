export {storeObj, deleteObj, retrieveObj}

function storeObj (obj){
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
}