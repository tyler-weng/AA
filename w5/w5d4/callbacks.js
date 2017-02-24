let cb = window.setTimeout(function(){ alert("HAMMERTIME"); }, 5000);

function setTimeOut(cb) {
  cb();
}

function hammerTime(time) {
  let cb = window.setTimeout(function(){ alert(`${time} is hammertime!`); }, time);
}

hammerTime(6000);
