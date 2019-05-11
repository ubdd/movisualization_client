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

const MoreIcon = styled.i`
  font-size: 2rem;
  margin-bottom: 1rem;
  transition: 0.5s ease-in-out;
`;

const More = styled.div`
  width: 8rem;
  height: 11.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(221, 238, 255, 0.35);
  border-radius: 0.3rem;
  background-color: #21d4fd;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
  cursor: pointer;
  &:hover {
    ${MoreIcon} {
      transform: rotate(360deg);
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
}

export default class Section extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      movies: null,
      page: 1,
      error: null,
      loading: true
    };
  }

  componentDidMount = async () => {
    const { getAPI, term, id } = this.props;
    try {
      if (term !== undefined) {
        const {
          data: { results: movies }
        } = await getAPI(term, this.state.page);
        this.setState({
          movies,
          page: this.state.page + 1,
          loading: true
        });
      } else if (id !== undefined) {
        const {
          data: { results: movies }
        } = await getAPI(id, this.state.page);
        this.setState({
          movies,
          page: this.state.page + 1,
          loading: true
        });
      } else {
        const {
          data: { results: movies }
        } = await getAPI(this.state.page);
        this.setState({
          movies,
          page: this.state.page + 1,
          loading: true
        });
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
  };

  componentDidUpdate = async (prevProps: any) => {
    if (this.props.term !== prevProps.term) {
      const { getAPI, term, id } = this.props;
      // const { page } = this.state;
      try {
        if (term !== undefined) {
          const {
            data: { results: movies }
          } = await getAPI(term, 1);
          this.setState({
            movies,
            page: 2,
            loading: true
          });
        } else if (id !== undefined) {
          const {
            data: { results: movies }
          } = await getAPI(id, 1);
          this.setState({
            movies,
            page: 2,
            loading: true
          });
        } else {
          const {
            data: { results: movies }
          } = await getAPI(1);
          this.setState({
            movies,
            page: 2,
            loading: true
          });
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
      if (term !== undefined) {
        const {
          data: { results: movies }
        } = await getAPI(term, page);
        this.setState({
          movies: [...this.state.movies, ...movies],
          page: page + 1,
          loading: true
        });
      } else if (id !== undefined) {
        const {
          data: { results: movies }
        } = await getAPI(id, page);
        this.setState({
          movies: [...this.state.movies, ...movies],
          page: page + 1,
          loading: true
        });
      } else {
        const {
          data: { results: movies }
        } = await getAPI(page);
        this.setState({
          movies: [...this.state.movies, ...movies],
          page: page + 1,
          loading: true
        });
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
  };

  render() {
    const { title } = this.props;
    const { movies, loading } = this.state;
    return (
      <Container>
        {title && <Title>{title}</Title>}
        <Grid loading={loading}>
          {movies &&
            movies.map((movie: any, index: number) => (
              <Poster
                key={index}
                title={movie.title}
                id={movie.id}
                imageUrl={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date && movie.release_date.substring(0, 4)}
              />
            ))}
          <More onClick={() => this.handleOnClickMore()}>
            {!loading ? (
              <MoreIcon className="fas fa-plus" />
            ) : (
              <MoreIcon className="fas fa-spinner" />
            )}
            <span>더 보기</span>
          </More>
        </Grid>
      </Container>
    );
  }
}
