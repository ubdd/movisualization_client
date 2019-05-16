import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import MovieGrid from "../../components/MovieGrid";
import { tmdbApis } from "../../api";
import { Carousel } from "antd";
import { Loader } from "../../components/Loader";
import { websiteTitle } from "../../config/_mixin";
import DailyBoxOfficeChart from "../../components/DailyBoxOfficeChart";

const Container = styled.div`
  margin: 30rem 0 10rem 0;
`;

interface IBackdropProps {
  bgImage: string;
}

const Backdrop = styled("div")<IBackdropProps>`
  @keyframes enlarging {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.97);
    }
    100% {
      transform: scale(1);
    }
  }
  width: 1210px !important;
  height: 685px;
  background-image: linear-gradient(
      to right,
      rgba(20, 24, 28, 1),
      transparent,
      transparent,
      transparent,
      rgba(20, 24, 28, 1)
    ),
    linear-gradient(
      to bottom,
      transparent,
      transparent,
      transparent,
      rgba(20, 24, 28, 1)
    ),
    url(${props => props.bgImage});
  background-position: center center;
  background-size: auto 100%;
  animation-name: enlarging;
  animation-duration: 20s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;

const SectionContainer = styled.div`
  width: 55.5rem;
  margin: 0 auto;
`;

interface Props {
  movies: any;
  loading: boolean;
  boxoffice: any[];
}

export const HomePresenter: React.SFC<Props> = ({
  movies,
  loading,
  boxoffice
}) =>
  loading ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <title>Home | {websiteTitle}</title>
      </Helmet>
      <Container>
        <DailyBoxOfficeChart boxOfficeResult={boxoffice} height={380} />
        <Carousel
          effect="fade"
          dotPosition={"right"}
          easing={"ease-in-out"}
          autoplay={true}
        >
          {movies &&
            movies.map((movie: any) => (
              <Backdrop
                key={movie.id}
                bgImage={`https://image.tmdb.org/t/p/original${
                  movie.backdrop_path
                }`}
              />
            ))}
        </Carousel>
        <SectionContainer>
          <MovieGrid title="현재 상영중" getAPI={tmdbApis.nowPlaying} />
          <MovieGrid title="인기 작품" getAPI={tmdbApis.popular} />
          <MovieGrid title="개봉 예정작" getAPI={tmdbApis.upcoming} />
          <MovieGrid title="최고 평점작" getAPI={tmdbApis.topRated} />
        </SectionContainer>
      </Container>
    </>
  );
