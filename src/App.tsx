import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyle } from "./global-styles";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const AppContainer = styled.div``;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer
        draggable={true}
        position={"top-left"}
        autoClose={5000}
        hideProgressBar={true}
        pauseOnHover={true}
      />
      <BrowserRouter>
        <AppContainer className="app">
          <Router />
        </AppContainer>
      </BrowserRouter>
    </>
  );
};

export default App;
