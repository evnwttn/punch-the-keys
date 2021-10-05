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

// ------------------------------------------------------ //

const container = document.getElementById("container");

class Keyboard {
  constructor(keyboardName, rows) {
    this.parentDiv = document.createElement("div");
    this.parentDiv.classList.add("keys");
    this.parentDiv.setAttribute("tabindex", 0);

    this.hudDiv = document.createElement("div");
    this.hudDiv.classList.add("hud");

    this.hud = document.createElement("div");
    this.hud.classList.add("ui");

    this.uiVol = document.createElement("div");
    this.uiVol.classList.add("ui-vol");
    this.uiVol.innerHTML = "[0db]";

    this.uiOsc = document.createElement("div");
    this.uiOsc.classList.add("ui-osc");
    this.uiOsc.innerHTML = "[SAWTOOTH]";

    this.uiOct = document.createElement("div");
    this.uiOct.classList.add("ui-oct");
    this.uiOct.innerHTML = "[O4]";

    this.hud.appendChild(this.uiVol);
    this.hud.appendChild(this.uiOsc);
    this.hud.appendChild(this.uiOct);

    this.hudDiv.appendChild(this.hud);
    this.parentDiv.appendChild(this.hudDiv);

    rows.forEach((row, index) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("key-row");
      rowDiv.classList.add(`row-${index + 1}`);

      row.forEach((key) => {
        const keyDiv = document.createElement("div");
        keyDiv.setAttribute("data-key", key.keyCode);
        keyDiv.setAttribute("data-classes", key.classes);
        keyDiv.setAttribute("data-value", key.value);

        const optionalAttributes = [
          "sound",
          "multi",
          "multiClasses",
          "octave",
          "octaveUp",
          "octaveDown",
          "oscUp",
          "oscDown",
          "volUp",
          "volDown",
          "right",
          "demo",
        ];

        // multiClasses -> multi-classes

        optionalAttributes.forEach((optionalAttribute) => {
          if (key[optionalAttribute]) {
            const attributeName = optionalAttribute
              .match(/\w?[^A-Z]*/g)
              .slice(0,-1)
              .map((s) => s.toLowerCase())
              .join('-');

            keyDiv.setAttribute(`data-${attributeName}`, key.sound);
          }
        });

        key.classes.split(" ").forEach((klass) => {
          keyDiv.classList.add(klass);
        });

        keyDiv.setAttribute("data-key", key.keyCode);

        const keySpan = document.createElement("span");

        if (key.multiClasses !== undefined) {
          const multiDiv = document.createElement("div");
          const multiText = key.sound || key.octave || key.multi;
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

        keyDiv.appendChild(keySpan);
        rowDiv.appendChild(keyDiv);
      });

      this.parentDiv.appendChild(rowDiv);
    });

    this.parentDiv.setAttribute("id", `keyboard-${this.keyboardName}`);

    /////////////////////////////////////
    // RUN THROUGH THIS WITH JACK

    const getKey = (e) => {
      let location = e.location;
      let selector;
      if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
        selector = [
          '[data-right="true"]',
          '[data-key="' + e.keyCode + '"]',
        ].join("");
      } else {
        let code = e.keyCode || e.which;
        selector = [
          '[data-key="' + code + '"]',
          '[data-char*="' +
            encodeURIComponent(String.fromCharCode(code)) +
            '"]',
        ].join(",");
      }
      return this.parentDiv.querySelector(selector);
    }

    // function onKeyPress() {
    //   this.parentDiv.setAttribute("tabindex", 0);
    //   this.parentContainer.appendChild(this.parentDiv);
    // }

    this.parentDiv.addEventListener("keydown", (e) => {
      e.preventDefault();
      let key = getKey(e);
      if (!key) {
        return console.warn("No key for", e);
      }
      key.setAttribute("data-pressed", "on");
      this.handleKey(key);
    });

    this.parentDiv.addEventListener("keyup", (e) => {
      e.preventDefault();
      let key = getKey(e);
      key && key.removeAttribute("data-pressed");
    });

    //////////////////////////////////////////

    this.parentDiv.addEventListener("click", (e) => {
      let key = e.target;
      if (key.hasAttribute("data-key") === true) {
        this.handleKey(key);
        // toggleDemo(key);
      }
    });

    this.octave = 4;
    this.volume = 0;
    this.oscNum = 0;
    this.oscType = ["sawtooth", "triangle", "square", "sine"];
    this.synth = this.makeSynth(this.oscType[this.oscNum]);
  }

  handleKey(key) {
    this.setSynth(key);
    this.setOctave(key);
    this.setVolume(key);
    this.handleSound(key)
  }

  makeSynth(synthType) {
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: synthType,
      },
      volume: this.volume,
    }).toDestination();
  }

  setSynth(keyElm) {
    if (keyElm.hasAttribute("data-osc-up")) {
      if (this.oscNum <= this.oscType.length - 2) {
        this.oscNum++;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
      }
    } else if (keyElm.hasAttribute("data-osc-down")) {
      if (this.oscNum >= 1) {
        this.oscNum--;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
      }
    }
    this.uiOsc.innerHTML = `[${this.oscType[this.oscNum]}]`;
  }

  setVolume(keyElm) {
    if (keyElm.hasAttribute("data-vol-up")) {
      if (this.volume <= 29) {
        this.volume++;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
      }
    } else if (keyElm.hasAttribute("data-vol-down")) {
      if (this.volume >= -29) {
        this.volume--;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
      }
    }
    this.uiVol.innerHTML = `[${this.volume}db]`;
  }

  setOctave(keyElm) {
    if (keyElm.hasAttribute("data-octave-up")) {
      if (this.octave <= 8) {
        this.octave++;
      }
    } else if (keyElm.hasAttribute("data-octave-down")) {
      if (this.octave >= 1) {
        this.octave--;
      }
    } else if (keyElm.hasAttribute("data-octave")) {
      this.octave = keyElm.getAttribute("data-octave");
    }
    this.uiOct.innerHTML = `[0${this.octave}]`;
  }

  handleSound(keyElm) {
    if (keyElm.hasAttribute("data-sound")) {
      let note = keyElm.getAttribute("data-sound");
      this.synth.triggerAttackRelease(`${note}${this.octave}`, "4n");
    }
  }

  getElement() {
    return this.parentDiv;
  }
}

// --------------------------------------------- //

let keyboardNum = 0;
container.prepend(new Keyboard(keyboardNum, defaultRows).getElement());

document.getElementById("add-keyboard").onclick = (event) => {
  keyboardNum++;
  container.prepend(new Keyboard(keyboardNum, defaultRows).getElement());
};
