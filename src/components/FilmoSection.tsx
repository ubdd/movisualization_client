import React from "react";
import styled from "styled-components";
import { MovieCard } from "./MovieCard";
import { posterSize } from "../config/_mixin";

const Container = styled.div`
  position: relative;
  z-index: 2;
  :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

interface GridProps {
  loading: boolean;
}

const Grid = styled("div")<GridProps>`
  margin-top: 1.5rem;
  display: grid;
  justify-content: space-between;
  transition: 0.5s ease-in-out;
  grid-template-columns: repeat(auto-fill, ${posterSize.width});
  grid-gap: 0.5rem;
`;

interface Props {
  getAPI: any;
  id: string;
}

interface State {
  cast: any;
  crew: any;
  error: string | null;
  loading: boolean;
}

export default class Section extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cast: null,
      crew: null,
      error: null,
      loading: true
    };
  }

  async componentDidMount() {
    const { getAPI, id } = this.props;
    try {
      const {
        data: { cast, crew }
      } = await getAPI(id);
      this._sortByDate(cast);
      this._sortByDate(crew);
      this.setState({
        cast,
        crew,
        loading: true
      });
    } catch (error) {
      this.setState({
        error: error.message
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  _sortByDate = (obj: any) => {
    obj.sort((a: any, b: any) => {
      const movieA: Date = new Date(a.release_date);
      const movieB: Date = new Date(b.release_date);
      return movieA > movieB ? -1 : movieA < movieB ? 1 : 0;
    });
  };

  render() {
    const { cast, crew, loading } = this.state;
    return (
      <>
        {cast && cast.length !== 0 && (
          <Container>
            <Title role="img" aria-label="cast">
              <span role="img" aria-label="crew">
                🎭
              </span>{" "}
              출연
            </Title>
            <Grid loading={loading}>
              {cast.map((movie: any, index: number) => (
                <MovieCard
                  key={index}
                  title={movie.title}
                  movieId={movie.id}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  additionalInfo={`${movie.character} 역`}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                />
              ))}
            </Grid>
          </Container>
        )}
        {crew && crew.length !== 0 && (
          <Container>
            <Title>
              <span role="img" aria-label="crew">
                🎥
              </span>{" "}
              제작
            </Title>
            <Grid loading={loading}>
              {crew.map((movie: any, index: number) => (
                <MovieCard
                  key={index}
                  title={movie.title}
                  movieId={movie.id}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  additionalInfo={`${movie.job}`}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                />
              ))}
            </Grid>
          </Container>
        )}
      </>
    );
  }
}
