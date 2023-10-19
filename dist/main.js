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
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./src/index.js");


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
    deleteProjectBtn.addEventListener("click", deleteEl)


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

    let createTaskBtn = document.createElement("button")
            createTaskBtn.classList.add("create-task-btn")
            
            createTaskBtn.textContent = "Add task"
            createTaskBtn.addEventListener("click", taskDialog)

    /* taskContainer.appendChild(createTaskBtn) */

    return /* taskContainer */ createTaskBtn
}


function mainRender(e){

    let taskContainer = document.querySelector(".task-container")

    taskContainer.innerHTML = "";

    let mainTitle = document.querySelector(".main-title")
    mainTitle.textContent = e.target.textContent || "Title";
    
    console.log(taskContainer)
    taskContainer.setAttribute("data-id", e.target.textContent)

    taskContainer.appendChild(mainCreator())
}

/* !mainChildren.forEach(element => 
    element.classList.contains("create-task-btn")) */

/* function getTaskDate (){
   
    let taskDate = document.querySelector(".task-date")
    let date = taskDate.value

    return date
}

function getTaskTitle() {
    let taskTitle = document.querySelector(".task-title")
    let title = taskTitle.value
    return title
} */

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
    deleteTaskBtn.addEventListener("click", deleteEl)

    taskEl.appendChild(check)
    taskEl.appendChild(titleEl)
    taskEl.appendChild(dateEl)
    taskEl.appendChild(deleteTaskBtn)
    taskContainer.insertBefore(taskEl, createTaskBtn)

    

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

function deleteEl(e) {
    e.target.parentElement.remove()
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _to_do_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-do.js */ "./src/to-do.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");







let btnTaskAdd = document.querySelector(".btn-task-add")
btnTaskAdd.addEventListener("click", test)

let btnProjectAdd = document.querySelector(".btn-project-add");
btnProjectAdd.addEventListener("click", test2)


function test2 (e) {
    let title = (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.getProjectData)()
    console.log(title)
    let id = localStorage.length
    console.log(id)

   let prx = new _to_do_js__WEBPACK_IMPORTED_MODULE_0__.Project(title, id)

   _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.storeObj(prx)

   return prx
}

 function test(e) {

    let mainTitle = document.querySelector(".main-title")

    let {title, date} = (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.getTaskData)()


   let pro = new _to_do_js__WEBPACK_IMPORTED_MODULE_0__.Task(title, date)
    console.log(pro)
 

  // let retr = storage.retrieveObj(e.target.parentElement.parentElement.parentElement.firstElementChild.textContent)
  let retr = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.retrieveObj(mainTitle.textContent)
    console.log(retr) 

   
   retr.add(pro)

  

    _storage_js__WEBPACK_IMPORTED_MODULE_1__.storage.storeObj(retr)

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
    
    deleteObj (obj) {
        localStorage.removeItem(`${obj.title}`)
    },
    
    retrieveObj (obj) {
       let objStr = localStorage.getItem(obj)
       let objParse = JSON.parse(objStr)
       Object.assign(objParse, _to_do_js__WEBPACK_IMPORTED_MODULE_0__.methods )
    
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

}


class Task {
    constructor(title, date, description, isPriority, isChecked) {
        this.title = title,
        this.date = date,
        this.description = description,
        this.isPriority = isPriority,
        this.isChecked = isChecked
    }


}


let methods = {

    add (newTask) {
        this.list.push(newTask)
    }, 
   delete: function () {
    //this.remove()
    console.log("deleted")
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdFO0FBQ3hFO0FBQ0EsQ0FBaUM7QUFDQTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsYUFBYTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0FDM1IrQztBQUNiO0FBQ29EO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1REFBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4Q0FBTztBQUN4QjtBQUNBLEdBQUcsZ0RBQU87QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxhQUFhLEVBQUUsb0RBQVc7QUFDbkM7QUFDQTtBQUNBLGlCQUFpQiwyQ0FBSTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0RBQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RHVEO0FBQ3ZELENBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVU7QUFDMUMsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQU87QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixVQUFVO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxVQUFVO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDa0M7QUFDNEI7QUFDaEU7QUFDK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNsREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG8tZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7dGFza0VsZW1lbnQsIHByb2plY3RFbGVtZW50Q3JlYXRvciwgZ2V0UHJvamVjdERhdGEsIGdldFRhc2tEYXRhfVxyXG5cclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuaW1wb3J0IHsgdGVzdCB9IGZyb20gXCIuL2luZGV4LmpzXCJcclxuXHJcbmxldCBlbGVtZW50cyA9IHtcclxuICAgIHByb2plY3Q6IHtcclxuICAgICAgICBjcmVhdGVCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3RcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2cpLFxyXG4gICAgICAgIGFkZEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1hZGRcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RFbGVtZW50Q3JlYXRvciksXHJcbiAgICAgICAgY2FuY2VsQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWNhbmNlbFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZ0Nsb3NlKSxcclxuICAgICAgICBkaWFsb2c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1kaWFsb2dcIilcclxuICAgICAgICAvKiBsaXN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdFwiKSxcclxuICAgICAgICB0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRpdGxlXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBnZXRQcm9qZWN0RGF0YSkgKi9cclxuICAgIH0sXHJcbiAgICB0YXNrOiB7XHJcbiAgICAgICAgLyogY3JlYXRlQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nKSwgKi9cclxuICAgICAgICBhZGRCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRWxlbWVudCksXHJcbiAgICAgICAgY2FuY2VsQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrLWNhbmNlbFwiKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZ0Nsb3NlKSxcclxuICAgICAgICBkaWFsb2c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kaWFsb2dcIiksXHJcbiAgICAgICAgZGF0ZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIiksXHJcbiAgICAgICAgdGl0bGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10aXRsZVwiKSxcclxuICAgICAgICBjaGVjazogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW5cIilcclxuICAgIH1cclxufVxyXG5cclxuLyogbGV0IGJ0blByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0XCIpIC8vIGNyZWF0ZUJ0blxyXG5sZXQgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWRpYWxvZ1wiKSAvLyBkaWFsb2dcclxuLy9idG5Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RGlhbG9nKVxyXG4vL2VsZW1lbnRzLnByb2plY3QuY3JlYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RGlhbG9nKSovXHJcblxyXG5sZXQgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdFwiKSAvL2xpc3RcclxubGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10aXRsZVwiKSAvLyB0aXRsZVxyXG5wcm9qZWN0VGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGdldFByb2plY3REYXRhKVxyXG5cclxuLyogbGV0IGJ0blByb2plY3RBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWFkZFwiKSAvL2FkZEJ0blxyXG5idG5Qcm9qZWN0QWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RWxlbWVudENyZWF0b3IpXHJcblxyXG5sZXQgYnRuUHJvamVjdENhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3QtY2FuY2VsXCIpIC8vY2FuY2VsQnRuXHJcbmJ0blByb2plY3RDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2dDbG9zZSlcclxuXHJcbmxldCBidG5UYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFza1wiKSAvLyBjcmVhdGVCdG5cclxubGV0IGRpYWxvZzIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGlhbG9nXCIpIC8vIGRpYWxvZ1xyXG4vL2J0blRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpXHJcbmVsZW1lbnRzLnRhc2suY3JlYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nKVxyXG5cclxubGV0IGJ0blRhc2tBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrLWFkZFwiKSAvL2FkZEJ0blxyXG5idG5UYXNrQWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRWxlbWVudClcclxubGV0IGJ0blRhc2tDYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrLWNhbmNlbFwiKSAvL2NhbmNlbEJ0blxyXG5idG5UYXNrQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrRGlhbG9nQ2xvc2UpICAqL1xyXG5cclxuLy9sZXQgYnRuVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2tcIilcclxuXHJcbmxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIilcclxuXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0RGlhbG9nKGUpIHtcclxuICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IFwiXCI7IFxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuc2hvd01vZGFsKClcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvamVjdERpYWxvZ0Nsb3NlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuY2xvc2UoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0RGF0YShlKSB7XHJcbiAgICBsZXQgdGl0bGVOYW1lID0gcHJvamVjdFRpdGxlLnZhbHVlXHJcbiAgICByZXR1cm4gdGl0bGVOYW1lXHJcbn1cclxuXHJcbi8qIGZ1bmN0aW9uIHByb2plY3RFbGVtZW50IChlKSB7XHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICBsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxyXG4gICAgbGV0IHByb2plY3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIHByb2plY3RFbC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1lbGVtZW50XCIpXHJcbiAgICBwcm9qZWN0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1haW5SZW5kZXIpXHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdFRpdGxlLnZhbHVlXHJcblxyXG4gICAgbGV0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIilcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZUVsKVxyXG5cclxuXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQodGl0bGUpXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bilcclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEVsKVxyXG5cclxuICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpc3QpXHJcblxyXG4gICAgZGlhbG9nLmNsb3NlKCkgICBcclxufSAqL1xyXG5cclxuZnVuY3Rpb24gcHJvamVjdEVsZW1lbnRDcmVhdG9yIChlKSB7XHJcblxyXG4gICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICBsZXQgcHJvamVjdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgcHJvamVjdEVsLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVsZW1lbnRcIilcclxuICAgIHByb2plY3RFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWFpblJlbmRlcilcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBnZXRQcm9qZWN0RGF0YSgpXHJcblxyXG4gICAgbGV0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIilcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZUVsKVxyXG5cclxuXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQodGl0bGUpXHJcbiAgICBwcm9qZWN0RWwuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bilcclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEVsKVxyXG5cclxuICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpc3QpXHJcblxyXG4gICAgZWxlbWVudHMucHJvamVjdC5kaWFsb2cuY2xvc2UoKVxyXG5cclxuICAgIC8vcmV0dXJuIHRpdGxlXHJcbiAgICBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1haW5DcmVhdG9yICgpIHtcclxuXHJcblxyXG4gICAgLyogICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbnRhaW5lclwiKTtcclxuICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChlLnRhcmdldC50ZXh0Q29udGVudCkgKi9cclxuXHJcbiAgICBsZXQgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgICAgICAgICAgY3JlYXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiY3JlYXRlLXRhc2stYnRuXCIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjcmVhdGVUYXNrQnRuLnRleHRDb250ZW50ID0gXCJBZGQgdGFza1wiXHJcbiAgICAgICAgICAgIGNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpXHJcblxyXG4gICAgLyogdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVUYXNrQnRuKSAqL1xyXG5cclxuICAgIHJldHVybiAvKiB0YXNrQ29udGFpbmVyICovIGNyZWF0ZVRhc2tCdG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1haW5SZW5kZXIoZSl7XHJcblxyXG4gICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpXHJcblxyXG4gICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIGxldCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tdGl0bGVcIilcclxuICAgIG1haW5UaXRsZS50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50IHx8IFwiVGl0bGVcIjtcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2codGFza0NvbnRhaW5lcilcclxuICAgIHRhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBlLnRhcmdldC50ZXh0Q29udGVudClcclxuXHJcbiAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKG1haW5DcmVhdG9yKCkpXHJcbn1cclxuXHJcbi8qICFtYWluQ2hpbGRyZW4uZm9yRWFjaChlbGVtZW50ID0+IFxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjcmVhdGUtdGFzay1idG5cIikpICovXHJcblxyXG4vKiBmdW5jdGlvbiBnZXRUYXNrRGF0ZSAoKXtcclxuICAgXHJcbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKVxyXG4gICAgbGV0IGRhdGUgPSB0YXNrRGF0ZS52YWx1ZVxyXG5cclxuICAgIHJldHVybiBkYXRlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tUaXRsZSgpIHtcclxuICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIilcclxuICAgIGxldCB0aXRsZSA9IHRhc2tUaXRsZS52YWx1ZVxyXG4gICAgcmV0dXJuIHRpdGxlXHJcbn0gKi9cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tEYXRhICgpe1xyXG4gICBcclxuICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpXHJcbiAgICBsZXQgZGF0ZSA9IHRhc2tEYXRlLnZhbHVlXHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10aXRsZVwiKVxyXG4gICAgbGV0IHRpdGxlID0gdGFza1RpdGxlLnZhbHVlXHJcblxyXG4gICAgcmV0dXJuIHt0aXRsZSwgZGF0ZX1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHRhc2tFbGVtZW50IChlKSB7XHJcblxyXG4gICAgLy9lLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAvKiBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXRpdGxlXCIpXHJcbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKSAqL1xyXG4gICAgbGV0IGNyZWF0ZVRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNyZWF0ZS10YXNrLWJ0blwiKVxyXG4gICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpXHJcblxyXG4gICAgbGV0IHt0aXRsZSwgZGF0ZX0gPSBnZXRUYXNrRGF0YSgpXHJcblxyXG4gICAgbGV0IHRhc2tFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIHRhc2tFbC5jbGFzc0xpc3QuYWRkKFwidGFzay1lbGVtZW50XCIpXHJcblxyXG4gICAgbGV0IGNoZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcclxuICAgIGNoZWNrLmNsYXNzTGlzdC5hZGQoXCJ1bmNoZWNrXCIpXHJcbiAgICBjaGVjay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaXNDaGVja2VkKVxyXG5cclxuICAgIGxldCB0aXRsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIHRpdGxlRWwudGV4dENvbnRlbnQgPSAvKiB0YXNrVGl0bGUudmFsdWUgKi8gdGl0bGVcclxuXHJcblxyXG4gICAgbGV0IGRhdGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBkYXRlRWwudGV4dENvbnRlbnQgPSAvKiB0YXNrRGF0ZS52YWx1ZSAqLyBkYXRlXHJcblxyXG4gICAgbGV0IGRlbGV0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBkZWxldGVUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtdGFzay1idG5cIilcclxuICAgIGRlbGV0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZUVsKVxyXG5cclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZChjaGVjaylcclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZCh0aXRsZUVsKVxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKGRhdGVFbClcclxuICAgIHRhc2tFbC5hcHBlbmRDaGlsZChkZWxldGVUYXNrQnRuKVxyXG4gICAgdGFza0NvbnRhaW5lci5pbnNlcnRCZWZvcmUodGFza0VsLCBjcmVhdGVUYXNrQnRuKVxyXG5cclxuICAgIFxyXG5cclxuICAgIGVsZW1lbnRzLnRhc2suZGlhbG9nLmNsb3NlKClcclxuXHJcbiAgIC8vIHJldHVybiB7dGl0bGUsIGRhdGV9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tEaWFsb2coZSl7XHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10aXRsZVwiKVxyXG4gICAgdGFza1RpdGxlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIilcclxuICAgIHRhc2tEYXRlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tOb3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1ub3Rlc1wiKVxyXG4gICAgdGFza05vdGVzLnZhbHVlID0gXCJcIlxyXG4gICAgZWxlbWVudHMudGFzay5kaWFsb2cuc2hvd01vZGFsKClcclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0RpYWxvZ0Nsb3NlIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGVsZW1lbnRzLnRhc2suZGlhbG9nLmNsb3NlKClcclxufVxyXG5cclxuZnVuY3Rpb24gaXNDaGVja2VkIChlKSB7XHJcbiAgICBpZihlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidW5jaGVja1wiKSB7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID0gXCJjaGVja2VkXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID0gXCJ1bmNoZWNrXCJcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlRWwoZSkge1xyXG4gICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxyXG59XHJcblxyXG4vKiBmdW5jdGlvbiBtYWluQ3JlYXRvciAoKSB7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgbGV0IHRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xyXG4gICAgbGV0IGFkZFRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcblxyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtYWluLWNvbnRhaW5lclwiKTtcclxuICAgIHRpdGxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZS1jb250YWluZXJcIik7XHJcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGUtdGFza1wiKTtcclxuICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZChcImJ0bi10YXNrXCIpO1xyXG5cclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZUNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkVGFzayk7XHJcbiAgICB0aXRsZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBcclxufSAqLyIsImltcG9ydCB7UHJvamVjdCwgVGFzaywgbWV0aG9kc30gZnJvbSBcIi4vdG8tZG8uanNcIlxyXG5pbXBvcnQge3N0b3JhZ2V9IGZyb20gXCIuL3N0b3JhZ2UuanNcIlxyXG5pbXBvcnQge3Rhc2tFbGVtZW50LCBwcm9qZWN0RWxlbWVudENyZWF0b3IsIGdldFRhc2tEYXRhLCBnZXRQcm9qZWN0RGF0YX0gZnJvbSBcIi4vZG9tLmpzXCJcclxuXHJcblxyXG5cclxuXHJcbmxldCBidG5UYXNrQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1hZGRcIilcclxuYnRuVGFza0FkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGVzdClcclxuXHJcbmxldCBidG5Qcm9qZWN0QWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdC1hZGRcIik7XHJcbmJ0blByb2plY3RBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRlc3QyKVxyXG5cclxuXHJcbmZ1bmN0aW9uIHRlc3QyIChlKSB7XHJcbiAgICBsZXQgdGl0bGUgPSBnZXRQcm9qZWN0RGF0YSgpXHJcbiAgICBjb25zb2xlLmxvZyh0aXRsZSlcclxuICAgIGxldCBpZCA9IGxvY2FsU3RvcmFnZS5sZW5ndGhcclxuICAgIGNvbnNvbGUubG9nKGlkKVxyXG5cclxuICAgbGV0IHByeCA9IG5ldyBQcm9qZWN0KHRpdGxlLCBpZClcclxuXHJcbiAgIHN0b3JhZ2Uuc3RvcmVPYmoocHJ4KVxyXG5cclxuICAgcmV0dXJuIHByeFxyXG59XHJcblxyXG4gZnVuY3Rpb24gdGVzdChlKSB7XHJcblxyXG4gICAgbGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi10aXRsZVwiKVxyXG5cclxuICAgIGxldCB7dGl0bGUsIGRhdGV9ID0gZ2V0VGFza0RhdGEoKVxyXG5cclxuXHJcbiAgIGxldCBwcm8gPSBuZXcgVGFzayh0aXRsZSwgZGF0ZSlcclxuICAgIGNvbnNvbGUubG9nKHBybylcclxuIFxyXG5cclxuICAvLyBsZXQgcmV0ciA9IHN0b3JhZ2UucmV0cmlldmVPYmooZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnQpXHJcbiAgbGV0IHJldHIgPSBzdG9yYWdlLnJldHJpZXZlT2JqKG1haW5UaXRsZS50ZXh0Q29udGVudClcclxuICAgIGNvbnNvbGUubG9nKHJldHIpIFxyXG5cclxuICAgXHJcbiAgIHJldHIuYWRkKHBybylcclxuXHJcbiAgXHJcblxyXG4gICAgc3RvcmFnZS5zdG9yZU9iaihyZXRyKVxyXG5cclxufSBcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJleHBvcnQgey8qIHN0b3JlT2JqLCBkZWxldGVPYmosIHJldHJpZXZlT2JqICovIHN0b3JhZ2V9XHJcbmltcG9ydCB7bWV0aG9kc30gZnJvbSBcIi4vdG8tZG8uanNcIlxyXG5cclxubGV0IHN0b3JhZ2UgPSB7XHJcbiAgICAgc3RvcmVPYmogKG9iail7XHJcbiAgICAgICAgbGV0IG9ialN0ciA9IEpTT04uc3RyaW5naWZ5KG9iailcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtvYmoudGl0bGV9YCwgb2JqU3RyKVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgZGVsZXRlT2JqIChvYmopIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtvYmoudGl0bGV9YClcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJldHJpZXZlT2JqIChvYmopIHtcclxuICAgICAgIGxldCBvYmpTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShvYmopXHJcbiAgICAgICBsZXQgb2JqUGFyc2UgPSBKU09OLnBhcnNlKG9ialN0cilcclxuICAgICAgIE9iamVjdC5hc3NpZ24ob2JqUGFyc2UsIG1ldGhvZHMgKVxyXG4gICAgXHJcbiAgICAgICByZXR1cm4gb2JqUGFyc2VcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdGVuT2JqICgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKiBmdW5jdGlvbiBzdG9yZU9iaiAob2JqKXtcclxuICAgIGxldCBvYmpTdHIgPSBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtvYmoudGl0bGV9YCwgb2JqU3RyKVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVPYmogKG9iaikge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7b2JqLnRpdGxlfWApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHJpZXZlT2JqIChvYmopIHtcclxuICAgbGV0IG9ialN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke29iai50aXRsZX1gKVxyXG4gICBsZXQgb2JqUGFyc2UgPSBKU09OLnBhcnNlKG9ialN0cilcclxuXHJcbiAgIHJldHVybiBvYmpQYXJzZVxyXG59ICovIiwiaW1wb3J0IHtzdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCJcclxuaW1wb3J0IHsgcHJvamVjdEVsZW1lbnRDcmVhdG9yLCBnZXRQcm9qZWN0RGF0YSB9IGZyb20gXCIuL2RvbS5qc1wiXHJcblxyXG5leHBvcnQge1Byb2plY3QsIFRhc2ssIG1ldGhvZHN9XHJcblxyXG5jbGFzcyBQcm9qZWN0IHtcclxuXHJcbiAgIGNvbnN0cnVjdG9yKHRpdGxlLCBpZCkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlLFxyXG4gICAgdGhpcy5pZCA9IGlkLFxyXG4gICAgdGhpcy5saXN0ID0gW11cclxuICAgfVxyXG5cclxuICAgYWRkIChuZXdUYXNrKSB7XHJcbiAgICB0aGlzLmxpc3QucHVzaChuZXdUYXNrKVxyXG4gICB9XHJcblxyXG59XHJcblxyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGF0ZSwgZGVzY3JpcHRpb24sIGlzUHJpb3JpdHksIGlzQ2hlY2tlZCkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlLFxyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbixcclxuICAgICAgICB0aGlzLmlzUHJpb3JpdHkgPSBpc1ByaW9yaXR5LFxyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gaXNDaGVja2VkXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbmxldCBtZXRob2RzID0ge1xyXG5cclxuICAgIGFkZCAobmV3VGFzaykge1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKG5ld1Rhc2spXHJcbiAgICB9LCBcclxuICAgZGVsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL3RoaXMucmVtb3ZlKClcclxuICAgIGNvbnNvbGUubG9nKFwiZGVsZXRlZFwiKVxyXG4gICB9LFxyXG4gICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vdGhpcy5jcmVhdGVQcm9qZWN0KClcclxuICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZFwiKVxyXG4gICB9XHJcbn1cclxuXHJcbi8vbGV0IHRhc2sgPSBjcmVhdGVUYXNrKFwicGFzZWFyIHBlcnJvXCIsIFwic2FsaXIgYSBjYW1uaWFyIGNvbiBlbCBwaWNob1wiLCBcIjE4LTEwLTIzXCIsIGZhbHNlLCBmYWxzZSlcclxuXHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9