/*global chrome*/
let div                   = document.createElement('div');
div.id                    = "contentScriptDivID";
div.style.margin          = '2em';
div.style.padding         = '2em';
div.style.textAlign       = 'center';
div.style.backgroundColor = 'white';

let btn       = document.createElement('button');
btn.id        = "contentScriptButtonID";
btn.innerHTML = 'React-Chrome-Extension';

div.appendChild(btn);
document.body.prepend(div);

btn.addEventListener("click", function () {
  console.log("Starting button event handler");
  chrome.runtime.sendMessage({type: 'GET', params: {token: "token", }}, {}, function (response) {
    console.log("Inside sendMessage");
    console.log("Content script response: ", response);
  });
});

