import reset from "styled-reset";
import { createGlobalStyle } from "./typed-components";
import { fontSize, color, media } from "./config/_mixin";
import "./static/css/mytheme.css";
import "react-toastify/dist/ReactToastify.css";
export const GlobalStyle = createGlobalStyle`
  ${reset};
  @import url("https://use.fontawesome.com/releases/v5.8.2/css/all.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.min.css");
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic|Playfair+Display|Do+Hyeon|Song+Myung|Thasadith|Nanum+Myeongjo|Nanum+Pen+Script');
  * {
      box-sizing: border-box;
  }

  body{
    font-family: 'Nanum Gothic', sans-serif;
    font-size: ${fontSize.normalFontSize};
    overflow-x: hidden;
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

  /* ant design style */
  .ant-carousel{
    width: 75rem;
    position: absolute;
    top: -2rem;   
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(20, 24, 28, 1);
    ${media.tablet} {
    }
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
  .ant-table-content {
    font-weight: 700;
    background: #363636;
    color: white;
  }
  .ant-table-column-title{
    color: white;
  }
  .ant-table-small {
    font-size : 0.7rem;
    a {
      color: white;
       &:hover{
         color: goldenrod;
       }
    }
  }
  .ant-table-small>.ant-table-content>.ant-table-body>table>.ant-table-tbody>tr>td, .ant-table-small>.ant-table-content>.ant-table-body>table>.ant-table-thead>tr>th, .ant-table-small>.ant-table-content>.ant-table-fixed-left>.ant-table-body-outer>.ant-table-body-inner>table>.ant-table-tbody>tr>td, .ant-table-small>.ant-table-content>.ant-table-fixed-left>.ant-table-body-outer>.ant-table-body-inner>table>.ant-table-thead>tr>th, .ant-table-small>.ant-table-content>.ant-table-fixed-left>.ant-table-header>table>.ant-table-tbody>tr>td, .ant-table-small>.ant-table-content>.ant-table-fixed-left>.ant-table-header>table>.ant-table-thead>tr>th, .ant-table-small>.ant-table-content>.ant-table-fixed-right>.ant-table-body-outer>.ant-table-body-inner>table>.ant-table-tbody>tr>td, .ant-table-small>.ant-table-content>.ant-table-fixed-right>.ant-table-body-outer>.ant-table-body-inner>table>.ant-table-thead>tr>th, .ant-table-small>.ant-table-content>.ant-table-fixed-right>.ant-table-header>table>.ant-table-tbody>tr>td, .ant-table-small>.ant-table-content>.ant-table-fixed-right>.ant-table-header>table>.ant-table-thead>tr>th, .ant-table-small>.ant-table-content>.ant-table-header>table>.ant-table-tbody>tr>td, .ant-table-small>.ant-table-content>.ant-table-header>table>.ant-table-thead>tr>th, .ant-table-small>.ant-table-content>.ant-table-scroll>.ant-table-body>table>.ant-table-tbody>tr>td, .ant-table-small>.ant-table-content>.ant-table-scroll>.ant-table-body>table>.ant-table-thead>tr>th, .ant-table-small>.ant-table-content>.ant-table-scroll>.ant-table-header>table>.ant-table-tbody>tr>td, .ant-table-small>.ant-table-content>.ant-table-scroll>.ant-table-header>table>.ant-table-thead>tr>th{
    padding: 0.3rem 0.5rem;
  }
  .ant-table-small>.ant-table-content>.ant-table-body{
    margin: 0;
  }
  .ant-table-thead>tr>th .ant-table-column-sorter {
    vertical-align: baseline;
  }
  .ant-table-thead>tr>th.ant-table-column-has-actions.ant-table-column-has-sorters{
    &:hover{
      background-color: black;
    }
  }
  .ant-switch {
    background-color: #e4bb13;
  }
  .ant-switch-checked {
    background-color: white;
  }
  .ant-table-small>.ant-table-content>.ant-table-body>table>.ant-table-tbody>tr>td{
    background-color: #363636 !important;
    &:hover{
      background: grey !important;
    }
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

  /* medium zoom */
  .medium-zoom-overlay{
    z-index: 5;
  }

  /* animations */
  @keyframes release {
    0% {
      height: 0px;
      margin: 0;
    }
    100% {
      height: 356px;
      margin: 2rem 0;
    }
  }
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
