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
  if (elm.hasAttribute("data-oscUp")) {
    if (oscNum <= oscType.length - 2) {
      oscNum++;
      synth = makeSynth(oscType[oscNum]);
    }
  } else if (elm.hasAttribute("data-oscDown")) {
    if (oscNum >= 1) {
      oscNum--;
      synth = makeSynth(oscType[oscNum]);
    }
  }
  uiOsc.innerHTML = `[${oscType[oscNum]}]`;
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
  if (elm.hasAttribute("data-volUp")) {
    if (volLevel <= 29) {
      volLevel++;
      synth = makeSynth(oscType[oscNum]);
    }
  } else if (elm.hasAttribute("data-volDown")) {
    if (volLevel >= -29) {
      volLevel--;
      synth = makeSynth(oscType[oscNum]);
    }
  }
  uiVol.innerHTML = `[${volLevel}db]`;
}

// OCTAVE SELECTION

let octave = 4;

function handleOctaveElement(elm) {
  if (elm.hasAttribute("data-OctaveUp")) {
    if (octave <= 8) {
      octave++;
    }
  } else if (elm.hasAttribute("data-octaveDown")) {
    if (octave >= 1) {
      octave--;
    }
  } else if (elm.hasAttribute("data-octave")) {
    octave = elm.getAttribute("data-octave");
  }
  uiOct.innerHTML = `[O${octave}]`;
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
});

Array.from(document.querySelectorAll(".gdt")).map((clickKey) =>
  clickKey.addEventListener("click", () => {
    handleKeys(clickKey);
  })
);

/* --- */

const defaultRows = [
  [
    { keyCode: 27, classes: "word-top align-esq gdt", value: "ESC" },
    { keyCode: 112, classes: "func gdt", value: "F1" },
    { keyCode: 113, classes: "func gdt", value: "F2" },
    { keyCode: 114, classes: "func gdt", value: "F3" },
    { keyCode: 115, classes: "func gdt", value: "F4" },
    { keyCode: 116, classes: "func gdt", value: "F5" },
    { keyCode: 117, classes: "func gdt", value: "F6" },
    { keyCode: 118, classes: "func gdt", value: "F7" },
    { keyCode: 119, classes: "func gdt", value: "F8" },
    { keyCode: 120, classes: "func gdt", value: "F9" },
    { keyCode: 121, classes: "func gdt", value: "F10" },
    { keyCode: 122, classes: "func gdt", value: "F11" },
    { keyCode: 123, classes: "func gdt", value: "F12" },
    { keyCode: 45, classes: "word-top gdt", value: "INSERT" },
    { keyCode: 44, classes: "word-top gdt", value: "PRTSC" },
    { keyCode: 46, classes: "word-top gdt", value: "DELETE" },
  ],
  [
    { keyCode: 192, classes: "double gdt", value: ["~", "`"] },
    {
      keyCode: 49,
      octave: "0",
      classes: "double gdt multi",
      value: "!" & "1",
    },
    {
      keyCode: 50,
      dataOctave: "1",
      classes: "double gdt multi",
      value: "@" & "2",
    },
    {
      keyCode: 51,
      dataOctave: "2",
      classes: "double gdt multi",
      value: "#" & "3",
    },
    {
      keyCode: 52,
      dataOctave: "3",
      classes: "double gdt multi",
      value: "$" & "4",
    },
    {
      keyCode: 53,
      dataOctave: "4",
      classes: "double gdt multi",
      value: "%" & "5",
    },
    {
      keyCode: 54,
      dataOctave: "5",
      classes: "double gdt multi",
      value: "^" & "6",
    },
    {
      keyCode: 55,
      dataOctave: "6",
      classes: "double gdt multi",
      value: "&" & "7",
    },
    {
      keyCode: 56,
      dataOctave: "7",
      classes: "double gdt multi",
      value: "*" & "8",
    },
    {
      keyCode: 57,
      dataOctave: "8",
      classes: "double gdt multi",
      value: "(" & "9",
    },
    {
      keyCode: 48,
      dataOctave: "9",
      classes: "double gdt multi",
      value: ")" & "0",
    },
    {
      keyCode: 189,
      octaveUp: true,
      classes: "double gdt multi",
      value: "_" & "-",
    },
    {
      keyCode: 187,
      octaveDown: true,
      classes: "double gdt multi",
      value: "+" & "=",
    },
    {
      keyCode: 8,
      classes: "word backspacetab align-backspace gdt",
      value: "&#8592;",
    },
  ],
  [
    { keyCode: 9, classes: "word backspacetab align-tab gdt", value: "TAB" },
    { keyCode: 81, classes: "letter gdt", value: "Q" },
    {
      keyCode: 87,
      sound: "C#",
      classes: "letter gdt multi-sharps",
      value: "W",
    },
    {
      keyCode: 69,
      sound: "D#",
      classes: "letter gdt multi-sharps",
      value: "E",
    },
    { keyCode: 82, classes: "letter gdt", value: "R" },
    {
      keyCode: 84,
      sound: "F#",
      classes: "letter gdt multi-sharps",
      value: "T",
    },
    {
      keyCode: 89,
      sound: "G#",
      classes: "letter gdt multi-sharps",
      value: "Y",
    },
    {
      keyCode: 85,
      sound: "A#",
      classes: "letter gdt multi-sharps",
      value: "U",
    },
    { keyCode: 73, classes: "letter gdt", value: "I" },
    { keyCode: 79, classes: "letter gdt", value: "O" },
    { keyCode: 80, classes: "letter gdt", value: "P" },
    { keyCode: 219, classes: "double gdt multi", value: "{" & "[" },
    { keyCode: 221, classes: "double gdt multi", value: "}" & "]" },
    { keyCode: 220, classes: "double gdt", value: "|" & "&#92;" },
  ],
];

// <div data-key="9" class="word backspacetab align-tab gdt"><span>TAB</span></div>
// <div class="letter gdt" data-char="Q">Q</div>
// <div class="letter gdt" data-sound="C#" data-char="W"><div class="multi-sharps">C#</div>W</div>
// <div class="letter gdt" data-sound="D#" data-char="E"><div class="multi-sharps">D#</div>E</div>
// <div class="letter gdt" data-char="R">R</div>
// <div class="letter gdt" data-sound="F#" data-char="T"><div class="multi-sharps">F#</div>T</div>
// <div class="letter gdt" data-sound="G#" data-char="Y"><div class="multi-sharps">G#</div>Y</div>
// <div class="letter gdt" data-sound="A#" data-char="U"><div class="multi-sharps">A#</div>U</div>
// <div class="letter gdt" data-char="I">I</div>
// <div class="letter gdt" data-char="O">O</div>
// <div class="letter gdt" data-char="P">P</div>
// <div data-key="219" osc-down="true" class="double gdt"><div class="multi">&#8818;</div><div>{</div><div>[</div></div>
// <div data-key="221" osc-up="true" class="double gdt"><div class="multi">&#8819;</div><div>}</div><div>]</div></div>
// <div data-key="220" class="double gdt"><div>|</div><div>\</div></div>
// </div>
