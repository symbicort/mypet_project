class Post2 extends HTMLElement {

  static css = `
  :host {

  }
  `
  constructor() {
    super()

    this.attachShadow({ mode: "open" });

    const container = document.createElement("div");
    const title = document.createElement("h2");
    const contents = document.createElement("p");
    const author = document.createElement("p");
    const timestamp = doument.createElement("p");

    contents.classList.add("contents");
    author.classList.add("author");
    timestamp.classList.add("timestamp");


  }
}