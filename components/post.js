class Post extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


        

        div.container {
          display: flex;
          flex-direction: column;
          padding: 32px;
          gap: 20px;
          background-color: #ffffff;
          border: 1px solid #c1c1c1;
          border-radius: 4px;
          justify-content: start;
          margin-bottom: 16px;
          word-break: keep-all;
          transition: all 0.5s;
        }

        div.container:hover {
          background-color: #f5f5f5;
          transition: all 0.5s;
        }

        div.container:active {
          background-color: #eaeaea;
          transition: all 0.5s;
        }

        div.content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        h4 {
          font-size: 1.2rem;
          font-weight: bold;
          color: #303030;
        }

        .writer {
          width: 100%;
          display: flex;
          align-items: center;
        }
        
        ::slotted(p) {
          width: 100%;
          color: #797979;
          font-weight: 500;
          line-height: 24px;
        }
        
        p {
          width: 100%;
          line-height: 1.5;
        }

        slot[name='time'] {
          font-size: 0.8rem;
          text-align: right;
        }



        i {
          width: 16px;
        }

        @media (max-width: 480px) {
          div.content {
            flex-direction: column;
          }
        }

        
      </style>

      <div class="container">
        <h4>
          <slot name="title"></slot>
        </h4>
        <p>
          <slot name="content"></slot>
        </p>
        <div class="content">
          <div class="writer">
            <p>
              <slot name="writer"></slot>
            </p>
          </div>
          <p>
            <slot name="time"></slot>
          </p>
          <slot name="image"></slot>
          <slot name="comment"></slot>
          <slot name="like"></slot>
          <slot name="dislike"></slot>
        </div>
      </div>
    `;

    shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define("list-post", Post);
