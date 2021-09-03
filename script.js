// KEYBOARD

document.body.addEventListener("keydown", (e) => {
  e.preventDefault();
  let key = getKey(e);
  if (!key) {
    return console.warn("No key for", e.keyCode);
  }
  key.setAttribute("data-pressed", "on");
});

document.body.addEventListener("keyup", (e) => {
  e.preventDefault();
  let key = getKey(e);
  key && key.removeAttribute("data-pressed");
});

function getKey(e) {
  let location = e.location;
  let selector;
  if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    selector = ['[data-right="true"]', '[data-key="' + e.keyCode + '"]'].join(
      ""
    );
  } else {
    let code = e.keyCode || e.which;
    selector = [
      '[data-key="' + code + '"]',
      '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]',
    ].join(",");
  }
  return document.querySelector(selector);
}

function pressKey(char) {
  let key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
  if (!key) {
    return console.warn("No key for", char);
  }
  key.setAttribute("data-pressed", "on");
  setTimeout(function () {
    key.removeAttribute("data-pressed");
  }, 200);
}

// AUDIO

// const player = new Tone.Player("audio.fx1.wav").toDestination();
// Tone.loaded().then(() => {
//   player.start();
// });
