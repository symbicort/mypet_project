class Navbar extends HTMLElement {
  static css = `
    :host {
      display: flex;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: white;
    }

    header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 8px 12px;
      align-items: center;
      border-bottom: 1px solid var(--color-gray-200);
    }

    .logo img {

    }

    .menu {
      display: flex;
      gap: 24px;
      align-items: center;
    }

    .btn-group {
      display: flex;
      gap: 8px;
    }

    .menu button {
      padding: 8px 16px;
      background-color: var(--color-sky-500);
      border: none;
      border-radius: 50px;
      color: white;
      font-weight: 600;
    }

    .menu img {
      width: 24px;
      height: 24px;
      cursor: pointer; 
    }

    .sidebar {
      position: fixed;
      top: 0;
      right: -250px;
      height: 100%;
      width: 250px;
      background-color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      transition: right 0.3s ease;
      z-index: 2; 
    }

    .overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none; 
      z-index: 1; 
    }

    .sidebar-logo {
      display: flex;
      width: 100%;

    }

    .sidebar a {
      display: block;
      padding: 16px 24px;
      text-decoration: none;
      color: var(--color-gray-500);
      font-size: 16px;
      transition: background-color 0.3s;
    }

    .sidebar a:hover {
      color: var(--color-sky-500);
    }

    @media (max-width: 480px) {
      .btn-group {
        display: none;
      }
    }
  `;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    const header = document.createElement("header");
    const logo = document.createElement("div");
    const menu = document.createElement("div");
    const btnGroup = document.createElement("div");
    const loginButton = document.createElement("button");
    const signupButton = document.createElement("button");
    const menuIcon = document.createElement("img");
    const sidebar = document.createElement("div");
    const overlay = document.createElement("div");

    style.innerHTML = Navbar.css;
    logo.classList.add("logo");
    menu.classList.add("menu");
    btnGroup.classList.add("btn-group");
    sidebar.classList.add("sidebar");
    overlay.classList.add("overlay");

    loginButton.textContent = "로그인";
    signupButton.textContent = "회원가입";

    logo.innerHTML = `
      <img src="./assets/mypet.svg" alt="">
    `;

    menuIcon.src = "./assets/menu.svg";
    menuIcon.alt = "Menu Icon";

    btnGroup.append(loginButton, signupButton);
    menu.append(btnGroup, menuIcon);
    header.append(logo, menu);
    this.shadowRoot.append(style, header, sidebar, overlay);

    // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isLoggedIn = false;

    if (isLoggedIn) {
      btnGroup.style.display = "none";
    } else {
      // btnGroup.style.display = "flex";
    }

    menuIcon.addEventListener("click", () => {
      const sidebar = this.shadowRoot.querySelector(".sidebar");
      const overlay = this.shadowRoot.querySelector(".overlay");

      if (sidebar.style.right === "0px") {
        sidebar.style.right = "-250px";
        overlay.style.display = "none";
      } else {
        sidebar.style.right = "0";
        overlay.style.display = "block";
      }
    });

    overlay.addEventListener("click", () => {
      const sidebar = this.shadowRoot.querySelector(".sidebar");
      const overlay = this.shadowRoot.querySelector(".overlay");

      sidebar.style.right = "-250px";
      overlay.style.display = "none";
    });

    const menuItems = [
      { text: "견종 카테고리", link: "#" },
      { text: "가족 찾기", link: "#" },
      { text: "꿀팁", link: "#" },
      { text: "자유 커뮤니티", link: "#" },
    ];

    const sidebarLogo = document.createElement("img")
    sidebarLogo.classList.add("sidebar-logo");
    sidebarLogo.innerHTML = `
      <img src="./assets/mypet.svg" alt="">
    `;
    // sidebar.appendChild(sidebarLogo);

    menuItems.forEach((item) => {
      const menuItem = document.createElement("a");
      menuItem.textContent = item.text;
      menuItem.href = item.link;

      sidebar.appendChild(menuItem);
    });
  }
}

customElements.define("nav-bar", Navbar);
