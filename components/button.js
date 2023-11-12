class Button extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        button {
          color: white;
          padding: 12px 20px;
          font-family: sans-serif;
          font-weight: 400;
          border-radius: 8px;
          display: inline-block;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          user-select: none;
          background-color: #2196f3;
          border: none;
        }
        button:hover {
          background-color: #009688;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        button:active {
          background-color: #00897b;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
      </style>
      <button>
        <slot></slot>
      </button>
    `;
    
    shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define("button-primary", Button);
