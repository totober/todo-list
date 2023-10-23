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
    projectEl.addEventListener("click",  mainRender  /*taskRender*/)

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

    let projectId = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.getProjectId(this.textContent)
    taskContainer.setAttribute("data-id", projectId )
    console.log(projectId)

    taskRender()
}

function taskRender () {
    
    
    let mainTitle = document.querySelector(".main-title").textContent
    console.log(mainTitle)
    let project = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveProject(mainTitle)

    project.list.forEach(task => {
        taskElementCreator(task.title, task.date, task.isChecked, task.isPriority)         
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
            if(task.title === /*  obj.nextElementSibling.textContent */ obj.parentElement.firstElementChild.nextElementSibling.textContent){
               console.log(obj.parentElement.firstElementChild.nextElementSibling.textContent)
               console.log(obj.nextElementSibling.textContent)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTmlEO0FBQ2I7QUFDb0Q7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHVEQUFjO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4Q0FBTztBQUM3QjtBQUNBLElBQUksZ0RBQU87QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsYUFBYSxFQUFFLG9EQUFXO0FBQ25DO0FBQ0EsbUJBQW1CLDJDQUFJO0FBQ3ZCO0FBQ0E7QUFDQSxlQUFlLGdEQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLElBQUksZ0RBQU87QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvLWRvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge3Rhc2tFbGVtZW50QWRkZWQsIHByb2plY3RFbGVtZW50Q3JlYXRvciwgZ2V0UHJvamVjdERhdGEsIGdldFRhc2tEYXRhfVxyXG5cclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIlxyXG5cclxuXHJcbmxldCBlbGVtZW50cyA9IHtcclxuICAgIHByb2plY3Q6IHtcclxuICAgICAgICBjcmVhdGVCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3RcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2cpLFxyXG4gICAgICAgIGFkZEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1hZGRcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RFbGVtZW50QWRkZWQpLFxyXG4gICAgICAgIGNhbmNlbEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1jYW5jZWxcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2dDbG9zZSksXHJcbiAgICAgICAgZGlhbG9nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZGlhbG9nXCIpXHJcbiAgICAgICAgLyogbGlzdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3RcIiksXHJcbiAgICAgICAgdGl0bGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10aXRsZVwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZ2V0UHJvamVjdERhdGEpICovXHJcbiAgICB9LFxyXG4gICAgdGFzazoge1xyXG4gICAgICAgIC8qIGNyZWF0ZUJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFza1wiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZyksICovXHJcbiAgICAgICAgYWRkQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrLWFkZFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgIHRhc2tFbGVtZW50QWRkZWQgLyogdGFza1JlbmRlciovKSxcclxuICAgICAgICBjYW5jZWxCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stY2FuY2VsXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nQ2xvc2UpLFxyXG4gICAgICAgIGRpYWxvZzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRpYWxvZ1wiKSxcclxuICAgICAgICBkYXRlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKSxcclxuICAgICAgICB0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXRpdGxlXCIpLFxyXG4gICAgICAgIGNoZWNrOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic3BhblwiKVxyXG4gICAgfVxyXG59XHJcblxyXG4vKiBsZXQgYnRuUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3RcIikgLy8gY3JlYXRlQnRuXHJcbmxldCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZGlhbG9nXCIpIC8vIGRpYWxvZ1xyXG4vL2J0blByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2cpXHJcbi8vZWxlbWVudHMucHJvamVjdC5jcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2cpKi9cclxuXHJcbmxldCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1saXN0XCIpIC8vbGlzdFxyXG5sZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRpdGxlXCIpIC8vIHRpdGxlXHJcbnByb2plY3RUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZ2V0UHJvamVjdERhdGEpXHJcblxyXG4vKiBsZXQgYnRuUHJvamVjdEFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3QtYWRkXCIpIC8vYWRkQnRuXHJcbmJ0blByb2plY3RBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RFbGVtZW50Q3JlYXRvcilcclxuXHJcbmxldCBidG5Qcm9qZWN0Q2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1jYW5jZWxcIikgLy9jYW5jZWxCdG5cclxuYnRuUHJvamVjdENhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZ0Nsb3NlKVxyXG5cclxubGV0IGJ0blRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrXCIpIC8vIGNyZWF0ZUJ0blxyXG5sZXQgZGlhbG9nMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kaWFsb2dcIikgLy8gZGlhbG9nXHJcbi8vYnRuVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuZWxlbWVudHMudGFzay5jcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpXHJcblxyXG5sZXQgYnRuVGFza0FkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpIC8vYWRkQnRuXHJcbmJ0blRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tFbGVtZW50KVxyXG5sZXQgYnRuVGFza0NhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stY2FuY2VsXCIpIC8vY2FuY2VsQnRuXHJcbmJ0blRhc2tDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2dDbG9zZSkgICovXHJcblxyXG4vL2xldCBidG5UYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFza1wiKVxyXG5cclxubGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKVxyXG5sZXQgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlLXRhc2stYnRuXCIpXHJcbmNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0RGlhbG9nKGUpIHtcclxuICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IFwiXCI7IFxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuc2hvd01vZGFsKClcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvamVjdERpYWxvZ0Nsb3NlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuY2xvc2UoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0RGF0YShlKSB7XHJcbiAgICBsZXQgdGl0bGVOYW1lID0gcHJvamVjdFRpdGxlLnZhbHVlXHJcbiAgICByZXR1cm4gdGl0bGVOYW1lXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RFbGVtZW50QWRkZWQgKGUpIHtcclxuXHJcbiAgICBwcm9qZWN0RWxlbWVudENyZWF0b3IoZ2V0UHJvamVjdERhdGEoKSlcclxuXHJcbiAgICBlbGVtZW50cy5wcm9qZWN0LmRpYWxvZy5jbG9zZSgpXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0RWxlbWVudENyZWF0b3IgKHRpdGxlKSB7XHJcbiAgICBcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICBsZXQgcHJvamVjdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgcHJvamVjdEVsLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVsZW1lbnRcIilcclxuICAgIHByb2plY3RFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgIG1haW5SZW5kZXIgIC8qdGFza1JlbmRlciovKVxyXG5cclxuICAgIGxldCB0aXRsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIHRpdGxlRWwudGV4dENvbnRlbnQgPSB0aXRsZVxyXG5cclxuICAgIGxldCBkZWxldGVQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVQcm9qZWN0KVxyXG5cclxuXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQodGl0bGVFbClcclxuICAgIHByb2plY3RFbC5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0QnRuKVxyXG4gICAgbGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0RWwpXHJcbiAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaXN0KSAgICBcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGhvbWVSZW5kZXIpXHJcblxyXG5mdW5jdGlvbiBob21lUmVuZGVyKGUpIHtcclxuXHJcbiAgICBsZXQgcHJvamVjdEFycmF5ID0gc3RvcmFnZS5yZXRyaWV2ZVByb2plY3RzT2JqKClcclxuXHJcbiAgICBwcm9qZWN0QXJyYXkuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICBwcm9qZWN0RWxlbWVudENyZWF0b3IocHJvamVjdC50aXRsZSlcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1haW5SZW5kZXIoZSl7XHJcblxyXG4gICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpXHJcblxyXG4gICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIGxldCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tdGl0bGVcIilcclxuICAgIG1haW5UaXRsZS50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50IHx8IFwiVGl0bGVcIjtcclxuXHJcbiAgICBsZXQgcHJvamVjdElkID0gc3RvcmFnZS5nZXRQcm9qZWN0SWQodGhpcy50ZXh0Q29udGVudClcclxuICAgIHRhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBwcm9qZWN0SWQgKVxyXG4gICAgY29uc29sZS5sb2cocHJvamVjdElkKVxyXG5cclxuICAgIHRhc2tSZW5kZXIoKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrUmVuZGVyICgpIHtcclxuICAgIFxyXG4gICAgXHJcbiAgICBsZXQgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXRpdGxlXCIpLnRleHRDb250ZW50XHJcbiAgICBjb25zb2xlLmxvZyhtYWluVGl0bGUpXHJcbiAgICBsZXQgcHJvamVjdCA9IHN0b3JhZ2UucmV0cmlldmVQcm9qZWN0KG1haW5UaXRsZSlcclxuXHJcbiAgICBwcm9qZWN0Lmxpc3QuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICB0YXNrRWxlbWVudENyZWF0b3IodGFzay50aXRsZSwgdGFzay5kYXRlLCB0YXNrLmlzQ2hlY2tlZCwgdGFzay5pc1ByaW9yaXR5KSAgICAgICAgIFxyXG4gICAgfSkgXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRUYXNrRGF0YSAoKXtcclxuICAgXHJcbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKVxyXG4gICAgbGV0IGRhdGUgPSB0YXNrRGF0ZS52YWx1ZVxyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIilcclxuICAgIGxldCB0aXRsZSA9IHRhc2tUaXRsZS52YWx1ZVxyXG5cclxuICAgIHJldHVybiB7dGl0bGUsIGRhdGV9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiB0YXNrRWxlbWVudEFkZGVkIChlKSB7XHJcblxyXG4gICAgbGV0IHt0aXRsZSwgZGF0ZX0gPSBnZXRUYXNrRGF0YSgpXHJcbiAgICB0YXNrRWxlbWVudENyZWF0b3IodGl0bGUsIGRhdGUpXHJcbiAgICBcclxuICAgIGVsZW1lbnRzLnRhc2suZGlhbG9nLmNsb3NlKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tFbGVtZW50Q3JlYXRvciAodGl0bGUsIGRhdGUsIGlzQ2hlY2tlZCwgaXNQcmlvcml0eSkge1xyXG5cclxuICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKVxyXG5cclxuICAgIGxldCB0YXNrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICB0YXNrRWwuY2xhc3NMaXN0LmFkZChcInRhc2stZWxlbWVudFwiKVxyXG5cclxuICAgIGxldCBjaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXHJcbiAgICBjaGVjay5jbGFzc0xpc3QuYWRkKFwidW5jaGVja1wiKVxyXG4gICAgaWYoaXNDaGVja2VkID09PSBmYWxzZSkge1xyXG4gICAgICAgICBjaGVjay5jbGFzc0xpc3QuYWRkKFwidW5jaGVja1wiKVxyXG4gICAgfSBlbHNlIGlmIChpc0NoZWNrZWQgPT09IHRydWUpIHtcclxuICAgICAgICBjaGVjay5jbGFzc0xpc3QuYWRkKFwiY2hlY2tcIilcclxuICAgIH1cclxuICAgIGNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrQ2hlY2tlZClcclxuXHJcbiAgICBsZXQgdGl0bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICB0aXRsZUVsLnRleHRDb250ZW50ID0gIHRpdGxlXHJcblxyXG4gICAgbGV0IGRhdGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBkYXRlRWwudGV4dENvbnRlbnQgPSAgZGF0ZVxyXG5cclxuICAgIGxldCBwcmlvcml0eUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgcHJpb3JpdHlFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInN0YXItZWxlbWVudFwiKVxyXG4gICAgcHJpb3JpdHlFbC5jbGFzc05hbWUgPSBcIm5vdC1wcmlvcml0eVwiXHJcbiAgICBpZiAoaXNQcmlvcml0eSA9PT0gZmFsc2Upe1xyXG4gICAgICAgIHByaW9yaXR5RWwuY2xhc3NOYW1lID0gXCJub3QtcHJpb3JpdHlcIlxyXG4gICAgfSBlbHNlIGlmKGlzUHJpb3JpdHkgPT09IHRydWUpIHtcclxuICAgICAgICBwcmlvcml0eUVsLmNsYXNzTmFtZSA9IFwicHJpb3JpdHlcIlxyXG4gICAgfVxyXG4gICAgcHJpb3JpdHlFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza1ByaW9yaXR5KVxyXG5cclxuICAgIGxldCBkZWxldGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZGVsZXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXRhc2stYnRuXCIpXHJcbiAgICBkZWxldGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVUYXNrKVxyXG5cclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZChjaGVjaylcclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZCh0aXRsZUVsKVxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKGRhdGVFbClcclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZChwcmlvcml0eUVsKVxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKGRlbGV0ZVRhc2tCdG4pXHJcbiAgICAvL3Rhc2tDb250YWluZXIuaW5zZXJ0QmVmb3JlKHRhc2tFbCwgY3JlYXRlVGFza0J0bilcclxuICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrRGlhbG9nKGUpe1xyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIilcclxuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCJcclxuICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpXHJcbiAgICB0YXNrRGF0ZS52YWx1ZSA9IFwiXCJcclxuICAgIGxldCB0YXNrTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbm90ZXNcIilcclxuICAgIHRhc2tOb3Rlcy52YWx1ZSA9IFwiXCJcclxuICAgIGVsZW1lbnRzLnRhc2suZGlhbG9nLnNob3dNb2RhbCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tEaWFsb2dDbG9zZSAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBlbGVtZW50cy50YXNrLmRpYWxvZy5jbG9zZSgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tDaGVja2VkIChlKSB7XHJcblxyXG4gICAgbGV0IHtwcm9qZWN0LCByZXR1cm5lZFRhc2t9ID0gc3RvcmFnZS5yZXRyaWV2ZVRhc2sodGhpcylcclxuXHJcbiAgICBpZihlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidW5jaGVja1wiKSB7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID0gXCJjaGVja1wiXHJcbiAgICAgICAgcmV0dXJuZWRUYXNrLmlzQ2hlY2tlZCA9IHRydWVcclxuICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpXHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlLnRhcmdldC5jbGFzc05hbWUgPSBcInVuY2hlY2tcIlxyXG4gICAgICAgIHJldHVybmVkVGFzay5pc0NoZWNrZWQgPSBmYWxzZVxyXG4gICAgICAgIHN0b3JhZ2Uuc3RvcmVPYmoocHJvamVjdClcclxuXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhyZXR1cm5lZFRhc2suaXNDaGVja2VkKVxyXG4gICAgcmV0dXJuIHJldHVybmVkVGFzay5pc0NoZWNrZWRcclxufVxyXG5cclxuZnVuY3Rpb24gdGFza1ByaW9yaXR5IChlKSB7XHJcbiAgICBsZXQge3Byb2plY3QsIHJldHVybmVkVGFza30gPSBzdG9yYWdlLnJldHJpZXZlVGFzayh0aGlzKVxyXG5cclxuICAgIGlmKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwcmlvcml0eVwiKSB7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID0gXCJub3QtcHJpb3JpdHlcIlxyXG4gICAgICAgIHJldHVybmVkVGFzay5pc1ByaW9yaXR5ID0gZmFsc2VcclxuICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9IFwicHJpb3JpdHlcIlxyXG4gICAgICAgIHJldHVybmVkVGFzay5pc1ByaW9yaXR5ID0gdHJ1ZVxyXG4gICAgICAgIHN0b3JhZ2Uuc3RvcmVPYmoocHJvamVjdClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmV0dXJuZWRUYXNrLmlzUHJpb3JpdHlcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZSkge1xyXG5cclxuICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcclxuICAgIHN0b3JhZ2UuZGVsZXRlT2JqKHRoaXMucGFyZW50RWxlbWVudC50ZXh0Q29udGVudClcclxuICAgIHN0b3JhZ2UudXBsb2FkUHJvamVjdElkKClcclxuXHJcbn1cclxuXHJcbiBmdW5jdGlvbiBkZWxldGVUYXNrKGUpIHtcclxuXHJcbiAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXHJcbiAgICBzdG9yYWdlLmRlbGV0ZU9ialRhc2sodGhpcylcclxufSBcclxuIiwiZXhwb3J0IHtzdG9yYWdlfVxyXG5pbXBvcnQge21ldGhvZHN9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuXHJcblxyXG5sZXQgc3RvcmFnZSA9IHtcclxuICAgICBzdG9yZU9iaiAob2JqKXtcclxuICAgICAgICBsZXQgb2JqU3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke29iai50aXRsZX1gLCBvYmpTdHIpXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICByZXRyaWV2ZVByb2plY3QgKG9iaikge1xyXG4gICAgICAgbGV0IG9ialN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG9iailcclxuICAgICAgIGxldCBvYmpQYXJzZSA9IEpTT04ucGFyc2Uob2JqU3RyKVxyXG4gICAgICAgT2JqZWN0LmFzc2lnbihvYmpQYXJzZSwgbWV0aG9kcyApXHJcbiAgICBcclxuICAgICAgIHJldHVybiBvYmpQYXJzZVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVPYmogKG9iaikge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKG9iailcclxuICAgIH0sXHJcblxyXG4gICAgcmV0cmlldmVUYXNrKG9iail7XHJcblxyXG4gICAgICAgIGxldCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tdGl0bGVcIikudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdChtYWluVGl0bGUpO1xyXG5cclxuICAgICAgICBsZXQgcmV0dXJuZWRUYXNrXHJcblxyXG4gICAgICAgIHByb2plY3QubGlzdC5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgICAgICBpZih0YXNrLnRpdGxlID09PSAvKiAgb2JqLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCAqLyBvYmoucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQpe1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmoucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQpXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iai5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5lZFRhc2sgPSB0YXNrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtwcm9qZWN0LCByZXR1cm5lZFRhc2t9O1xyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVPYmpUYXNrIChvYmopIHtcclxuXHJcbiAgICAgICAgbGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi10aXRsZVwiKS50ZXh0Q29udGVudFxyXG4gICAgXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdChtYWluVGl0bGUpXHJcblxyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBwcm9qZWN0Lmxpc3QuZm9yRWFjaCgodGFzaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGFzay50aXRsZSA9PT0gLyogZS50YXJnZXQucGFyZW50RWxlbWVudC50ZXh0Q29udGVudCAqL29iai5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50KXtcclxuICAgICAgICAgICAgICAgaW5kZXggPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcHJvamVjdC5saXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHJldHJpZXZlUHJvamVjdHNPYmogKCkge1xyXG4gICAgICAgIGxldCBwcm9qZWN0U3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuICAgICAgICBsZXQgcHJvamVjdFZhbHVlcyA9IE9iamVjdC52YWx1ZXMocHJvamVjdFN0b3JhZ2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICBsZXQgcHJvamVjdEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0VmFsdWVzKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcm9qZWN0QXJyYXkucHVzaChKU09OLnBhcnNlKHByb2plY3QpKVxyXG4gICAgXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb2plY3RBcnJheVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGxvYWRQcm9qZWN0SWQgKCkge1xyXG4gICAgICAgIGxldCBwcm9qZWN0QXJyYXkgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdHNPYmooKVxyXG5cclxuICAgICAgICBwcm9qZWN0QXJyYXkuZm9yRWFjaCgocHJvamVjdCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICBwcm9qZWN0LmlkID0gaVxyXG4gICAgICAgICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpXHJcbiAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYCR7cHJvamVjdC50aXRsZX0gOiAke3Byb2plY3QuaWR9YClcclxuICAgICAgICAgICB9XHJcbiAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFByb2plY3RJZCAob2JqKSB7XHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdChvYmopXHJcbiAgICAgICAgbGV0IGlkID0gcHJvamVjdC5pZFxyXG5cclxuICAgICAgICByZXR1cm4gaWRcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7c3RvcmFnZX0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiXHJcbmltcG9ydCB7IHByb2plY3RFbGVtZW50Q3JlYXRvciwgZ2V0UHJvamVjdERhdGEgfSBmcm9tIFwiLi9kb20uanNcIlxyXG5cclxuZXhwb3J0IHtQcm9qZWN0LCBUYXNrLCBtZXRob2RzfVxyXG5cclxuY2xhc3MgUHJvamVjdCB7XHJcblxyXG4gICBjb25zdHJ1Y3Rvcih0aXRsZSwgaWQpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgIHRoaXMuaWQgPSBpZCxcclxuICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgIH1cclxuXHJcbiAgIGFkZCAobmV3VGFzaykge1xyXG4gICAgdGhpcy5saXN0LnB1c2gobmV3VGFzaylcclxuICAgfVxyXG5cclxuICAgZGVsZXRlICgpIHtcclxuICAgIHN0b3JhZ2UuZGVsZXRlT2JqKHRoaXMpXHJcbiAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkYXRlLCBpc0NoZWNrZWQgPSBmYWxzZSwgaXNQcmlvcml0eSA9IGZhbHNlLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlLFxyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbixcclxuICAgICAgICB0aGlzLmlzUHJpb3JpdHkgPSBpc1ByaW9yaXR5LFxyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gaXNDaGVja2VkXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlICgpIHtcclxuICAgICAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxubGV0IG1ldGhvZHMgPSB7XHJcblxyXG4gICAgYWRkIChuZXdUYXNrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3VGFzaylcclxuICAgIH0sIFxyXG4gICAgZGVsZXRlICgpIHtcclxuICAgICAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICAgfSxcclxuICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL3RoaXMuY3JlYXRlUHJvamVjdCgpXHJcbiAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWRcIilcclxuICAgfVxyXG59XHJcblxyXG4vL2xldCB0YXNrID0gY3JlYXRlVGFzayhcInBhc2VhciBwZXJyb1wiLCBcInNhbGlyIGEgY2FtbmlhciBjb24gZWwgcGljaG9cIiwgXCIxOC0xMC0yM1wiLCBmYWxzZSwgZmFsc2UpXHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1Byb2plY3QsIFRhc2ssIG1ldGhvZHN9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuaW1wb3J0IHtzdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCJcclxuaW1wb3J0IHt0YXNrRWxlbWVudCwgcHJvamVjdEVsZW1lbnRDcmVhdG9yLCBnZXRUYXNrRGF0YSwgZ2V0UHJvamVjdERhdGF9IGZyb20gXCIuL2RvbS5qc1wiXHJcblxyXG5cclxuXHJcblxyXG5sZXQgYnRuVGFza0FkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpXHJcbmJ0blRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tTdG9yYWdlKVxyXG5cclxubGV0IGJ0blByb2plY3RBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWFkZFwiKTtcclxuYnRuUHJvamVjdEFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdFN0b3JhZ2UpXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0U3RvcmFnZSAoZSkge1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGdldFByb2plY3REYXRhKClcclxuXHJcbiAgICBsZXQgaWQgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoXHJcblxyXG4gICAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZSwgaWQpXHJcblxyXG4gICAgc3RvcmFnZS5zdG9yZU9iaihwcm9qZWN0KVxyXG5cclxufVxyXG5cclxuIGZ1bmN0aW9uIHRhc2tTdG9yYWdlKGUpIHtcclxuXHJcbiAgICBsZXQgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXRpdGxlXCIpXHJcblxyXG4gICAgbGV0IHt0aXRsZSwgZGF0ZX0gPSBnZXRUYXNrRGF0YSgpXHJcblxyXG4gICAgbGV0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGF0ZSlcclxuXHJcbiAgLy8gbGV0IHJldHIgPSBzdG9yYWdlLnJldHJpZXZlT2JqKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50KVxyXG4gICAgbGV0IHJldHIgPSBzdG9yYWdlLnJldHJpZXZlUHJvamVjdChtYWluVGl0bGUudGV4dENvbnRlbnQpXHJcblxyXG4gICAgcmV0ci5hZGQodGFzaylcclxuXHJcbiAgICBzdG9yYWdlLnN0b3JlT2JqKHJldHIpXHJcblxyXG59IFxyXG5cclxuZnVuY3Rpb24gZGVsZXRlRWwoZSkge1xyXG4gICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxyXG4gICAgc3RvcmFnZS5kZWxldGVPYmooZS50YXJnZXQudGV4dENvbnRlbnQpXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=