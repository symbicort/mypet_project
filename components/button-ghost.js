class ButtonGhost extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        button {
          color: #2196f3;
          padding: 12px 20px;
          font-family: sans-serif;
          font-weight: 700;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          user-select: none;
          background-color: #fff;
          border: 1.5px solid #2196f3;
        }
        button:hover {
          background-color: var(--color-sky-50, #f0f9ff);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: 1.5px solid var(--color-sky-400, #e0f2fe);
          transform: scale(1.03);
        }
        button:active {
          background-color: var(--color-sky-100, #e0f2fe);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: 1.5px solid var(--color-sky-600, #bae6fd);
          transform: scale(1);
        }

        

      </style>
      <button>
      <slot name="label" class="icon"></slot> 
      <slot name="icon"></slot> 
      </button>
    `;
    
    shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define("button-ghost", ButtonGhost);
