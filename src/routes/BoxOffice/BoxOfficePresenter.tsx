import React from "react";
import Helmet from "react-helmet";
import { websiteTitle } from "../../config/_mixin";

interface Props {}

export const BoxOfficePresenter: React.SFC<Props> = () => (
  <div>
    <Helmet>
      <title>Box office | {websiteTitle}</title>
    </Helmet>
    BoxOffice
  </div>
);
