import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import * as Tone from "tone";

class PunchTheKeys extends LitElement {
  constructor() {
    super();

    this.currentNote = "none";
    this.octave = 4;
    this.octaves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.oscillator = ["sawtooth", "triangle", "square", "sine"];
    this.oscNum = 0;
    this.volume = 0;
    this.synthHud = "sawtooth";
    this.synth = this.makeSynth(this.oscillator[this.oscNum]);

    this.addEventListener("keydown", (event) => {
      this.onKeyPress(event);
    });

    this.addEventListener("keyup", (event) => {
      this.onKeyUp(event);
    });

    this.rows = [
      /* ROW 1 */
      [
        { keyCode: 27, classes: "word-top align-esc", value: "ESC" },
        { keyCode: 112, classes: "func", value: "F1" },
        { keyCode: 113, classes: "func", value: "F2" },
        { keyCode: 114, classes: "func", value: "F3" },
        { keyCode: 115, classes: "func", value: "F4" },
        { keyCode: 116, classes: "func", value: "F5" },
        { keyCode: 117, classes: "func", value: "F6" },
        { keyCode: 118, classes: "func", value: "F7" },
        { keyCode: 119, classes: "func", value: "F8" },
        { keyCode: 120, classes: "func", value: "F9" },
        { keyCode: 121, classes: "func", value: "F10" },
        { keyCode: 122, classes: "func", value: "F11" },
        { keyCode: 123, classes: "func", value: "F12" },
        { keyCode: 45, classes: "word-top", value: "INSERT" },
        { keyCode: 44, classes: "word-top", value: "PRTSC" },
        { keyCode: 46, classes: "word-top", value: "DELETE" },
      ],
      [
        /* ROW 2 */
        { keyCode: 192, classes: "double", value: ["~", "`"] },
        {
          keyCode: 49,
          octave: "0",
          classes: "double",
          value: ["!", "1"],
          multi: "0",
          multiClasses: "multi",
        },
        {
          keyCode: 50,
          octave: "1",
          classes: "double",
          value: ["@", "2"],
          multi: "1",
          multiClasses: "multi",
        },
        {
          keyCode: 51,
          octave: "2",
          classes: "double",
          value: ["#", "3"],
          multi: "2",
          multiClasses: "multi",
        },
        {
          keyCode: 52,
          octave: "3",
          classes: "double",
          value: ["$", "4"],
          multi: "3",
          multiClasses: "multi",
        },
        {
          keyCode: 53,
          octave: "4",
          classes: "double",
          value: ["%", "5"],
          multi: "4",
          multiClasses: "multi",
        },
        {
          keyCode: 54,
          octave: "5",
          classes: "double",
          value: ["^", "6"],
          multi: "5",
          multiClasses: "multi",
        },
        {
          keyCode: 55,
          octave: "6",
          classes: "double",
          value: ["&", "7"],
          multi: "6",
          multiClasses: "multi",
        },
        {
          keyCode: 56,
          octave: "7",
          classes: "double",
          value: ["*", "8"],
          multi: "7",
          multiClasses: "multi",
        },
        {
          keyCode: 57,
          octave: "8",
          classes: "double",
          value: ["(", "9"],
          multi: "8",
          multiClasses: "multi",
        },
        {
          keyCode: 48,
          octave: "9",
          classes: "double",
          value: [")", "0"],
          multi: "9",
          multiClasses: "multi",
        },
        {
          keyCode: 189,
          octave: "down",
          classes: "double",
          value: ["_", "-"],
          multi: "⧀",
          multiClasses: "multi",
        },
        {
          keyCode: 187,
          octave: "up",
          classes: "double",
          value: ["+", "="],
          multi: "⧁",
          multiClasses: "multi",
        },
        {
          keyCode: 8,
          classes: "word backspace-tab align-backspace",
          value: "←",
        },
      ],
      [
        /* ROW 3 */
        {
          keyCode: 9,
          classes: "word backspace-tab align-tab",
          value: "TAB",
        },
        { keyCode: 81, classes: "letter", value: "Q" },
        {
          keyCode: 87,
          sound: "C#",
          classes: "letter",
          value: "W",
          multiClasses: "multi-sharps",
        },
        {
          keyCode: 69,
          sound: "D#",
          classes: "letter",
          value: "E",
          multiClasses: "multi-sharps",
        },
        { keyCode: 82, classes: "letter", value: "R" },
        {
          keyCode: 84,
          sound: "F#",
          classes: "letter",
          value: "T",
          multiClasses: "multi-sharps",
        },
        {
          keyCode: 89,
          sound: "G#",
          classes: "letter",
          value: "Y",
          multiClasses: "multi-sharps",
        },
        {
          keyCode: 85,
          sound: "A#",
          classes: "letter",
          value: "U",
          multiClasses: "multi-sharps",
        },
        { keyCode: 73, classes: "letter", value: "I" },
        { keyCode: 79, classes: "letter", value: "O" },
        { keyCode: 80, classes: "letter", value: "P" },
        {
          keyCode: 219,
          oscillator: "down",
          classes: "double",
          value: ["{", "["],
          multi: "≲",
          multiClasses: "multi-sharps",
        },
        {
          keyCode: 221,
          oscillator: "up",
          classes: "double",
          value: ["}", "]"],
          multi: "≳",
          multiClasses: "multi-sharps",
        },
        { keyCode: 220, classes: "double", value: ["|", "\\"] },
      ],
      [
        /* ROW 4 */
        {
          keyCode: 20,
          classes: "word caps-enter align-caps",
          value: "CAPSLCK",
        },
        {
          keyCode: 65,
          sound: "C",
          classes: "letter",
          value: "A",
          multiClasses: "multi",
        },
        {
          keyCode: 83,
          sound: "D",
          classes: "letter",
          value: "S",
          multiClasses: "multi",
        },
        {
          keyCode: 68,
          sound: "E",
          classes: "letter",
          value: "D",
          multiClasses: "multi",
        },
        {
          keyCode: 70,
          sound: "F",
          classes: "letter",
          value: "F",
          multiClasses: "multi",
        },
        {
          keyCode: 71,
          sound: "G",
          classes: "letter",
          value: "G",
          multiClasses: "multi",
        },
        {
          keyCode: 72,
          sound: "A",
          classes: "letter",
          value: "H",
          multiClasses: "multi",
        },
        {
          keyCode: 74,
          sound: "B",
          classes: "letter",
          value: "J",
          multiClasses: "multi",
        },
        {
          keyCode: 75,
          sound: "C",
          classes: "letter",
          value: "K",
          multiClasses: "multi",
        },
        { keyCode: 76, classes: "letter", value: "L" },
        {
          keyCode: 186,
          volume: "down",
          classes: "double",
          value: [":", ";"],
          multi: "▽",
          multiClasses: "multi",
        },
        {
          keyCode: 222,
          volume: "up",
          classes: "double",
          value: ['"', "'"],
          multi: "△",
          multiClasses: "multi",
        },
        {
          keyCode: 13,
          classes: "word caps-enter align-enter",
          value: "ENTER",
        },
      ],
      [
        /* ROW 5 */
        {
          keyCode: 16,

          classes: "word shift align-shiftl",
          value: "SHIFT",
        },
        { keyCode: 90, classes: "letter", value: "Z" },
        {
          keyCode: 88,
          classes: "letter",
          value: "X",
          multiClasses: "multi",
        },
        { keyCode: 67, classes: "letter", value: "C" },
        { keyCode: 86, classes: "letter", value: "V" },
        { keyCode: 66, classes: "letter", value: "B" },
        { keyCode: 78, classes: "letter", value: "N" },
        { keyCode: 77, classes: "letter", value: "M" },
        { keyCode: 188, classes: "double", value: ["<", ","] },
        { keyCode: 190, classes: "double", value: [">", "."] },
        { keyCode: 191, classes: "double", value: ["?", "/"] },
        {
          keyCode: 16,
          right: true,
          classes: "word shift align-shiftr",
          value: "SHIFT",
        },
      ],
      [
        /* ROW 6 */
        { keyCode: 17, classes: "word bottom-ctrl", value: "CTRL" },
        { keyCode: 255, classes: "word bottom", value: "FN" },
        { keyCode: 91, classes: "word bottom", value: "☆" },
        { keyCode: 18, classes: "word bottom", value: "ALT" },
        { keyCode: 32, classes: "word space", value: "" },
        {
          keyCode: 18,
          right: true,
          classes: "word bottom",
          value: "ALT",
        },
        {
          keyCode: 17,
          right: true,
          classes: "word bottom-ctrl",
          value: "CTRL",
        },
        { keyCode: 37, classes: "arrow", value: "◀" },
        {
          keyCode: 38,
          classes: "stack",
          value: ["▲", "▼"],
        },
        { keyCode: 39, classes: "arrow", value: "▶" },
      ],
    ];

    //////
  }

  render() {
    return html`
        <div class="ui">
          [${this.volume}DB] [${this.synthHud}] [O${this.octave}]
        </div>
        <div class="keys">
          ${this.rows.map(
            (row, index) => html`<div class="key-row row-${index}">
              ${row.map(
                (key) => html` <button
                  @click="${this.onClickButton}"
                  class="${key.classes}"
                  data-key="${ifDefined(key.keyCode)}"
                  data-sound="${ifDefined(key.sound)}"
                  data-value="${ifDefined(key.value)}"
                  data-volume="${ifDefined(key.volume)}"
                  data-octave="${ifDefined(key.octave)}"
                  data-oscillator="${ifDefined(key.oscillator)}"
                >
                  ${this.multiDisplay(key)} ${this.keyDisplay(key)}
                </button>`
              )}
            </div> `
          )}
        </div>

        <!-- stop  -->
      </div>
    `;
  }

  // FUNCTIONS

  keyDisplay(key) {
    if (typeof key.value === "string") {
      return key.value;
    } else if (Array.isArray(key.value)) {
      return key.value.map((v) => html`<div>${v}</div>`);
    }
  }

  multiDisplay(key) {
    const multi = key.sound || key.multi || key.octave;
    if (multi === undefined) {
      return;
    }
    return html` <div class="${key.multiClasses}">${multi}</div> `;
  }

  makeSynth(synthType) {
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: synthType,
      },
      volume: this.volume,
    }).toDestination();
  }

  onOscClick(oscillator) {
    if (oscillator === "down") {
      if (this.oscNum >= 1) {
        this.oscNum--;
        this.synth = this.makeSynth(this.oscillator[this.oscNum]);
        this.synthHud = this.oscillator[this.oscNum];
      }
    } else if (oscillator === "up") {
      if (this.oscNum <= this.oscillator.length - 2) {
        this.oscNum++;
        this.synth = this.makeSynth(this.oscillator[this.oscNum]);
        this.synthHud = this.oscillator[this.oscNum];
      }
    }
  }

  onOctaveClick(octave) {
    if (octave === "down") {
      if (this.octave >= 1) {
        this.octave--;
      }
    } else if (octave === "up") {
      if (this.octave <= 8) {
        this.octave++;
      }
    } else {
      this.octave = octave;
    }
  }

  onVolumeClick(volume) {
    if (volume === "up") {
      if (this.volume <= 29) {
        this.volume++;
      }
    } else if (volume === "down") {
      if (this.volume >= -29) {
        this.volume--;
      }
    }
  }

  onSoundClick(sound) {
    const note = `${sound}${this.octave}`;

    this.synth.triggerAttackRelease(note, "8n");
    this.currentNote = sound;
  }

  onKeyClick(keyElm) {
    const { sound, volume, octave, oscillator } = keyElm.dataset;

    if (sound) this.onSoundClick(sound);
    if (volume) this.onVolumeClick(volume);
    if (octave) this.onOctaveClick(octave);
    if (oscillator) this.onOscClick(oscillator);
  }

  onClickButton(event) {
    let key = event.target;
    key.classList.add("clicked");
    setInterval(function () {
      key.classList.remove("clicked");
    }, "0150");

    this.onKeyClick(event.target);
  }

  getKeyFromEvent(event) {
    const location = event.location;
    let selector;
    if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
      selector = [
        '[data-right="true"]',
        '[data-key="' + event.keyCode + '"]',
      ].join("");
    } else {
      let code = event.keyCode || event.which;
      selector = '[data-key="' + code + '"]';
    }

    return this.renderRoot.querySelector(selector);
  }

  onKeyPress(event) {
    const key = this.getKeyFromEvent(event);
    key.classList.add("clicked");
    this.onKeyClick(key);
  }

  onKeyUp(event) {
    const key = this.getKeyFromEvent(event);
    key.classList.remove("clicked");
  }
}
PunchTheKeys.properties = {
  currentNote: {},
  volume: {},
  synthHud: {},
  octave: {},
};
PunchTheKeys.styles = css`
  button {
    background-image: linear-gradient(transparent, #0d0d0d);
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    z-index: 2400;
    font-family: "Lato", sans-serif;
    font-size: 15px;
  }

  .keys {
    text-align: center;
    font-size: 15px;
    font-family: "Lato", sans-serif;
  }

  .ui {
    position: relative;
    left: 60em;
    text-align: center;
    text-transform: uppercase;
    color: #f7fcff;
    font-size: 15px;
    font-family: "Lato", sans-serif;
    border-radius: 0.3em;
    margin: 0.3em;
    padding: 0.2em;
    width: 12em;
    box-sizing: border-box;
    border: 1px solid #e0e0d9;
    box-shadow: 0 0.2em 0 0.05em #bff205;
    border-bottom-color: #555;
  }

  .key-row {
    display: inline-block;
    height: 3em;
    margin: 0.2em;
  }

  .clicked {
    color: #aaa;
    position: relative;
    top: 0.2em;
    box-shadow: 0 0 0 0.05em #0a0140;
  }

  .key-row > * {
    position: relative;
    text-align: center;
    color: #f7fcff;
    float: left;
    border-radius: 0.3em;
    margin: 0.3em;
    padding: 0.2em;
    width: 3.3em;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #e0e0d9;
    box-shadow: 0 0.2em 0 0.05em hsl(73, 96%, 48%);
    border-bottom-color: #555;
  }

  .row-0 {
    height: 1.7em;
    line-height: 1.4em;
  }

  .double {
    padding-top: 0.2em;
    width: 3.62em;
    padding-right: 2em;
    line-height: 0em;
  }

  .letter {
    line-height: 2em;
    width: 3.63em;
    padding-right: 2em;
  }

  .backspace-tab {
    width: 7em;
  }

  .caps-enter {
    width: 7.4em;
  }

  .shift {
    width: 9.55em;
  }

  .stack {
    padding-top: 0.2em;
    width: 4em;
  }

  .bottom-ctrl {
    width: 4em;
    padding-right: 1.1em;
    padding-top: 0.8em;
  }

  .bottom {
    width: 4.03em;
    padding-right: 1.8em;
  }

  .space {
    width: 20.5em;
  }

  .word {
    padding-top: 0.18em;
  }

  .align-tab {
    padding-right: 4.3em;
  }

  .align-caps {
    padding-right: 2.6em;
  }

  .align-shiftl {
    padding-right: 6em;
  }

  .align-backspace {
    padding-left: 4.1em;
  }

  .align-enter {
    padding-left: 3em;
  }

  .align-shiftr {
    padding-left: 5.3em;
  }

  .align-esc {
    padding-right: 0.7em;
  }

  .arrow {
    padding-top: 0.8em;
    width: 4em;
  }

  .func {
    font-size: 0.7em;
    padding-left: 1.3em;
    padding-top: 0.5em;
    width: 4.97em;
  }

  .word-top {
    font-size: 0.8em;
    width: 4.24em;
  }

  .multi {
    position: absolute;
    color: hsl(73, 99%, 45%);
    padding-left: 2em;
    text-shadow: 1px 1px 8px #0000005e;
    pointer-events: none;
  }

  .multi-sharps {
    position: absolute;
    color: hsl(73, 99%, 45%);
    padding-left: 1.7em;
    text-shadow: 1px 1px 8px #0000005e;
    pointer-events: none;
  }
`;

customElements.define("ptk", PunchTheKeys);
