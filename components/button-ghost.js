class ButtonGhost extends HTMLElement {
  static css = `
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
  `;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.innerHTML = ButtonGhost.css;

    const button = document.createElement("button");

    shadow.appendChild(style);
    shadow.appendChild(button);

    // Set button label and icon based on data attributes
    const label = this.getAttribute("data-label");
    const icon = this.getAttribute("data-icon");

    button.innerHTML = `
      <span>${label}</span>
      <span class="icon">${icon}</span>
    `;
  }
}

customElements.define("button-ghost", ButtonGhost);
