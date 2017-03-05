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
