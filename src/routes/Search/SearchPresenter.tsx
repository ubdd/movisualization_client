import React from "react";
import styled from "styled-components";
import MovieGrid from "../../components/MovieGrid";
import { tmdbApis } from "../../api";
import PersonGrid from "../../components/PersonGrid";

const Container = styled.div``;

interface IProps {
  term: string;
}

export const SearchPresenter: React.SFC<IProps> = ({ term }) => (
  <Container>
    <MovieGrid
      title={`🎥 '${term}'에 대한 영화명 검색결과`}
      getAPI={tmdbApis.searchMovie}
      term={term}
    />
    <PersonGrid title={`🎭 '${term}'에 대한 영화인 검색결과`} term={term} />
  </Container>
);
