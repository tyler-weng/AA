/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(1);
const Inbox = __webpack_require__(2);
const Sent = __webpack_require__(4);

const routes = {
  inbox: Inbox,
  sent: Sent
}
document.addEventListener("DOMContentLoaded", () => {
  const newRouter = new Router(document.querySelector(".content"), routes);
  newRouter.start();
  window.location.hash = "#inbox";
  document.querySelectorAll(".sidebar-nav li")
          .forEach(htmlElem => {
            htmlElem.addEventListener("click", () => {
              window.location.hash = htmlElem.innerText.toLowerCase();
            });
          });
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }

  start() {
    this.render();
    window.addEventListener("hashchange", () => {
      this.render();
    });
  }

  render() {
    // this.node.innerHTML = "";
    // const currentRoute = this.activeRoute();
    // const newPar = document.createElement("p");
    // newPar.innerHTML = currentRoute;
    // this.node.appendChild(newPar);
    const component = this.activeRoute();
    if (component === undefined) {
      this.node.innerHTML = "";
    } else {
      this.node.innerHTML = "";
      const newNode = component.render();
      this.node.append(newNode);
    }
  }

  activeRoute() {
    const routeName = window.location.hash.slice(1);
    return this.routes[routeName];
  }
}

module.exports = Router;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

module.exports = {
  render() {
    const newUl = document.createElement("ul");
    newUl.className = "messages";
    const inboxMessages = MessageStore.getInboxMessages();
    inboxMessages.forEach(message => {
      const messageNode = this.renderMessage(message);
      newUl.appendChild(messageNode);
    });
    return newUl;
  },

  renderMessage(message) {
    const newLi = document.createElement("li");
    newLi.className = "message";
    newLi.innerHTML = `
      <span class="from">${message.from}</span>
      <span class="subject">${message.subject}</span> -
      <span class="body">${message.body}</span>
    `;
    return newLi;
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

let messages = {
  sent: [
    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
    {to: "person@mail.com", subject: "zzz", body: "so booring"}
  ],
  inbox: [
    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
  ]
};

const MessageStore = {
  getInboxMessages() {
    return messages.inbox;
  },

  getSentMessages() {
    return messages.sent;
  }
};
module.exports = MessageStore;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

module.exports = {
  render() {
    const newUl = document.createElement("ul");
    newUl.className = "messages";
    const inboxMessages = MessageStore.getSentMessages();
    inboxMessages.forEach(message => {
      const messageNode = this.renderMessage(message);
      newUl.appendChild(messageNode);
    });
    return newUl;
  },

  renderMessage(message) {
    const newLi = document.createElement("li");
    newLi.className = "message";
    newLi.innerHTML = `
      <span class="to">${message.to}</span>
      <span class="subject">${message.subject}</span> -
      <span class="body">${message.body}</span>
    `;
    return newLi;
  }
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map