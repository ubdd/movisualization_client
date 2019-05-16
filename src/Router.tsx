import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { BackTop } from "antd";
import Home from "./routes/Home";
import BoxOffice from "./routes/BoxOffice";
import Movie from "./routes/Movie";
import Person from "./routes/Person";
import Search from "./routes/Search";
import Header from "./components/Header";
import { headerHeight } from "./config/_mixin";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const SectionContainer = styled.section`
  margin: ${headerHeight} 0;
  width: 60rem;
`;

interface Props {}

export const Router: React.SFC<Props> = () => (
  <>
    <BackTop />
    <MainContainer>
      <Header />
      <SectionContainer>
        <Switch>
          <Route path="/boxOffice" component={BoxOffice} />
          <Route path="/film/:movieId" component={Movie} />
          <Route path="/person/:personId" component={Person} />
          <Route path="/search/:term" exact component={Search} />
          <Route path="/" component={Home} />
        </Switch>
      </SectionContainer>
    </MainContainer>
  </>
);
