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

const synth = new Tone.PolySynth().toDestination();

document.body.addEventListener("keydown", (e) => {
  let dataSound = getKey(e);
  if (dataSound.hasAttribute("data-sound") == false) {
    console.log("no note");
  } else {
    let note = dataSound.getAttribute("data-sound");
    synth.triggerAttackRelease(`${note}4`, "4n");
  }
});

const clickKey = document.querySelectorAll(".gdt");
for (let i = 0; i < clickKey.length; i++) {
  clickKey[i].addEventListener("click", function () {
    console.log("Hello World!");
  });
}

// octaves

// document.body.addEventListener("keydown", (e) => {
//   let octave = 4;
//   let getOctave = getKey(e);
//   if (getOctave.hasAttribute("octave-up") == true) {
//     octave++;
//     console.log(octave);
//   } else if (getOctave.hasAttribute("octave-down") == true) {
//     octave--;
//     console.log(octave);
//   }
// });
