import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyle } from "./global-styles";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import ScrollToTop from "./components/ScrollToTop";

const AppContainer = styled.div``;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer
        draggable={true}
        position={"bottom-right"}
        autoClose={5000}
        hideProgressBar={true}
        pauseOnHover={true}
      />
      <BrowserRouter>
        <ScrollToTop>
          <AppContainer className="app">
            <Router />
          </AppContainer>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default App;
