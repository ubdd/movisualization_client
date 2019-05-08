import React from "react";
import { MoviePresenter } from "./MoviePresenter";

interface Props {
  match: {
    params: {
      movieId: string;
    };
  };
}
interface State {}

export default class MovieContainer extends React.Component<Props, State> {
  render() {
    const {
      match: {
        params: { movieId }
      }
    } = this.props;
    return <MoviePresenter movieId={movieId} />;
  }
}
