class TextField extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        :host {
          display: block;
          position: static;
        }

        input {
          padding: 12px 20px;
          border-radius: 50px;
          border: 1.5px solid #ccc;
          width: 100%;
        }

        ::slotted(p) {
          color: #999;
          font-size: 14px;
        }

        input:focus {
          color: #333;
          border: 1.5px solid #333;
        }
      </style>

      <div id="container">
        <label for='input'>
          <p>
            <slot name="label"></slot>
          </p>
        </label>
        <input type="text" name="input" placeholder="플레이스홀더">
      </div>
    `;

    shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define("text-field", TextField);
