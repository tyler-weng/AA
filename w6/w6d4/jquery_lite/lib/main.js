const DOMNodeCollection = require('./dom_node_collection.js');

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = arg => {
  if (arg instanceof Function) return registerDocReadyCallback(arg);
  const nodes = (arg instanceof HTMLElement
                  ? [arg]
                  : Array.from(document.querySelectorAll(arg)));
  return DOMNodeCollection(nodes);
};

$l.extend = (obj, ...args) => {
  args.forEach(arg => {
    Object.keys(arg).forEach(property => obj.property = arg.property);
  });
}

registerDocReadyCallback = func => {
  if(!_docReady){
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

$l.ajax = (options) => {
  const request = new XMLHttpRequest();
  const defaults = {
    method: 'GET',
    url: 'https://www.reddit.com/r/The_Donald',
    async: true,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'json',
    data: {},
    success: () => {},
    error: () => {}
  };

  if (options.method === "GET"){
    //data is query string for get
    options.url += "?" + toQueryString(options.data);
  }

  const queryOptions = $l.extend(defaults, options);
  request.open(queryOptions.method, queryOptions.url, true);
  request.onload = (e) => {
    (request.status === 200
      ? options.success(request.response)
      : options.error(request.response));
  };
  request.send(JSON.stringify(queryOptions.data));
}

toQueryString = obj => {
  let result = "";
  for(let prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});
