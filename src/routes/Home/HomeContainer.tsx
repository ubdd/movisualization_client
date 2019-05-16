import React from "react";
import { HomePresenter } from "./HomePresenter";
import { tmdbApis } from "../../api";
import { toast } from "react-toastify";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {}

interface State {
  movies: any;
  loading: boolean;
}

export default class extends React.Component<Props, State> {
  state = {
    movies: null,
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
      toast.error(`😫 ${error.message}`);
      this.props.history.push("/");
    } finally {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { movies, loading } = this.state;
    return <HomePresenter movies={movies} loading={loading} />;
  }
}
