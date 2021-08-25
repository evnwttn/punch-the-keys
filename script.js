function getKey(e) {
  var location = e.location;
  var selector;
  if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    selector = ['[data-key="' + e.keyCode + '-R"]'];
  } else {
    var code = e.keyCode || e.which;
    selector = [
      '[data-key="' + code + '"]',
      '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]',
    ].join(",");
  }
  return document.querySelector(selector);
}

function pressKey(char) {
  var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
  if (!key) {
    return console.warn("No key for", char);
  }
  key.setAttribute("data-pressed", "on");
  setTimeout(function () {
    key.removeAttribute("data-pressed");
  }, 200);
}

document.body.addEventListener("keydown", function (e) {
  var key = getKey(e);
  if (!key) {
    return console.warn("No key for", e.keyCode);
  }

  key.setAttribute("data-pressed", "on");
});

document.body.addEventListener("keyup", function (e) {
  var key = getKey(e);
  key && key.removeAttribute("data-pressed");
});
