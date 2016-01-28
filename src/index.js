import lorem from '../data/lorem';
import testData from '../data/testData.js';
import fetch from 'isomorphic-fetch';

var randomKeywords = (length, data) => {
  var keys = Object.keys(testData),
    total = keys.length,
    rst = [];
  do {
    rst.push(keys[Math.floor(Math.random() * total)]);
    length--;
  } while (length > 0);
  return rst;
};

var buildParagraph = (lorems, keywords) => {
  return keywords.reduce((carry, keyword) => {
    var random = Math.floor(Math.random() * carry.length);
    return carry.slice(0, random).concat(keyword).concat(carry.slice(random));
  }, lorems).join(' ');
};

var keywords = randomKeywords(3, testData);

//var preprareMarkUp = keywords => {
//  return keywords.map(key => {
//    var detail = testData[key];
//    return
//  })
//};

var connect = (src, fn) => {
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
        connect('http://localhost:3000/javascripts/initializer.js', function() {
          PdbConnect.init();
        });
      }
    });
};


