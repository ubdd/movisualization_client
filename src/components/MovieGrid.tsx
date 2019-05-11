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

interface IGridProps {
  loading: boolean;
}

const Grid = styled("div")<IGridProps>`
  margin-top: 1.5rem;
  display: grid;
  justify-content: space-between;
  transition: 0.5s ease-in-out;
  grid-template-columns: repeat(auto-fill, ${posterSize.width});
  grid-gap: 0.5rem;
`;

const MoreIcon = styled.i<{ noMore: boolean }>`
  font-size: 2rem;
  margin-bottom: 1rem;
  transition: 0.5s ease-in-out;
  transform: ${props => (props.noMore ? "rotate(45deg)" : undefined)};
`;

const More = styled.div<{ noMore: boolean }>`
  width: ${posterSize.width};
  height: ${posterSize.height};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(221, 238, 255, 0.35);
  border-radius: 0.3rem;
  background-color: ${props => (props.noMore ? "#333" : "#21d4fd")};
  background-image: ${props =>
    props.noMore
      ? "linear-gradient(73deg, #222222 0%, #434343 100%)"
      : "linear-gradient(19deg, #21d4fd 0%, #b721ff 100%)"};
  cursor: pointer;
  &:hover {
    ${MoreIcon} {
      transform: ${props =>
        props.noMore ? "rotate(45deg)" : "rotate(360deg)"};
    }
  }
`;

interface Props {
  title?: string;
  getAPI: any;
  term?: string;
  id?: number;
}

interface State {
  movies: any;
  page: number;
  error: string | null;
  loading: boolean;
  noMoreMovie: boolean;
}

export default class MovieGrid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      movies: null,
      page: 1,
      error: null,
      loading: true,
      noMoreMovie: false
    };
  }

  componentDidMount = async () => {
    const { getAPI, term, id } = this.props;
    try {
      let movies: any[] = [];
      if (term && term.trim() && term !== undefined) {
        const {
          data: { results }
        } = await getAPI(term, this.state.page);
        movies = results;
      } else if (id !== undefined) {
        const {
          data: { results }
        } = await getAPI(id, this.state.page);
        movies = results;
      } else {
        const {
          data: { results }
        } = await getAPI(this.state.page);
        movies = results;
      }
      if (movies.length !== 20) {
        this.setState({ noMoreMovie: true });
      }
      this.setState({
        movies,
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
  };

  componentDidUpdate = async (prevProps: any, prevState: any) => {
    if (this.props.term && this.props.term !== prevProps.term) {
      console.log(this.props.term, prevProps.term);
      const { getAPI, term, id } = this.props;
      try {
        let movies: any[] = [];
        if (term && term.trim() && term !== undefined) {
          const {
            data: { results }
          } = await getAPI(term, 1);
          movies = results;
        } else if (id !== undefined) {
          const {
            data: { results }
          } = await getAPI(id, 1);
          movies = results;
        } else {
          const {
            data: { results }
          } = await getAPI(1);
          movies = results;
        }
        this.setState({
          movies,
          loading: true,
          noMoreMovie: false
        });
        if (movies.length !== 20) {
          this.setState({ noMoreMovie: true });
        }
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
  };

  handleOnClickMore = async () => {
    const { getAPI, term, id } = this.props;
    const { page } = this.state;
    try {
      let movies: any = [];
      if (term !== undefined) {
        const {
          data: { results }
        } = await getAPI(term, page + 1);
        movies = results;
      } else if (id !== undefined) {
        const {
          data: { results }
        } = await getAPI(id, page + 1);
        movies = results;
      } else {
        const {
          data: { results }
        } = await getAPI(page + 1);
        movies = results;
      }
      if (movies.length !== 20) {
        this.setState({ noMoreMovie: true });
      }
      this.setState({
        movies: this.state.movies.concat(movies),
        page: page + 1,
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
  };

  render() {
    const { title } = this.props;
    const { movies, loading, noMoreMovie } = this.state;
    return (
      <Container>
        {title && <Title>{title}</Title>}
        <Grid loading={loading}>
          {movies &&
            movies.map((movie: any, index: number) => (
              <MovieCard
                key={index}
                title={movie.title}
                movieId={movie.id}
                imageUrl={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date && movie.release_date.substring(0, 4)}
              />
            ))}
          {noMoreMovie ? (
            <More noMore={true}>
              <MoreIcon noMore={true} className="fas fa-plus" />
              {/* <span>마지막 페이지</span> */}
            </More>
          ) : (
            <More noMore={false} onClick={() => this.handleOnClickMore()}>
              {!loading ? (
                <MoreIcon noMore={false} className="fas fa-plus" />
              ) : (
                <MoreIcon noMore={false} className="fas fa-spinner" />
              )}
              <span>더 보기</span>
            </More>
          )}
        </Grid>
      </Container>
    );
  }
}
