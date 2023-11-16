import { Button } from "./button.js";

document.addEventListener("DOMContentLoaded", () => {
  class Navbar extends HTMLElement {
    static css = `
    :host {
      display: block;
      // display: flex;
      // position: fixed;
      // top: 0;
      // left: 0;
      // right: 0;
    }

    header {
      display: flex;
      position: fixed;
      // width: 100%;
      top: 0;
      left: 0;
      right: 0;
      justify-content: space-between;
      padding: 8px 12px;
      align-items: center;
      border-bottom: 1px solid var(--color-gray-200);
      background-color: white;
      z-index: 2;

    }

    .logo img {

    }

    .logo {
      width: fit-content;
      cursor: pointer;
    }

    .menu {
      display: flex;
      gap: 24px;
      align-items: center;
      width: fit-content;
      transition: all 0.5s;
      height: fit-content;
    }

    .btn-group {
      display: flex;
      gap: 8px;
      transition: all 0.5s;
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
      z-index: 4;
      padding: 24px;
      box-sizing: border-box;
    }

    .overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none; 
      z-index: 3; 
      transition: all 2s;
    }

    .sidebar-logo {
      display: flex;
      width: 100%;
    }

    .sidebar .sidebar-logo a {
      padding: 16px;
    }

    .sidebar a {
      display: block;
      padding: 16px 24px;
      text-decoration: none;
      color: var(--color-gray-500);
      font-size: 16px;
      transition: all 0.5s;
    }

    .sidebar a:hover {
      color: var(--color-sky-500);
      font-weight: 700;
      transition: all 0.5s;
    }

    .top-menu {
      display: flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      transform: translateX(20px);
    }

    .top-menu a {
      text-decoration: none;
      color: var(--color-gray-500);
      padding: 12px;

    }

    .top-menu a:hover {
      color: var(--color-sky-500);
      font-weight: 700;
      transition: all 0.5s;
      border-radius: 8px;
      background-color: var(--color-sky-100);
      padding: 12px;
    }



    @media (max-width: 800px) {
      .menu {
        display:flex;
      }
      .btn-group {
        display: none;
      }
      .top-menu {
        display: none;
      }
      
    }


    @media (min-width: 800px) {
      .menu {
        display: flex;
      }
      .menu img {
        display: none;
      }
      .top-menu {
        display: flex;
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
      // const loginButton = document.createElement("custom-button");
      // const signupButton = document.createElement("custom-button");
      const menuIcon = document.createElement("img");
      const sidebar = document.createElement("div");
      const overlay = document.createElement("div");
      const topMenu = document.createElement("div");

      style.innerHTML = Navbar.css;
      logo.classList.add("logo");
      menu.classList.add("menu");
      btnGroup.classList.add("btn-group");
      sidebar.classList.add("sidebar");
      overlay.classList.add("overlay");
      topMenu.classList.add("top-menu");

      btnGroup.innerHTML = `
      <custom-button class='loginButton' data-type='primary' data-label='로그인'></custom-button>
      <custom-button class='signupButton' data-type='primary' data-label='회원가입'></custom-button>
    `;

      // 로고 클릭시 홈페이지 이동
      logo.innerHTML = `
      <a href="/index.html">
        <img src="/assets/mypet.svg" alt="logo">
      </a>
    `;

      menuIcon.src = "/assets/menu.svg";
      menuIcon.alt = "Menu Icon";

      // btnGroup.append(loginButton, signupButton);
      menu.append(btnGroup, menuIcon);
      header.append(logo, topMenu, menu);
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
        { text: "가족 찾기", link: "/findAnimal.html" },
        { text: "꿀팁", link: "#" },
        { text: "자유 커뮤니티", link: "/community.html" },
      ];

      const sidebarLogo = document.createElement("div");
      sidebarLogo.classList.add("sidebar-logo");
      sidebarLogo.innerHTML = `
      <a href="#">
        <img src="/assets/mypet.svg" alt="logo">
      </a>
    `;
      sidebar.appendChild(sidebarLogo);

      
      menuItems.forEach((item) => {
        const menuItem = document.createElement("a");
        menuItem.textContent = item.text;
        menuItem.href = item.link;
        
        sidebar.appendChild(menuItem);
      });

      menuItems.forEach((item) => {
        const menuItem = document.createElement("a");
        menuItem.textContent = item.text;
        menuItem.href = item.link;
        
        topMenu.appendChild(menuItem);
      });

      const sidebarBtn = document.createElement("div");
      sidebarBtn.classList.add("sidebar-btn");
      sidebarBtn.innerHTML = `
      <custom-button id='sideLoginButton' data-type='primary' data-label='로그인'></custom-button>
      <custom-button id='sideSignupButton' data-type='primary' data-label='회원가입'></custom-button>
    `;
      sidebar.appendChild(sidebarBtn);

      const loginButton = this.shadowRoot.querySelector(".loginButton");
      loginButton.addEventListener("click", () => {
        window.location.href = "/login.html";
      });

      const signupButton = this.shadowRoot.querySelector(".signupButton");
      signupButton.addEventListener("click", () => {
        window.location.href = "/signIn.html";
      });


      const sideLoginButton = this.shadowRoot.querySelector("#sideLoginButton");
      sideLoginButton.addEventListener("click", () => {
        window.location.href = "/login.html";
      });

      const sideSignupButton = this.shadowRoot.querySelector("#sideSignupButton");
      sideSignupButton.addEventListener("click", () => {
        window.location.href = "/signIn.html";
      });

      
    }
  }

  customElements.define("nav-bar", Navbar);
});
