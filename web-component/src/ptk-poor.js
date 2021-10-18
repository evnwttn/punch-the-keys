import { LitElement, html, css } from "lit";
import * as Tone from "tone";

class PoorMansPunchTheKeys extends LitElement {
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

    this.rows = [
      /* ROW 1 */
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
        /* ROW 2 */
        { keyCode: 192, classes: "double gdt", value: ["~", "`"] },
        {
          keyCode: 49,
          octave: "0",
          classes: "double gdt",
          value: ["!", "1"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 50,
          octave: "1",
          classes: "double gdt",
          value: ["@", "2"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 51,
          octave: "2",
          classes: "double gdt",
          value: ["#", "3"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 52,
          octave: "3",
          classes: "double gdt",
          value: ["$", "4"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 53,
          octave: "4",
          classes: "double gdt",
          value: ["%", "5"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 54,
          octave: "5",
          classes: "double gdt",
          value: ["^", "6"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 55,
          octave: "6",
          classes: "double gdt",
          value: ["&", "7"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 56,
          octave: "7",
          classes: "double gdt",
          value: ["*", "8"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 57,
          octave: "8",
          classes: "double gdt",
          value: ["(", "9"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 48,
          octave: "9",
          classes: "double gdt",
          value: [")", "0"],
          multiClasses: ["multi"],
        },
        {
          keyCode: 189,
          octave: "down",
          classes: "double gdt",
          value: ["_", "-"],
          multi: "&#10688;",
          multiClasses: ["multi"],
        },
        {
          keyCode: 187,
          octave: "up",
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
        {
          keyCode: 9,
          classes: "word backspace-tab align-tab gdt",
          value: "TAB",
        },
        { keyCode: 81, classes: "letter gdt", value: "Q" },
        {
          keyCode: 87,
          sound: "C#",
          classes: "letter gdt",
          value: "W",
          multiClasses: ["multi-sharps"],
        },
        {
          keyCode: 69,
          sound: "D#",
          classes: "letter gdt",
          value: "E",
          multiClasses: ["multi-sharps"],
        },
        { keyCode: 82, classes: "letter gdt", value: "R" },
        {
          keyCode: 84,
          sound: "F#",
          classes: "letter gdt",
          value: "T",
          multiClasses: ["multi-sharps"],
        },
        {
          keyCode: 89,
          sound: "G#",
          classes: "letter gdt",
          value: "Y",
          multiClasses: ["multi-sharps"],
        },
        {
          keyCode: 85,
          sound: "A#",
          classes: "letter gdt",
          value: "U",
          multiClasses: ["multi-sharps"],
        },
        { keyCode: 73, classes: "letter gdt", value: "I" },
        { keyCode: 79, classes: "letter gdt", value: "O" },
        { keyCode: 80, classes: "letter gdt", value: "P" },
        {
          keyCode: 219,
          oscillator: "down",
          classes: "double gdt",
          value: ["{", "["],
          multi: "&#8818;",
          multiClasses: ["multi-sharps"],
        },
        {
          keyCode: 221,
          oscillator: "up",
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
          multiClasses: ["multi"],
        },
        {
          keyCode: 83,
          sound: "D",
          classes: "letter gdt",
          value: "S",
          multiClasses: ["multi"],
        },
        {
          keyCode: 68,
          sound: "E",
          classes: "letter gdt",
          value: "D",
          multiClasses: ["multi"],
        },
        {
          keyCode: 70,
          sound: "F",
          classes: "letter gdt",
          value: "F",
          multiClasses: ["multi"],
        },
        {
          keyCode: 71,
          sound: "G",
          classes: "letter gdt",
          value: "G",
          multiClasses: ["multi"],
        },
        {
          keyCode: 72,
          sound: "A",
          classes: "letter gdt",
          value: "H",
          multiClasses: ["multi"],
        },
        {
          keyCode: 74,
          sound: "B",
          classes: "letter gdt",
          value: "J",
          multiClasses: ["multi"],
        },
        {
          keyCode: 75,
          sound: "C",
          classes: "letter gdt",
          value: "K",
          multiClasses: ["multi"],
        },
        { keyCode: 76, classes: "letter gdt", value: "L" },
        {
          keyCode: 186,
          volume: "down",
          classes: "double gdt",
          value: [":", ";"],
          multi: "&#9661;",
          multiClasses: ["multi"],
        },
        {
          keyCode: 222,
          volume: "up",
          classes: "double gdt",
          value: ["&#34;", "&#39;"],
          multi: "&#9651;",
          multiClasses: ["multi"],
        },
        {
          keyCode: 13,
          classes: "word caps-enter align-enter gdt",
          value: "ENTER",
        },
      ],
      [
        /* ROW 5 */
        {
          keyCode: 16,

          classes: "word shift align-shiftl gdt",
          value: "SHIFT",
        },
        { keyCode: 90, classes: "letter gdt", value: "Z" },
        {
          keyCode: 88,
          classes: "letter gdt",
          value: "X",
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
        {
          keyCode: 18,
          right: true,
          classes: "word bottom gdt",
          value: "ALT",
        },
        {
          keyCode: 17,
          right: true,
          classes: "word bottom-ctrl gdt",
          value: "CTRL",
        },
        { keyCode: 37, classes: "arrow gdt", value: "&#9664;" },
        {
          keyCode: 38,
          classes: "stack gdt",
          value: ["&#9650;", "&#9660;"],
        },
        { keyCode: 39, classes: "arrow gdt", value: "&#9654;" },
      ],
    ];

    //////
  }

  render() {
    return html`
      <p>poor mans punch the keys</p>
      [${this.volume}DB] [${this.synthHud}] [O${this.octave}]

      <br />

      <!-- NEW POOR PTK -->

      ${this.rows.map((row) =>
        row.map(
          (key) => html` <button
            @click="${this.handleClick}"
            data-sound="${key.sound}"
            data-value="${key.value}"
            data-volume="${key.volume}"
            data-octave="${key.octave}"
            data-oscillator="${key.oscillator}"
          >
            ${key.value} ${key.sound}
          </button>`
        )
      )}

      <!-- //////// -->
    `;
  }

  // FUNCTIONS

  handleClick(event) {
    console.log(event.target.dataset);
    // this.makeSynth(event);
    this.onOscTypeClick(event);
    this.onOctaveClick(event);
    this.onVolumeClick(event);
    this.onClickButton(event);
  }

  makeSynth(synthType) {
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: synthType,
      },
      volume: this.volume,
    }).toDestination();
  }

  onOscTypeClick(event) {
    const oscillator = event.target.dataset.oscillator;
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
    // else {
    //   this.synth = this.makeSynth(oscillator);
    //   this.synthHud = oscillator;
    // }

    if (!oscillator) {
      throw new Error(
        "button was clicked, but it lacked a data-osc-type attribute"
      );
    }
  }

  onOctaveClick(event) {
    const octave = event.target.dataset.octave;
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
    if (!octave) {
      throw new Error(
        "button was clicked, but it lacked a data-octave attribute"
      );
    }
  }

  onVolumeClick(event) {
    const volume = event.target.dataset.volume;
    if (volume === "up") {
      this.volume++;
    } else if (volume === "down") {
      this.volume--;
    } else if (!volume) {
      throw new Error(
        "button was clicked, but it lacked a data-volume attribute"
      );
    }
  }

  onClickButton(event) {
    const sound = event.target.dataset.sound;

    if (!sound) {
      throw new Error(
        "button was clicked, but it lacked a data-sound attribute"
      );
    }

    const note = `${sound}${this.octave}`;

    this.synth.triggerAttackRelease(note, "8n");

    this.currentNote = sound;
  }
}
PoorMansPunchTheKeys.properties = {
  currentNote: {},
  volume: {},
  synthHud: {},
  octave: {},
};
PoorMansPunchTheKeys.styles = css`
  button {
    display: inline-block;
  }

  [data-row="1"] {
    color: green;
  }

  button[data-row="1"]::after {
    content: "\a";
  }

  button[data-row="2"] {
    color: red;
  }

  button[data-row="3"] {
    color: pink;
  }

  button[data-row="4"] {
    color: blue;
  }

  button[data-row="5"] {
    color: purple;
  }

  button[data-row="6"] {
    color: orange;
  }
`;

customElements.define("ptk-poor", PoorMansPunchTheKeys);
