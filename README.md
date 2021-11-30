# punch-the-keys

The keyboard keyboard :godmode:

This is the first project I built within the <a href="https://www.get-coding.ca/">Get Coding</a> program, and my first experience with web components.

At it's simplest, it's a polyphonic browser based keyboard with a couple fun features you can discover by clicking on the inverted smiley at the top left. You can interact with it by clicking, or by typing on your keyboard. From a technical perspective, it went through 4 major iterations:
<ul>
  <li>HTML with basic javascript / event listeners</li>
  <li>Pure javascript that produced the DOM / event listeners scoped to the parent</li>
  <li>Same as above, written in reusable classes</li>
  <li>I went down the https://lit.dev/ rabbit hole & created a reusable web component that anyone can drop into their site with 2 lines of code</li>
</ul>

A massive thank you to my instructor, <a href="https://github.com/jackharrhy">Jack</a>, for impeccable guidance, scope and ensuring I colour inside the lines. 

https://evnwttn.github.io/punch-the-keys/

---

# Running locally

- Ensure you have `node` and `npm` installed
- Head into the `web-component` directory, run `npm install`, then `npm run build`
- Head into the main directory, run `npm install`, then `npm run dev`
- Vite should kick in and tell you to open your web browser

---

<img src="https://i.ibb.co/cgJrk3v/ptk.png">
