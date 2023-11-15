class Post2 extends HTMLElement {

  static css = `
  :host {
    display: block;
  }

  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  div {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    gap: 8px;
    padding: 32px;
    border-radius: 4px;
    border: 1.5px solid var(--color-gray-200);
    margin-bottom: 12px;
    box-sizing: border-box;
    cursor: pointer;
  }

  h2 {
    line-height: 1.5;
    color: #333;
    margin-bottom: 8px;
  }

  p {
    color: #777;
    line-height: 1.5;
    word-break: keep-all;
  }
  `

  constructor() {
    super()

    this.attachShadow({ mode: "open" });
    console.log('post shadow attached')

    const style = document.createElement("style");
    const container = document.createElement("div");
    const title = document.createElement("h2");
    const contents = document.createElement("p");
    const author = document.createElement("p");
    const timestamp = document.createElement("p");

    style.innerHTML = Post2.css;
    contents.classList.add("contents");
    author.classList.add("author");
    timestamp.classList.add("timestamp");


    container.append(title, contents, author, timestamp)
    this.shadowRoot.append(style, container);
    

    title.textContent = this.getAttribute("data-title");
    contents.textContent = this.getAttribute("data-content");
    author.textContent = this.getAttribute("data-author");
    timestamp.textContent = this.getAttribute("data-timestamp");
    

  }
}



customElements.define("posts-2", Post2);
