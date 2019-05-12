import React from "react";
import { HomePresenter } from "./HomePresenter";
import { tmdbApis } from "../../api";

interface Props {}

interface State {
  movies: any;
  error: string | null;
  loading: boolean;
}

export default class extends React.Component<Props, State> {
  state = {
    movies: null,
    error: null,
    loading: false
  };

  componentDidMount = async () => {
    try {
      const {
        data: { results: movies }
      } = await tmdbApis.popular(1);
      this.setState({
        movies: movies.slice(0, 10),
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
    const { movies, error, loading } = this.state;
    return <HomePresenter movies={movies} error={error} loading={loading} />;
  }
}
