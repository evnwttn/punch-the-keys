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

// SYNTH

const synth = new Tone.PolySynth().toDestination();

// OCTAVE FUNCTIONS

let octave = 4;

document.body.addEventListener("keydown", (e) => {
  let getOctave = getKey(e);
  if (getOctave.hasAttribute("octave-up")) {
    octave++;
  } else if (getOctave.hasAttribute("octave-down")) {
    octave--;
  } else if (getOctave.hasAttribute("octave")) {
    octave = getOctave.getAttribute("octave");
  }
});

const clickOctave = document.querySelectorAll(".gdt");
for (let i = 0; i < clickOctave.length; i++) {
  clickOctave[i].addEventListener("click", function () {
    if (clickOctave[i].hasAttribute("octave")) {
      octave = clickOctave[i].getAttribute("octave");
    } else {
      console.log("no octave");
    }
  });
}

// KEY FUNCTIONS

document.body.addEventListener("keydown", (e) => {
  let typeKey = getKey(e);
  if (typeKey.hasAttribute("data-sound")) {
    let note = typeKey.getAttribute("data-sound");
    synth.triggerAttackRelease(`${note}${octave}`, "4n");
  } else {
    console.log("no note");
  }
});

const clickKey = document.querySelectorAll(".gdt");
for (let i = 0; i < clickKey.length; i++) {
  clickKey[i].addEventListener("click", function () {
    if (clickKey[i].hasAttribute("data-sound")) {
      let note = clickKey[i].getAttribute("data-sound");
      synth.triggerAttackRelease(`${note}${octave}`, "4n");
    } else {
      console.log("no note");
    }
  });
}
