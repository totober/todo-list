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


function projectElementCreator (e) {

   // e.preventDefault();
    
    let list = document.createElement("li")
    let projectEl = document.createElement("div")
    projectEl.classList.add("project-element")
    projectEl.addEventListener("click",  mainRender /* taskRender*/)

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
    taskRender()
}

function taskRender (e) {
    
    let mainTitle = document.querySelector(".main-title").textContent
    console.log(mainTitle)
    let proj = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveObj(mainTitle)
    console.log(proj)
    console.log(proj.list)

    proj.list.forEach(task => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLHNCQUFzQiw4Q0FBTztBQUM3QjtBQUNBLElBQUksZ0RBQU87QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsYUFBYSxFQUFFLG9EQUFXO0FBQ25DO0FBQ0EsbUJBQW1CLDJDQUFJO0FBQ3ZCO0FBQ0E7QUFDQSxlQUFlLGdEQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLElBQUksZ0RBQU87QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvLWRvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge3Rhc2tFbGVtZW50QWRkZWQsIHByb2plY3RFbGVtZW50Q3JlYXRvciwgZ2V0UHJvamVjdERhdGEsIGdldFRhc2tEYXRhfVxyXG5cclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIlxyXG5cclxuXHJcbmxldCBlbGVtZW50cyA9IHtcclxuICAgIHByb2plY3Q6IHtcclxuICAgICAgICBjcmVhdGVCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3RcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2cpLFxyXG4gICAgICAgIGFkZEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1hZGRcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RFbGVtZW50Q3JlYXRvciksXHJcbiAgICAgICAgY2FuY2VsQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWNhbmNlbFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZ0Nsb3NlKSxcclxuICAgICAgICBkaWFsb2c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1kaWFsb2dcIilcclxuICAgICAgICAvKiBsaXN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdFwiKSxcclxuICAgICAgICB0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRpdGxlXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBnZXRQcm9qZWN0RGF0YSkgKi9cclxuICAgIH0sXHJcbiAgICB0YXNrOiB7XHJcbiAgICAgICAgLyogY3JlYXRlQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nKSwgKi9cclxuICAgICAgICBhZGRCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAgdGFza0VsZW1lbnRBZGRlZCAvKiB0YXNrUmVuZGVyKi8pLFxyXG4gICAgICAgIGNhbmNlbEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1jYW5jZWxcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2dDbG9zZSksXHJcbiAgICAgICAgZGlhbG9nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGlhbG9nXCIpLFxyXG4gICAgICAgIGRhdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpLFxyXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIiksXHJcbiAgICAgICAgY2hlY2s6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qIGxldCBidG5Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdFwiKSAvLyBjcmVhdGVCdG5cclxubGV0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1kaWFsb2dcIikgLy8gZGlhbG9nXHJcbi8vYnRuUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZylcclxuLy9lbGVtZW50cy5wcm9qZWN0LmNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZykqL1xyXG5cclxubGV0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3RcIikgLy9saXN0XHJcbmxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdGl0bGVcIikgLy8gdGl0bGVcclxucHJvamVjdFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBnZXRQcm9qZWN0RGF0YSlcclxuXHJcbi8qIGxldCBidG5Qcm9qZWN0QWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1hZGRcIikgLy9hZGRCdG5cclxuYnRuUHJvamVjdEFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdEVsZW1lbnRDcmVhdG9yKVxyXG5cclxubGV0IGJ0blByb2plY3RDYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWNhbmNlbFwiKSAvL2NhbmNlbEJ0blxyXG5idG5Qcm9qZWN0Q2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RGlhbG9nQ2xvc2UpXHJcblxyXG5sZXQgYnRuVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2tcIikgLy8gY3JlYXRlQnRuXHJcbmxldCBkaWFsb2cyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRpYWxvZ1wiKSAvLyBkaWFsb2dcclxuLy9idG5UYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nKVxyXG5lbGVtZW50cy50YXNrLmNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuXHJcbmxldCBidG5UYXNrQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1hZGRcIikgLy9hZGRCdG5cclxuYnRuVGFza0FkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0VsZW1lbnQpXHJcbmxldCBidG5UYXNrQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1jYW5jZWxcIikgLy9jYW5jZWxCdG5cclxuYnRuVGFza0NhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZ0Nsb3NlKSAgKi9cclxuXHJcbi8vbGV0IGJ0blRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrXCIpXHJcblxyXG5sZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpXHJcbmxldCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcmVhdGUtdGFzay1idG5cIilcclxuY3JlYXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0RGlhbG9nKGUpIHtcclxuICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IFwiXCI7IFxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuc2hvd01vZGFsKClcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvamVjdERpYWxvZ0Nsb3NlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuY2xvc2UoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0RGF0YShlKSB7XHJcbiAgICBsZXQgdGl0bGVOYW1lID0gcHJvamVjdFRpdGxlLnZhbHVlXHJcbiAgICByZXR1cm4gdGl0bGVOYW1lXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0RWxlbWVudENyZWF0b3IgKGUpIHtcclxuXHJcbiAgIC8vIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG4gICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcclxuICAgIGxldCBwcm9qZWN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBwcm9qZWN0RWwuY2xhc3NMaXN0LmFkZChcInByb2plY3QtZWxlbWVudFwiKVxyXG4gICAgcHJvamVjdEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAgbWFpblJlbmRlciAvKiB0YXNrUmVuZGVyKi8pXHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gZ2V0UHJvamVjdERhdGEoKVxyXG5cclxuICAgIGxldCBkZWxldGVQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVQcm9qZWN0KVxyXG5cclxuXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQodGl0bGUpXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bilcclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEVsKVxyXG5cclxuICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpc3QpXHJcblxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuY2xvc2UoKVxyXG5cclxuICAgIC8vcmV0dXJuIHRpdGxlXHJcbiAgICBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1haW5DcmVhdG9yICgpIHtcclxuXHJcblxyXG4gICAgLyogICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbnRhaW5lclwiKTtcclxuICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChlLnRhcmdldC50ZXh0Q29udGVudCkgKi9cclxuXHJcbiAgIC8qICBsZXQgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgICAgICAgICAgY3JlYXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiY3JlYXRlLXRhc2stYnRuXCIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjcmVhdGVUYXNrQnRuLnRleHRDb250ZW50ID0gXCJBZGQgdGFza1wiXHJcbiAgICAgICAgICAgIGNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpXHJcblxyXG4gICAgLyogdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVUYXNrQnRuKSAqL1xyXG5cclxuICAgLy8gcmV0dXJuIC8qIHRhc2tDb250YWluZXIgKi8gY3JlYXRlVGFza0J0biBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1haW5SZW5kZXIoZSl7XHJcblxyXG5cclxuICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKVxyXG4gICAgbGV0IGNyZWF0ZVRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNyZWF0ZS10YXNrLWJ0blwiKVxyXG5cclxuICAgIHRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICBsZXQgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXRpdGxlXCIpXHJcbiAgICBtYWluVGl0bGUudGV4dENvbnRlbnQgPSBlLnRhcmdldC50ZXh0Q29udGVudCB8fCBcIlRpdGxlXCI7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKHRhc2tDb250YWluZXIpXHJcbiAgIC8vIHRhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBlLnRhcmdldC50ZXh0Q29udGVudClcclxuICAgIHRhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBzdG9yYWdlLmdldElkKHRoaXMudGV4dENvbnRlbnQpKVxyXG4gICAgY29uc29sZS5sb2codGhpcylcclxuXHJcbiAgICBjcmVhdGVUYXNrQnRuLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgZS50YXJnZXQudGV4dENvbnRlbnQpXHJcbiAgICAvL3Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQobWFpbkNyZWF0b3IoKSlcclxuICAgIHRhc2tSZW5kZXIoKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrUmVuZGVyIChlKSB7XHJcbiAgICBcclxuICAgIGxldCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tdGl0bGVcIikudGV4dENvbnRlbnRcclxuICAgIGNvbnNvbGUubG9nKG1haW5UaXRsZSlcclxuICAgIGxldCBwcm9qID0gc3RvcmFnZS5yZXRyaWV2ZU9iaihtYWluVGl0bGUpXHJcbiAgICBjb25zb2xlLmxvZyhwcm9qKVxyXG4gICAgY29uc29sZS5sb2cocHJvai5saXN0KVxyXG5cclxuICAgIHByb2oubGlzdC5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgIHRhc2tFbGVtZW50Q3JlYXRvcih0YXNrLnRpdGxlLCB0YXNrLmRhdGUpICAgICAgICAgXHJcbiAgICB9KSBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tEYXRhICgpe1xyXG4gICBcclxuICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpXHJcbiAgICBsZXQgZGF0ZSA9IHRhc2tEYXRlLnZhbHVlXHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10aXRsZVwiKVxyXG4gICAgbGV0IHRpdGxlID0gdGFza1RpdGxlLnZhbHVlXHJcblxyXG4gICAgcmV0dXJuIHt0aXRsZSwgZGF0ZX1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHRhc2tFbGVtZW50QWRkZWQgKGUpIHtcclxuXHJcbiAgICBsZXQge3RpdGxlLCBkYXRlfSA9IGdldFRhc2tEYXRhKClcclxuICAgIHRhc2tFbGVtZW50Q3JlYXRvcih0aXRsZSwgZGF0ZSlcclxuICAgIFxyXG4gICAgZWxlbWVudHMudGFzay5kaWFsb2cuY2xvc2UoKVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0VsZW1lbnRDcmVhdG9yICh0aXRsZSwgZGF0ZSkge1xyXG5cclxuICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKVxyXG5cclxuICAgIGxldCB0YXNrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICB0YXNrRWwuY2xhc3NMaXN0LmFkZChcInRhc2stZWxlbWVudFwiKVxyXG5cclxuICAgIGxldCBjaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXHJcbiAgICBjaGVjay5jbGFzc0xpc3QuYWRkKFwidW5jaGVja1wiKVxyXG4gICAgY2hlY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGlzQ2hlY2tlZClcclxuXHJcbiAgICBsZXQgdGl0bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICB0aXRsZUVsLnRleHRDb250ZW50ID0gIHRpdGxlXHJcblxyXG4gICAgbGV0IGRhdGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBkYXRlRWwudGV4dENvbnRlbnQgPSAgZGF0ZVxyXG5cclxuICAgIGxldCBkZWxldGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZGVsZXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXRhc2stYnRuXCIpXHJcbiAgICBkZWxldGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVUYXNrKVxyXG5cclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZChjaGVjaylcclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZCh0aXRsZUVsKVxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKGRhdGVFbClcclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZChkZWxldGVUYXNrQnRuKVxyXG4gICAgLy90YXNrQ29udGFpbmVyLmluc2VydEJlZm9yZSh0YXNrRWwsIGNyZWF0ZVRhc2tCdG4pXHJcbiAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFbClcclxuXHJcbiAgICAvL2VsZW1lbnRzLnRhc2suZGlhbG9nLmNsb3NlKClcclxuXHJcbiAgIC8vIHJldHVybiB7dGl0bGUsIGRhdGV9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tEaWFsb2coZSl7XHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10aXRsZVwiKVxyXG4gICAgdGFza1RpdGxlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIilcclxuICAgIHRhc2tEYXRlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tOb3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1ub3Rlc1wiKVxyXG4gICAgdGFza05vdGVzLnZhbHVlID0gXCJcIlxyXG4gICAgZWxlbWVudHMudGFzay5kaWFsb2cuc2hvd01vZGFsKClcclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0RpYWxvZ0Nsb3NlIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGVsZW1lbnRzLnRhc2suZGlhbG9nLmNsb3NlKClcclxufVxyXG5cclxuZnVuY3Rpb24gaXNDaGVja2VkIChlKSB7XHJcbiAgICBpZihlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidW5jaGVja1wiKSB7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID0gXCJjaGVja2VkXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID0gXCJ1bmNoZWNrXCJcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZSkge1xyXG5cclxuICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcclxuICAgIHN0b3JhZ2UuZGVsZXRlT2JqKHRoaXMucGFyZW50RWxlbWVudC50ZXh0Q29udGVudClcclxufVxyXG5cclxuIGZ1bmN0aW9uIGRlbGV0ZVRhc2soZSkge1xyXG5cclxuICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcclxuICAgIHN0b3JhZ2UuZGVsZXRlT2JqVGFzayh0aGlzKVxyXG59IFxyXG5cclxuLyogZnVuY3Rpb24gbWFpbkNyZWF0b3IgKCkge1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIGxldCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcclxuICAgIGxldCBhZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5cclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWFpbi1jb250YWluZXJcIik7XHJcbiAgICB0aXRsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGl0bGUtY29udGFpbmVyXCIpO1xyXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlLXRhc2tcIik7XHJcbiAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJidG4tdGFza1wiKTtcclxuXHJcbiAgICBtYWluLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGVDb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2spO1xyXG4gICAgdGl0bGVDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgXHJcbn0gKi9cclxuXHJcbi8qIGZ1bmN0aW9uIHByb2plY3RFbGVtZW50IChlKSB7XHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICBsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxyXG4gICAgbGV0IHByb2plY3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIHByb2plY3RFbC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1lbGVtZW50XCIpXHJcbiAgICBwcm9qZWN0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1haW5SZW5kZXIpXHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdFRpdGxlLnZhbHVlXHJcblxyXG4gICAgbGV0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIilcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZUVsKVxyXG5cclxuXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQodGl0bGUpXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bilcclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEVsKVxyXG5cclxuICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpc3QpXHJcblxyXG4gICAgZGlhbG9nLmNsb3NlKCkgICBcclxufSAqLyIsImV4cG9ydCB7c3RvcmFnZX1cclxuaW1wb3J0IHttZXRob2RzfSBmcm9tIFwiLi90by1kby5qc1wiXHJcblxyXG5cclxubGV0IHN0b3JhZ2UgPSB7XHJcbiAgICAgc3RvcmVPYmogKG9iail7XHJcbiAgICAgICAgbGV0IG9ialN0ciA9IEpTT04uc3RyaW5naWZ5KG9iailcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtvYmoudGl0bGV9YCwgb2JqU3RyKVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcmV0cmlldmVPYmogKG9iaikge1xyXG4gICAgICAgbGV0IG9ialN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG9iailcclxuICAgICAgIGxldCBvYmpQYXJzZSA9IEpTT04ucGFyc2Uob2JqU3RyKVxyXG4gICAgICAgT2JqZWN0LmFzc2lnbihvYmpQYXJzZSwgbWV0aG9kcyApXHJcbiAgICBcclxuICAgICAgIHJldHVybiBvYmpQYXJzZVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVPYmogKG9iaikge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKG9iailcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlT2JqVGFzayAob2JqKSB7XHJcblxyXG4gICAgICAgIGxldCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tdGl0bGVcIikudGV4dENvbnRlbnRcclxuICAgIFxyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gc3RvcmFnZS5yZXRyaWV2ZU9iaihtYWluVGl0bGUpXHJcblxyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBwcm9qZWN0Lmxpc3QuZm9yRWFjaCgodGFzaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGFzay50aXRsZSA9PT0gLyogZS50YXJnZXQucGFyZW50RWxlbWVudC50ZXh0Q29udGVudCAqL29iai5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50KXtcclxuICAgICAgICAgICAgICAgaW5kZXggPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcHJvamVjdC5saXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICBzdG9yYWdlLnN0b3JlT2JqKHByb2plY3QpICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGdldElkIChvYmopIHtcclxuICAgICAgICBsZXQgcHJvamVjdCA9IHN0b3JhZ2UucmV0cmlldmVPYmoob2JqKVxyXG4gICAgICAgIGxldCBpZCA9IHByb2plY3QuaWRcclxuXHJcbiAgICAgICAgcmV0dXJuIGlkXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQge3N0b3JhZ2V9IGZyb20gXCIuL3N0b3JhZ2UuanNcIlxyXG5pbXBvcnQgeyBwcm9qZWN0RWxlbWVudENyZWF0b3IsIGdldFByb2plY3REYXRhIH0gZnJvbSBcIi4vZG9tLmpzXCJcclxuXHJcbmV4cG9ydCB7UHJvamVjdCwgVGFzaywgbWV0aG9kc31cclxuXHJcbmNsYXNzIFByb2plY3Qge1xyXG5cclxuICAgY29uc3RydWN0b3IodGl0bGUsIGlkKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICB0aGlzLmlkID0gaWQsXHJcbiAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICB9XHJcblxyXG4gICBhZGQgKG5ld1Rhc2spIHtcclxuICAgIHRoaXMubGlzdC5wdXNoKG5ld1Rhc2spXHJcbiAgIH1cclxuXHJcbiAgIGRlbGV0ZSAoKSB7XHJcbiAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICB9XHJcblxyXG59XHJcblxyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGF0ZSwgZGVzY3JpcHRpb24sIGlzUHJpb3JpdHksIGlzQ2hlY2tlZCkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlLFxyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbixcclxuICAgICAgICB0aGlzLmlzUHJpb3JpdHkgPSBpc1ByaW9yaXR5LFxyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gaXNDaGVja2VkXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlICgpIHtcclxuICAgICAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxubGV0IG1ldGhvZHMgPSB7XHJcblxyXG4gICAgYWRkIChuZXdUYXNrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3VGFzaylcclxuICAgIH0sIFxyXG4gICAgZGVsZXRlICgpIHtcclxuICAgICAgICBzdG9yYWdlLmRlbGV0ZU9iaih0aGlzKVxyXG4gICAgfSxcclxuICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL3RoaXMuY3JlYXRlUHJvamVjdCgpXHJcbiAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWRcIilcclxuICAgfVxyXG59XHJcblxyXG4vL2xldCB0YXNrID0gY3JlYXRlVGFzayhcInBhc2VhciBwZXJyb1wiLCBcInNhbGlyIGEgY2FtbmlhciBjb24gZWwgcGljaG9cIiwgXCIxOC0xMC0yM1wiLCBmYWxzZSwgZmFsc2UpXHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1Byb2plY3QsIFRhc2ssIG1ldGhvZHN9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuaW1wb3J0IHtzdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCJcclxuaW1wb3J0IHt0YXNrRWxlbWVudCwgcHJvamVjdEVsZW1lbnRDcmVhdG9yLCBnZXRUYXNrRGF0YSwgZ2V0UHJvamVjdERhdGF9IGZyb20gXCIuL2RvbS5qc1wiXHJcblxyXG5cclxuXHJcblxyXG5sZXQgYnRuVGFza0FkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpXHJcbmJ0blRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tTdG9yYWdlKVxyXG5cclxubGV0IGJ0blByb2plY3RBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWFkZFwiKTtcclxuYnRuUHJvamVjdEFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdFN0b3JhZ2UpXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0U3RvcmFnZSAoZSkge1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGdldFByb2plY3REYXRhKClcclxuXHJcbiAgICBsZXQgaWQgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoXHJcblxyXG4gICAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZSwgaWQpXHJcblxyXG4gICAgc3RvcmFnZS5zdG9yZU9iaihwcm9qZWN0KVxyXG5cclxufVxyXG5cclxuIGZ1bmN0aW9uIHRhc2tTdG9yYWdlKGUpIHtcclxuXHJcbiAgICBsZXQgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXRpdGxlXCIpXHJcblxyXG4gICAgbGV0IHt0aXRsZSwgZGF0ZX0gPSBnZXRUYXNrRGF0YSgpXHJcblxyXG4gICAgbGV0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGF0ZSlcclxuXHJcbiAgLy8gbGV0IHJldHIgPSBzdG9yYWdlLnJldHJpZXZlT2JqKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50KVxyXG4gICAgbGV0IHJldHIgPSBzdG9yYWdlLnJldHJpZXZlT2JqKG1haW5UaXRsZS50ZXh0Q29udGVudClcclxuXHJcbiAgICByZXRyLmFkZCh0YXNrKVxyXG5cclxuICAgIHN0b3JhZ2Uuc3RvcmVPYmoocmV0cilcclxuXHJcbn0gXHJcblxyXG5mdW5jdGlvbiBkZWxldGVFbChlKSB7XHJcbiAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXHJcbiAgICBzdG9yYWdlLmRlbGV0ZU9iaihlLnRhcmdldC50ZXh0Q29udGVudClcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==