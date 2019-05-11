import React from "react";
import styled from "styled-components";

const Container = styled.i`
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-top: 1.5rem;
`;

const Loading = styled.div`
  @keyframes rotating {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation-name: rotating;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  font-size: 3.5rem;
`;

export const Loader: React.SFC = () => (
  <Container>
    <Loading className="fas fa-spinner" role="img" aria-label="Loading" />
  </Container>
);
