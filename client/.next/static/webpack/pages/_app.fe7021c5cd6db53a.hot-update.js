"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.scss */ \"./styles/globals.scss\");\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/styles/index.js\");\n/* harmony import */ var _styles_muiTheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/muiTheme */ \"./styles/muiTheme.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _layout_Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../layout/Layout */ \"./layout/Layout.tsx\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-query */ \"./node_modules/@tanstack/react-query/build/umd/index.production.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-query-devtools */ \"./node_modules/@tanstack/react-query-devtools/build/esm/index.js\");\n/* harmony import */ var _hooks_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks/hooks */ \"./hooks/hooks.tsx\");\nfunction _arrayLikeToArray(arr, len) {\n    if (len == null || len > arr.length) len = arr.length;\n    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];\n    return arr2;\n}\nfunction _arrayWithHoles(arr) {\n    if (Array.isArray(arr)) return arr;\n}\nfunction _defineProperty(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nfunction _iterableToArrayLimit(arr, i) {\n    var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"];\n    if (_i == null) return;\n    var _arr = [];\n    var _n = true;\n    var _d = false;\n    var _s1, _e;\n    try {\n        for(_i = _i.call(arr); !(_n = (_s1 = _i.next()).done); _n = true){\n            _arr.push(_s1.value);\n            if (i && _arr.length === i) break;\n        }\n    } catch (err) {\n        _d = true;\n        _e = err;\n    } finally{\n        try {\n            if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n        } finally{\n            if (_d) throw _e;\n        }\n    }\n    return _arr;\n}\nfunction _nonIterableRest() {\n    throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _objectSpread(target) {\n    for(var i = 1; i < arguments.length; i++){\n        var source = arguments[i] != null ? arguments[i] : {};\n        var ownKeys = Object.keys(source);\n        if (typeof Object.getOwnPropertySymbols === \"function\") {\n            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n            }));\n        }\n        ownKeys.forEach(function(key) {\n            _defineProperty(target, key, source[key]);\n        });\n    }\n    return target;\n}\nfunction _slicedToArray(arr, i) {\n    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();\n}\nfunction _unsupportedIterableToArray(o, minLen) {\n    if (!o) return;\n    if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n    var n = Object.prototype.toString.call(o).slice(8, -1);\n    if (n === \"Object\" && o.constructor) n = o.constructor.name;\n    if (n === \"Map\" || n === \"Set\") return Array.from(n);\n    if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\nvar _this = undefined;\n\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\n// import Head from \"next/head\";\nvar MyApp = function(param) {\n    var Component = param.Component, pageProps = param.pageProps;\n    _s();\n    var ref = _slicedToArray(react__WEBPACK_IMPORTED_MODULE_3___default().useState(function() {\n        return new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.QueryClient();\n    }), 1), queryClient = ref[0]; // queryClient instance is inside useSstate per docs;\n    if (pageProps.error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Error...\"\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Vaughn\\\\productaffair\\\\client\\\\pages\\\\_app.tsx\",\n            lineNumber: 20,\n            columnNumber: 12\n        }, _this);\n    }\n    //   {/*  */}\n    //   {/* Hydrate data we already fetched */}\n    //   { /*<Hydrate state={pageProps.dehydratedState}> */}\n    //    {/*</Hydrate> */}\n    // {/**/}\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.QueryClientProvider, {\n        client: queryClient,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_hooks_hooks__WEBPACK_IMPORTED_MODULE_6__.AuthProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.Hydrate, {\n                    state: pageProps.dehydratedState,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_8__.ThemeProvider, {\n                        theme: _styles_muiTheme__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_Layout__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Vaughn\\\\productaffair\\\\client\\\\pages\\\\_app.tsx\",\n                                    lineNumber: 35,\n                                    columnNumber: 17\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Vaughn\\\\productaffair\\\\client\\\\pages\\\\_app.tsx\",\n                                lineNumber: 34,\n                                columnNumber: 15\n                            }, _this),\n                            \"/\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Vaughn\\\\productaffair\\\\client\\\\pages\\\\_app.tsx\",\n                        lineNumber: 33,\n                        columnNumber: 13\n                    }, _this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Vaughn\\\\productaffair\\\\client\\\\pages\\\\_app.tsx\",\n                    lineNumber: 32,\n                    columnNumber: 11\n                }, _this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Vaughn\\\\productaffair\\\\client\\\\pages\\\\_app.tsx\",\n                lineNumber: 31,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_5__.ReactQueryDevtools, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Vaughn\\\\productaffair\\\\client\\\\pages\\\\_app.tsx\",\n                lineNumber: 41,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Vaughn\\\\productaffair\\\\client\\\\pages\\\\_app.tsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, _this);\n};\n_s(MyApp, \"qFhNRSk+4hqflxYLL9+zYF5AcuQ=\");\n_c = MyApp;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyApp);\nvar _c;\n$RefreshReg$(_c, \"MyApp\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWdDO0FBQ3FCO0FBQ2Q7QUFDTDtBQUVJO0FBS1A7QUFDcUM7QUFDdEI7O0FBQzlDLGdDQUFnQztBQUVoQyxJQUFNUyxLQUFLLEdBQWlCLGdCQUF3QztRQUFyQ0MsU0FBUyxTQUFUQSxTQUFTLEVBQUVDLFNBQVMsU0FBVEEsU0FBUzs7SUFDakQsSUFBc0JULEdBQXVDLGtCQUF2Q0EscURBQWMsQ0FBQztlQUFNLElBQUlHLDhEQUFXLEVBQUU7S0FBQSxDQUFDLE1BQXREUSxXQUFXLEdBQUlYLEdBQXVDLEdBQTNDLEVBQTZDLHFEQUFxRDtJQUVwSCxJQUFJUyxTQUFTLENBQUNHLEtBQUssRUFBRTtRQUNuQixxQkFBTyw4REFBQ0MsS0FBRztzQkFBQyxVQUFROzs7OztpQkFBTSxDQUFDO0tBQzVCO0lBQ0QsYUFBYTtJQUNiLDRDQUE0QztJQUM1Qyx3REFBd0Q7SUFFeEQsdUJBQXVCO0lBQ3ZCLFNBQVM7SUFFVCxxQkFDRSw4REFBQ1gsc0VBQW1CO1FBQUNZLE1BQU0sRUFBRUgsV0FBVzs7MEJBQ3BDLDhEQUFDTCxzREFBWTswQkFDWCw0RUFBQ0YsMERBQU87b0JBQUNXLEtBQUssRUFBRU4sU0FBUyxDQUFDTyxlQUFlOzhCQUN2Qyw0RUFBQ2xCLCtEQUFhO3dCQUFDQyxLQUFLLEVBQUVBLHdEQUFLOzswQ0FDekIsOERBQUNFLHNEQUFNOzBDQUNMLDRFQUFDTyxTQUFTLG9CQUFLQyxTQUFTOzs7O3lDQUFJOzs7OztxQ0FFckI7NEJBQUEsR0FDWDs7Ozs7OzZCQUFnQjs7Ozs7eUJBQ1I7Ozs7O3FCQUNHOzBCQUNqQiw4REFBQ0osOEVBQWtCOzs7O3FCQUFHOzs7Ozs7YUFDRixDQUN0QjtDQUNIO0dBNUJLRSxLQUFLO0FBQUxBLEtBQUFBLEtBQUs7QUE4QlgsK0RBQWVBLEtBQUssRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLnNjc3NcIjtcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiQG11aS9tYXRlcmlhbC9zdHlsZXNcIjtcbmltcG9ydCB0aGVtZSBmcm9tIFwiLi4vc3R5bGVzL211aVRoZW1lXCI7XG5pbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcbmltcG9ydCBMYXlvdXQgZnJvbSBcIi4uL2xheW91dC9MYXlvdXRcIjtcbmltcG9ydCB7XG4gIFF1ZXJ5Q2xpZW50UHJvdmlkZXIsXG4gIFF1ZXJ5Q2xpZW50LFxuICBIeWRyYXRlLFxufSBmcm9tIFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5XCI7XG5pbXBvcnQgeyBSZWFjdFF1ZXJ5RGV2dG9vbHMgfSBmcm9tIFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5LWRldnRvb2xzXCI7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vaG9va3MvaG9va3NcIjtcbi8vIGltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcblxuY29uc3QgTXlBcHA6IEZDPEFwcFByb3BzPiA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSA9PiB7XG4gIGNvbnN0IFtxdWVyeUNsaWVudF0gPSBSZWFjdC51c2VTdGF0ZSgoKSA9PiBuZXcgUXVlcnlDbGllbnQoKSk7IC8vIHF1ZXJ5Q2xpZW50IGluc3RhbmNlIGlzIGluc2lkZSB1c2VTc3RhdGUgcGVyIGRvY3M7XG5cbiAgaWYgKHBhZ2VQcm9wcy5lcnJvcikge1xuICAgIHJldHVybiA8ZGl2PkVycm9yLi4uPC9kaXY+O1xuICB9XG4gIC8vICAgey8qICAqL31cbiAgLy8gICB7LyogSHlkcmF0ZSBkYXRhIHdlIGFscmVhZHkgZmV0Y2hlZCAqL31cbiAgLy8gICB7IC8qPEh5ZHJhdGUgc3RhdGU9e3BhZ2VQcm9wcy5kZWh5ZHJhdGVkU3RhdGV9PiAqL31cblxuICAvLyAgICB7Lyo8L0h5ZHJhdGU+ICovfVxuICAvLyB7LyoqL31cblxuICByZXR1cm4gKFxuICAgIDxRdWVyeUNsaWVudFByb3ZpZGVyIGNsaWVudD17cXVlcnlDbGllbnR9PlxuICAgICAgICA8QXV0aFByb3ZpZGVyPlxuICAgICAgICAgIDxIeWRyYXRlIHN0YXRlPXtwYWdlUHJvcHMuZGVoeWRyYXRlZFN0YXRlfT5cbiAgICAgICAgICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgICAgICAgIDxMYXlvdXQ+XG4gICAgICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICAgICAgICAgIHsvKiBldG9uZyBDb21wb25lbnQgbmF0byBtYXBhcGFzYSBzYSBMYXlvdXQgYXMgY2hpbGRyZW4gKi99XG4gICAgICAgICAgICAgIDwvTGF5b3V0Pi9cbiAgICAgICAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICAgICAgICA8L0h5ZHJhdGU+XG4gICAgICAgIDwvQXV0aFByb3ZpZGVyPlxuICAgICAgPFJlYWN0UXVlcnlEZXZ0b29scyAvPlxuICAgIDwvUXVlcnlDbGllbnRQcm92aWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwOyBcbiJdLCJuYW1lcyI6WyJUaGVtZVByb3ZpZGVyIiwidGhlbWUiLCJSZWFjdCIsIkxheW91dCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJRdWVyeUNsaWVudCIsIkh5ZHJhdGUiLCJSZWFjdFF1ZXJ5RGV2dG9vbHMiLCJBdXRoUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInVzZVN0YXRlIiwicXVlcnlDbGllbnQiLCJlcnJvciIsImRpdiIsImNsaWVudCIsInN0YXRlIiwiZGVoeWRyYXRlZFN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ })

});