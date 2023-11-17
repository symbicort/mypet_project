export class Button extends HTMLElement {
  static css = `
  :host {
    display: block;
  }

  button {
    font-family: sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    user-select: none;
    border: none;
    width: 100%;
    text-align: center;
    max-width: 400px;
    margin: 10px auto;
    justify-content: center;
  }

  span {
    width: 100%;
  }

  button.primary {
    color: white;
    padding: 12px 20px;
    border-radius: 50px;
    background-color: var(--color-sky-500, #0EA5E9);
  }

  button.secondary {
    color: white;
    padding: 12px 20px;
    border-radius: 50px;
    background-color: var(--color-gray-500, #0EA5E9);
    
  }

  button.ghost {
    color: var(--color-sky-500);
    padding: 12px 20px;
    border-radius: 50px;
    background-color: var(--color-sky-50, #0EA5E9);
    border: 2px solid var(--color-sky-500);
    
  }

    button.primary:hover {
      background-color: var(--color-sky-400, #38BDF8);
      transition: all 0.3s;
      transform: scale(1.02);
    }

    button.primary:active {
      background-color: var(--color-sky-600, #0284C7);
      transition: all 0.3s;
      transform: scale(1);
    }

    button.secondary:hover {
      background-color: var(--gray-400, #9CA3AF);
      transition: all 0.3s;
      transform: scale(1.02);
    }

    button.secondary:active {
      background-color: var(--gray-600, #374151);
      transition: all 0.3s;
      transform: scale(1);
    }

    button.ghost:hover {
      background-color: var(--color-sky-100, #0EA5E9);
      transition: all 0.3s;
      transform: scale(1.02);
      border: 2px solid var(--color-sky-500);
      overflow: hidden; 
    }
    button.ghost:active {
      background-color: var(--color-sky-200, #0EA5E9);
      transition: all 0.3s;
      transform: scale(1);
      border: 2px solid var(--color-sky-500);
      overflow: hidden; 
    }

  `;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.innerHTML = Button.css;

    const button = document.createElement("button");

    shadow.appendChild(style);
    shadow.appendChild(button);

    const type = this.dataset.type;









    // const submit = this.dataset.send || "false";
    // console.log(submit);


    // const submit = this.getAttribute('send');
    // console.log(submit);
    
    const submit = this.dataset.ruma






  





    const label = this.dataset.label;
    const icon = this.dataset.icon || "";

    button.classList.add(type);

    if (this.dataset.icon) {
      button.innerHTML = `
      ${label}
      <img class="icon">${icon}</img>
    `;
    } else {
      button.innerHTML = `
      ${label}
    `;
    }

    
  }


  connectedCallback() {
    // console.log(this.getAttribute('data-submit'));
    // console.log(this.dataset.submit);
  }
}

customElements.define("custom-button", Button);


