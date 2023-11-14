class Post2 extends HTMLElement {

  static css = `
  :host {
    display: block;
  }

  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  div {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    gap: 8px;
    padding: 24px;
    border-radius: 4px;
    border: 1.5px solid var(--color-gray-200)
  }

  h2 {
    line-height: 1.5;
    color: #333;
    margin-bottom: 8px;
  }

  p {
    color: #777;
    line-height: 1.5;
    word-break: keep-all;
  }
  `

  constructor() {
    super()

    this.attachShadow({ mode: "open" });
    console.log('post shadow attached')

    const style = document.createElement("style");
    const container = document.createElement("div");
    const title = document.createElement("h2");
    const contents = document.createElement("p");
    const author = document.createElement("p");
    const timestamp = document.createElement("p");
    const titleSlot = document.createElement("slot");

    style.innerHTML = Post2.css;
    contents.classList.add("contents");
    author.classList.add("author");
    timestamp.classList.add("timestamp");
    titleSlot.name = "titleSlot";


    // title.textContent ='글 제목입니다'
    // contents.textContent ='국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.'
    // author.textContent ='작성자'
    // timestamp.textContent ='2023년 10월 23일 오후 3시 12분'

    container.append(title, contents, author, timestamp, titleSlot)
    this.shadowRoot.append(style, container);

    title.textContent = this.getAttribute('data-title')
    

  }
}



customElements.define("posts-2", Post2);
