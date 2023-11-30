class TextArea extends HTMLElement {

  static css = `
  :host {
    display: block;
  }

  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  .container {
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    width: 100%
  }

  p {
    margin-bottom: 12px;
    font-size: 14px;
    color: var(--color-gray-400);
    font-weight: 600;
  }

  textarea {
    padding: 12px 20px;
    border-radius: 16px;
    border: 1.5px solid var(--color-gray-200);
    box-sizing: border-box;
    width: 100%;
    font-family: 'Pretendard Variable', sans-serif;
    font-size: 16px;
  }

  ::-webkit-input-placeholder {
    font-family: 'Pretendard Variable', sans-serif;
    color: var(--color-gray-300);
  }

  

  `

  constructor() {
    super()

    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    const container = document.createElement("div");
    const label = document.createElement("p");
    const input = document.createElement("textarea");
    const placeholder = document.createElement("p");
    const titleSlot = document.createElement("slot");

    style.innerHTML = TextArea.css;
    container.classList.add("container");
    input.setAttribute('rows', '14')
    input.setAttribute('cols', '30')
    
    container.append(label, input, placeholder)
    this.shadowRoot.append(style, container);

    label.textContent = this.getAttribute('data-label')
    input.placeholder = this.getAttribute('data-placeholder')
    
    input.addEventListener('input', (event) => {
      this.value = event.target.value;
    });

    

  }
  getValue() {
    return this.value;
  }
}

customElements.define("text-area", TextArea);
