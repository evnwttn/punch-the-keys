// TITLE

anime
  .timeline({ loop: false })
  .add({
    targets: "#ptfk .word",
    scale: [14, 1],
    opacity: [0, 1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i,
  })
  .add({
    targets: "#ptfk",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

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
    /* ROW 1 */
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
    /* ROW 2 */
    { keyCode: 192, classes: "double gdt", value: ["~", "`"] },
    {
      keyCode: 49,
      octave: "0",
      classes: "double gdt multi",
      value: ["!", "1"],
      multi: "0",
    },
    {
      keyCode: 50,
      octave: "1",
      classes: "double gdt multi",
      value: ["@", "2"],
      multi: "1",
    },
    {
      keyCode: 51,
      octave: "2",
      classes: "double gdt multi",
      value: ["#", "3"],
      multi: "2",
    },
    {
      keyCode: 52,
      octave: "3",
      classes: "double gdt multi",
      value: ["$", "4"],
      multi: "3",
    },
    {
      keyCode: 53,
      octave: "4",
      classes: "double gdt multi",
      value: ["%", "5"],
      multi: "4",
    },
    {
      keyCode: 54,
      octave: "5",
      classes: "double gdt multi",
      value: ["^", "6"],
      multi: "5",
    },
    {
      keyCode: 55,
      octave: "6",
      classes: "double gdt multi",
      value: ["&", "7"],
      multi: "6",
    },
    {
      keyCode: 56,
      octave: "7",
      classes: "double gdt multi",
      value: ["*", "8"],
      multi: "7",
    },
    {
      keyCode: 57,
      octave: "8",
      classes: "double gdt multi",
      value: ["(", "9"],
      multi: "8",
    },
    {
      keyCode: 48,
      octave: "9",
      classes: "double gdt multi",
      value: [")", "0"],
      multi: "9",
    },
    {
      keyCode: 189,
      octaveDown: true,
      classes: "double gdt multi",
      value: ["_", "-"],
      multi: "&#10688;",
    },
    {
      keyCode: 187,
      octaveUp: true,
      classes: "double gdt multi",
      value: ["+", "="],
      multi: "&#10689;",
    },
    {
      keyCode: 8,
      classes: "word backspacetab align-backspace gdt",
      value: "&#8592;",
    },
  ],
  [
    /* ROW 3 */
    { keyCode: 9, classes: "word backspacetab align-tab gdt", value: "TAB" },
    { keyCode: 81, classes: "letter gdt", value: "Q" },
    {
      keyCode: 87,
      sound: "C#",
      classes: "letter gdt multi-sharps",
      value: "W",
      multi: "C#",
    },
    {
      keyCode: 69,
      sound: "D#",
      classes: "letter gdt multi-sharps",
      value: "E",
      multi: "D#",
    },
    { keyCode: 82, classes: "letter gdt", value: "R" },
    {
      keyCode: 84,
      sound: "F#",
      classes: "letter gdt multi-sharps",
      value: "T",
      multi: "F#",
    },
    {
      keyCode: 89,
      sound: "G#",
      classes: "letter gdt multi-sharps",
      value: "Y",
      multi: "G#",
    },
    {
      keyCode: 85,
      sound: "A#",
      classes: "letter gdt multi-sharps",
      value: "U",
      multi: "A#",
    },
    { keyCode: 73, classes: "letter gdt", value: "I" },
    { keyCode: 79, classes: "letter gdt", value: "O" },
    { keyCode: 80, classes: "letter gdt", value: "P" },
    {
      keyCode: 219,
      oscDown: true,
      classes: "double gdt multi",
      value: ["{", "["],
      multi: "&#8818;",
    },
    {
      keyCode: 221,
      oscUp: true,
      classes: "double gdt multi",
      value: ["}", "]"],
      multi: "&#8819;",
    },
    { keyCode: 220, classes: "double gdt", value: ["|", "&#92;"] },
  ],
  [
    /* ROW 4 */
    { keyCode: 20, classes: "word capsenter align-caps gdt", value: "CAPSLCK" },
    { keyCode: 65, sound: "C", classes: "letter gdt", value: "A", multi: "C" },
    { keyCode: 83, sound: "D", classes: "letter gdt", value: "S", multi: "D" },
    { keyCode: 68, sound: "E", classes: "letter gdt", value: "D", multi: "E" },
    { keyCode: 70, sound: "F", classes: "letter gdt", value: "F", multi: "F" },
    { keyCode: 71, sound: "G", classes: "letter gdt", value: "G", multi: "G" },
    { keyCode: 72, sound: "A", classes: "letter gdt", value: "H", multi: "A" },
    { keyCode: 74, sound: "B", classes: "letter gdt", value: "J", multi: "B" },
    { keyCode: 75, sound: "C", classes: "letter gdt", value: "K", multi: "C" },
    { keyCode: 76, classes: "letter gdt", value: "L" },
    {
      keyCode: 186,
      volDown: true,
      classes: "double gdt",
      value: [":", ";"],
      multi: "&#9661;",
    },
    {
      keyCode: 222,
      volUp: true,
      classes: "double gdt",
      value: ["&#34;", "&#39;"],
      multi: "&#9651;",
    },
    { keyCode: 13, classes: "word capsenter align-enter gdt", value: "ENTER" },
  ],
  [
    /* ROW 5 */
    { keyCode: 16, classes: "word shift align-shiftl gdt", value: "SHIFT" },
    { keyCode: 90, classes: "letter gdt", value: "Z" },
    { keyCode: 88, classes: "letter gdt", value: "X" },
    { keyCode: 67, classes: "letter gdt", value: "C" },
    { keyCode: 86, classes: "letter gdt", value: "V" },
    { keyCode: 66, classes: "letter gdt", value: "B" },
    { keyCode: 78, classes: "letter gdt", value: "N" },
    { keyCode: 77, classes: "letter gdt", value: "M" },
    { keyCode: 188, classes: "double gdt", value: ["<", ","] },
    { keyCode: 190, classes: "double gdt", value: [">", "."] },
    { keyCode: 191, classes: "double gdt", value: ["?", "/"] },
    {
      keyCode: 16,
      right: true,
      classes: "word shift align-shiftr gdt",
      value: "SHIFT",
    },
  ],
  [
    /* ROW 6 */
    { keyCode: 17, classes: "word bottomctrl gdt", value: "CTRL" },
    { keyCode: 255, classes: "word bottom gdt", value: "FN" },
    { keyCode: 91, classes: "word bottom gdt", value: "☆" },
    { keyCode: 18, classes: "word bottom gdt", value: "ALT" },
    { keyCode: 32, classes: "word space gdt", value: "" },
    { keyCode: 18, right: true, classes: "word bottom gdt", value: "ALT" },
    { keyCode: 17, right: true, classes: "word bottomctrl gdt", value: "CTRL" },
    { keyCode: 37, classes: "arrow gdt", value: "&#9664;" },
    { keyCode: 38, classes: "stack gdt", value: ["&#9650;", "&#9660;"] },
    { keyCode: 39, classes: "arrow gdt", value: ">&#9654;" },
  ],
];
