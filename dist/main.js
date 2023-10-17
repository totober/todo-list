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

    let title = document.createElement("p")
    title.textContent = projectTitle.value
    title.addEventListener("click", mainRender)

    let deleteProjectBtn = document.createElement("button")
    deleteProjectBtn.textContent = "x"
    deleteProjectBtn.classList.add("delete-project-btn")

    projectEl.appendChild(title)
    projectEl.appendChild(deleteProjectBtn)
    list.appendChild(projectEl)

    projectList.appendChild(list)

    dialog.close()
    
}

function mainRender (e) {
   


    let mainTitle = document.querySelector(".main-title")
    mainTitle.textContent = e.target.textContent

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

    let title = document.createElement("p")
    title.textContent = taskTitle.value

    let date = document.createElement("p")
    date.textContent = taskDate.value

    let deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.textContent = "x"
    deleteTaskBtn.classList.add("delete-task-btn")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG8tZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7cHJvamVjdERpYWxvZywgcHJvamVjdEVsZW1lbnR9XHJcblxyXG5sZXQgYnRuUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByb2plY3RcIilcclxubGV0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1kaWFsb2dcIilcclxuYnRuUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdERpYWxvZylcclxuXHJcbmxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIilcclxubGV0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3RcIilcclxubGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10aXRsZVwiKVxyXG5cclxubGV0IGJ0blByb2plY3RBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWFkZFwiKVxyXG5idG5Qcm9qZWN0QWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RWxlbWVudClcclxubGV0IGJ0blByb2plY3RDYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1wcm9qZWN0LWNhbmNlbFwiKVxyXG5idG5Qcm9qZWN0Q2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0RGlhbG9nQ2xvc2UpXHJcblxyXG5sZXQgYnRuVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2tcIilcclxubGV0IGRpYWxvZzIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGlhbG9nXCIpXHJcbmJ0blRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2cpXHJcblxyXG5sZXQgYnRuVGFza0FkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stYWRkXCIpXHJcbmJ0blRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tFbGVtZW50KVxyXG5sZXQgYnRuVGFza0NhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stY2FuY2VsXCIpXHJcbmJ0blRhc2tDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tEaWFsb2dDbG9zZSlcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcHJvamVjdERpYWxvZyhlKSB7XHJcbiAgICBwcm9qZWN0VGl0bGUudmFsdWUgPSBcIlwiO1xyXG4gICAgZGlhbG9nLnNob3dNb2RhbCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3REaWFsb2dDbG9zZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGRpYWxvZy5jbG9zZSgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RFbGVtZW50IChlKSB7XHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICBsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxyXG4gICAgbGV0IHByb2plY3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIHByb2plY3RFbC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1lbGVtZW50XCIpXHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdFRpdGxlLnZhbHVlXHJcbiAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWFpblJlbmRlcilcclxuXHJcbiAgICBsZXQgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGRlbGV0ZVByb2plY3RCdG4udGV4dENvbnRlbnQgPSBcInhcIlxyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpXHJcblxyXG4gICAgcHJvamVjdEVsLmFwcGVuZENoaWxkKHRpdGxlKVxyXG4gICAgcHJvamVjdEVsLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pXHJcbiAgICBsaXN0LmFwcGVuZENoaWxkKHByb2plY3RFbClcclxuXHJcbiAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaXN0KVxyXG5cclxuICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICBcclxufVxyXG5cclxuZnVuY3Rpb24gbWFpblJlbmRlciAoZSkge1xyXG4gICBcclxuXHJcblxyXG4gICAgbGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi10aXRsZVwiKVxyXG4gICAgbWFpblRpdGxlLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnRcclxuXHJcbiAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIilcclxuICAgIC8qIG1haW4uaW5zZXJ0QmVmb3JlKHRhc2tDb250YWluZXIsIGJ0blRhc2spICovXHJcbiAgICBjb25zb2xlLmxvZyh0YXNrQ29udGFpbmVyKVxyXG5cclxuICAgXHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdGFza0VsZW1lbnQgKGUpIHtcclxuXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXRpdGxlXCIpXHJcbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKVxyXG4gICAgLy9sZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIilcclxuICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFzay1jb250YWluZXJcIilcclxuXHJcbiAgICBsZXQgdGFza0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgdGFza0VsLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWVsZW1lbnRcIilcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSB0YXNrVGl0bGUudmFsdWVcclxuXHJcbiAgICBsZXQgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBkYXRlLnRleHRDb250ZW50ID0gdGFza0RhdGUudmFsdWVcclxuXHJcbiAgICBsZXQgZGVsZXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGRlbGV0ZVRhc2tCdG4udGV4dENvbnRlbnQgPSBcInhcIlxyXG4gICAgZGVsZXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXRhc2stYnRuXCIpXHJcblxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKHRpdGxlKVxyXG4gICAgdGFza0VsLmFwcGVuZENoaWxkKGRhdGUpXHJcbiAgICB0YXNrRWwuYXBwZW5kQ2hpbGQoZGVsZXRlVGFza0J0bilcclxuICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsKVxyXG4gICAgbWFpbi5pbnNlcnRCZWZvcmUodGFza0NvbnRhaW5lciwgYnRuVGFzaylcclxuXHJcbiAgICBkaWFsb2cyLmNsb3NlKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tEaWFsb2coZSl7XHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10aXRsZVwiKVxyXG4gICAgdGFza1RpdGxlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIilcclxuICAgIHRhc2tEYXRlLnZhbHVlID0gXCJcIlxyXG4gICAgbGV0IHRhc2tOb3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1ub3Rlc1wiKVxyXG4gICAgdGFza05vdGVzLnZhbHVlID0gXCJcIlxyXG4gICAgZGlhbG9nMi5zaG93TW9kYWwoKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrRGlhbG9nQ2xvc2UgKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgZGlhbG9nMi5jbG9zZSgpXHJcbn1cclxuXHJcbi8qIGZ1bmN0aW9uIG1haW5DcmVhdG9yICgpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBsZXQgdGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XHJcbiAgICBsZXQgYWRkVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuXHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1haW4tY29udGFpbmVyXCIpO1xyXG4gICAgdGl0bGVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRpdGxlLWNvbnRhaW5lclwiKTtcclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZS10YXNrXCIpO1xyXG4gICAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKFwiYnRuLXRhc2tcIik7XHJcblxyXG4gICAgbWFpbi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlQ29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrKTtcclxuICAgIHRpdGxlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIFxyXG59ICovIiwiZXhwb3J0IHsvKiBzdG9yZU9iaiwgZGVsZXRlT2JqLCByZXRyaWV2ZU9iaiAqLyBzdG9yYWdlfVxyXG5pbXBvcnQge21ldGhvZHN9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuXHJcbmxldCBzdG9yYWdlID0ge1xyXG4gICAgIHN0b3JlT2JqIChvYmope1xyXG4gICAgICAgIGxldCBvYmpTdHIgPSBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7b2JqLnRpdGxlfWAsIG9ialN0cilcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGRlbGV0ZU9iaiAob2JqKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7b2JqLnRpdGxlfWApXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICByZXRyaWV2ZU9iaiAob2JqKSB7XHJcbiAgICAgICBsZXQgb2JqU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7b2JqLnRpdGxlfWApXHJcbiAgICAgICBsZXQgb2JqUGFyc2UgPSBKU09OLnBhcnNlKG9ialN0cilcclxuICAgICAgIE9iamVjdC5hc3NpZ24ob2JqUGFyc2UsIG1ldGhvZHMgKVxyXG4gICAgXHJcbiAgICAgICByZXR1cm4gb2JqUGFyc2VcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdGVuT2JqICgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKiBmdW5jdGlvbiBzdG9yZU9iaiAob2JqKXtcclxuICAgIGxldCBvYmpTdHIgPSBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtvYmoudGl0bGV9YCwgb2JqU3RyKVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVPYmogKG9iaikge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7b2JqLnRpdGxlfWApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHJpZXZlT2JqIChvYmopIHtcclxuICAgbGV0IG9ialN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke29iai50aXRsZX1gKVxyXG4gICBsZXQgb2JqUGFyc2UgPSBKU09OLnBhcnNlKG9ialN0cilcclxuXHJcbiAgIHJldHVybiBvYmpQYXJzZVxyXG59ICovIiwiaW1wb3J0IHtzdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCJcclxuXHJcbmV4cG9ydCB7Y3JlYXRlUHJvamVjdCwgY3JlYXRlVGFzaywgbWV0aG9kc31cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QgKHRpdGxlKSB7XHJcbiAgICByZXR1cm4ge3RpdGxlfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUYXNrICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGlzUHJpb3JpdHksIGlzQ2hlY2tlZCkge1xyXG5cclxuICAgIGxldCB0YXNrID0ge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgaXNQcmlvcml0eSwgaXNDaGVja2VkfVxyXG4gICAgc3RvcmFnZS5zdG9yZU9iaih0YXNrKVxyXG4gICAgcmV0dXJuIHRhc2tcclxufVxyXG5cclxuXHJcblxyXG5sZXQgbWV0aG9kcyA9IHtcclxuICAgZGVsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL3RoaXMucmVtb3ZlKClcclxuICAgIGNvbnNvbGUubG9nKFwiZGVsZXRlZFwiKVxyXG4gICB9LFxyXG4gICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vdGhpcy5jcmVhdGVQcm9qZWN0KClcclxuICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZFwiKVxyXG4gICB9XHJcbn1cclxuXHJcblxyXG4vKiBsZXQgdGFza01ldGhvZHMgPSB7XHJcblxyXG59ICovXHJcblxyXG5mdW5jdGlvbiBlZGl0ICgpIHtcclxuXHJcbn1cclxuXHJcblxyXG4vL2xldCBwcm8gPSBjcmVhdGVQcm9qZWN0KFwiT0xBXCIpXHJcbmxldCB0YXNrID0gY3JlYXRlVGFzayhcInBhc2VhciBwZXJyb1wiLCBcInNhbGlyIGEgY2FtbmlhciBjb24gZWwgcGljaG9cIiwgXCIxOC0xMC0yM1wiLCBmYWxzZSwgZmFsc2UpXHJcblxyXG5jb25zb2xlLmxvZyh0YXNrKVxyXG5cclxuLy9PYmplY3QuYXNzaWduKHBybywgbWV0aG9kcyApXHJcbk9iamVjdC5hc3NpZ24odGFzaywgbWV0aG9kcylcclxuXHJcbmZ1bmN0aW9uIGFkZE1ldGhvZHMgKG9iaiwgbWV0aCkge1xyXG4gICByZXR1cm4gT2JqZWN0LmFzc2lnbihvYmosIG1ldGgpXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2NyZWF0ZVByb2plY3QsIGNyZWF0ZVRhc2ssIG1ldGhvZHN9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuaW1wb3J0IHtzdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCJcclxuaW1wb3J0IHtwcm9qZWN0RGlhbG9nLCBwcm9qZWN0RWxlbWVudH0gZnJvbSBcIi4vZG9tLmpzXCJcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==