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
    max-width: 400px;
    justify-content: center;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 12px;
    font-size: 14px;
    color: var(--color-gray-400);
    font-weight: 600;
  }

  input {
    padding: 12px 20px;
    border-radius: 50px;
    border: 1.5px solid var(--color-gray-200);
    box-sizing: border-box;
    width: 100%;
  }

  

  `

  constructor() {
    super()

    this.attachShadow({ mode: "open" });
    console.log('textfield shadow attached')

    const style = document.createElement("style");
    const container = document.createElement("div");
    const label = document.createElement("p");
    const input = document.createElement("input");
    const placeholder = document.createElement("p");
    const titleSlot = document.createElement("slot");

    style.innerHTML = TextField.css;
    container.classList.add("container");
    // contents.classList.add("contents");
    // author.classList.add("author");
    // timestamp.classList.add("timestamp");
    titleSlot.name = "titleSlot";
    



    // title.textContent ='글 제목입니다'
    // contents.textContent ='국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.'
    // author.textContent ='작성자'
    // timestamp.textContent ='2023년 10월 23일 오후 3시 12분'

    container.append(label, input, placeholder, titleSlot)
    this.shadowRoot.append(style, container);

    // title.textContent = this.getAttribute('data-title')
    label.textContent = this.getAttribute('data-label')
    input.placeholder = this.getAttribute('data-placeholder')
    

  }
}



customElements.define("text-field", TextField);
