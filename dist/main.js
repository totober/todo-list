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
/* harmony export */   taskElement: () => (/* binding */ taskElement)
/* harmony export */ });
/* harmony import */ var _to_do_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-do.js */ "./src/to-do.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");


;



let elements = {
    project: {
        createBtn: document.querySelector(".btn-project")
        .addEventListener("click", projectDialog),
        addBtn: document.querySelector(".btn-project-add")
        .addEventListener("click", projectElementCreator),
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
        .addEventListener("click", taskElement),
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


function projectElementCreator (e) {

   // e.preventDefault();
    
    let list = document.createElement("li")
    let projectEl = document.createElement("div")
    projectEl.classList.add("project-element")
    projectEl.addEventListener("click", mainRender)

    let title = document.createElement("p")
    title.textContent = getProjectData()

    let deleteProjectBtn = document.createElement("button")
    deleteProjectBtn.classList.add("delete-project-btn")
    deleteProjectBtn.addEventListener("click", deleteProject)


    projectEl.appendChild(title)
    projectEl.appendChild(deleteProjectBtn)
    list.appendChild(projectEl)

    projectList.appendChild(list)

    elements.project.dialog.close()

    //return title
    
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


function mainRender(e){


    let taskContainer = document.querySelector(".task-container")
    let createTaskBtn = document.querySelector(".create-task-btn")

    taskContainer.innerHTML = "";

    let mainTitle = document.querySelector(".main-title")
    mainTitle.textContent = e.target.textContent || "Title";
    
    console.log(taskContainer)
   // taskContainer.setAttribute("data-id", e.target.textContent)
    taskContainer.setAttribute("data-id", _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.getId(this.textContent))
    console.log(this)

    createTaskBtn.setAttribute("data-id", e.target.textContent)
    //taskContainer.appendChild(mainCreator())

}


function getTaskData (){
   
    let taskDate = document.querySelector(".task-date")
    let date = taskDate.value

    let taskTitle = document.querySelector(".task-title")
    let title = taskTitle.value

    return {title, date}
}


function taskElement (e) {

    //e.preventDefault()

    /* let taskTitle = document.querySelector(".task-title")
    let taskDate = document.querySelector(".task-date") */
    let createTaskBtn = document.querySelector(".create-task-btn")
    let taskContainer = document.querySelector(".task-container")

    let {title, date} = getTaskData()

    let taskEl = document.createElement("div")
    taskEl.classList.add("task-element")

    let check = document.createElement("span")
    check.classList.add("uncheck")
    check.addEventListener("click", isChecked)

    let titleEl = document.createElement("p")
    titleEl.textContent = /* taskTitle.value */ title


    let dateEl = document.createElement("p")
    dateEl.textContent = /* taskDate.value */ date

    let deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.classList.add("delete-task-btn")
    deleteTaskBtn.addEventListener("click", deleteTask)

    taskEl.appendChild(check)
    taskEl.appendChild(titleEl)
    taskEl.appendChild(dateEl)
    taskEl.appendChild(deleteTaskBtn)
    //taskContainer.insertBefore(taskEl, createTaskBtn)
    taskContainer.appendChild(taskEl)

    

    elements.task.dialog.close()

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxTQUFTLGFBQWEsRUFBRSxvREFBVztBQUNuQztBQUNBLG1CQUFtQiwyQ0FBSTtBQUN2QjtBQUNBO0FBQ0EsZUFBZSxnREFBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksZ0RBQU87QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90by1kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHt0YXNrRWxlbWVudCwgcHJvamVjdEVsZW1lbnRDcmVhdG9yLCBnZXRQcm9qZWN0RGF0YSwgZ2V0VGFza0RhdGF9XHJcblxyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdG8tZG8uanNcIlxyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiXHJcblxyXG5cclxubGV0IGVsZW1lbnRzID0ge1xyXG4gICAgcHJvamVjdDoge1xyXG4gICAgICAgIGNyZWF0ZUJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZyksXHJcbiAgICAgICAgYWRkQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWFkZFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdEVsZW1lbnRDcmVhdG9yKSxcclxuICAgICAgICBjYW5jZWxCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3QtY2FuY2VsXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RGlhbG9nQ2xvc2UpLFxyXG4gICAgICAgIGRpYWxvZzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWRpYWxvZ1wiKVxyXG4gICAgICAgIC8qIGxpc3Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1saXN0XCIpLFxyXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdGl0bGVcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGdldFByb2plY3REYXRhKSAqL1xyXG4gICAgfSxcclxuICAgIHRhc2s6IHtcclxuICAgICAgICAvKiBjcmVhdGVCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2tcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpLCAqL1xyXG4gICAgICAgIGFkZEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1hZGRcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tFbGVtZW50KSxcclxuICAgICAgICBjYW5jZWxCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stY2FuY2VsXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nQ2xvc2UpLFxyXG4gICAgICAgIGRpYWxvZzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRpYWxvZ1wiKSxcclxuICAgICAgICBkYXRlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKSxcclxuICAgICAgICB0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXRpdGxlXCIpLFxyXG4gICAgICAgIGNoZWNrOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic3BhblwiKVxyXG4gICAgfVxyXG59XHJcblxyXG4vKiBsZXQgYnRuUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3RcIikgLy8gY3JlYXRlQnRuXHJcbmxldCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZGlhbG9nXCIpIC8vIGRpYWxvZ1xyXG4vL2J0blByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2cpXHJcbi8vZWxlbWVudHMucHJvamVjdC5jcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2cpKi9cclxuXHJcbmxldCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1saXN0XCIpIC8vbGlzdFxyXG5sZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRpdGxlXCIpIC8vIHRpdGxlXHJcbnByb2plY3RUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZ2V0UHJvamVjdERhdGEpXHJcblxyXG4vKiBsZXQgYnRuUHJvamVjdEFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3QtYWRkXCIpIC8vYWRkQnRuXHJcbmJ0blByb2plY3RBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RFbGVtZW50Q3JlYXRvcilcclxuXHJcbmxldCBidG5Qcm9qZWN0Q2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1jYW5jZWxcIikgLy9jYW5jZWxCdG5cclxuYnRuUHJvamVjdENhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZ0Nsb3NlKVxyXG5cclxubGV0IGJ0blRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrXCIpIC8vIGNyZWF0ZUJ0blxyXG5sZXQgZGlhbG9nMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kaWFsb2dcIikgLy8gZGlhbG9nXHJcbi8vYnRuVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuZWxlbWVudHMudGFzay5jcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpXHJcblxyXG5sZXQgYnRuVGFza0FkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpIC8vYWRkQnRuXHJcbmJ0blRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tFbGVtZW50KVxyXG5sZXQgYnRuVGFza0NhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stY2FuY2VsXCIpIC8vY2FuY2VsQnRuXHJcbmJ0blRhc2tDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2dDbG9zZSkgICovXHJcblxyXG4vL2xldCBidG5UYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFza1wiKVxyXG5cclxubGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKVxyXG5sZXQgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlLXRhc2stYnRuXCIpXHJcbmNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpXHJcblxyXG5cclxuZnVuY3Rpb24gcHJvamVjdERpYWxvZyhlKSB7XHJcbiAgICBwcm9qZWN0VGl0bGUudmFsdWUgPSBcIlwiOyBcclxuICAgIGVsZW1lbnRzLnByb2plY3QuZGlhbG9nLnNob3dNb2RhbCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3REaWFsb2dDbG9zZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGVsZW1lbnRzLnByb2plY3QuZGlhbG9nLmNsb3NlKClcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UHJvamVjdERhdGEoZSkge1xyXG4gICAgbGV0IHRpdGxlTmFtZSA9IHByb2plY3RUaXRsZS52YWx1ZVxyXG4gICAgcmV0dXJuIHRpdGxlTmFtZVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcHJvamVjdEVsZW1lbnRDcmVhdG9yIChlKSB7XHJcblxyXG4gICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICBsZXQgcHJvamVjdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgcHJvamVjdEVsLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVsZW1lbnRcIilcclxuICAgIHByb2plY3RFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWFpblJlbmRlcilcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBnZXRQcm9qZWN0RGF0YSgpXHJcblxyXG4gICAgbGV0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIilcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVByb2plY3QpXHJcblxyXG5cclxuICAgIHByb2plY3RFbC5hcHBlbmRDaGlsZCh0aXRsZSlcclxuICAgIHByb2plY3RFbC5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0QnRuKVxyXG4gICAgbGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0RWwpXHJcblxyXG4gICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGlzdClcclxuXHJcbiAgICBlbGVtZW50cy5wcm9qZWN0LmRpYWxvZy5jbG9zZSgpXHJcblxyXG4gICAgLy9yZXR1cm4gdGl0bGVcclxuICAgIFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gbWFpbkNyZWF0b3IgKCkge1xyXG5cclxuXHJcbiAgICAvKiAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2stY29udGFpbmVyXCIpO1xyXG4gICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGUudGFyZ2V0LnRleHRDb250ZW50KSAqL1xyXG5cclxuICAgLyogIGxldCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgICAgICAgICBjcmVhdGVUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJjcmVhdGUtdGFzay1idG5cIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNyZWF0ZVRhc2tCdG4udGV4dENvbnRlbnQgPSBcIkFkZCB0YXNrXCJcclxuICAgICAgICAgICAgY3JlYXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuXHJcbiAgICAvKiB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tCdG4pICovXHJcblxyXG4gICAvLyByZXR1cm4gLyogdGFza0NvbnRhaW5lciAqLyBjcmVhdGVUYXNrQnRuIFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gbWFpblJlbmRlcihlKXtcclxuXHJcblxyXG4gICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpXHJcbiAgICBsZXQgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlLXRhc2stYnRuXCIpXHJcblxyXG4gICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIGxldCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tdGl0bGVcIilcclxuICAgIG1haW5UaXRsZS50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50IHx8IFwiVGl0bGVcIjtcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2codGFza0NvbnRhaW5lcilcclxuICAgLy8gdGFza0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGUudGFyZ2V0LnRleHRDb250ZW50KVxyXG4gICAgdGFza0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIHN0b3JhZ2UuZ2V0SWQodGhpcy50ZXh0Q29udGVudCkpXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzKVxyXG5cclxuICAgIGNyZWF0ZVRhc2tCdG4uc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBlLnRhcmdldC50ZXh0Q29udGVudClcclxuICAgIC8vdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChtYWluQ3JlYXRvcigpKVxyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tEYXRhICgpe1xyXG4gICBcclxuICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpXHJcbiAgICBsZXQgZGF0ZSA9IHRhc2tEYXRlLnZhbHVlXHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10aXRsZVwiKVxyXG4gICAgbGV0IHRpdGxlID0gdGFza1RpdGxlLnZhbHVlXHJcblxyXG4gICAgcmV0dXJuIHt0aXRsZSwgZGF0ZX1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHRhc2tFbGVtZW50IChlKSB7XHJcblxyXG4gICAgLy9lLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAvKiBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXRpdGxlXCIpXHJcbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKSAqL1xyXG4gICAgbGV0IGNyZWF0ZVRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNyZWF0ZS10YXNrLWJ0blwiKVxyXG4gICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpXHJcblxyXG4gICAgbGV0IHt0aXRsZSwgZGF0ZX0gPSBnZXRUYXNrRGF0YSgpXHJcblxyXG4gICAgbGV0IHRhc2tFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIHRhc2tFbC5jbGFzc0xpc3QuYWRkKFwidGFzay1lbGVtZW50XCIpXHJcblxyXG4gICAgbGV0IGNoZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcclxuICAgIGNoZWNrLmNsYXNzTGlzdC5hZGQoXCJ1bmNoZWNrXCIpXHJcbiAgICBjaGVjay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaXNDaGVja2VkKVxyXG5cclxuICAgIGxldCB0aXRsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIHRpdGxlRWwudGV4dENvbnRlbnQgPSAvKiB0YXNrVGl0bGUudmFsdWUgKi8gdGl0bGVcclxuXHJcblxyXG4gICAgbGV0IGRhdGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBkYXRlRWwudGV4dENvbnRlbnQgPSAvKiB0YXNrRGF0ZS52YWx1ZSAqLyBkYXRlXHJcblxyXG4gICAgbGV0IGRlbGV0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBkZWxldGVUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtdGFzay1idG5cIilcclxuICAgIGRlbGV0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVRhc2spXHJcblxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKGNoZWNrKVxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKHRpdGxlRWwpXHJcbiAgICB0YXNrRWwuYXBwZW5kQ2hpbGQoZGF0ZUVsKVxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKGRlbGV0ZVRhc2tCdG4pXHJcbiAgICAvL3Rhc2tDb250YWluZXIuaW5zZXJ0QmVmb3JlKHRhc2tFbCwgY3JlYXRlVGFza0J0bilcclxuICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsKVxyXG5cclxuICAgIFxyXG5cclxuICAgIGVsZW1lbnRzLnRhc2suZGlhbG9nLmNsb3NlKClcclxuXHJcbiAgIC8vIHJldHVybiB7dGl0bGUsIGRhdGV9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tEaWFsb2coZSl7XHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10aXRsZVwiKVxyXG4gICAgdGFza1RpdGxlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIilcclxuICAgIHRhc2tEYXRlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tOb3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1ub3Rlc1wiKVxyXG4gICAgdGFza05vdGVzLnZhbHVlID0gXCJcIlxyXG4gICAgZWxlbWVudHMudGFzay5kaWFsb2cuc2hvd01vZGFsKClcclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0RpYWxvZ0Nsb3NlIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGVsZW1lbnRzLnRhc2suZGlhbG9nLmNsb3NlKClcclxufVxyXG5cclxuZnVuY3Rpb24gaXNDaGVja2VkIChlKSB7XHJcbiAgICBpZihlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidW5jaGVja1wiKSB7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID0gXCJjaGVja2VkXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID0gXCJ1bmNoZWNrXCJcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZSkge1xyXG5cclxuICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcclxuICAgIHN0b3JhZ2UuZGVsZXRlT2JqKHRoaXMucGFyZW50RWxlbWVudC50ZXh0Q29udGVudClcclxufVxyXG5cclxuIGZ1bmN0aW9uIGRlbGV0ZVRhc2soZSkge1xyXG5cclxuICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcclxuICAgIHN0b3JhZ2UuZGVsZXRlT2JqVGFzayh0aGlzKVxyXG59IFxyXG5cclxuLyogZnVuY3Rpb24gbWFpbkNyZWF0b3IgKCkge1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIGxldCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcclxuICAgIGxldCBhZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5cclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWFpbi1jb250YWluZXJcIik7XHJcbiAgICB0aXRsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGl0bGUtY29udGFpbmVyXCIpO1xyXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlLXRhc2tcIik7XHJcbiAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJidG4tdGFza1wiKTtcclxuXHJcbiAgICBtYWluLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGVDb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2spO1xyXG4gICAgdGl0bGVDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgXHJcbn0gKi9cclxuXHJcbi8qIGZ1bmN0aW9uIHByb2plY3RFbGVtZW50IChlKSB7XHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICBsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxyXG4gICAgbGV0IHByb2plY3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIHByb2plY3RFbC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1lbGVtZW50XCIpXHJcbiAgICBwcm9qZWN0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1haW5SZW5kZXIpXHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdFRpdGxlLnZhbHVlXHJcblxyXG4gICAgbGV0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIilcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZUVsKVxyXG5cclxuXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQodGl0bGUpXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bilcclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEVsKVxyXG5cclxuICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpc3QpXHJcblxyXG4gICAgZGlhbG9nLmNsb3NlKCkgICBcclxufSAqLyIsImV4cG9ydCB7c3RvcmFnZX1cclxuaW1wb3J0IHttZXRob2RzfSBmcm9tIFwiLi90by1kby5qc1wiXHJcblxyXG5cclxubGV0IHN0b3JhZ2UgPSB7XHJcbiAgICAgc3RvcmVPYmogKG9iail7XHJcbiAgICAgICAgbGV0IG9ialN0ciA9IEpTT04uc3RyaW5naWZ5KG9iailcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtvYmoudGl0bGV9YCwgb2JqU3RyKVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcmV0cmlldmVPYmogKG9iaikge1xyXG4gICAgICAgbGV0IG9ialN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG9iailcclxuICAgICAgIGxldCBvYmpQYXJzZSA9IEpTT04ucGFyc2Uob2JqU3RyKVxyXG4gICAgICAgT2JqZWN0LmFzc2lnbihvYmpQYXJzZSwgbWV0aG9kcyApXHJcbiAgICBcclxuICAgICAgIHJldHVybiBvYmpQYXJzZVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVPYmogKG9iaikge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKG9iailcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlT2JqVGFzayAob2JqKSB7XHJcblxyXG4gICAgICAgIGxldCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tdGl0bGVcIikudGV4dENvbnRlbnRcclxuICAgIFxyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gc3RvcmFnZS5yZXRyaWV2ZU9iaihtYWluVGl0bGUpXHJcblxyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBwcm9qZWN0Lmxpc3QuZm9yRWFjaCgodGFzaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGFzay50aXRsZSA9PT0gLyogZS50YXJnZXQucGFyZW50RWxlbWVudC50ZXh0Q29udGVudCAqL29iai5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50KXtcclxuICAgICAgICAgICAgICAgaW5kZXggPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcHJvamVjdC5saXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGdldElkIChvYmopIHtcclxuICAgICAgICBsZXQgcHJvamVjdCA9IHN0b3JhZ2UucmV0cmlldmVPYmoob2JqKVxyXG4gICAgICAgIGxldCBpZCA9IHByb2plY3QuaWRcclxuXHJcbiAgICAgICAgcmV0dXJuIGlkXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQge3N0b3JhZ2V9IGZyb20gXCIuL3N0b3JhZ2UuanNcIlxyXG5pbXBvcnQgeyBwcm9qZWN0RWxlbWVudENyZWF0b3IsIGdldFByb2plY3REYXRhIH0gZnJvbSBcIi4vZG9tLmpzXCJcclxuXHJcbmV4cG9ydCB7UHJvamVjdCwgVGFzaywgbWV0aG9kc31cclxuXHJcbmNsYXNzIFByb2plY3Qge1xyXG5cclxuICAgY29uc3RydWN0b3IodGl0bGUsIGlkKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICB0aGlzLmlkID0gaWQsXHJcbiAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICB9XHJcblxyXG4gICBhZGQgKG5ld1Rhc2spIHtcclxuICAgIHRoaXMubGlzdC5wdXNoKG5ld1Rhc2spXHJcbiAgIH1cclxuXHJcbiAgIGRlbGV0ZSAoKSB7XHJcbiAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICB9XHJcblxyXG59XHJcblxyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGF0ZSwgZGVzY3JpcHRpb24sIGlzUHJpb3JpdHksIGlzQ2hlY2tlZCkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlLFxyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbixcclxuICAgICAgICB0aGlzLmlzUHJpb3JpdHkgPSBpc1ByaW9yaXR5LFxyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gaXNDaGVja2VkXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlICgpIHtcclxuICAgICAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxubGV0IG1ldGhvZHMgPSB7XHJcblxyXG4gICAgYWRkIChuZXdUYXNrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3VGFzaylcclxuICAgIH0sIFxyXG4gICAgZGVsZXRlICgpIHtcclxuICAgICAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICAgfSxcclxuICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL3RoaXMuY3JlYXRlUHJvamVjdCgpXHJcbiAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWRcIilcclxuICAgfVxyXG59XHJcblxyXG4vL2xldCB0YXNrID0gY3JlYXRlVGFzayhcInBhc2VhciBwZXJyb1wiLCBcInNhbGlyIGEgY2FtbmlhciBjb24gZWwgcGljaG9cIiwgXCIxOC0xMC0yM1wiLCBmYWxzZSwgZmFsc2UpXHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1Byb2plY3QsIFRhc2ssIG1ldGhvZHN9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuaW1wb3J0IHtzdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCJcclxuaW1wb3J0IHt0YXNrRWxlbWVudCwgcHJvamVjdEVsZW1lbnRDcmVhdG9yLCBnZXRUYXNrRGF0YSwgZ2V0UHJvamVjdERhdGF9IGZyb20gXCIuL2RvbS5qc1wiXHJcblxyXG5cclxuXHJcblxyXG5sZXQgYnRuVGFza0FkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpXHJcbmJ0blRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tTdG9yYWdlKVxyXG5cclxubGV0IGJ0blByb2plY3RBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWFkZFwiKTtcclxuYnRuUHJvamVjdEFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdFN0b3JhZ2UpXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0U3RvcmFnZSAoZSkge1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGdldFByb2plY3REYXRhKClcclxuXHJcbiAgICBsZXQgaWQgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoXHJcblxyXG4gICAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZSwgaWQpXHJcblxyXG4gICAgc3RvcmFnZS5zdG9yZU9iaihwcm9qZWN0KVxyXG5cclxufVxyXG5cclxuIGZ1bmN0aW9uIHRhc2tTdG9yYWdlKGUpIHtcclxuXHJcbiAgICBsZXQgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXRpdGxlXCIpXHJcblxyXG4gICAgbGV0IHt0aXRsZSwgZGF0ZX0gPSBnZXRUYXNrRGF0YSgpXHJcblxyXG4gICAgbGV0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGF0ZSlcclxuXHJcbiAgLy8gbGV0IHJldHIgPSBzdG9yYWdlLnJldHJpZXZlT2JqKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50KVxyXG4gICAgbGV0IHJldHIgPSBzdG9yYWdlLnJldHJpZXZlT2JqKG1haW5UaXRsZS50ZXh0Q29udGVudClcclxuXHJcbiAgICByZXRyLmFkZCh0YXNrKVxyXG5cclxuICAgIHN0b3JhZ2Uuc3RvcmVPYmoocmV0cilcclxuXHJcbn0gXHJcblxyXG5mdW5jdGlvbiBkZWxldGVFbChlKSB7XHJcbiAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXHJcbiAgICBzdG9yYWdlLmRlbGV0ZU9iaihlLnRhcmdldC50ZXh0Q29udGVudClcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==