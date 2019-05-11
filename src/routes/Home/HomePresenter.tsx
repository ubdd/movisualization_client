import React from "react";
import Helmet from "react-helmet";
import { websiteTitle } from "../../config/_mixin";

interface Props {}

export const HomePresenter: React.SFC<Props> = ({}) => (
  <div>
    <Helmet>
      <title>Home | {websiteTitle}</title>
    </Helmet>
    Home
  </div>
);
