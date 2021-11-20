console.log("hello world");

const defaultRows = [
  [
    /* ROW 1 */
    { classes: "row-1", value: "1", sound: "A", t9: "" },
    { classes: "row-1", value: "2", sound: "B", t9: "ABC" },
    { classes: "row-1", value: "3", sound: "C", t9: "DEF" },
  ],
  [
    /* ROW 2 */
    { classes: "row-2", value: "4", sound: "D", t9: "GHI" },
    { classes: "row-2", value: "5", sound: "E", t9: "JKL" },
    { classes: "row-2", value: "6", sound: "F", t9: "MNO" },
  ],
  [
    /* ROW 3 */
    { classes: "row-3", value: "7", sound: "G", t9: "PQRS" },
    { classes: "row-3", value: "8", t9: "TUV" },
    { classes: "row-3", value: "9", t9: "WXYZ" },
  ],
  [
    /* ROW 4 */
    { classes: "row-4", value: "*" },
    { classes: "row-4", value: "8" },
    { classes: "row-4", value: "#" },
  ],
];

const mobile = document.getElementById("mobile");

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
        ];

        optionalAttributes.forEach((optionalAttribute) => {
          if (key[optionalAttribute]) {
            const attributeName = optionalAttribute
              .match(/\w?[^A-Z]*/g)
              .slice(0, -1)
              .map((s) => s.toLowerCase())
              .join("-");
            keyDiv.setAttribute(
              `data-${attributeName}`,
              key.sound || key.octave || key.right
            );
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
    };

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

    this.parentDiv.addEventListener("click", (e) => {
      let key = e.target;
      if (key.hasAttribute("data-key") === true) {
        this.handleKey(key);
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
    this.handleSound(key);
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

let keyboardNum = 0;
mobile.prepend(new Keyboard(keyboardNum, defaultRows).getElement());
