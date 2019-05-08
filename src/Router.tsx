import React from "react";
import styled from "styled-components";
import { BackTop } from "antd";

const MainContainer = styled.section`
  position: relative;
`;

export const Router: React.SFC<{}> = ({}) => (
  <>
    <BackTop />
    <MainContainer>main</MainContainer>
  </>
);
