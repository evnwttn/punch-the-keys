var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { LitElement, css, html } from "lit";
class ClickCounter extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }
  static get properties() {
    return {
      name: { type: String },
      count: { type: Number }
    };
  }
  constructor() {
    super();
    this.name = "World";
    this.count = 0;
  }
  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }
  _onClick() {
    this.count++;
  }
}
window.customElements.define("click-counter", ClickCounter);
class Readme extends LitElement {
  static get styles() {
    return css`
			#button {
				position: fixed;
				top: 2.5px;
				left: 2.5px;
				z-index: 100;
				color: #f7fcff;
				font-size: 30px;
				font-family: "Lato", sans-serif;
				border-radius: 0.3em;
				width: 1.1em;
				height: 1.06em;
				box-sizing: border-box;
				border: 1px solid #e0e0d9;
				box-shadow: 0 0.13em 0 0.022em #bff205;
				border-bottom-color: #555;
			}

			#icon {
				transform: rotate(180deg);
				cursor: pointer;
			}

			#display {
				visibility: visible;
				position: fixed;
				background-image: linear-gradient(#a9a9a9, #0d0d0d);
				top: 0.5em;
				left: 3.4em;
				z-index: 100;
				color: #f7fcff;
				font-size: 13px;
				font-family: "Lato", sans-serif;
				text-transform: uppercase;
				padding-left: 0.5em;
				padding-top: 0.25em;
				border-radius: 0.3em;
				width: 18em;
				height: 8.1em;
				box-sizing: border-box;
				border: 1px solid #e0e0d9;
				box-shadow: 0 0.13em 0 0.022em #bff205;
				border-bottom-color: #555;
			}
		`;
  }
  constructor() {
    super();
    this.open = window.localStorage.getItem("read-me") === "on";
  }
  createRenderRoot() {
    const root = super.createRenderRoot();
    root.addEventListener("click", () => this.onRootClick());
    return root;
  }
  renderButton() {
    return html`
			<div id="button">
				&#9786
			</div>
		`;
  }
  renderDisplay() {
    if (!this.open) {
      return;
    }
    return html`
			<div id="display">
				1 - 0 &#8702; octaves
				<br />&#10688; & &#10689; &#8702; toggle octave
				<br />W - U &#8702; black keys
				<br />&#8818; & &#8819; &#8702; toggle oscillator
				<br />A - K &#8702; white keys
				<br />&#9651; & &#9661; &#8702; toggle volume
			</div>
		`;
  }
  render() {
    return html`
			${this.renderButton()}
			${this.renderDisplay()}
		`;
  }
  onRootClick() {
    this.open = !this.open;
    window.localStorage.setItem("read-me", this.open ? "on" : "off");
  }
}
__publicField(Readme, "properties", {
  open: {}
});
window.customElements.define("ptk-readme", Readme);
