import reset from "styled-reset";
import { createGlobalStyle } from "./typed-components";
import { fontSize, color } from "./config/_mixin";
import "./static/css/mytheme.css";
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
    color: ${color.fontColor};
    text-decoration: none !important;
    &:hover{
        color: ${color.mainColor};
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
  .ant-carousel{
    width: 75rem;
    height: 42.2rem;
    position: absolute;
    top: -2rem;   
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(20, 24, 28, 1);
  }
  .slick-slider {
    height: 100%;
  }
  .slick-list {
    height: 100%;
  }
  .ant-carousel .slick-vertical .slick-slide{
    border: none;
  }

  /* billboard style */
  .bb-axis-y text,
  .bb-axis-y2 text {
    fill: ${color.fontColor};
  }

  /*-- Text on Chart --*/
  .bb-text.bb-empty {
    fill: ${color.fontColor};
  }

  /*-- Tooltip --*/
  .bb-tooltip-container {
    z-index: 10;
    font-family: Helvetica, "Apple SD Gothic Neo", Arial, sans-serif,
      "nanumgothic", "Dotum";
    position: absolute;
    color: black;
  }

  .bb text,
  .bb .bb-button {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    fill: ${color.fontColor};
    font-size: 12px;
    letter-spacing: -0.3px;
  }

  /* animations */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes fadeIn {
    /* 0% {
      opacity: 0;
      transform: scale(0);
    }
    50%{
      transform: scale(1.05);
    }
    75%{
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    } */
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
`;
