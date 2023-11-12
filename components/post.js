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


        * {
          font-family: sans-serif;
        }

        div {
          display: block;
          padding: 20px;
          background-color: #ffffff;
          border: 1px solid #c1c1c1;
          border-radius: 8px;
        }

        h4 {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 12px;
          color: #303030;
        }
        
        p {
          color: #797979
        }
      </style>

      <div>
        <h4>
          <slot name="title"></slot>
        </h4>
        <p>
          <slot name="content"></slot>
        </p>
        <slot name="writer"></slot>
        <slot name="time"></slot>
        <slot name="image"></slot>
        <slot name="comment"></slot>
        <slot name="like"></slot>
        <slot name="dislike"></slot>
      </div>
    `;

    shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define("list-post", Post);
