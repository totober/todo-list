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
    projectEl.addEventListener("click",  /* mainRender */  taskRender)

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

window.addEventListener("load", homeRender)

function homeRender(e) {

    let projectArray = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveProjectsObj()

    projectArray.forEach(project => {
        projectElementCreator(project.title)
    });

}


function mainRender(e){

    let taskContainer = document.querySelector(".task-container")

    taskContainer.innerHTML = "";

    let mainTitle = document.querySelector(".main-title")
    mainTitle.textContent = e.target.textContent || "Title";

}


function taskRender (e) {

    mainRender(e)
    
    let taskContainer = document.querySelector(".task-container")

    let mainTitle = document.querySelector(".main-title").textContent
    console.log(mainTitle)
    let project = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveProject(mainTitle)

    project.list.forEach(task => {
        taskElementCreator(task.title, task.date, task.isChecked, task.isPriority)         
    }) 

     let projectId = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.getProjectId(this.textContent)
    taskContainer.setAttribute("data-id", projectId )
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

function taskElementCreator (title, date, isChecked, isPriority) {

    let taskContainer = document.querySelector(".task-container")

    let taskEl = document.createElement("div")
    taskEl.classList.add("task-element")

    let check = document.createElement("span")
    check.classList.add("uncheck")
    if(isChecked === false) {
         check.classList.add("uncheck")
    } else if (isChecked === true) {
        check.classList.add("check")
    }
    check.addEventListener("click", taskChecked)

    let titleEl = document.createElement("p")
    titleEl.textContent =  title

    let dateEl = document.createElement("p")
    dateEl.textContent =  date

    let priorityEl = document.createElement("div")
    priorityEl.setAttribute("id", "star-element")
    priorityEl.className = "not-priority"
    if (isPriority === false){
        priorityEl.className = "not-priority"
    } else if(isPriority === true) {
        priorityEl.className = "priority"
    }
    priorityEl.addEventListener("click", taskPriority)

    let deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.classList.add("delete-task-btn")
    deleteTaskBtn.addEventListener("click", deleteTask)

    taskEl.appendChild(check)
    taskEl.appendChild(titleEl)
    taskEl.appendChild(dateEl)
    taskEl.appendChild(priorityEl)
    taskEl.appendChild(deleteTaskBtn)
    //taskContainer.insertBefore(taskEl, createTaskBtn)
    taskContainer.appendChild(taskEl)
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

function taskChecked (e) {

    let {project, returnedTask} = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveTask(this)

    if(e.target.className === "uncheck") {
        e.target.className = "check"
        returnedTask.isChecked = true
        _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.storeObj(project)

    } else {
        e.target.className = "uncheck"
        returnedTask.isChecked = false
        _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.storeObj(project)

    }
    console.log(returnedTask.isChecked)
    return returnedTask.isChecked
}

function taskPriority (e) {
    let {project, returnedTask} = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveTask(this)

    if(e.target.className === "priority") {
        e.target.className = "not-priority"
        returnedTask.isPriority = false
        _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.storeObj(project)
    } else {
        e.target.className = "priority"
        returnedTask.isPriority = true
        _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.storeObj(project)
    }

    return returnedTask.isPriority
}


function deleteProject(e) {

    e.target.parentElement.remove()
    _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.deleteObj(this.parentElement.textContent)
    _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.uploadProjectId()

}

 function deleteTask(e) {

    e.target.parentElement.remove()
    _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.deleteObjTask(this)
} 

let sideAllTasks = document.querySelector(".side-all-tasks")
sideAllTasks.addEventListener("click", allTasks)

function allTasks(e) {

    mainRender(e)

    let projectsObj = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveProjectsObj()

    projectsObj.forEach(project => {
        project.list.forEach(task => {
            taskElementCreator(task.title, task.date, task.isChecked, task.isPriority)  
        })
    } )
}

let sideNextDays = document.querySelector(".side-next-days")
sideNextDays.addEventListener("click", nextDays)

function nextDays(e) {

    mainRender(e)

    let projectsObj = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveProjectsObj()

    projectsObj.forEach(project => {
        project.list.filter ( (task) => {
            let todayDate = new Date()
            let todayDateTrim = todayDate.toISOString().slice(0, 10)
            console.log(todayDate)
            console.log(todayDateTrim)
            taskElementCreator(task.title, task.date, task.isChecked, task.isPriority)  
        })
    } )

}


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
    
    retrieveProject (obj) {
       let objStr = localStorage.getItem(obj)
       let objParse = JSON.parse(objStr)
       Object.assign(objParse, _to_do_js__WEBPACK_IMPORTED_MODULE_0__.methods )
    
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
    constructor(title, date, isChecked = false, isPriority = false, description) {
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
    let retr = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveProject(mainTitle.textContent)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnREFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLGdEQUFPO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOaUQ7QUFDYjtBQUNvRDtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDhDQUFPO0FBQzdCO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxhQUFhLEVBQUUsb0RBQVc7QUFDbkM7QUFDQSxtQkFBbUIsMkNBQUk7QUFDdkI7QUFDQTtBQUNBLGVBQWUsZ0RBQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG8tZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7dGFza0VsZW1lbnRBZGRlZCwgcHJvamVjdEVsZW1lbnRDcmVhdG9yLCBnZXRQcm9qZWN0RGF0YSwgZ2V0VGFza0RhdGF9XHJcblxyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdG8tZG8uanNcIlxyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiXHJcblxyXG5cclxubGV0IGVsZW1lbnRzID0ge1xyXG4gICAgcHJvamVjdDoge1xyXG4gICAgICAgIGNyZWF0ZUJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZyksXHJcbiAgICAgICAgYWRkQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWFkZFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdEVsZW1lbnRBZGRlZCksXHJcbiAgICAgICAgY2FuY2VsQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWNhbmNlbFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZ0Nsb3NlKSxcclxuICAgICAgICBkaWFsb2c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1kaWFsb2dcIilcclxuICAgICAgICAvKiBsaXN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdFwiKSxcclxuICAgICAgICB0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRpdGxlXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBnZXRQcm9qZWN0RGF0YSkgKi9cclxuICAgIH0sXHJcbiAgICB0YXNrOiB7XHJcbiAgICAgICAgLyogY3JlYXRlQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nKSwgKi9cclxuICAgICAgICBhZGRCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAgdGFza0VsZW1lbnRBZGRlZCAvKiB0YXNrUmVuZGVyKi8pLFxyXG4gICAgICAgIGNhbmNlbEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1jYW5jZWxcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2dDbG9zZSksXHJcbiAgICAgICAgZGlhbG9nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGlhbG9nXCIpLFxyXG4gICAgICAgIGRhdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpLFxyXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIiksXHJcbiAgICAgICAgY2hlY2s6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qIGxldCBidG5Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdFwiKSAvLyBjcmVhdGVCdG5cclxubGV0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1kaWFsb2dcIikgLy8gZGlhbG9nXHJcbi8vYnRuUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZylcclxuLy9lbGVtZW50cy5wcm9qZWN0LmNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZykqL1xyXG5cclxubGV0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3RcIikgLy9saXN0XHJcbmxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdGl0bGVcIikgLy8gdGl0bGVcclxucHJvamVjdFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBnZXRQcm9qZWN0RGF0YSlcclxuXHJcbi8qIGxldCBidG5Qcm9qZWN0QWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1hZGRcIikgLy9hZGRCdG5cclxuYnRuUHJvamVjdEFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdEVsZW1lbnRDcmVhdG9yKVxyXG5cclxubGV0IGJ0blByb2plY3RDYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWNhbmNlbFwiKSAvL2NhbmNlbEJ0blxyXG5idG5Qcm9qZWN0Q2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RGlhbG9nQ2xvc2UpXHJcblxyXG5sZXQgYnRuVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2tcIikgLy8gY3JlYXRlQnRuXHJcbmxldCBkaWFsb2cyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRpYWxvZ1wiKSAvLyBkaWFsb2dcclxuLy9idG5UYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nKVxyXG5lbGVtZW50cy50YXNrLmNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuXHJcbmxldCBidG5UYXNrQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1hZGRcIikgLy9hZGRCdG5cclxuYnRuVGFza0FkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0VsZW1lbnQpXHJcbmxldCBidG5UYXNrQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1jYW5jZWxcIikgLy9jYW5jZWxCdG5cclxuYnRuVGFza0NhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZ0Nsb3NlKSAgKi9cclxuXHJcbi8vbGV0IGJ0blRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrXCIpXHJcblxyXG5sZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpXHJcbmxldCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcmVhdGUtdGFzay1idG5cIilcclxuY3JlYXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuXHJcbmZ1bmN0aW9uIHByb2plY3REaWFsb2coZSkge1xyXG4gICAgcHJvamVjdFRpdGxlLnZhbHVlID0gXCJcIjsgXHJcbiAgICBlbGVtZW50cy5wcm9qZWN0LmRpYWxvZy5zaG93TW9kYWwoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0RGlhbG9nQ2xvc2UoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBlbGVtZW50cy5wcm9qZWN0LmRpYWxvZy5jbG9zZSgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByb2plY3REYXRhKGUpIHtcclxuICAgIGxldCB0aXRsZU5hbWUgPSBwcm9qZWN0VGl0bGUudmFsdWVcclxuICAgIHJldHVybiB0aXRsZU5hbWVcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvamVjdEVsZW1lbnRBZGRlZCAoZSkge1xyXG5cclxuICAgIHByb2plY3RFbGVtZW50Q3JlYXRvcihnZXRQcm9qZWN0RGF0YSgpKVxyXG5cclxuICAgIGVsZW1lbnRzLnByb2plY3QuZGlhbG9nLmNsb3NlKClcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RFbGVtZW50Q3JlYXRvciAodGl0bGUpIHtcclxuICAgIFxyXG4gICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcclxuICAgIGxldCBwcm9qZWN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBwcm9qZWN0RWwuY2xhc3NMaXN0LmFkZChcInByb2plY3QtZWxlbWVudFwiKVxyXG4gICAgcHJvamVjdEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAgLyogbWFpblJlbmRlciAqLyAgdGFza1JlbmRlcilcclxuXHJcbiAgICBsZXQgdGl0bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICB0aXRsZUVsLnRleHRDb250ZW50ID0gdGl0bGVcclxuXHJcbiAgICBsZXQgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1wcm9qZWN0LWJ0blwiKVxyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlUHJvamVjdClcclxuXHJcblxyXG4gICAgcHJvamVjdEVsLmFwcGVuZENoaWxkKHRpdGxlRWwpXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bilcclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEVsKVxyXG4gICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGlzdCkgICAgXHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBob21lUmVuZGVyKVxyXG5cclxuZnVuY3Rpb24gaG9tZVJlbmRlcihlKSB7XHJcblxyXG4gICAgbGV0IHByb2plY3RBcnJheSA9IHN0b3JhZ2UucmV0cmlldmVQcm9qZWN0c09iaigpXHJcblxyXG4gICAgcHJvamVjdEFycmF5LmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnRDcmVhdG9yKHByb2plY3QudGl0bGUpXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBtYWluUmVuZGVyKGUpe1xyXG5cclxuICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKVxyXG5cclxuICAgIHRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICBsZXQgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXRpdGxlXCIpXHJcbiAgICBtYWluVGl0bGUudGV4dENvbnRlbnQgPSBlLnRhcmdldC50ZXh0Q29udGVudCB8fCBcIlRpdGxlXCI7XHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdGFza1JlbmRlciAoZSkge1xyXG5cclxuICAgIG1haW5SZW5kZXIoZSlcclxuICAgIFxyXG4gICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpXHJcblxyXG4gICAgbGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi10aXRsZVwiKS50ZXh0Q29udGVudFxyXG4gICAgY29uc29sZS5sb2cobWFpblRpdGxlKVxyXG4gICAgbGV0IHByb2plY3QgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdChtYWluVGl0bGUpXHJcblxyXG4gICAgcHJvamVjdC5saXN0LmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgdGFza0VsZW1lbnRDcmVhdG9yKHRhc2sudGl0bGUsIHRhc2suZGF0ZSwgdGFzay5pc0NoZWNrZWQsIHRhc2suaXNQcmlvcml0eSkgICAgICAgICBcclxuICAgIH0pIFxyXG5cclxuICAgICBsZXQgcHJvamVjdElkID0gc3RvcmFnZS5nZXRQcm9qZWN0SWQodGhpcy50ZXh0Q29udGVudClcclxuICAgIHRhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBwcm9qZWN0SWQgKVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0VGFza0RhdGEgKCl7XHJcbiAgIFxyXG4gICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIilcclxuICAgIGxldCBkYXRlID0gdGFza0RhdGUudmFsdWVcclxuXHJcbiAgICBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXRpdGxlXCIpXHJcbiAgICBsZXQgdGl0bGUgPSB0YXNrVGl0bGUudmFsdWVcclxuXHJcbiAgICByZXR1cm4ge3RpdGxlLCBkYXRlfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdGFza0VsZW1lbnRBZGRlZCAoZSkge1xyXG5cclxuICAgIGxldCB7dGl0bGUsIGRhdGV9ID0gZ2V0VGFza0RhdGEoKVxyXG4gICAgdGFza0VsZW1lbnRDcmVhdG9yKHRpdGxlLCBkYXRlKVxyXG4gICAgXHJcbiAgICBlbGVtZW50cy50YXNrLmRpYWxvZy5jbG9zZSgpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrRWxlbWVudENyZWF0b3IgKHRpdGxlLCBkYXRlLCBpc0NoZWNrZWQsIGlzUHJpb3JpdHkpIHtcclxuXHJcbiAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIilcclxuXHJcbiAgICBsZXQgdGFza0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgdGFza0VsLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWVsZW1lbnRcIilcclxuXHJcbiAgICBsZXQgY2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxyXG4gICAgY2hlY2suY2xhc3NMaXN0LmFkZChcInVuY2hlY2tcIilcclxuICAgIGlmKGlzQ2hlY2tlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgY2hlY2suY2xhc3NMaXN0LmFkZChcInVuY2hlY2tcIilcclxuICAgIH0gZWxzZSBpZiAoaXNDaGVja2VkID09PSB0cnVlKSB7XHJcbiAgICAgICAgY2hlY2suY2xhc3NMaXN0LmFkZChcImNoZWNrXCIpXHJcbiAgICB9XHJcbiAgICBjaGVjay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0NoZWNrZWQpXHJcblxyXG4gICAgbGV0IHRpdGxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgdGl0bGVFbC50ZXh0Q29udGVudCA9ICB0aXRsZVxyXG5cclxuICAgIGxldCBkYXRlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgZGF0ZUVsLnRleHRDb250ZW50ID0gIGRhdGVcclxuXHJcbiAgICBsZXQgcHJpb3JpdHlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIHByaW9yaXR5RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzdGFyLWVsZW1lbnRcIilcclxuICAgIHByaW9yaXR5RWwuY2xhc3NOYW1lID0gXCJub3QtcHJpb3JpdHlcIlxyXG4gICAgaWYgKGlzUHJpb3JpdHkgPT09IGZhbHNlKXtcclxuICAgICAgICBwcmlvcml0eUVsLmNsYXNzTmFtZSA9IFwibm90LXByaW9yaXR5XCJcclxuICAgIH0gZWxzZSBpZihpc1ByaW9yaXR5ID09PSB0cnVlKSB7XHJcbiAgICAgICAgcHJpb3JpdHlFbC5jbGFzc05hbWUgPSBcInByaW9yaXR5XCJcclxuICAgIH1cclxuICAgIHByaW9yaXR5RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tQcmlvcml0eSlcclxuXHJcbiAgICBsZXQgZGVsZXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGRlbGV0ZVRhc2tCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS10YXNrLWJ0blwiKVxyXG4gICAgZGVsZXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlVGFzaylcclxuXHJcbiAgICB0YXNrRWwuYXBwZW5kQ2hpbGQoY2hlY2spXHJcbiAgICB0YXNrRWwuYXBwZW5kQ2hpbGQodGl0bGVFbClcclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZChkYXRlRWwpXHJcbiAgICB0YXNrRWwuYXBwZW5kQ2hpbGQocHJpb3JpdHlFbClcclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZChkZWxldGVUYXNrQnRuKVxyXG4gICAgLy90YXNrQ29udGFpbmVyLmluc2VydEJlZm9yZSh0YXNrRWwsIGNyZWF0ZVRhc2tCdG4pXHJcbiAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFbClcclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0RpYWxvZyhlKXtcclxuXHJcbiAgICBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXRpdGxlXCIpXHJcbiAgICB0YXNrVGl0bGUudmFsdWUgPSBcIlwiXHJcbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKVxyXG4gICAgdGFza0RhdGUudmFsdWUgPSBcIlwiXHJcbiAgICBsZXQgdGFza05vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW5vdGVzXCIpXHJcbiAgICB0YXNrTm90ZXMudmFsdWUgPSBcIlwiXHJcbiAgICBlbGVtZW50cy50YXNrLmRpYWxvZy5zaG93TW9kYWwoKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrRGlhbG9nQ2xvc2UgKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgZWxlbWVudHMudGFzay5kaWFsb2cuY2xvc2UoKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrQ2hlY2tlZCAoZSkge1xyXG5cclxuICAgIGxldCB7cHJvamVjdCwgcmV0dXJuZWRUYXNrfSA9IHN0b3JhZ2UucmV0cmlldmVUYXNrKHRoaXMpXHJcblxyXG4gICAgaWYoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInVuY2hlY2tcIikge1xyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9IFwiY2hlY2tcIlxyXG4gICAgICAgIHJldHVybmVkVGFzay5pc0NoZWNrZWQgPSB0cnVlXHJcbiAgICAgICAgc3RvcmFnZS5zdG9yZU9iaihwcm9qZWN0KVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID0gXCJ1bmNoZWNrXCJcclxuICAgICAgICByZXR1cm5lZFRhc2suaXNDaGVja2VkID0gZmFsc2VcclxuICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpXHJcblxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2cocmV0dXJuZWRUYXNrLmlzQ2hlY2tlZClcclxuICAgIHJldHVybiByZXR1cm5lZFRhc2suaXNDaGVja2VkXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tQcmlvcml0eSAoZSkge1xyXG4gICAgbGV0IHtwcm9qZWN0LCByZXR1cm5lZFRhc2t9ID0gc3RvcmFnZS5yZXRyaWV2ZVRhc2sodGhpcylcclxuXHJcbiAgICBpZihlLnRhcmdldC5jbGFzc05hbWUgPT09IFwicHJpb3JpdHlcIikge1xyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9IFwibm90LXByaW9yaXR5XCJcclxuICAgICAgICByZXR1cm5lZFRhc2suaXNQcmlvcml0eSA9IGZhbHNlXHJcbiAgICAgICAgc3RvcmFnZS5zdG9yZU9iaihwcm9qZWN0KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlLnRhcmdldC5jbGFzc05hbWUgPSBcInByaW9yaXR5XCJcclxuICAgICAgICByZXR1cm5lZFRhc2suaXNQcmlvcml0eSA9IHRydWVcclxuICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldHVybmVkVGFzay5pc1ByaW9yaXR5XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcclxuXHJcbiAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXHJcbiAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzLnBhcmVudEVsZW1lbnQudGV4dENvbnRlbnQpXHJcbiAgICBzdG9yYWdlLnVwbG9hZFByb2plY3RJZCgpXHJcblxyXG59XHJcblxyXG4gZnVuY3Rpb24gZGVsZXRlVGFzayhlKSB7XHJcblxyXG4gICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxyXG4gICAgc3RvcmFnZS5kZWxldGVPYmpUYXNrKHRoaXMpXHJcbn0gXHJcblxyXG5sZXQgc2lkZUFsbFRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlLWFsbC10YXNrc1wiKVxyXG5zaWRlQWxsVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFsbFRhc2tzKVxyXG5cclxuZnVuY3Rpb24gYWxsVGFza3MoZSkge1xyXG5cclxuICAgIG1haW5SZW5kZXIoZSlcclxuXHJcbiAgICBsZXQgcHJvamVjdHNPYmogPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdHNPYmooKVxyXG5cclxuICAgIHByb2plY3RzT2JqLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgcHJvamVjdC5saXN0LmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgICAgIHRhc2tFbGVtZW50Q3JlYXRvcih0YXNrLnRpdGxlLCB0YXNrLmRhdGUsIHRhc2suaXNDaGVja2VkLCB0YXNrLmlzUHJpb3JpdHkpICBcclxuICAgICAgICB9KVxyXG4gICAgfSApXHJcbn1cclxuXHJcbmxldCBzaWRlTmV4dERheXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGUtbmV4dC1kYXlzXCIpXHJcbnNpZGVOZXh0RGF5cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbmV4dERheXMpXHJcblxyXG5mdW5jdGlvbiBuZXh0RGF5cyhlKSB7XHJcblxyXG4gICAgbWFpblJlbmRlcihlKVxyXG5cclxuICAgIGxldCBwcm9qZWN0c09iaiA9IHN0b3JhZ2UucmV0cmlldmVQcm9qZWN0c09iaigpXHJcblxyXG4gICAgcHJvamVjdHNPYmouZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICBwcm9qZWN0Lmxpc3QuZmlsdGVyICggKHRhc2spID0+IHtcclxuICAgICAgICAgICAgbGV0IHRvZGF5RGF0ZSA9IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgbGV0IHRvZGF5RGF0ZVRyaW0gPSB0b2RheURhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMClcclxuICAgICAgICAgICAgY29uc29sZS5sb2codG9kYXlEYXRlKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b2RheURhdGVUcmltKVxyXG4gICAgICAgICAgICB0YXNrRWxlbWVudENyZWF0b3IodGFzay50aXRsZSwgdGFzay5kYXRlLCB0YXNrLmlzQ2hlY2tlZCwgdGFzay5pc1ByaW9yaXR5KSAgXHJcbiAgICAgICAgfSlcclxuICAgIH0gKVxyXG5cclxufVxyXG4iLCJleHBvcnQge3N0b3JhZ2V9XHJcbmltcG9ydCB7bWV0aG9kc30gZnJvbSBcIi4vdG8tZG8uanNcIlxyXG5cclxuXHJcbmxldCBzdG9yYWdlID0ge1xyXG4gICAgIHN0b3JlT2JqIChvYmope1xyXG4gICAgICAgIGxldCBvYmpTdHIgPSBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7b2JqLnRpdGxlfWAsIG9ialN0cilcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJldHJpZXZlUHJvamVjdCAob2JqKSB7XHJcbiAgICAgICBsZXQgb2JqU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ob2JqKVxyXG4gICAgICAgbGV0IG9ialBhcnNlID0gSlNPTi5wYXJzZShvYmpTdHIpXHJcbiAgICAgICBPYmplY3QuYXNzaWduKG9ialBhcnNlLCBtZXRob2RzIClcclxuICAgIFxyXG4gICAgICAgcmV0dXJuIG9ialBhcnNlXHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZU9iaiAob2JqKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0ob2JqKVxyXG4gICAgfSxcclxuXHJcbiAgICByZXRyaWV2ZVRhc2sob2JqKXtcclxuXHJcbiAgICAgICAgbGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi10aXRsZVwiKS50ZXh0Q29udGVudDtcclxuICAgICAgICBsZXQgcHJvamVjdCA9IHN0b3JhZ2UucmV0cmlldmVQcm9qZWN0KG1haW5UaXRsZSk7XHJcblxyXG4gICAgICAgIGxldCByZXR1cm5lZFRhc2tcclxuXHJcbiAgICAgICAgcHJvamVjdC5saXN0LmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRhc2sudGl0bGUgPT09IG9iai5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5lZFRhc2sgPSB0YXNrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtwcm9qZWN0LCByZXR1cm5lZFRhc2t9O1xyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVPYmpUYXNrIChvYmopIHtcclxuXHJcbiAgICAgICAgbGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi10aXRsZVwiKS50ZXh0Q29udGVudFxyXG4gICAgXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdChtYWluVGl0bGUpXHJcblxyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBwcm9qZWN0Lmxpc3QuZm9yRWFjaCgodGFzaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGFzay50aXRsZSA9PT0gLyogZS50YXJnZXQucGFyZW50RWxlbWVudC50ZXh0Q29udGVudCAqL29iai5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50KXtcclxuICAgICAgICAgICAgICAgaW5kZXggPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcHJvamVjdC5saXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHJldHJpZXZlUHJvamVjdHNPYmogKCkge1xyXG4gICAgICAgIGxldCBwcm9qZWN0U3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuICAgICAgICBsZXQgcHJvamVjdFZhbHVlcyA9IE9iamVjdC52YWx1ZXMocHJvamVjdFN0b3JhZ2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICBsZXQgcHJvamVjdEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0VmFsdWVzKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcm9qZWN0QXJyYXkucHVzaChKU09OLnBhcnNlKHByb2plY3QpKVxyXG4gICAgXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb2plY3RBcnJheVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGxvYWRQcm9qZWN0SWQgKCkge1xyXG4gICAgICAgIGxldCBwcm9qZWN0QXJyYXkgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdHNPYmooKVxyXG5cclxuICAgICAgICBwcm9qZWN0QXJyYXkuZm9yRWFjaCgocHJvamVjdCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICBwcm9qZWN0LmlkID0gaVxyXG4gICAgICAgICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpXHJcbiAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYCR7cHJvamVjdC50aXRsZX0gOiAke3Byb2plY3QuaWR9YClcclxuICAgICAgICAgICB9XHJcbiAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFByb2plY3RJZCAob2JqKSB7XHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdChvYmopXHJcbiAgICAgICAgbGV0IGlkID0gcHJvamVjdC5pZFxyXG5cclxuICAgICAgICByZXR1cm4gaWRcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7c3RvcmFnZX0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiXHJcbmltcG9ydCB7IHByb2plY3RFbGVtZW50Q3JlYXRvciwgZ2V0UHJvamVjdERhdGEgfSBmcm9tIFwiLi9kb20uanNcIlxyXG5cclxuZXhwb3J0IHtQcm9qZWN0LCBUYXNrLCBtZXRob2RzfVxyXG5cclxuY2xhc3MgUHJvamVjdCB7XHJcblxyXG4gICBjb25zdHJ1Y3Rvcih0aXRsZSwgaWQpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgIHRoaXMuaWQgPSBpZCxcclxuICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgIH1cclxuXHJcbiAgIGFkZCAobmV3VGFzaykge1xyXG4gICAgdGhpcy5saXN0LnB1c2gobmV3VGFzaylcclxuICAgfVxyXG5cclxuICAgZGVsZXRlICgpIHtcclxuICAgIHN0b3JhZ2UuZGVsZXRlT2JqKHRoaXMpXHJcbiAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkYXRlLCBpc0NoZWNrZWQgPSBmYWxzZSwgaXNQcmlvcml0eSA9IGZhbHNlLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlLFxyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbixcclxuICAgICAgICB0aGlzLmlzUHJpb3JpdHkgPSBpc1ByaW9yaXR5LFxyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gaXNDaGVja2VkXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlICgpIHtcclxuICAgICAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxubGV0IG1ldGhvZHMgPSB7XHJcblxyXG4gICAgYWRkIChuZXdUYXNrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3VGFzaylcclxuICAgIH0sIFxyXG4gICAgZGVsZXRlICgpIHtcclxuICAgICAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICAgfSxcclxuICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL3RoaXMuY3JlYXRlUHJvamVjdCgpXHJcbiAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWRcIilcclxuICAgfVxyXG59XHJcblxyXG4vL2xldCB0YXNrID0gY3JlYXRlVGFzayhcInBhc2VhciBwZXJyb1wiLCBcInNhbGlyIGEgY2FtbmlhciBjb24gZWwgcGljaG9cIiwgXCIxOC0xMC0yM1wiLCBmYWxzZSwgZmFsc2UpXHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1Byb2plY3QsIFRhc2ssIG1ldGhvZHN9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuaW1wb3J0IHtzdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCJcclxuaW1wb3J0IHt0YXNrRWxlbWVudCwgcHJvamVjdEVsZW1lbnRDcmVhdG9yLCBnZXRUYXNrRGF0YSwgZ2V0UHJvamVjdERhdGF9IGZyb20gXCIuL2RvbS5qc1wiXHJcblxyXG5cclxuXHJcblxyXG5sZXQgYnRuVGFza0FkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpXHJcbmJ0blRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tTdG9yYWdlKVxyXG5cclxubGV0IGJ0blByb2plY3RBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWFkZFwiKTtcclxuYnRuUHJvamVjdEFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdFN0b3JhZ2UpXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0U3RvcmFnZSAoZSkge1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGdldFByb2plY3REYXRhKClcclxuXHJcbiAgICBsZXQgaWQgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoXHJcblxyXG4gICAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZSwgaWQpXHJcblxyXG4gICAgc3RvcmFnZS5zdG9yZU9iaihwcm9qZWN0KVxyXG5cclxufVxyXG5cclxuIGZ1bmN0aW9uIHRhc2tTdG9yYWdlKGUpIHtcclxuXHJcbiAgICBsZXQgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXRpdGxlXCIpXHJcblxyXG4gICAgbGV0IHt0aXRsZSwgZGF0ZX0gPSBnZXRUYXNrRGF0YSgpXHJcblxyXG4gICAgbGV0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGF0ZSlcclxuXHJcbiAgLy8gbGV0IHJldHIgPSBzdG9yYWdlLnJldHJpZXZlT2JqKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50KVxyXG4gICAgbGV0IHJldHIgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdChtYWluVGl0bGUudGV4dENvbnRlbnQpXHJcblxyXG4gICAgcmV0ci5hZGQodGFzaylcclxuXHJcbiAgICBzdG9yYWdlLnN0b3JlT2JqKHJldHIpXHJcblxyXG59IFxyXG5cclxuZnVuY3Rpb24gZGVsZXRlRWwoZSkge1xyXG4gICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxyXG4gICAgc3RvcmFnZS5kZWxldGVPYmooZS50YXJnZXQudGV4dENvbnRlbnQpXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=