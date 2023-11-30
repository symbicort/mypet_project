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
    // max-width: 400px;
    margin: 10px auto;
  }

  p {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 20px;
    color: var(--color-gray-400);
    font-weight: 600;
  }

  input {
    padding: 12px 20px;
    border-radius: 50px;
    border: 1.5px solid var(--color-gray-200);
    box-sizing: border-box;
    width: 100%;
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
    const input = document.createElement("input");
    const placeholder = document.createElement("p");
    // const titleSlot = document.createElement("slot");

    style.innerHTML = TextField.css;
    container.classList.add("container");
    // titleSlot.name = "titleSlot";
    
    container.append(label, input, placeholder)
    this.shadowRoot.append(style, container);


    this.shadowRoot.classList

    label.textContent = this.getAttribute('data-label')
    input.placeholder = this.getAttribute('data-placeholder')
    input.autocomplete = "off";
    console.log(this.getAttribute('data-btn'));
    input.type = this.getAttribute('data-btn')
    input.inputMode = this.getAttribute('data-inputmd')
    input.pattern = this.getAttribute('data-pattrn')


    // input.setAttribute('type', `${this.getAttribute('data-btn')}`)
    // input.type = this.getAttribute('data-btn')
    // console.log(this.getAttribute('data-btn'));
    // console.log(input);
    
    
    input.addEventListener('input', (event) => {
      this.value = event.target.value;
    });


    // <text-field
    //     data-label="이메일"
    //     data-placeholder="id@email.com"
    //     type="email"
    //     name="email"
    //     id="email"
    //   ></text-field>

    

  }
  getValue() {
    return this.value;
  }
}

customElements.define("text-field", TextField);
