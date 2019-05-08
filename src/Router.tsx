import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { BackTop } from "antd";
import Home from "./routes/Home";
import BoxOffice from "./routes/BoxOffice";
import Movie from "./routes/Movie";
import Person from "./routes/Person";

const MainContainer = styled.section`
  position: relative;
`;

export const Router: React.SFC<{}> = ({}) => (
  <>
    <BackTop />
    <MainContainer>
      <Switch>
        <Route path="/boxOffice" component={BoxOffice} />
        <Route path="/movie/:movieId" component={Movie} />
        <Route path="/person/:personId" component={Person} />
        <Route path="/" component={Home} />
      </Switch>
    </MainContainer>
  </>
);
