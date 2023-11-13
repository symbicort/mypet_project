class Navbar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        :host([loggedIn]) {
          width: 100%;
          color: red;
          background-color: red;
        }

        ul {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
        }
        li {
          text-decoration: none;
          display: flex;
          gap: 8px;
        }
        header {
          position: fixed;
          z-index: 1;
          background-color: #fff;
          border-bottom: 1px solid #ccc;
          display: flex;
          top: 0;
          left: 0;
          right: 0;
          justify-content: space-between;
          padding: 12px 24px;
          align-items: center;
          max-width: 1024px;
          width: 100%;
        }

        ::slotted(header) {
          display: flex;
          justify-content: center;
        }

        .logo {
          
        }

        ul {
          display: flex;
          gap: 8px;
        }

        p {
          margin: 0;
          padding: 0;
        }

        svg {
          display: none;
        }

        .menu {
          display: flex;
        }

        @media (max-width: 480px) {
          svg {
            display:flex;
          }
          .menu {
            display: none;
          }
        }
      </style>

      <header>
        <div class="logo">
          <span>logo</span>
        </div>
        <div class="menu">
          <ul>
            <li>
            <button-primary>
              <p slot="label">로그인</p>
            </button-primary>
            <button-primary>
              <p slot="label">회원가입</p>
            </button-primary>
            </li>
            </ul>
            
        </div>
        
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 12H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 6H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 18H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </header>

      
    `;
    
    shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define("nav-bar", Navbar);
