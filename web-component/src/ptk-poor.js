import { LitElement, html } from "lit";
import * as Tone from "tone";

class PoorMansPunchTheKeys extends LitElement {
  constructor() {
    super();

    this.currentNote = "none";
    this.octave = 4;
    this.octaves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.oscType = ["sawtooth", "triangle", "square", "sine"];
    this.oscNum = 0;
    this.volume = 0;
    this.synthHud = "sawtooth";
    this.synth = this.makeSynth(this.oscType[this.oscNum]);

    this.rowBlack = [
      { sound: "C#" },
      { sound: "D#" },
      { sound: "F#" },
      { sound: "G#" },
      { sound: "A#" },
    ];

    this.rowWhite = [
      { sound: "C" },
      { sound: "D" },
      { sound: "E" },
      { sound: "F" },
      { sound: "G" },
      { sound: "A" },
      { sound: "B" },
    ];

    this.rows = [
      { sound: "C" },
      { sound: "D" },
      { sound: "E" },
      { sound: "F" },
      { sound: "G" },
      { sound: "A" },
      { sound: "B" },
    ];

    //////
  }

  render() {
    return html`
      <p>poor mans punch the keys</p>
      [${this.volume}DB] [${this.synthHud}] [O${this.octave}]

      <br />

      <!-- ROW 1 -->

      ${this.oscType.map(
        (oscType) => html`
          <button @click="${this.onOscTypeClick}" data-osc-type="${oscType}">
            ${oscType}
          </button>
        `
      )}

      <br />
      <!-- ROW 2 -->

      ${this.octaves.map(
        (octave) => html`
          <button @click="${this.onOctaveClick}" data-octave="${octave}">
            ${octave}
          </button>
        `
      )}

      <button @click="${this.onOctaveClick}" data-octave="down">
        &#10688;
      </button>

      <button @click="${this.onOctaveClick}" data-octave="up">&#10689;</button>

      <br />

      <!-- ROW 3 -->

      <!-- ${this.rowBlack.map(
        (row) => html`
          <button @click="${this.onClickButton}" data-sound="${row.sound}">
            ${row.sound}
          </button>
        `
      )} -->

      <button @click="${this.onOscTypeClick}" data-osc-type="down">
        &#8818;
      </button>

      <button @click="${this.onOscTypeClick}" data-osc-type="up">
        &#8819;
      </button>

      <br />

      <!-- ROW 4 -->

      <!-- ${this.rowWhite.map(
        (row) => html`
          <button @click="${this.onClickButton}" data-sound="${row.sound}">
            ${row.sound}
          </button>
        `
      )} -->

      <button @click="${this.onVolumeClick}" data-volume="down">&#9661;</button>

      <button @click="${this.onVolumeClick}" data-volume="up">&#9651;</button>

      <br />

      ${this.rows.map(
        (row) => html`
          <button @click="${this.onClickButton}" data-sound="${row.sound}">
            ${row.sound}
          </button>
        `
      )}
    `;
  }

  // FUNCTIONS

  makeSynth(synthType) {
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: synthType,
      },
      volume: this.volume,
    }).toDestination();
  }

  onOscTypeClick(event) {
    const oscType = event.target.dataset.oscType;
    if (oscType === "down") {
      if (this.oscNum >= 1) {
        this.oscNum--;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
        this.synthHud = this.oscType[this.oscNum];
      }
    } else if (oscType === "up") {
      if (this.oscNum <= this.oscType.length - 2) {
        this.oscNum++;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
        this.synthHud = this.oscType[this.oscNum];
      }
    } else {
      this.synth = this.makeSynth(oscType);
      this.synthHud = oscType;
    }

    if (!oscType) {
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
    console.log(this.volume);
    // DOES NOT WORK
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

customElements.define("ptk-poor", PoorMansPunchTheKeys);
