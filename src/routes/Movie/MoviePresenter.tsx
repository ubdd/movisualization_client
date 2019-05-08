import React from "react";

interface Props {
  movieId: string;
}

export const MoviePresenter: React.SFC<Props> = ({ movieId }) => (
  <div>you are in /movie/{movieId}</div>
);
