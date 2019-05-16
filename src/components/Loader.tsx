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
  animation: spin 1s ease-in-out infinite;
  font-size: 3.5rem;
`;

export const Loader: React.SFC = () => (
  <Container>
    <Loading className="fas fa-spinner" role="img" aria-label="Loading" />
  </Container>
);
