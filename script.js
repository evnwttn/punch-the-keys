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

let synth = makeSynth(oscType[oscNum]);

document.body.addEventListener("keydown", (e) => {
  let getOsc = getKey(e);

  if (getOsc.hasAttribute("osc-up")) {
    if (oscNum <= oscType.length - 1) {
      oscNum++;
      synth = makeSynth(oscType[oscNum]);
    }
    console.log("ya");
  } else if (getOsc.hasAttribute("osc-down")) {
    if (oscNum > 0) {
      oscNum--;
      synth = makeSynth(oscType[oscNum]);
    }
    console.log("ya");
  }
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
    handleOctaveElement(clickOctave[i]);
  })
);

// KEY FUNCTIONS

document.body.addEventListener("keydown", (e) => {
  let typeKey = getKey(e);
  if (typeKey.hasAttribute("data-sound")) {
    let note = typeKey.getAttribute("data-sound");
    synth.triggerAttackRelease(`${note}${octave}`, "4n");
  }
});

const clickKey = document.querySelectorAll(".gdt");
for (let i = 0; i < clickKey.length; i++) {
  clickKey[i].addEventListener("click", function () {
    if (clickKey[i].hasAttribute("data-sound")) {
      let note = clickKey[i].getAttribute("data-sound");
      synth.triggerAttackRelease(`${note}${octave}`, "4n");
    }
  });
}
