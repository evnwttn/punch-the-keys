// TITLE

anime
  .timeline({ loop: false })
  .add({
    targets: "#ptfk .word",
    scale: [7, 1],
    opacity: [0, 1],
    easing: "easeOutCirc",
    duration: 1000,
    delay: (el, i) => 800 * i,
  })
  .add({
    targets: "#ptfk",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

// UI

/**
 * TODO: ensure the localStorage is unique per-instance
 */
class Readme {
  constructor() {
    this.isOpen = window.localStorage.getItem("read-me") === "on";

    this.parentDiv = document.createElement("div");
    this.parentDiv.className = "read-me";

    this.iconDiv = document.createElement("div");
    this.iconDiv.className = "read-me-icon";
    this.iconDiv.innerHTML = "&#9786";
    this.iconDiv.addEventListener("click", () => {
      this.onClick();
    });

    this.textDiv = document.createElement("div");
    this.textDiv.className = "read-me-text";
    this.textDiv.innerHTML = `1 - 0 &#8702; octaves
<br />&#10688; & &#10689; &#8702; toggle octave
<br />W - U &#8702; black keys
<br />&#8818; & &#8819; &#8702; toggle oscillator
<br />A - K &#8702; white keys
<br />&#9651; & &#9661; &#8702; toggle volume`;

    this.parentDiv.appendChild(this.iconDiv);
    this.parentDiv.appendChild(this.textDiv);

    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  getElement() {
    return this.parentDiv;
  }

  open() {
    this.isOpen = true;
    this.textDiv.classList.remove("on");
    window.localStorage.setItem("read-me", "on");
  }

  close() {
    this.isOpen = false;
    this.textDiv.classList.add("on");
    window.localStorage.setItem("read-me", "off");
  }

  onClick() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

document.body.prepend(new Readme().getElement());

// CURSOR

// new emojiCursor();

/* THE GREAT SCHISM */

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
      classes: "double gdt",
      value: ["!", "1"],
      multi: "0",
      octave: "0",
      multiClasses: ["multi"],
    },
    {
      keyCode: 50,
      octave: "1",
      classes: "double gdt",
      value: ["@", "2"],
      multi: "1",
      multiClasses: ["multi"],
    },
    {
      keyCode: 51,
      octave: "2",
      classes: "double gdt",
      value: ["#", "3"],
      multi: "2",
      multiClasses: ["multi"],
    },
    {
      keyCode: 52,
      octave: "3",
      classes: "double gdt",
      value: ["$", "4"],
      multi: "3",
      multiClasses: ["multi"],
    },
    {
      keyCode: 53,
      octave: "4",
      classes: "double gdt",
      value: ["%", "5"],
      multi: "4",
      multiClasses: ["multi"],
    },
    {
      keyCode: 54,
      octave: "5",
      classes: "double gdt",
      value: ["^", "6"],
      multi: "5",
      multiClasses: ["multi"],
    },
    {
      keyCode: 55,
      octave: "6",
      classes: "double gdt",
      value: ["&", "7"],
      multi: "6",
      multiClasses: ["multi"],
    },
    {
      keyCode: 56,
      octave: "7",
      classes: "double gdt",
      value: ["*", "8"],
      multi: "7",
      multiClasses: ["multi"],
    },
    {
      keyCode: 57,
      octave: "8",
      classes: "double gdt",
      value: ["(", "9"],
      multi: "8",
      multiClasses: ["multi"],
    },
    {
      keyCode: 48,
      octave: "9",
      classes: "double gdt",
      value: [")", "0"],
      multi: "9",
      multiClasses: ["multi"],
    },
    {
      keyCode: 189,
      octaveDown: true,
      classes: "double gdt",
      value: ["_", "-"],
      multi: "&#10688;",
      multiClasses: ["multi"],
    },
    {
      keyCode: 187,
      octaveUp: true,
      classes: "double gdt",
      value: ["+", "="],
      multi: "&#10689;",
      multiClasses: ["multi"],
    },
    {
      keyCode: 8,
      classes: "word backspace-tab align-backspace gdt",
      value: "&#8592;",
    },
  ],
  [
    /* ROW 3 */
    { keyCode: 9, classes: "word backspace-tab align-tab gdt", value: "TAB" },
    { keyCode: 81, classes: "letter gdt", value: "Q" },
    {
      keyCode: 87,
      sound: "C#",
      classes: "letter gdt",
      value: "W",
      multi: "C#",
      multiClasses: ["multi-sharps"],
    },
    {
      keyCode: 69,
      sound: "D#",
      classes: "letter gdt",
      value: "E",
      multi: "D#",
      multiClasses: ["multi-sharps"],
    },
    { keyCode: 82, classes: "letter gdt", value: "R" },
    {
      keyCode: 84,
      sound: "F#",
      classes: "letter gdt",
      value: "T",
      multi: "F#",
      multiClasses: ["multi-sharps"],
    },
    {
      keyCode: 89,
      sound: "G#",
      classes: "letter gdt",
      value: "Y",
      multi: "G#",
      multiClasses: ["multi-sharps"],
    },
    {
      keyCode: 85,
      sound: "A#",
      classes: "letter gdt",
      value: "U",
      multi: "A#",
      multiClasses: ["multi-sharps"],
    },
    { keyCode: 73, classes: "letter gdt", value: "I" },
    { keyCode: 79, classes: "letter gdt", value: "O" },
    { keyCode: 80, classes: "letter gdt", value: "P" },
    {
      keyCode: 219,
      oscDown: true,
      classes: "double gdt",
      value: ["{", "["],
      multi: "&#8818;",
      multiClasses: ["multi-sharps"],
    },
    {
      keyCode: 221,
      oscUp: true,
      classes: "double gdt",
      value: ["}", "]"],
      multi: "&#8819;",
      multiClasses: ["multi-sharps"],
    },
    { keyCode: 220, classes: "double gdt", value: ["|", "&#92;"] },
  ],
  [
    /* ROW 4 */
    {
      keyCode: 20,
      classes: "word caps-enter align-caps gdt",
      value: "CAPSLCK",
    },
    {
      keyCode: 65,
      sound: "C",
      classes: "letter gdt",
      value: "A",
      multi: "C",
      multiClasses: ["multi"],
    },
    {
      keyCode: 83,
      sound: "D",
      classes: "letter gdt",
      value: "S",
      multi: "D",
      multiClasses: ["multi"],
    },
    {
      keyCode: 68,
      sound: "E",
      classes: "letter gdt",
      value: "D",
      multi: "E",
      multiClasses: ["multi"],
    },
    {
      keyCode: 70,
      sound: "F",
      classes: "letter gdt",
      value: "F",
      multi: "F",
      multiClasses: ["multi"],
    },
    {
      keyCode: 71,
      sound: "G",
      classes: "letter gdt",
      value: "G",
      multi: "G",
      multiClasses: ["multi"],
    },
    {
      keyCode: 72,
      sound: "A",
      classes: "letter gdt",
      value: "H",
      multi: "A",
      multiClasses: ["multi"],
    },
    {
      keyCode: 74,
      sound: "B",
      classes: "letter gdt",
      value: "J",
      multi: "B",
      multiClasses: ["multi"],
    },
    {
      keyCode: 75,
      sound: "C",
      classes: "letter gdt",
      value: "K",
      multi: "C",
      multiClasses: ["multi"],
    },
    { keyCode: 76, classes: "letter gdt", value: "L" },
    {
      keyCode: 186,
      volDown: true,
      classes: "double gdt",
      value: [":", ";"],
      multi: "&#9661;",
      multiClasses: ["multi"],
    },
    {
      keyCode: 222,
      volUp: true,
      classes: "double gdt",
      value: ["&#34;", "&#39;"],
      multi: "&#9651;",
      multiClasses: ["multi"],
    },
    { keyCode: 13, classes: "word caps-enter align-enter gdt", value: "ENTER" },
  ],
  [
    /* ROW 5 */
    { keyCode: 16, classes: "word shift align-shiftl gdt", value: "SHIFT" },
    { keyCode: 90, classes: "letter gdt", value: "Z" },
    {
      keyCode: 88,
      classes: "letter gdt",
      value: "X",
      demo: true,
      multi: "&#8776;",
      multiClasses: ["multi"],
    },
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
    { keyCode: 17, classes: "word bottom-ctrl gdt", value: "CTRL" },
    { keyCode: 255, classes: "word bottom gdt", value: "FN" },
    { keyCode: 91, classes: "word bottom gdt", value: "&#9734;" },
    { keyCode: 18, classes: "word bottom gdt", value: "ALT" },
    { keyCode: 32, classes: "word space gdt", value: "" },
    { keyCode: 18, right: true, classes: "word bottom gdt", value: "ALT" },
    {
      keyCode: 17,
      right: true,
      classes: "word bottom-ctrl gdt",
      value: "CTRL",
    },
    { keyCode: 37, classes: "arrow gdt", value: "&#9664;" },
    { keyCode: 38, classes: "stack gdt", value: ["&#9650;", "&#9660;"] },
    { keyCode: 39, classes: "arrow gdt", value: "&#9654;" },
  ],
];

// ------- //

const container = document.getElementById("container");

class Keyboard {
  constructor(keyboardName, rows) {
    this.parentDiv = document.createElement("div");
    this.parentDiv.classList.add("keys");

    this.octave = 4;

    // ...

    // ensure onKeyPress is hit when keys are hit
    // maybe likt this
    /*
    parentDiv.addEventListener("keydown", (e) => {
      e.preventDefault();
      const key = getKey(e);
      if (!key) {
        return console.warn("No key for", e.keyCode);
      }
      this.onKeyPress(key);
    });
    */
  }

  setOctave(newOctave) {
    this.octave = newOctave;

    // run other code here, things like
    // update the UI
    // maybe make a new synth if you need to for changing the pitch
  }

  getElement() {
    return this.parentDiv;
  }

  onKeyPress(key) {
    // ...
  }
}

function addKeyboard(keyboardName, parentContainer, rows) {
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("keys");

  // UI

  const hudDiv = document.createElement("div");
  hudDiv.classList.add("hud");

  const hud = document.createElement("div");
  hud.classList.add("ui");

  const uiVol = document.createElement("div");
  uiVol.classList.add("ui-vol");
  uiVol.innerHTML = "[0db]";

  const uiOsc = document.createElement("div");
  uiOsc.classList.add("ui-osc");
  uiOsc.innerHTML = "[SAWTOOTH]";

  const uiOct = document.createElement("div");
  uiOct.classList.add("ui-oct");
  uiOct.innerHTML = "[O4]";

  hud.appendChild(uiVol);
  hud.appendChild(uiOsc);
  hud.appendChild(uiOct);
  hudDiv.appendChild(hud);
  parentDiv.appendChild(hudDiv);

  // ROWS

  rows.forEach((row, index) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("key-row");
    rowDiv.classList.add(`row-${index + 1}`);

    row.forEach((key, index) => {
      const keyDiv = document.createElement("div");

      keyDiv.setAttribute("data-key", key.keyCode);
      keyDiv.setAttribute("data-classes", key.classes);
      if (key.sound) {
        keyDiv.setAttribute("data-sound", key.sound);
      }
      keyDiv.setAttribute("data-value", key.value);
      if (key.multi) {
        keyDiv.setAttribute("data-multi", key.multi);
      }
      if (key.multiClasses) {
        keyDiv.setAttribute("data-multi-classes", key.multiClasses);
      }
      if (key.octave) {
        keyDiv.setAttribute("data-octave", key.octave);
      }
      if (key.octaveUp) {
        keyDiv.setAttribute("data-octave-up", key.octaveUp);
      }
      if (key.octaveDown) {
        keyDiv.setAttribute("data-octave-down", key.octaveDown);
      }
      if (key.oscUp) {
        keyDiv.setAttribute("data-osc-up", key.oscUp);
      }
      if (key.oscDown) {
        keyDiv.setAttribute("data-osc-down", key.oscDown);
      }
      if (key.volUp) {
        keyDiv.setAttribute("data-vol-up", key.volUp);
      }
      if (key.volDown) {
        keyDiv.setAttribute("data-vol-down", key.volDown);
      }
      if (key.right) {
        keyDiv.setAttribute("data-right", key.right);
      }
      if (key.demo) {
        keyDiv.setAttribute("data-demo", key.demo);
      }

      key.classes.split(" ").forEach((klass) => {
        keyDiv.classList.add(klass);
      });

      keyDiv.setAttribute("data-key", key.keyCode);

      const keySpan = document.createElement("span");

      if (key.multiClasses !== undefined) {
        const multiDiv = document.createElement("div");
        multiText = key.sound || key.octave || key.multi;
        keyDiv.appendChild(multiDiv);
        key.multiClasses.forEach((klass) => {
          multiDiv.classList.add(klass);
        });
        multiDiv.innerHTML = `${multiText}`;
      }

      if (typeof key.value === "string") {
        keySpan.innerHTML = key.value;
      } else if (Array.isArray(key.value)) {
        key.value.forEach((value) => {
          const valueDiv = document.createElement("div");
          valueDiv.innerHTML = value;
          keySpan.appendChild(valueDiv);
        });
      } else {
        throw new Error(`unknown key.value!: ${key.value}`);
      }

      keyDiv.appendChild(keySpan); // span under key
      rowDiv.appendChild(keyDiv); // key under row
    });

    parentDiv.appendChild(rowDiv); // row under parent
  });

  parentDiv.setAttribute("id", `keyboard-${keyboardName}`);

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
    return parentDiv.querySelector(selector);
  }

  parentDiv.addEventListener("keydown", (e) => {
    e.preventDefault();
    let key = getKey(e);
    if (!key) {
      return console.warn("No key for", e.keyCode);
    }
    key.setAttribute("data-pressed", "on");
    toggleSynth(key);
    toggleOctave(key);
    toggleVolume(key);
    handleKeys(key);
    toggleDemo(key);
  });

  parentDiv.addEventListener("keyup", (e) => {
    e.preventDefault();
    let key = getKey(e);
    key && key.removeAttribute("data-pressed");
  });

  parentDiv.addEventListener("click", (e) => {
    let key = e.target;
    if (key.hasAttribute("data-key") === true) {
      toggleSynth(key);
      toggleOctave(key);
      toggleVolume(key);
      handleKeys(key);
      toggleDemo(key);
    }
  });

  // TOGGLE OSCILLATOR / SYNTH

  let oscType = ["sawtooth", "triangle", "square", "sine"];
  let oscNum = 0;
  let volLevel = 0;
  let synth = makeSynth(oscType[oscNum]);

  function makeSynth(oscillatorType) {
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: oscillatorType,
      },
      volume: volLevel,
    }).toDestination();
  }

  function toggleSynth(elm) {
    if (elm.getAttribute("data-osc-up") === "true") {
      if (oscNum <= oscType.length - 2) {
        oscNum++;
        synth = makeSynth(oscType[oscNum]);
        console.log({ parentDiv, synth, oscNum });
      }
    } else if (elm.getAttribute("data-osc-down") === "true") {
      if (oscNum >= 1) {
        oscNum--;
        synth = makeSynth(oscType[oscNum]);
      }
    }
    uiOsc.innerHTML = `[${oscType[oscNum]}]`;
  }

  // VOLUME

  function toggleVolume(elm) {
    if (elm.getAttribute("data-vol-up") === "true") {
      if (volLevel <= 29) {
        volLevel++;
        synth = makeSynth(oscType[oscNum]);
      }
    } else if (elm.getAttribute("data-vol-down") === "true") {
      if (volLevel >= -29) {
        volLevel--;
        synth = makeSynth(oscType[oscNum]);
      }
    }
    uiVol.innerHTML = `[${volLevel}db]`;
  }

  // OCTAVE SELECTION

  let octave = 4;

  function toggleOctave(elm) {
    if (elm.getAttribute("data-octave-up") === "true") {
      if (octave <= 8) {
        octave++;
      }
    } else if (elm.getAttribute("data-octave-down") === "true") {
      if (octave >= 1) {
        octave--;
      }
    } else if (elm.getAttribute("data-octave") !== null) {
      octave = elm.getAttribute("data-octave");
    }
    uiOct.innerHTML = `[0${octave}]`;
  }

  // KEY FUNCTION

  function handleKeys(elm) {
    if (elm.getAttribute("data-sound") !== null) {
      let note = elm.getAttribute("data-sound");
      synth.triggerAttackRelease(`${note}${octave}`, "4n");
    }
  }

  // DEMO

  function toggleDemo(elm) {
    if (elm.getAttribute("data-demo") === "true") {
      playDemo();
    }
  }

  function playDemo() {
    let requestURL =
      "https://raw.githubusercontent.com/evnwttn/punch-the-keys/pure-js/audio/westworld.json";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    request.onload = function () {
      let demo = request.response;
      let channel1 = demo.tracks[0].notes;
      let channel2 = demo.tracks[1].notes;
      Tone.Transport.bpm.value = demo.header.tempos[0].bpm;
      let synth = makeSynth(oscType[oscNum]);
      const part = new Tone.Part(
        function (time, value) {
          synth.triggerAttackRelease(
            value.name,
            value.duration,
            time,
            value.velocity
          );
        },
        channel1,
        channel2
      ).start();
      Tone.Transport.start();
    };
  }

  // KEYBOARD

  parentDiv.setAttribute("tabindex", 0);
  parentContainer.appendChild(parentDiv);
}

let keyboardNum = 0;
document.getElementById("add-keyboard").onclick = (event) => {
  keyboardNum++;
  addKeyboard(keyboardNum, container, defaultRows);
};
