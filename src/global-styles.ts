import reset from "styled-reset";
import { createGlobalStyle } from "./typed-components";
import { fontSize, color } from "./config/_mixin";
export const GlobalStyle = createGlobalStyle`
${reset};
@import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.css");
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic|Playfair+Display|Do+Hyeon|Song+Myung|Thasadith|Nanum+Myeongjo|Nanum+Pen+Script');
  * {
      box-sizing: border-box;
  }

  body{
    font-family: 'Nanum Gothic', sans-serif;
    font-size: ${fontSize.normalFontSize};
    background-color: ${color.bgColor};
    color: ${color.fontColor};
  }

  a{
        color: white;
        text-decoration: none !important;

        &:hover{
            color: MediumTurquoise;
        }
    }


  strong{
    font-weight: 700;
  }
  
  button{
    cursor: pointer;
    background-color: white;
    outline: none;
    border: none;
    &:active {
      outline: none;
      border: none;
    }
  }

`;
