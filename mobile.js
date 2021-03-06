let desktopMode = document.getElementById("desktop");
desktopMode.onclick = function () {
  document
    .querySelector("meta[name=viewport]")
    .setAttribute(
      "content",
      "width=768, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    );
};

const defaultRows = [
  [
    /* ROW 1 */
    { classes: "row-1", value: "1", sound: "C", t9: "C" },
    { classes: "row-1", value: "2", sound: "D", t9: "D" },
    { classes: "row-1", value: "3", sound: "E", t9: "E" },
  ],
  [
    /* ROW 2 */
    { classes: "row-2", value: "4", sound: "F", t9: "F" },
    { classes: "row-2", value: "5", sound: "G", t9: "G" },
    { classes: "row-2", value: "6", sound: "A", t9: "A" },
  ],
  [
    /* ROW 3 */
    { classes: "row-3", value: "7", sound: "B", t9: "B" },
    { classes: "row-3", value: "8", t9: "&#8818;", oscUp: true },
    { classes: "row-3", value: "9", t9: "&#8819;", oscDown: true },
  ],
  [
    /* ROW 4 */
    { classes: "row-4", value: "*", t9: "&#9651;", volUp: true },
    { classes: "row-4", value: "0", t9: "&#9661;", volDown: true },
    { classes: "row-4", value: "#", t9: "&#10686;", octave: true },
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
    this.uiOct.innerHTML = "[04]";

    this.hud.appendChild(this.uiVol);
    this.hud.appendChild(this.uiOsc);
    this.hud.appendChild(this.uiOct);

    this.hudDiv.appendChild(this.hud);
    this.parentDiv.appendChild(this.hudDiv);

    rows.forEach((row, index) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("key-row");

      row.forEach((key) => {
        const keyDiv = document.createElement("div");
        keyDiv.setAttribute("data-classes", key.classes);
        keyDiv.setAttribute("data-value", key.value);
        keyDiv.setAttribute("data-t9", key.t9);

        const optionalAttributes = [
          "sound",
          "octave",
          "oscUp",
          "oscDown",
          "volUp",
          "volDown",
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

        if (key.t9 !== undefined) {
          const t9Div = document.createElement("div");
          t9Div.classList.add("t9-div");
          const t9Text = key.t9;
          keyDiv.appendChild(t9Div);

          t9Div.innerHTML = `${t9Text}`;
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
    if (keyElm.hasAttribute("data-octave")) {
      if (this.octave <= 8) {
        this.octave++;
      } else if (this.octave === 9) {
        this.octave = 0;
      }
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
