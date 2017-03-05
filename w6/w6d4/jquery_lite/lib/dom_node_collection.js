class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(str) {
    return (str === undefined
             ? this.nodes.map(node => node.innerHTML = str)
             : this.nodes[0].innerHTML);
  }

  empty() {
    // this.nodes.map(node => node.innerHTML = "");
    this.html("");
  }

  append(content) {
    if (content instanceof jQuery) {
      content.map(htmlElem => this.nodes.map(node => node.innerHTML += htmlElem.outerHTML));
    } else if (content instanceof HTMLElement || content instanceof String) {
      this.nodes.map(node => node.innerHTML += content.outerHTML);
    } else {
      throw new Error("Invalid content");
    }
  }

  attr(attrName, value) {
    if (value === undefined) {
      this.find(node => node.hasAttribute(attrName));
    } else {
      this.nodes
          .filter(node => node.hasAttribute(attrName))
          .map(node => node.setAttribute(attrName, value));
    }
  }

  find(cb) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (cb(this.nodes[i])) return this.nodes[i];
    }
  }

  addClass(className) {
    this.nodes.map(node => node.classList.add(className));
  }

  removeClass(className) {
    this.nodes.map(node => node.classList.remove(className));
  }

  children() {
    const allChildren = [];
    this.nodes.map(node => allChildren.push(node.children));
    return DOMNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];
    this.nodes.map(node => allParents.push(node.parent));
    return DOMNodeCollection(allParents);
  }

  remove() {
    this.empty();
    this.nodes = [];
  }

  on(eventName, eventHandler) {
    this.nodes.map(node =>  {
      node.addEventListener(eventName, eventHandler);
      node[eventName] = eventHandler;
    });
  }

  off(eventName) {
    this.nodes.map(node =>  {
      node.removeEventListener(eventName, node[eventName]);
      node[eventName] = undefined;
    });
  }


}

module.exports = DOMNodeCollection;
