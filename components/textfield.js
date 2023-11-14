class TextField extends HTMLElement {

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
    max-width: 400px;
    margin: 10px auto;
  }

  p {
    margin-bottom: 12px;
    font-size: 14px;
    color: var(--color-gray-400);
    font-weight: 600;
  }

  input {
    padding: 12px 20px;
    border-radius: 50px;
    border: 1.5px solid var(--color-gray-200);
    box-sizing: border-box;
    width: 100%;
  }

  ::-webkit-input-placeholder {
    font-family: 'Pretendard Variable', sans-serif;
    color: var(--color-gray-300);
  }

  

  `

  constructor() {
    super()

    this.attachShadow({ mode: "open" });
    console.log('textfield shadow attached')

    const style = document.createElement("style");
    const container = document.createElement("div");
    const label = document.createElement("p");
    const input = document.createElement("input");
    const placeholder = document.createElement("p");
    const titleSlot = document.createElement("slot");

    style.innerHTML = TextField.css;
    container.classList.add("container");
    titleSlot.name = "titleSlot";
    
    container.append(label, input, placeholder, titleSlot)
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

customElements.define("text-field", TextField);
