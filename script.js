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

let oscType = ["sawtooth", "triangle", "square", "sine"];
let oscNum = 0;

function makeSynth(oscillatorType) {
  return new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: oscillatorType,
    },
  }).toDestination();
}

function toggleSynth(elm) {
  if (elm.hasAttribute("osc-up")) {
    if (oscNum <= oscType.length - 1) {
      oscNum++;
      synth = makeSynth(oscType[oscNum]);
    }
  } else if (elm.hasAttribute("osc-down")) {
    if (oscNum > 0) {
      oscNum--;
      synth = makeSynth(oscType[oscNum]);
    }
  }
}

let synth = makeSynth(oscType[oscNum]);

document.body.addEventListener("keydown", (e) => {
  let getOsc = getKey(e);
  toggleSynth(getOsc);
});

// OCTAVE FUNCTIONS

let octave = 4;

function handleOctaveElement(elm) {
  if (elm.hasAttribute("octave-up")) {
    octave++;
  } else if (elm.hasAttribute("octave-down")) {
    octave--;
  } else if (elm.hasAttribute("octave")) {
    octave = elm.getAttribute("octave");
  }
}

document.body.addEventListener("keydown", (e) => {
  let getOctave = getKey(e);
  handleOctaveElement(getOctave);
});

Array.from(document.querySelectorAll(".gdt")).map((clickOctave) =>
  clickOctave.addEventListener("click", () => {
    handleOctaveElement(clickOctave);
  })
);

// KEY FUNCTIONS

function handleKeys(elm) {
  if (elm.hasAttribute("data-sound")) {
    let note = elm.getAttribute("data-sound");
    synth.triggerAttackRelease(`${note}${octave}`, "4n");
  }
}

document.body.addEventListener("keydown", (e) => {
  let typeKey = getKey(e);
  handleKeys(typeKey);
});

Array.from(document.querySelectorAll(".gdt")).map((clickKey) =>
  clickKey.addEventListener("click", () => {
    handleKeys(clickKey);
  })
);
