import { readFileSync } from "fs";
import { marked } from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const icon = readFileSync(`${__dirname}/../_assets/icon.png`).toString(
  "base64"
);

const jpy = readFileSync(`${__dirname}/../_fonts/NotoSansJP-Bold.otf`).toString(
  "base64"
);
const eng = readFileSync(`${__dirname}/../_fonts/Roboto-Bold.ttf`).toString(
  "base64"
);

function getCss() {
  return `
      @font-face {
        font-family: 'Noto Sans JP';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/otf;charset=utf-8;base64,${jpy}) format('otf');
    }

     @font-face {
        font-family: Roboto;
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/ttf;charset=utf-8;base64,${eng}) format('truetype');
    }

    body {
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: "Roboto", "Noto Sans JP";
    }

      .heading {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;

        font-size: 128px;
        font-weight: bold;
        word-wrap: break-word;

        margin-left: 128px;
        margin-right: 128px;
        margin-top: 0;
        margin-bottom: 128px;
      }

      .bottom {
        position: absolute;
        bottom: 128px;
        width: calc(100% - 256px);
        display: flex;
        font-size: 64px;
        font-weight: bold;
        justify-content: space-between;
        align-items: center;
      }
      .time {
        line-height: 1;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 32px;
      }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, md } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>

      <div class="heading">
        ${emojify(md ? marked(text) : sanitizeHtml(text))}
      </div>
      <div class="bottom">
        <div class="time">2022/02/22</div>
          <div class="logo">
            <image width="96px" height="96px" src="data:image/png;base64,${icon}" />
            <svg height="64px" viewBox="0 0 95 20">
              <path
              d="M4.18691 7.624L4.09091 8.512L4.61891 7.84L10.3789 1.336H14.8909L7.59491 9.256L14.9149 19H10.4989L5.05091 11.464L4.18691 12.328V19H0.658906V1.336H4.18691V7.624ZM15.6373 17.272C15.6373 16.776 15.8133 16.36 16.1653 16.024C16.5333 15.688 16.9333 15.52 17.3653 15.52C17.7653 15.52 18.1413 15.688 18.4933 16.024C18.8613 16.36 19.0453 16.776 19.0453 17.272C19.0453 17.8 18.8613 18.224 18.4933 18.544C18.1413 18.848 17.7653 19 17.3653 19C16.9333 19 16.5333 18.848 16.1653 18.544C15.8133 18.224 15.6373 17.8 15.6373 17.272ZM17.7797 1.456H21.8597L25.6277 12.544L25.0757 12.304L28.3637 4.12L29.9717 8.896L24.8837 19.816L17.7797 1.456ZM26.6357 1.456H30.0917L34.4357 12.184L33.8117 12.088L37.0517 1.456H40.7957L33.9797 19.768L26.6357 1.456ZM39.5436 17.272C39.5436 16.776 39.7196 16.36 40.0716 16.024C40.4396 15.688 40.8396 15.52 41.2716 15.52C41.6716 15.52 42.0476 15.688 42.3996 16.024C42.7676 16.36 42.9516 16.776 42.9516 17.272C42.9516 17.8 42.7676 18.224 42.3996 18.544C42.0476 18.848 41.6716 19 41.2716 19C40.8396 19 40.4396 18.848 40.0716 18.544C39.7196 18.224 39.5436 17.8 39.5436 17.272ZM52.8413 8.512H56.2013V19H52.8413V8.512ZM52.7693 4.792C52.7693 4.296 52.9613 3.888 53.3453 3.568C53.7453 3.248 54.1693 3.088 54.6173 3.088C55.0653 3.088 55.4733 3.248 55.8413 3.568C56.2253 3.888 56.4173 4.296 56.4173 4.792C56.4173 5.288 56.2253 5.696 55.8413 6.016C55.4733 6.32 55.0653 6.472 54.6173 6.472C54.1693 6.472 53.7453 6.32 53.3453 6.016C52.9613 5.696 52.7693 5.288 52.7693 4.792ZM62.7096 8.512L62.9736 10.384L62.9256 10.216C63.2936 9.56 63.8136 9.032 64.4856 8.632C65.1576 8.216 65.9816 8.008 66.9576 8.008C67.9496 8.008 68.7736 8.304 69.4296 8.896C70.1016 9.472 70.4456 10.224 70.4616 11.152V19H67.1016V12.4C67.0856 11.936 66.9576 11.568 66.7176 11.296C66.4936 11.008 66.1096 10.864 65.5656 10.864C65.0536 10.864 64.6056 11.032 64.2216 11.368C63.8376 11.704 63.5416 12.16 63.3336 12.736C63.1256 13.312 63.0216 13.976 63.0216 14.728V19H59.6616V8.512H62.7096ZM74.9196 19V11.44H73.1436V8.464H74.9196V4.816C74.9196 3.44 75.3116 2.32 76.0956 1.456C76.8956 0.576 78.0476 0.136 79.5516 0.136C79.9996 0.136 80.4956 0.208 81.0396 0.352C81.5996 0.479999 82.0876 0.695999 82.5036 0.999999L81.0876 3.424C80.9276 3.216 80.7356 3.08 80.5116 3.016C80.3036 2.936 80.1036 2.896 79.9116 2.896C79.4316 2.896 79.0396 3.056 78.7356 3.376C78.4316 3.696 78.2796 4.208 78.2796 4.912V8.464H81.4476V11.44H78.2796V19H74.9196ZM82.8222 13.624C82.8222 12.552 83.0702 11.592 83.5662 10.744C84.0782 9.896 84.7902 9.232 85.7022 8.752C86.6142 8.256 87.6622 8.008 88.8462 8.008C90.0462 8.008 91.0862 8.256 91.9662 8.752C92.8462 9.232 93.5182 9.896 93.9822 10.744C94.4622 11.592 94.7022 12.552 94.7022 13.624C94.7022 14.696 94.4622 15.664 93.9822 16.528C93.5182 17.376 92.8462 18.048 91.9662 18.544C91.0862 19.04 90.0302 19.288 88.7982 19.288C87.6462 19.288 86.6142 19.064 85.7022 18.616C84.8062 18.168 84.1022 17.52 83.5902 16.672C83.0782 15.824 82.8222 14.808 82.8222 13.624ZM86.2062 13.648C86.2062 14.192 86.3182 14.688 86.5422 15.136C86.7662 15.568 87.0702 15.912 87.4542 16.168C87.8382 16.424 88.2702 16.552 88.7502 16.552C89.2782 16.552 89.7342 16.424 90.1182 16.168C90.5022 15.912 90.7982 15.568 91.0062 15.136C91.2142 14.688 91.3182 14.192 91.3182 13.648C91.3182 13.088 91.2142 12.592 91.0062 12.16C90.7982 11.728 90.5022 11.384 90.1182 11.128C89.7342 10.872 89.2782 10.744 88.7502 10.744C88.2702 10.744 87.8382 10.872 87.4542 11.128C87.0702 11.384 86.7662 11.728 86.5422 12.16C86.3182 12.592 86.2062 13.088 86.2062 13.648Z"
              fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </body>
</html>`;
}
