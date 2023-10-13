/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   storage: () => (/* binding */ storage)
/* harmony export */ });


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



window.addEventListener("storage", (e) => {
    console.log(e)
})

let task = (0,_to_do_js__WEBPACK_IMPORTED_MODULE_0__.createTask)("pasear perro", "salir a camniar con el picho", "18-10-23", false, false)

console.log(task);




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxVQUFVO0FBQzFDLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0MsS0FBSztBQUNMO0FBQ0E7QUFDQSw0Q0FBNEMsVUFBVTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsVUFBVTtBQUN6QztBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsVUFBVTtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDa0M7QUFDcEM7QUFDMkM7QUFDM0M7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQy9DQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042RDtBQUN6QjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxXQUFXLHFEQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG8tZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7Lyogc3RvcmVPYmosIGRlbGV0ZU9iaiwgcmV0cmlldmVPYmogKi8gc3RvcmFnZX1cclxuXHJcbmxldCBzdG9yYWdlID0ge1xyXG4gICAgIHN0b3JlT2JqIChvYmope1xyXG4gICAgICAgIGxldCBvYmpTdHIgPSBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7b2JqLnRpdGxlfWAsIG9ialN0cilcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGRlbGV0ZU9iaiAob2JqKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7b2JqLnRpdGxlfWApXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICByZXRyaWV2ZU9iaiAob2JqKSB7XHJcbiAgICAgICBsZXQgb2JqU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7b2JqLnRpdGxlfWApXHJcbiAgICAgICBsZXQgb2JqUGFyc2UgPSBKU09OLnBhcnNlKG9ialN0cilcclxuICAgIFxyXG4gICAgICAgcmV0dXJuIG9ialBhcnNlXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3Rlbk9iaiAoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInN0b3JhZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyogZnVuY3Rpb24gc3RvcmVPYmogKG9iail7XHJcbiAgICBsZXQgb2JqU3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKVxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7b2JqLnRpdGxlfWAsIG9ialN0cilcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlT2JqIChvYmopIHtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke29iai50aXRsZX1gKVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXRyaWV2ZU9iaiAob2JqKSB7XHJcbiAgIGxldCBvYmpTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtvYmoudGl0bGV9YClcclxuICAgbGV0IG9ialBhcnNlID0gSlNPTi5wYXJzZShvYmpTdHIpXHJcblxyXG4gICByZXR1cm4gb2JqUGFyc2VcclxufSAqLyIsImltcG9ydCB7c3RvcmFnZX0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiXHJcblxyXG5leHBvcnQge2NyZWF0ZVByb2plY3QsIGNyZWF0ZVRhc2ssIG1ldGhvZHN9XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0ICh0aXRsZSkge1xyXG4gICAgcmV0dXJuIHt0aXRsZX1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFzayAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBpc1ByaW9yaXR5LCBpc0NoZWNrZWQpIHtcclxuXHJcbiAgICBsZXQgdGFzayA9IHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGlzUHJpb3JpdHksIGlzQ2hlY2tlZH1cclxuICAgIHN0b3JhZ2Uuc3RvcmVPYmoodGFzaylcclxuICAgIHJldHVybiB0YXNrXHJcbn1cclxuXHJcblxyXG5cclxubGV0IG1ldGhvZHMgPSB7XHJcbiAgIGRlbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy90aGlzLnJlbW92ZSgpXHJcbiAgICBjb25zb2xlLmxvZyhcImRlbGV0ZWRcIilcclxuICAgfSxcclxuICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL3RoaXMuY3JlYXRlUHJvamVjdCgpXHJcbiAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWRcIilcclxuICAgfVxyXG59XHJcblxyXG4vKiBsZXQgdGFza01ldGhvZHMgPSB7XHJcblxyXG59ICovXHJcblxyXG5mdW5jdGlvbiBlZGl0ICgpIHtcclxuXHJcbn1cclxuXHJcblxyXG4vL2xldCBwcm8gPSBjcmVhdGVQcm9qZWN0KFwiT0xBXCIpXHJcbmxldCB0YXNrID0gY3JlYXRlVGFzayhcInBhc2VhciBwZXJyb1wiLCBcInNhbGlyIGEgY2FtbmlhciBjb24gZWwgcGljaG9cIiwgXCIxOC0xMC0yM1wiLCBmYWxzZSwgZmFsc2UpXHJcblxyXG5jb25zb2xlLmxvZyh0YXNrKVxyXG5cclxuLy9PYmplY3QuYXNzaWduKHBybywgbWV0aG9kcyApXHJcbk9iamVjdC5hc3NpZ24odGFzaywgbWV0aG9kcylcclxuXHJcbmZ1bmN0aW9uIGFkZE1ldGhvZHMgKG9iaiwgbWV0aCkge1xyXG4gICByZXR1cm4gT2JqZWN0LmFzc2lnbihvYmosIG1ldGgpXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2NyZWF0ZVByb2plY3QsIGNyZWF0ZVRhc2ssIG1ldGhvZHN9IGZyb20gXCIuL3RvLWRvLmpzXCJcclxuaW1wb3J0IHtzdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCJcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLCAoZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZSlcclxufSlcclxuXHJcbmxldCB0YXNrID0gY3JlYXRlVGFzayhcInBhc2VhciBwZXJyb1wiLCBcInNhbGlyIGEgY2FtbmlhciBjb24gZWwgcGljaG9cIiwgXCIxOC0xMC0yM1wiLCBmYWxzZSwgZmFsc2UpXHJcblxyXG5jb25zb2xlLmxvZyh0YXNrKTtcclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9