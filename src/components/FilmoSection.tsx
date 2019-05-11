import React from "react";
import styled from "styled-components";
import { Poster } from "./Poster";

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

interface IGridProps {
  loading: boolean;
}

const Grid = styled("div")<IGridProps>`
  margin-top: 1.5rem;
  display: grid;
  transition: 0.5s ease-in-out;
  grid-template-columns: repeat(auto-fill, 8rem);
  grid-gap: 1.5rem;
`;

interface IProps {
  getAPI: any;
  id: string;
}

interface IState {
  cast: any;
  crew: any;
  error: string | null;
  loading: boolean;
}

export default class Section extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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
      console.log(cast, crew);
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

  render() {
    const { cast, crew, loading } = this.state;
    return (
      <>
        <Container>
          <Title>출연</Title>
          <Grid loading={loading}>
            {cast &&
              cast.map((movie: any, index: number) => (
                <Poster
                  key={index}
                  title={movie.title}
                  id={movie.id}
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
        <Container>
          <Title>제작</Title>
          <Grid loading={loading}>
            {crew &&
              crew.map((movie: any, index: number) => (
                <Poster
                  key={index}
                  title={movie.title}
                  id={movie.id}
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
      </>
    );
  }
}
