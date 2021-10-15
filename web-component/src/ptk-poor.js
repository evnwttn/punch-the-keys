import { LitElement, html } from "lit";
import * as Tone from "tone";

class PoorMansPunchTheKeys extends LitElement {
  constructor() {
    super();

    this.currentNote = "none";
    this.octave = 4;
    this.octaves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.oscType = ["sawtooth", "triangle", "square", "sine"];
    this.synth = this.makeSynth(this.oscType[0]);

    this.rows = [
      { sound: "C" },
      { sound: "D" },
      { sound: "E" },
      { sound: "F" },
      { sound: "G" },
      { sound: "A" },
      { sound: "B" },
    ];
  }

  render() {
    return html`
      <p>poor mans punch the keys</p>
      ${this.currentNote}
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
      ${this.rows.map(
        (row) => html`
          <button @click="${this.onClickButton}" data-sound="${row.sound}">
            ${row.sound}
          </button>
        `
      )}
    `;
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
