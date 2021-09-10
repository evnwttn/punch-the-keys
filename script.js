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

// UI

let uiVol = document.getElementById("ui-Vol");
let uiOsc = document.getElementById("ui-Osc");
let uiOct = document.getElementById("ui-Oct");

function updateUi() {
  uiVol.innerHTML = "yes";
  uiOsc.innerHTML = "yes";
  uiOct.innerHTML = "yes";
}

// TOGGLE OSCILLATOR / SYNTH

let oscType = ["sawtooth", "triangle", "square", "sine"];
let oscNum = 0;
let volLevel = 0;

function makeSynth(oscillatorType) {
  return new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: oscillatorType,
    },
    volume: volLevel,
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

Array.from(document.querySelectorAll(".gdt")).map((clickOsc) =>
  clickOsc.addEventListener("click", () => {
    toggleSynth(clickOsc);
  })
);

// VOLUME

document.body.addEventListener("keydown", (e) => {
  let volToggle = getKey(e);
  toggleVolume(volToggle);
});

Array.from(document.querySelectorAll(".gdt")).map((clickVol) =>
  clickVol.addEventListener("click", () => {
    toggleVolume(clickVol);
  })
);

function toggleVolume(elm) {
  if (elm.hasAttribute("vol-up")) {
    if (volLevel <= 29) {
      volLevel++;
      synth = makeSynth(oscType[oscNum]);
    }
  } else if (elm.hasAttribute("vol-down")) {
    if (volLevel >= -29) {
      volLevel--;
      synth = makeSynth(oscType[oscNum]);
    }
  }
}

// OCTAVE SELECTION

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

// KEY FUNCTION

function handleKeys(elm) {
  if (elm.hasAttribute("data-sound")) {
    let note = elm.getAttribute("data-sound");
    synth.triggerAttackRelease(`${note}${octave}`, "4n");
  }
}

document.body.addEventListener("keydown", (e) => {
  let typeKey = getKey(e);
  handleKeys(typeKey);
  updateUi();
});

Array.from(document.querySelectorAll(".gdt")).map((clickKey) =>
  clickKey.addEventListener("click", () => {
    handleKeys(clickKey);
  })
);
