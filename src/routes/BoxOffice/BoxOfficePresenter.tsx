import React from "react";
import Helmet from "react-helmet";
import { websiteTitle } from "../../config/_mixin";
import MoviesBoxOfficeChart from "../../components/MoviesBoxOfficeChart";

interface Props {
  moviesBoxOffice: any;
}

export const BoxOfficePresenter: React.SFC<Props> = ({ moviesBoxOffice }) => (
  <div>
    <Helmet>
      <title>Box office | {websiteTitle}</title>
    </Helmet>
    {moviesBoxOffice && (
      <MoviesBoxOfficeChart moviesBoxOffice={moviesBoxOffice} />
    )}
    BoxOffice
  </div>
);
