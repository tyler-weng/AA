const Router = require('./router.js');
const Inbox = require('./inbox.js');
const Sent = require('./sent.js');

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
