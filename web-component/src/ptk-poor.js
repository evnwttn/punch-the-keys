import { LitElement, html } from "lit";
import * as Tone from "tone";

class PoorMansPunchTheKeys extends LitElement {
  constructor() {
    super();

    this.currentNote = "none";
    this.octave = 4;
    this.octaves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.oscType = ["sawtooth", "triangle", "square", "sine"];
    this.volume = 0;
    this.synth = this.makeSynth(this.oscType[0]);

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

    //////
  }

  render() {
    return html`
      <p>poor mans punch the keys</p>
      ${this.currentNote} ${this.volume}
      <br />
      ${this.oscType.map(
        (oscType) => html`
          <button @click="${this.onOscTypeClick}" data-osc-type="${oscType}">
            ${oscType}
          </button>
        `
      )}
      <br />
      ${this.octaves.map(
        (octave) => html`
          <button @click="${this.onOctaveClick}" data-octave="${octave}">
            ${octave}
          </button>
        `
      )}
      <br />
      ${this.rowBlack.map(
        (row) => html`
          <button @click="${this.onClickButton}" data-sound="${row.sound}">
            ${row.sound}
          </button>
        `
      )}
      <br />
      ${this.rowWhite.map(
        (row) => html`
          <button @click="${this.onClickButton}" data-sound="${row.sound}">
            ${row.sound}
          </button>
        `
      )}
      <button @click="${this.onVolumeClick}" data-volume="up">+++</button
      ><button @click="${this.onVolumeClick}" data-volume="down">---</button>
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

    if (!oscType) {
      throw new Error(
        "button was clicked, but it lacked a data-osc-type attribute"
      );
    }

    this.synth = this.makeSynth(oscType);
  }

  onOctaveClick(event) {
    const octave = event.target.dataset.octave;
    this.octave = octave;

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

    this.currentNote = note;
  }
}
PoorMansPunchTheKeys.properties = {
  currentNote: {},
};
customElements.define("ptk-poor", PoorMansPunchTheKeys);