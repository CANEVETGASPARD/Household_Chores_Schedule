/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./weekly_schedule/static/model/register.ts":
/*!**************************************************!*\
  !*** ./weekly_schedule/static/model/register.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_inputSettingFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/inputSettingFunctions */ \"./weekly_schedule/static/model/utils/inputSettingFunctions.ts\");\n\r\nvar FormHTMLInputBasicValues = { \"familyName\": \"Family name\", \"password\": \"Password\", \"confirmPassword\": \"Confirm password\" };\r\nvar familyNameInput = document.getElementById(\"family-name\");\r\nvar passwordInput = document.getElementById(\"password\");\r\nvar confirmPasswordInput = document.getElementById(\"confirm-password\");\r\nfamilyNameInput.addEventListener(\"focus\", function (e) { (0,_utils_inputSettingFunctions__WEBPACK_IMPORTED_MODULE_0__.removeInputValueOnFocus)(e, FormHTMLInputBasicValues); });\r\nfamilyNameInput.addEventListener(\"blur\", function (e) { (0,_utils_inputSettingFunctions__WEBPACK_IMPORTED_MODULE_0__.resetInputIfBlankOnBlur)(e, FormHTMLInputBasicValues); });\r\npasswordInput.addEventListener(\"focus\", function (e) {\r\n    (0,_utils_inputSettingFunctions__WEBPACK_IMPORTED_MODULE_0__.removeInputValueOnFocus)(e, FormHTMLInputBasicValues);\r\n    (0,_utils_inputSettingFunctions__WEBPACK_IMPORTED_MODULE_0__.setPasswordTypeOnFocus)(e);\r\n});\r\npasswordInput.addEventListener(\"blur\", function (e) { (0,_utils_inputSettingFunctions__WEBPACK_IMPORTED_MODULE_0__.resetInputIfBlankOnBlur)(e, FormHTMLInputBasicValues); });\r\nconfirmPasswordInput.addEventListener(\"focus\", function (e) {\r\n    (0,_utils_inputSettingFunctions__WEBPACK_IMPORTED_MODULE_0__.removeInputValueOnFocus)(e, FormHTMLInputBasicValues);\r\n    (0,_utils_inputSettingFunctions__WEBPACK_IMPORTED_MODULE_0__.setPasswordTypeOnFocus)(e);\r\n});\r\nconfirmPasswordInput.addEventListener(\"blur\", function (e) { (0,_utils_inputSettingFunctions__WEBPACK_IMPORTED_MODULE_0__.resetInputIfBlankOnBlur)(e, FormHTMLInputBasicValues); });\r\n\n\n//# sourceURL=webpack://household_chores_schedule/./weekly_schedule/static/model/register.ts?");

/***/ }),

/***/ "./weekly_schedule/static/model/utils/inputSettingFunctions.ts":
/*!*********************************************************************!*\
  !*** ./weekly_schedule/static/model/utils/inputSettingFunctions.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"removeInputValueOnFocus\": () => (/* binding */ removeInputValueOnFocus),\n/* harmony export */   \"resetInputIfBlankOnBlur\": () => (/* binding */ resetInputIfBlankOnBlur),\n/* harmony export */   \"setPasswordTypeOnFocus\": () => (/* binding */ setPasswordTypeOnFocus)\n/* harmony export */ });\nfunction removeInputValueOnFocus(event, inputBasicValue) {\r\n    var target = event.target;\r\n    if (target.value == inputBasicValue[target.name]) {\r\n        target.value = \"\";\r\n    }\r\n}\r\nfunction setPasswordTypeOnFocus(event) {\r\n    var target = event.target;\r\n    target.type = \"password\";\r\n}\r\nfunction resetInputIfBlankOnBlur(event, inputBasicValue) {\r\n    var target = event.target;\r\n    if (target.value == \"\") {\r\n        target.value = inputBasicValue[target.name];\r\n        if (target.type == \"password\") {\r\n            target.type = \"text\";\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://household_chores_schedule/./weekly_schedule/static/model/utils/inputSettingFunctions.ts?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./weekly_schedule/static/model/register.ts");
/******/ 	
/******/ })()
;