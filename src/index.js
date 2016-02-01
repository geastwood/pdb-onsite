import fetch from 'isomorphic-fetch';

var loadSript = (src, fn) => {
  var script = document.createElement('script');
  script.type = 'text\/javascript';

  script.onload = fn;
  document.body.appendChild(script);
  script.src = src;
};

var render = (el, markup) => {
  var domEl = document.getElementById(el);
  domEl.innerHTML = markup;
};

export var request = key => {
  fetch(`http://localhost:3000/template/${key}`)
    .then(res => res.json())
    .then(json => {
      render('markup', json.markup);
      if (!window.PdbConnect) {
        loadSript('http://localhost:3000/javascripts/initializer.js', function() {
          PdbConnect.init();
        });
      } else {
        PdbConnect.init();
      }
    });
};
