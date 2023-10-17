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
/* harmony export */   projectDialog: () => (/* binding */ projectDialog),
/* harmony export */   projectElement: () => (/* binding */ projectElement)
/* harmony export */ });


let btnProject = document.querySelector(".btn-project")
let dialog = document.querySelector(".project-dialog")
btnProject.addEventListener("click", projectDialog)

let main = document.querySelector("main")
let projectList = document.querySelector(".project-list")
let projectTitle = document.querySelector(".project-title")

let btnProjectAdd = document.querySelector(".btn-project-add")
btnProjectAdd.addEventListener("click", projectElement)
let btnProjectCancel = document.querySelector(".btn-project-cancel")
btnProjectCancel.addEventListener("click", projectDialogClose)

let btnTask = document.querySelector(".btn-task")
let dialog2 = document.querySelector(".task-dialog")
btnTask.addEventListener("click", taskDialog)

let btnTaskAdd = document.querySelector(".btn-task-add")
btnTaskAdd.addEventListener("click", taskElement)
let btnTaskCancel = document.querySelector(".btn-task-cancel")
btnTaskCancel.addEventListener("click", taskDialogClose)



function projectDialog(e) {
    projectTitle.value = "";
    dialog.showModal()
}

function projectDialogClose(e) {
    e.preventDefault()
    dialog.close()
}

function projectElement (e) {

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
    
}

function mainRender (e) {
   


    let mainTitle = document.querySelector(".main-title")
    mainTitle.textContent = e.target.textContent || "Title"

    let taskContainer = document.querySelector(".task-container")
    /* main.insertBefore(taskContainer, btnTask) */
    console.log(taskContainer)

   

}


function taskElement (e) {

    e.preventDefault()

    let taskTitle = document.querySelector(".task-title")
    let taskDate = document.querySelector(".task-date")
    //let taskContainer = document.querySelector(".task-container")
    let taskContainer = document.createElement("div")
    taskContainer.classList.add("task-container")

    let taskEl = document.createElement("div")
    taskEl.classList.add("task-element")

    let check = document.createElement("span")
    check.classList.add("uncheck")
    check.addEventListener("click", isChecked)

    let title = document.createElement("p")
    title.textContent = taskTitle.value

    let date = document.createElement("p")
    date.textContent = taskDate.value

    let deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.classList.add("delete-task-btn")
    deleteTaskBtn.addEventListener("click", deleteEl)

    taskEl.appendChild(check)
    taskEl.appendChild(title)
    taskEl.appendChild(date)
    taskEl.appendChild(deleteTaskBtn)
    taskContainer.appendChild(taskEl)
    main.insertBefore(taskContainer, btnTask)

    dialog2.close()

}

function taskDialog(e){

    let taskTitle = document.querySelector(".task-title")
    taskTitle.value = ""
    let taskDate = document.querySelector(".task-date")
    taskDate.value = ""
    let taskNotes = document.querySelector(".task-notes")
    taskNotes.value = ""
    dialog2.showModal()
}

function taskDialogClose (e) {
    e.preventDefault()
    dialog2.close()
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
       let objStr = localStorage.getItem(`${obj.title}`)
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
/* harmony export */   createProject: () => (/* binding */ createProject),
/* harmony export */   createTask: () => (/* binding */ createTask),
/* harmony export */   methods: () => (/* binding */ methods)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");




function createProject (title) {
    return {title}
}

function createTask (title, description, dueDate, isPriority, isChecked) {

    let task = {title, description, dueDate, isPriority, isChecked}
    _storage_js__WEBPACK_IMPORTED_MODULE_0__.storage.storeObj(task)
    return task
}



let methods = {
   delete: function () {
    //this.remove()
    console.log("deleted")
   },
   create: function () {
    //this.createProject()
    console.log("created")
   }
}


/* let taskMethods = {

} */

function edit () {

}


//let pro = createProject("OLA")
let task = createTask("pasear perro", "salir a camniar con el picho", "18-10-23", false, false)

console.log(task)

//Object.assign(pro, methods )
Object.assign(task, methods)

function addMethods (obj, meth) {
   return Object.assign(obj, meth)
}


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











})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0FDbEtxRDtBQUN2RCxDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxVQUFVO0FBQzFDLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0MsS0FBSztBQUNMO0FBQ0E7QUFDQSw0Q0FBNEMsVUFBVTtBQUN0RDtBQUNBLCtCQUErQiw4Q0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFVBQVU7QUFDekM7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFVBQVU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ2tDO0FBQ3BDO0FBQzJDO0FBQzNDO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2hEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNONkQ7QUFDekI7QUFDa0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90by1kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtwcm9qZWN0RGlhbG9nLCBwcm9qZWN0RWxlbWVudH1cclxuXHJcbmxldCBidG5Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcHJvamVjdFwiKVxyXG5sZXQgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWRpYWxvZ1wiKVxyXG5idG5Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RGlhbG9nKVxyXG5cclxubGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKVxyXG5sZXQgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdFwiKVxyXG5sZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRpdGxlXCIpXHJcblxyXG5sZXQgYnRuUHJvamVjdEFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3QtYWRkXCIpXHJcbmJ0blByb2plY3RBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RFbGVtZW50KVxyXG5sZXQgYnRuUHJvamVjdENhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3QtY2FuY2VsXCIpXHJcbmJ0blByb2plY3RDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3REaWFsb2dDbG9zZSlcclxuXHJcbmxldCBidG5UYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFza1wiKVxyXG5sZXQgZGlhbG9nMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kaWFsb2dcIilcclxuYnRuVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZylcclxuXHJcbmxldCBidG5UYXNrQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1hZGRcIilcclxuYnRuVGFza0FkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0VsZW1lbnQpXHJcbmxldCBidG5UYXNrQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tdGFzay1jYW5jZWxcIilcclxuYnRuVGFza0NhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza0RpYWxvZ0Nsb3NlKVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0RGlhbG9nKGUpIHtcclxuICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IFwiXCI7XHJcbiAgICBkaWFsb2cuc2hvd01vZGFsKClcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvamVjdERpYWxvZ0Nsb3NlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgZGlhbG9nLmNsb3NlKClcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvamVjdEVsZW1lbnQgKGUpIHtcclxuXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICBsZXQgcHJvamVjdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgcHJvamVjdEVsLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVsZW1lbnRcIilcclxuICAgIHByb2plY3RFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWFpblJlbmRlcilcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0VGl0bGUudmFsdWVcclxuXHJcbiAgICBsZXQgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1wcm9qZWN0LWJ0blwiKVxyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlRWwpXHJcblxyXG5cclxuICAgIHByb2plY3RFbC5hcHBlbmRDaGlsZCh0aXRsZSlcclxuICAgIHByb2plY3RFbC5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0QnRuKVxyXG4gICAgbGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0RWwpXHJcblxyXG4gICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGlzdClcclxuXHJcbiAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW5SZW5kZXIgKGUpIHtcclxuICAgXHJcblxyXG5cclxuICAgIGxldCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tdGl0bGVcIilcclxuICAgIG1haW5UaXRsZS50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50IHx8IFwiVGl0bGVcIlxyXG5cclxuICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKVxyXG4gICAgLyogbWFpbi5pbnNlcnRCZWZvcmUodGFza0NvbnRhaW5lciwgYnRuVGFzaykgKi9cclxuICAgIGNvbnNvbGUubG9nKHRhc2tDb250YWluZXIpXHJcblxyXG4gICBcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiB0YXNrRWxlbWVudCAoZSkge1xyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIilcclxuICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpXHJcbiAgICAvL2xldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKVxyXG4gICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbnRhaW5lclwiKVxyXG5cclxuICAgIGxldCB0YXNrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICB0YXNrRWwuY2xhc3NMaXN0LmFkZChcInRhc2stZWxlbWVudFwiKVxyXG5cclxuICAgIGxldCBjaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXHJcbiAgICBjaGVjay5jbGFzc0xpc3QuYWRkKFwidW5jaGVja1wiKVxyXG4gICAgY2hlY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGlzQ2hlY2tlZClcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSB0YXNrVGl0bGUudmFsdWVcclxuXHJcbiAgICBsZXQgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBkYXRlLnRleHRDb250ZW50ID0gdGFza0RhdGUudmFsdWVcclxuXHJcbiAgICBsZXQgZGVsZXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGRlbGV0ZVRhc2tCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS10YXNrLWJ0blwiKVxyXG4gICAgZGVsZXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlRWwpXHJcblxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKGNoZWNrKVxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKHRpdGxlKVxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKGRhdGUpXHJcbiAgICB0YXNrRWwuYXBwZW5kQ2hpbGQoZGVsZXRlVGFza0J0bilcclxuICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsKVxyXG4gICAgbWFpbi5pbnNlcnRCZWZvcmUodGFza0NvbnRhaW5lciwgYnRuVGFzaylcclxuXHJcbiAgICBkaWFsb2cyLmNsb3NlKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tEaWFsb2coZSl7XHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10aXRsZVwiKVxyXG4gICAgdGFza1RpdGxlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIilcclxuICAgIHRhc2tEYXRlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tOb3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1ub3Rlc1wiKVxyXG4gICAgdGFza05vdGVzLnZhbHVlID0gXCJcIlxyXG4gICAgZGlhbG9nMi5zaG93TW9kYWwoKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrRGlhbG9nQ2xvc2UgKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgZGlhbG9nMi5jbG9zZSgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQ2hlY2tlZCAoZSkge1xyXG4gICAgaWYoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInVuY2hlY2tcIikge1xyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9IFwiY2hlY2tlZFwiXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9IFwidW5jaGVja1wiXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZUVsKGUpIHtcclxuICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcclxufVxyXG5cclxuLyogZnVuY3Rpb24gbWFpbkNyZWF0b3IgKCkge1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIGxldCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcclxuICAgIGxldCBhZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5cclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWFpbi1jb250YWluZXJcIik7XHJcbiAgICB0aXRsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGl0bGUtY29udGFpbmVyXCIpO1xyXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlLXRhc2tcIik7XHJcbiAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJidG4tdGFza1wiKTtcclxuXHJcbiAgICBtYWluLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGVDb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2spO1xyXG4gICAgdGl0bGVDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgXHJcbn0gKi8iLCJleHBvcnQgey8qIHN0b3JlT2JqLCBkZWxldGVPYmosIHJldHJpZXZlT2JqICovIHN0b3JhZ2V9XHJcbmltcG9ydCB7bWV0aG9kc30gZnJvbSBcIi4vdG8tZG8uanNcIlxyXG5cclxubGV0IHN0b3JhZ2UgPSB7XHJcbiAgICAgc3RvcmVPYmogKG9iail7XHJcbiAgICAgICAgbGV0IG9ialN0ciA9IEpTT04uc3RyaW5naWZ5KG9iailcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtvYmoudGl0bGV9YCwgb2JqU3RyKVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgZGVsZXRlT2JqIChvYmopIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtvYmoudGl0bGV9YClcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJldHJpZXZlT2JqIChvYmopIHtcclxuICAgICAgIGxldCBvYmpTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtvYmoudGl0bGV9YClcclxuICAgICAgIGxldCBvYmpQYXJzZSA9IEpTT04ucGFyc2Uob2JqU3RyKVxyXG4gICAgICAgT2JqZWN0LmFzc2lnbihvYmpQYXJzZSwgbWV0aG9kcyApXHJcbiAgICBcclxuICAgICAgIHJldHVybiBvYmpQYXJzZVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0ZW5PYmogKCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzdG9yYWdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qIGZ1bmN0aW9uIHN0b3JlT2JqIChvYmope1xyXG4gICAgbGV0IG9ialN0ciA9IEpTT04uc3RyaW5naWZ5KG9iailcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke29iai50aXRsZX1gLCBvYmpTdHIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZU9iaiAob2JqKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtvYmoudGl0bGV9YClcclxufVxyXG5cclxuZnVuY3Rpb24gcmV0cmlldmVPYmogKG9iaikge1xyXG4gICBsZXQgb2JqU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7b2JqLnRpdGxlfWApXHJcbiAgIGxldCBvYmpQYXJzZSA9IEpTT04ucGFyc2Uob2JqU3RyKVxyXG5cclxuICAgcmV0dXJuIG9ialBhcnNlXHJcbn0gKi8iLCJpbXBvcnQge3N0b3JhZ2V9IGZyb20gXCIuL3N0b3JhZ2UuanNcIlxyXG5cclxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0LCBjcmVhdGVUYXNrLCBtZXRob2RzfVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdCAodGl0bGUpIHtcclxuICAgIHJldHVybiB7dGl0bGV9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRhc2sgKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgaXNQcmlvcml0eSwgaXNDaGVja2VkKSB7XHJcblxyXG4gICAgbGV0IHRhc2sgPSB7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBpc1ByaW9yaXR5LCBpc0NoZWNrZWR9XHJcbiAgICBzdG9yYWdlLnN0b3JlT2JqKHRhc2spXHJcbiAgICByZXR1cm4gdGFza1xyXG59XHJcblxyXG5cclxuXHJcbmxldCBtZXRob2RzID0ge1xyXG4gICBkZWxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vdGhpcy5yZW1vdmUoKVxyXG4gICAgY29uc29sZS5sb2coXCJkZWxldGVkXCIpXHJcbiAgIH0sXHJcbiAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy90aGlzLmNyZWF0ZVByb2plY3QoKVxyXG4gICAgY29uc29sZS5sb2coXCJjcmVhdGVkXCIpXHJcbiAgIH1cclxufVxyXG5cclxuXHJcbi8qIGxldCB0YXNrTWV0aG9kcyA9IHtcclxuXHJcbn0gKi9cclxuXHJcbmZ1bmN0aW9uIGVkaXQgKCkge1xyXG5cclxufVxyXG5cclxuXHJcbi8vbGV0IHBybyA9IGNyZWF0ZVByb2plY3QoXCJPTEFcIilcclxubGV0IHRhc2sgPSBjcmVhdGVUYXNrKFwicGFzZWFyIHBlcnJvXCIsIFwic2FsaXIgYSBjYW1uaWFyIGNvbiBlbCBwaWNob1wiLCBcIjE4LTEwLTIzXCIsIGZhbHNlLCBmYWxzZSlcclxuXHJcbmNvbnNvbGUubG9nKHRhc2spXHJcblxyXG4vL09iamVjdC5hc3NpZ24ocHJvLCBtZXRob2RzIClcclxuT2JqZWN0LmFzc2lnbih0YXNrLCBtZXRob2RzKVxyXG5cclxuZnVuY3Rpb24gYWRkTWV0aG9kcyAob2JqLCBtZXRoKSB7XHJcbiAgIHJldHVybiBPYmplY3QuYXNzaWduKG9iaiwgbWV0aClcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Y3JlYXRlUHJvamVjdCwgY3JlYXRlVGFzaywgbWV0aG9kc30gZnJvbSBcIi4vdG8tZG8uanNcIlxyXG5pbXBvcnQge3N0b3JhZ2V9IGZyb20gXCIuL3N0b3JhZ2UuanNcIlxyXG5pbXBvcnQge3Byb2plY3REaWFsb2csIHByb2plY3RFbGVtZW50fSBmcm9tIFwiLi9kb20uanNcIlxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9