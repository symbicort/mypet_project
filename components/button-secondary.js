class ButtonSecondary extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        button {
          color: #fff;
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
          background-color: var(--gray-500, #6B7280);
          border: none;
        }
        button:hover {
          background-color: var(--color-gray-400, #f0f9ff);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: scale(1.03);
        }
        button:active {
          background-color: var(--color-gray-600, #e0f2fe);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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

customElements.define("button-secondary", ButtonSecondary);
