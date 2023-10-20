/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getProjectData: () => (/* binding */ getProjectData),
/* harmony export */   getTaskData: () => (/* binding */ getTaskData),
/* harmony export */   projectElementCreator: () => (/* binding */ projectElementCreator),
/* harmony export */   taskElementAdded: () => (/* binding */ taskElementAdded)
/* harmony export */ });
/* harmony import */ var _to_do_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-do.js */ "./src/to-do.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");


;



let elements = {
    project: {
        createBtn: document.querySelector(".btn-project")
        .addEventListener("click", projectDialog),
        addBtn: document.querySelector(".btn-project-add")
        .addEventListener("click", projectElementAdded),
        cancelBtn: document.querySelector(".btn-project-cancel")
        .addEventListener("click", projectDialogClose),
        dialog: document.querySelector(".project-dialog")
        /* list: document.querySelector(".project-list"),
        title: document.querySelector(".project-title")
        .addEventListener("input", getProjectData) */
    },
    task: {
        /* createBtn: document.querySelector(".btn-task")
        .addEventListener("click", taskDialog), */
        addBtn: document.querySelector(".btn-task-add")
        .addEventListener("click",  taskElementAdded /* taskRender*/),
        cancelBtn: document.querySelector(".btn-task-cancel")
        .addEventListener("click", taskDialogClose),
        dialog: document.querySelector(".task-dialog"),
        date: document.querySelector(".task-date"),
        title: document.querySelector(".task-title"),
        check: document.querySelector("span")
    }
}

/* let btnProject = document.querySelector(".btn-project") // createBtn
let dialog = document.querySelector(".project-dialog") // dialog
//btnProject.addEventListener("click", projectDialog)
//elements.project.createBtn.addEventListener("click", projectDialog)*/

let projectList = document.querySelector(".project-list") //list
let projectTitle = document.querySelector(".project-title") // title
projectTitle.addEventListener("input", getProjectData)

/* let btnProjectAdd = document.querySelector(".btn-project-add") //addBtn
btnProjectAdd.addEventListener("click", projectElementCreator)

let btnProjectCancel = document.querySelector(".btn-project-cancel") //cancelBtn
btnProjectCancel.addEventListener("click", projectDialogClose)

let btnTask = document.querySelector(".btn-task") // createBtn
let dialog2 = document.querySelector(".task-dialog") // dialog
//btnTask.addEventListener("click", taskDialog)
elements.task.createBtn.addEventListener("click", taskDialog)

let btnTaskAdd = document.querySelector(".btn-task-add") //addBtn
btnTaskAdd.addEventListener("click", taskElement)
let btnTaskCancel = document.querySelector(".btn-task-cancel") //cancelBtn
btnTaskCancel.addEventListener("click", taskDialogClose)  */

//let btnTask = document.querySelector(".btn-task")

let main = document.querySelector("main")
let createTaskBtn = document.querySelector(".create-task-btn")
createTaskBtn.addEventListener("click", taskDialog)


function projectDialog(e) {
    projectTitle.value = ""; 
    elements.project.dialog.showModal()
}

function projectDialogClose(e) {
    e.preventDefault()
    elements.project.dialog.close()
}

function getProjectData(e) {
    let titleName = projectTitle.value
    return titleName
}

function projectElementAdded (e) {

    projectElementCreator(getProjectData())

    elements.project.dialog.close()
}


function projectElementCreator (title) {
    
    let list = document.createElement("li")
    let projectEl = document.createElement("div")
    projectEl.classList.add("project-element")
    projectEl.addEventListener("click",  mainRender /* taskRender*/)

    let titleEl = document.createElement("p")
    titleEl.textContent = title

    let deleteProjectBtn = document.createElement("button")
    deleteProjectBtn.classList.add("delete-project-btn")
    deleteProjectBtn.addEventListener("click", deleteProject)


    projectEl.appendChild(titleEl)
    projectEl.appendChild(deleteProjectBtn)
    list.appendChild(projectEl)
    projectList.appendChild(list)    
}


function mainCreator () {


    /*   let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    taskContainer.classList.add(e.target.textContent) */

   /*  let createTaskBtn = document.createElement("button")
            createTaskBtn.classList.add("create-task-btn")
            
            createTaskBtn.textContent = "Add task"
            createTaskBtn.addEventListener("click", taskDialog)

    /* taskContainer.appendChild(createTaskBtn) */

   // return /* taskContainer */ createTaskBtn 
}

window.addEventListener("load", homeRender)

function homeRender(e) {
    let projectStorage = localStorage
    console.log(projectStorage)
    let projectValues = Object.values(projectStorage)
    console.log(projectValues)

 /*    let keys = Object.keys(projectArray)
    console.log(keys)
    let entries = Object.entries(projectArray)
    console.log(entries)
    let values = Object.values(projectArray)
    console.log(values) */
    
     let projectArray = []
    for (let project of projectValues) {
        
        projectArray.push(JSON.parse(project))

    }
    console.log(projectArray) 

    projectArray.forEach(project => {
        projectElementCreator(project.title)
    })

}


function mainRender(e){


    let taskContainer = document.querySelector(".task-container")
    let createTaskBtn = document.querySelector(".create-task-btn")

    taskContainer.innerHTML = "";

    let mainTitle = document.querySelector(".main-title")
    mainTitle.textContent = e.target.textContent || "Title";
    
    console.log(taskContainer)

    taskContainer.setAttribute("data-id", _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.getId(this.textContent))
    console.log(this)

    createTaskBtn.setAttribute("data-id", e.target.textContent)

    taskRender()
}

function taskRender (e) {
    
    let mainTitle = document.querySelector(".main-title").textContent
    console.log(mainTitle)
    let project = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveObj(mainTitle)

    project.list.forEach(task => {
        taskElementCreator(task.title, task.date)         
    }) 
}


function getTaskData (){
   
    let taskDate = document.querySelector(".task-date")
    let date = taskDate.value

    let taskTitle = document.querySelector(".task-title")
    let title = taskTitle.value

    return {title, date}
}


function taskElementAdded (e) {

    let {title, date} = getTaskData()
    taskElementCreator(title, date)
    
    elements.task.dialog.close()

}

function taskElementCreator (title, date) {

    let taskContainer = document.querySelector(".task-container")

    let taskEl = document.createElement("div")
    taskEl.classList.add("task-element")

    let check = document.createElement("span")
    check.classList.add("uncheck")
    check.addEventListener("click", isChecked)

    let titleEl = document.createElement("p")
    titleEl.textContent =  title

    let dateEl = document.createElement("p")
    dateEl.textContent =  date

    let deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.classList.add("delete-task-btn")
    deleteTaskBtn.addEventListener("click", deleteTask)

    taskEl.appendChild(check)
    taskEl.appendChild(titleEl)
    taskEl.appendChild(dateEl)
    taskEl.appendChild(deleteTaskBtn)
    //taskContainer.insertBefore(taskEl, createTaskBtn)
    taskContainer.appendChild(taskEl)

    //elements.task.dialog.close()

   // return {title, date}
}

function taskDialog(e){

    let taskTitle = document.querySelector(".task-title")
    taskTitle.value = ""
    let taskDate = document.querySelector(".task-date")
    taskDate.value = ""
    let taskNotes = document.querySelector(".task-notes")
    taskNotes.value = ""
    elements.task.dialog.showModal()
}

function taskDialogClose (e) {
    e.preventDefault()
    elements.task.dialog.close()
}

function isChecked (e) {
    if(e.target.className === "uncheck") {
        e.target.className = "checked"
    } else {
        e.target.className = "uncheck"
    }
}


function deleteProject(e) {

    e.target.parentElement.remove()
    _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.deleteObj(this.parentElement.textContent)
}

 function deleteTask(e) {

    e.target.parentElement.remove()
    _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.deleteObjTask(this)
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

/* function projectElement (e) {

    e.preventDefault();
    
    let list = document.createElement("li")
    let projectEl = document.createElement("div")
    projectEl.classList.add("project-element")
    projectEl.addEventListener("click", mainRender)

    let title = document.createElement("p")
    title.textContent = projectTitle.value

    let deleteProjectBtn = document.createElement("button")
    deleteProjectBtn.classList.add("delete-project-btn")
    deleteProjectBtn.addEventListener("click", deleteEl)


    projectEl.appendChild(title)
    projectEl.appendChild(deleteProjectBtn)
    list.appendChild(projectEl)

    projectList.appendChild(list)

    dialog.close()   
} */

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   storage: () => (/* binding */ storage)
/* harmony export */ });
/* harmony import */ var _to_do_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-do.js */ "./src/to-do.js");

;


let storage = {
     storeObj (obj){
        let objStr = JSON.stringify(obj)
        localStorage.setItem(`${obj.title}`, objStr)
    },
    
    retrieveObj (obj) {
       let objStr = localStorage.getItem(obj)
       let objParse = JSON.parse(objStr)
       Object.assign(objParse, _to_do_js__WEBPACK_IMPORTED_MODULE_0__.methods )
    
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




/***/ }),

/***/ "./src/to-do.js":
/*!**********************!*\
  !*** ./src/to-do.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   Task: () => (/* binding */ Task),
/* harmony export */   methods: () => (/* binding */ methods)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");





class Project {

   constructor(title, id) {
    this.title = title,
    this.id = id,
    this.list = []
   }

   add (newTask) {
    this.list.push(newTask)
   }

   delete () {
    _storage_js__WEBPACK_IMPORTED_MODULE_0__.storage.deleteObj(this)
   }

}


class Task {
    constructor(title, date, description, isPriority, isChecked) {
        this.title = title,
        this.date = date,
        this.description = description,
        this.isPriority = isPriority,
        this.isChecked = isChecked
    }

    delete () {
        _storage_js__WEBPACK_IMPORTED_MODULE_0__.storage.deleteObj(this)
    }
}


let methods = {

    add (newTask) {
        this.list.push(newTask)
    }, 
    delete () {
        _storage_js__WEBPACK_IMPORTED_MODULE_0__.storage.deleteObj(this)
    },
   create: function () {
    //this.createProject()
    console.log("created")
   }
}

//let task = createTask("pasear perro", "salir a camniar con el picho", "18-10-23", false, false)




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _to_do_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-do.js */ "./src/to-do.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");







let btnTaskAdd = document.querySelector(".btn-task-add")
btnTaskAdd.addEventListener("click", taskStorage)

let btnProjectAdd = document.querySelector(".btn-project-add");
btnProjectAdd.addEventListener("click", projectStorage)

function projectStorage (e) {

    let title = (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.getProjectData)()

    let id = localStorage.length

    let project = new _to_do_js__WEBPACK_IMPORTED_MODULE_0__.Project(title, id)

    _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.storeObj(project)

}

 function taskStorage(e) {

    let mainTitle = document.querySelector(".main-title")

    let {title, date} = (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.getTaskData)()

    let task = new _to_do_js__WEBPACK_IMPORTED_MODULE_0__.Task(title, date)

  // let retr = storage.retrieveObj(e.target.parentElement.parentElement.parentElement.firstElementChild.textContent)
    let retr = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveObj(mainTitle.textContent)

    retr.add(task)

    _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.storeObj(retr)

} 

function deleteEl(e) {
    e.target.parentElement.remove()
    _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.deleteObj(e.target.textContent)
}









})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTZFO0FBQzdFO0FBQ0EsQ0FBaUM7QUFDSztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxnREFBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdEQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGFBQWE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7QUNyVWM7QUFDaEIsQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxVQUFVO0FBQzFDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw4Q0FBTztBQUN0QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRG9DO0FBQzRCO0FBQ2hFO0FBQytCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnREFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLGdEQUFPO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOaUQ7QUFDYjtBQUNvRDtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDhDQUFPO0FBQzdCO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxhQUFhLEVBQUUsb0RBQVc7QUFDbkM7QUFDQSxtQkFBbUIsMkNBQUk7QUFDdkI7QUFDQTtBQUNBLGVBQWUsZ0RBQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG8tZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7dGFza0VsZW1lbnRBZGRlZCwgcHJvamVjdEVsZW1lbnRDcmVhdG9yLCBnZXRQcm9qZWN0RGF0YSwgZ2V0VGFza0RhdGF9XHJcblxyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdG8tZG8uanNcIlxyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiXHJcblxyXG5cclxubGV0IGVsZW1lbnRzID0ge1xyXG4gICAgcHJvamVjdDoge1xyXG4gICAgICAgIGNyZWF0ZUJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZyksXHJcbiAgICAgICAgYWRkQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWFkZFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdEVsZW1lbnRBZGRlZCksXHJcbiAgICAgICAgY2FuY2VsQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWNhbmNlbFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZ0Nsb3NlKSxcclxuICAgICAgICBkaWFsb2c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1kaWFsb2dcIilcclxuICAgICAgICAvKiBsaXN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdFwiKSxcclxuICAgICAgICB0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRpdGxlXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBnZXRQcm9qZWN0RGF0YSkgKi9cclxuICAgIH0sXHJcbiAgICB0YXNrOiB7XHJcbiAgICAgICAgLyogY3JlYXRlQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nKSwgKi9cclxuICAgICAgICBhZGRCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAgdGFza0VsZW1lbnRBZGRlZCAvKiB0YXNrUmVuZGVyKi8pLFxyXG4gICAgICAgIGNhbmNlbEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1jYW5jZWxcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2dDbG9zZSksXHJcbiAgICAgICAgZGlhbG9nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGlhbG9nXCIpLFxyXG4gICAgICAgIGRhdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpLFxyXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIiksXHJcbiAgICAgICAgY2hlY2s6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qIGxldCBidG5Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdFwiKSAvLyBjcmVhdGVCdG5cclxubGV0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1kaWFsb2dcIikgLy8gZGlhbG9nXHJcbi8vYnRuUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZylcclxuLy9lbGVtZW50cy5wcm9qZWN0LmNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZykqL1xyXG5cclxubGV0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3RcIikgLy9saXN0XHJcbmxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdGl0bGVcIikgLy8gdGl0bGVcclxucHJvamVjdFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBnZXRQcm9qZWN0RGF0YSlcclxuXHJcbi8qIGxldCBidG5Qcm9qZWN0QWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1hZGRcIikgLy9hZGRCdG5cclxuYnRuUHJvamVjdEFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdEVsZW1lbnRDcmVhdG9yKVxyXG5cclxubGV0IGJ0blByb2plY3RDYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWNhbmNlbFwiKSAvL2NhbmNlbEJ0blxyXG5idG5Qcm9qZWN0Q2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RGlhbG9nQ2xvc2UpXHJcblxyXG5sZXQgYnRuVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2tcIikgLy8gY3JlYXRlQnRuXHJcbmxldCBkaWFsb2cyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRpYWxvZ1wiKSAvLyBkaWFsb2dcclxuLy9idG5UYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nKVxyXG5lbGVtZW50cy50YXNrLmNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuXHJcbmxldCBidG5UYXNrQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1hZGRcIikgLy9hZGRCdG5cclxuYnRuVGFza0FkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0VsZW1lbnQpXHJcbmxldCBidG5UYXNrQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1jYW5jZWxcIikgLy9jYW5jZWxCdG5cclxuYnRuVGFza0NhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZ0Nsb3NlKSAgKi9cclxuXHJcbi8vbGV0IGJ0blRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrXCIpXHJcblxyXG5sZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpXHJcbmxldCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcmVhdGUtdGFzay1idG5cIilcclxuY3JlYXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0RGlhbG9nKGUpIHtcclxuICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IFwiXCI7IFxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuc2hvd01vZGFsKClcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvamVjdERpYWxvZ0Nsb3NlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuY2xvc2UoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0RGF0YShlKSB7XHJcbiAgICBsZXQgdGl0bGVOYW1lID0gcHJvamVjdFRpdGxlLnZhbHVlXHJcbiAgICByZXR1cm4gdGl0bGVOYW1lXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RFbGVtZW50QWRkZWQgKGUpIHtcclxuXHJcbiAgICBwcm9qZWN0RWxlbWVudENyZWF0b3IoZ2V0UHJvamVjdERhdGEoKSlcclxuXHJcbiAgICBlbGVtZW50cy5wcm9qZWN0LmRpYWxvZy5jbG9zZSgpXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0RWxlbWVudENyZWF0b3IgKHRpdGxlKSB7XHJcbiAgICBcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICBsZXQgcHJvamVjdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgcHJvamVjdEVsLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVsZW1lbnRcIilcclxuICAgIHByb2plY3RFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgIG1haW5SZW5kZXIgLyogdGFza1JlbmRlciovKVxyXG5cclxuICAgIGxldCB0aXRsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIHRpdGxlRWwudGV4dENvbnRlbnQgPSB0aXRsZVxyXG5cclxuICAgIGxldCBkZWxldGVQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVQcm9qZWN0KVxyXG5cclxuXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQodGl0bGVFbClcclxuICAgIHByb2plY3RFbC5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0QnRuKVxyXG4gICAgbGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0RWwpXHJcbiAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaXN0KSAgICBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1haW5DcmVhdG9yICgpIHtcclxuXHJcblxyXG4gICAgLyogICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbnRhaW5lclwiKTtcclxuICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChlLnRhcmdldC50ZXh0Q29udGVudCkgKi9cclxuXHJcbiAgIC8qICBsZXQgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgICAgICAgICAgY3JlYXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiY3JlYXRlLXRhc2stYnRuXCIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjcmVhdGVUYXNrQnRuLnRleHRDb250ZW50ID0gXCJBZGQgdGFza1wiXHJcbiAgICAgICAgICAgIGNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpXHJcblxyXG4gICAgLyogdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVUYXNrQnRuKSAqL1xyXG5cclxuICAgLy8gcmV0dXJuIC8qIHRhc2tDb250YWluZXIgKi8gY3JlYXRlVGFza0J0biBcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGhvbWVSZW5kZXIpXHJcblxyXG5mdW5jdGlvbiBob21lUmVuZGVyKGUpIHtcclxuICAgIGxldCBwcm9qZWN0U3RvcmFnZSA9IGxvY2FsU3RvcmFnZVxyXG4gICAgY29uc29sZS5sb2cocHJvamVjdFN0b3JhZ2UpXHJcbiAgICBsZXQgcHJvamVjdFZhbHVlcyA9IE9iamVjdC52YWx1ZXMocHJvamVjdFN0b3JhZ2UpXHJcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0VmFsdWVzKVxyXG5cclxuIC8qICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMocHJvamVjdEFycmF5KVxyXG4gICAgY29uc29sZS5sb2coa2V5cylcclxuICAgIGxldCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMocHJvamVjdEFycmF5KVxyXG4gICAgY29uc29sZS5sb2coZW50cmllcylcclxuICAgIGxldCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKHByb2plY3RBcnJheSlcclxuICAgIGNvbnNvbGUubG9nKHZhbHVlcykgKi9cclxuICAgIFxyXG4gICAgIGxldCBwcm9qZWN0QXJyYXkgPSBbXVxyXG4gICAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0VmFsdWVzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvamVjdEFycmF5LnB1c2goSlNPTi5wYXJzZShwcm9qZWN0KSlcclxuXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0QXJyYXkpIFxyXG5cclxuICAgIHByb2plY3RBcnJheS5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50Q3JlYXRvcihwcm9qZWN0LnRpdGxlKVxyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBtYWluUmVuZGVyKGUpe1xyXG5cclxuXHJcbiAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIilcclxuICAgIGxldCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcmVhdGUtdGFzay1idG5cIilcclxuXHJcbiAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgbGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi10aXRsZVwiKVxyXG4gICAgbWFpblRpdGxlLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQgfHwgXCJUaXRsZVwiO1xyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyh0YXNrQ29udGFpbmVyKVxyXG5cclxuICAgIHRhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBzdG9yYWdlLmdldElkKHRoaXMudGV4dENvbnRlbnQpKVxyXG4gICAgY29uc29sZS5sb2codGhpcylcclxuXHJcbiAgICBjcmVhdGVUYXNrQnRuLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgZS50YXJnZXQudGV4dENvbnRlbnQpXHJcblxyXG4gICAgdGFza1JlbmRlcigpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tSZW5kZXIgKGUpIHtcclxuICAgIFxyXG4gICAgbGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi10aXRsZVwiKS50ZXh0Q29udGVudFxyXG4gICAgY29uc29sZS5sb2cobWFpblRpdGxlKVxyXG4gICAgbGV0IHByb2plY3QgPSBzdG9yYWdlLnJldHJpZXZlT2JqKG1haW5UaXRsZSlcclxuXHJcbiAgICBwcm9qZWN0Lmxpc3QuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICB0YXNrRWxlbWVudENyZWF0b3IodGFzay50aXRsZSwgdGFzay5kYXRlKSAgICAgICAgIFxyXG4gICAgfSkgXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRUYXNrRGF0YSAoKXtcclxuICAgXHJcbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKVxyXG4gICAgbGV0IGRhdGUgPSB0YXNrRGF0ZS52YWx1ZVxyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIilcclxuICAgIGxldCB0aXRsZSA9IHRhc2tUaXRsZS52YWx1ZVxyXG5cclxuICAgIHJldHVybiB7dGl0bGUsIGRhdGV9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiB0YXNrRWxlbWVudEFkZGVkIChlKSB7XHJcblxyXG4gICAgbGV0IHt0aXRsZSwgZGF0ZX0gPSBnZXRUYXNrRGF0YSgpXHJcbiAgICB0YXNrRWxlbWVudENyZWF0b3IodGl0bGUsIGRhdGUpXHJcbiAgICBcclxuICAgIGVsZW1lbnRzLnRhc2suZGlhbG9nLmNsb3NlKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tFbGVtZW50Q3JlYXRvciAodGl0bGUsIGRhdGUpIHtcclxuXHJcbiAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIilcclxuXHJcbiAgICBsZXQgdGFza0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgdGFza0VsLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWVsZW1lbnRcIilcclxuXHJcbiAgICBsZXQgY2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxyXG4gICAgY2hlY2suY2xhc3NMaXN0LmFkZChcInVuY2hlY2tcIilcclxuICAgIGNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpc0NoZWNrZWQpXHJcblxyXG4gICAgbGV0IHRpdGxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgdGl0bGVFbC50ZXh0Q29udGVudCA9ICB0aXRsZVxyXG5cclxuICAgIGxldCBkYXRlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgZGF0ZUVsLnRleHRDb250ZW50ID0gIGRhdGVcclxuXHJcbiAgICBsZXQgZGVsZXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGRlbGV0ZVRhc2tCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS10YXNrLWJ0blwiKVxyXG4gICAgZGVsZXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlVGFzaylcclxuXHJcbiAgICB0YXNrRWwuYXBwZW5kQ2hpbGQoY2hlY2spXHJcbiAgICB0YXNrRWwuYXBwZW5kQ2hpbGQodGl0bGVFbClcclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZChkYXRlRWwpXHJcbiAgICB0YXNrRWwuYXBwZW5kQ2hpbGQoZGVsZXRlVGFza0J0bilcclxuICAgIC8vdGFza0NvbnRhaW5lci5pbnNlcnRCZWZvcmUodGFza0VsLCBjcmVhdGVUYXNrQnRuKVxyXG4gICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWwpXHJcblxyXG4gICAgLy9lbGVtZW50cy50YXNrLmRpYWxvZy5jbG9zZSgpXHJcblxyXG4gICAvLyByZXR1cm4ge3RpdGxlLCBkYXRlfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrRGlhbG9nKGUpe1xyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIilcclxuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCJcclxuICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpXHJcbiAgICB0YXNrRGF0ZS52YWx1ZSA9IFwiXCJcclxuICAgIGxldCB0YXNrTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbm90ZXNcIilcclxuICAgIHRhc2tOb3Rlcy52YWx1ZSA9IFwiXCJcclxuICAgIGVsZW1lbnRzLnRhc2suZGlhbG9nLnNob3dNb2RhbCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tEaWFsb2dDbG9zZSAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBlbGVtZW50cy50YXNrLmRpYWxvZy5jbG9zZSgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQ2hlY2tlZCAoZSkge1xyXG4gICAgaWYoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInVuY2hlY2tcIikge1xyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9IFwiY2hlY2tlZFwiXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9IFwidW5jaGVja1wiXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcclxuXHJcbiAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXHJcbiAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzLnBhcmVudEVsZW1lbnQudGV4dENvbnRlbnQpXHJcbn1cclxuXHJcbiBmdW5jdGlvbiBkZWxldGVUYXNrKGUpIHtcclxuXHJcbiAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXHJcbiAgICBzdG9yYWdlLmRlbGV0ZU9ialRhc2sodGhpcylcclxufSBcclxuXHJcbi8qIGZ1bmN0aW9uIG1haW5DcmVhdG9yICgpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBsZXQgdGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XHJcbiAgICBsZXQgYWRkVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuXHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1haW4tY29udGFpbmVyXCIpO1xyXG4gICAgdGl0bGVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRpdGxlLWNvbnRhaW5lclwiKTtcclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZS10YXNrXCIpO1xyXG4gICAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKFwiYnRuLXRhc2tcIik7XHJcblxyXG4gICAgbWFpbi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlQ29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrKTtcclxuICAgIHRpdGxlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIFxyXG59ICovXHJcblxyXG4vKiBmdW5jdGlvbiBwcm9qZWN0RWxlbWVudCAoZSkge1xyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG4gICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcclxuICAgIGxldCBwcm9qZWN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBwcm9qZWN0RWwuY2xhc3NMaXN0LmFkZChcInByb2plY3QtZWxlbWVudFwiKVxyXG4gICAgcHJvamVjdEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtYWluUmVuZGVyKVxyXG5cclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RUaXRsZS52YWx1ZVxyXG5cclxuICAgIGxldCBkZWxldGVQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVFbClcclxuXHJcblxyXG4gICAgcHJvamVjdEVsLmFwcGVuZENoaWxkKHRpdGxlKVxyXG4gICAgcHJvamVjdEVsLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pXHJcbiAgICBsaXN0LmFwcGVuZENoaWxkKHByb2plY3RFbClcclxuXHJcbiAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaXN0KVxyXG5cclxuICAgIGRpYWxvZy5jbG9zZSgpICAgXHJcbn0gKi8iLCJleHBvcnQge3N0b3JhZ2V9XHJcbmltcG9ydCB7bWV0aG9kc30gZnJvbSBcIi4vdG8tZG8uanNcIlxyXG5cclxuXHJcbmxldCBzdG9yYWdlID0ge1xyXG4gICAgIHN0b3JlT2JqIChvYmope1xyXG4gICAgICAgIGxldCBvYmpTdHIgPSBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7b2JqLnRpdGxlfWAsIG9ialN0cilcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJldHJpZXZlT2JqIChvYmopIHtcclxuICAgICAgIGxldCBvYmpTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShvYmopXHJcbiAgICAgICBsZXQgb2JqUGFyc2UgPSBKU09OLnBhcnNlKG9ialN0cilcclxuICAgICAgIE9iamVjdC5hc3NpZ24ob2JqUGFyc2UsIG1ldGhvZHMgKVxyXG4gICAgXHJcbiAgICAgICByZXR1cm4gb2JqUGFyc2VcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlT2JqIChvYmopIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShvYmopXHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZU9ialRhc2sgKG9iaikge1xyXG5cclxuICAgICAgICBsZXQgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXRpdGxlXCIpLnRleHRDb250ZW50XHJcbiAgICBcclxuICAgICAgICBsZXQgcHJvamVjdCA9IHN0b3JhZ2UucmV0cmlldmVPYmoobWFpblRpdGxlKVxyXG5cclxuICAgICAgICBsZXQgaW5kZXg7XHJcbiAgICAgICAgcHJvamVjdC5saXN0LmZvckVhY2goKHRhc2ssIGkpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRhc2sudGl0bGUgPT09IC8qIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQudGV4dENvbnRlbnQgKi9vYmoucGFyZW50RWxlbWVudC50ZXh0Q29udGVudCl7XHJcbiAgICAgICAgICAgICAgIGluZGV4ID0gaVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByb2plY3QubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgc3RvcmFnZS5zdG9yZU9iaihwcm9qZWN0KSAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRJZCAob2JqKSB7XHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBzdG9yYWdlLnJldHJpZXZlT2JqKG9iailcclxuICAgICAgICBsZXQgaWQgPSBwcm9qZWN0LmlkXHJcblxyXG4gICAgICAgIHJldHVybiBpZFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHtzdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCJcclxuaW1wb3J0IHsgcHJvamVjdEVsZW1lbnRDcmVhdG9yLCBnZXRQcm9qZWN0RGF0YSB9IGZyb20gXCIuL2RvbS5qc1wiXHJcblxyXG5leHBvcnQge1Byb2plY3QsIFRhc2ssIG1ldGhvZHN9XHJcblxyXG5jbGFzcyBQcm9qZWN0IHtcclxuXHJcbiAgIGNvbnN0cnVjdG9yKHRpdGxlLCBpZCkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlLFxyXG4gICAgdGhpcy5pZCA9IGlkLFxyXG4gICAgdGhpcy5saXN0ID0gW11cclxuICAgfVxyXG5cclxuICAgYWRkIChuZXdUYXNrKSB7XHJcbiAgICB0aGlzLmxpc3QucHVzaChuZXdUYXNrKVxyXG4gICB9XHJcblxyXG4gICBkZWxldGUgKCkge1xyXG4gICAgc3RvcmFnZS5kZWxldGVPYmoodGhpcylcclxuICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmNsYXNzIFRhc2sge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRhdGUsIGRlc2NyaXB0aW9uLCBpc1ByaW9yaXR5LCBpc0NoZWNrZWQpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZSxcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdGhpcy5pc1ByaW9yaXR5ID0gaXNQcmlvcml0eSxcclxuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IGlzQ2hlY2tlZFxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZSAoKSB7XHJcbiAgICAgICAgc3RvcmFnZS5kZWxldGVPYmoodGhpcylcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmxldCBtZXRob2RzID0ge1xyXG5cclxuICAgIGFkZCAobmV3VGFzaykge1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKG5ld1Rhc2spXHJcbiAgICB9LCBcclxuICAgIGRlbGV0ZSAoKSB7XHJcbiAgICAgICAgc3RvcmFnZS5kZWxldGVPYmoodGhpcylcclxuICAgIH0sXHJcbiAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy90aGlzLmNyZWF0ZVByb2plY3QoKVxyXG4gICAgY29uc29sZS5sb2coXCJjcmVhdGVkXCIpXHJcbiAgIH1cclxufVxyXG5cclxuLy9sZXQgdGFzayA9IGNyZWF0ZVRhc2soXCJwYXNlYXIgcGVycm9cIiwgXCJzYWxpciBhIGNhbW5pYXIgY29uIGVsIHBpY2hvXCIsIFwiMTgtMTAtMjNcIiwgZmFsc2UsIGZhbHNlKVxyXG5cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtQcm9qZWN0LCBUYXNrLCBtZXRob2RzfSBmcm9tIFwiLi90by1kby5qc1wiXHJcbmltcG9ydCB7c3RvcmFnZX0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiXHJcbmltcG9ydCB7dGFza0VsZW1lbnQsIHByb2plY3RFbGVtZW50Q3JlYXRvciwgZ2V0VGFza0RhdGEsIGdldFByb2plY3REYXRhfSBmcm9tIFwiLi9kb20uanNcIlxyXG5cclxuXHJcblxyXG5cclxubGV0IGJ0blRhc2tBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrLWFkZFwiKVxyXG5idG5UYXNrQWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrU3RvcmFnZSlcclxuXHJcbmxldCBidG5Qcm9qZWN0QWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1hZGRcIik7XHJcbmJ0blByb2plY3RBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RTdG9yYWdlKVxyXG5cclxuZnVuY3Rpb24gcHJvamVjdFN0b3JhZ2UgKGUpIHtcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBnZXRQcm9qZWN0RGF0YSgpXHJcblxyXG4gICAgbGV0IGlkID0gbG9jYWxTdG9yYWdlLmxlbmd0aFxyXG5cclxuICAgIGxldCBwcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGUsIGlkKVxyXG5cclxuICAgIHN0b3JhZ2Uuc3RvcmVPYmoocHJvamVjdClcclxuXHJcbn1cclxuXHJcbiBmdW5jdGlvbiB0YXNrU3RvcmFnZShlKSB7XHJcblxyXG4gICAgbGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi10aXRsZVwiKVxyXG5cclxuICAgIGxldCB7dGl0bGUsIGRhdGV9ID0gZ2V0VGFza0RhdGEoKVxyXG5cclxuICAgIGxldCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRhdGUpXHJcblxyXG4gIC8vIGxldCByZXRyID0gc3RvcmFnZS5yZXRyaWV2ZU9iaihlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudClcclxuICAgIGxldCByZXRyID0gc3RvcmFnZS5yZXRyaWV2ZU9iaihtYWluVGl0bGUudGV4dENvbnRlbnQpXHJcblxyXG4gICAgcmV0ci5hZGQodGFzaylcclxuXHJcbiAgICBzdG9yYWdlLnN0b3JlT2JqKHJldHIpXHJcblxyXG59IFxyXG5cclxuZnVuY3Rpb24gZGVsZXRlRWwoZSkge1xyXG4gICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxyXG4gICAgc3RvcmFnZS5kZWxldGVPYmooZS50YXJnZXQudGV4dENvbnRlbnQpXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=