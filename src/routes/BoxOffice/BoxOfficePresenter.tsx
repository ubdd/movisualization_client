import React from "react";
import Helmet from "react-helmet";
import { websiteTitle } from "../../config/_mixin";
import MoviesBoxOfficeChart from "../../components/MoviesBoxOfficeChart";
import { Moment } from "moment";
import DateRangeFilter from "../../components/DateRangeFilter";

interface Props {
  moviesBoxOffice: any;
  from_dt: Moment;
  to_dt: Moment;
  changeRangePicker: (date: any, dateString: string[]) => void;
}

export const BoxOfficePresenter: React.SFC<Props> = ({
  moviesBoxOffice,
  from_dt,
  to_dt,
  changeRangePicker
}) => (
  <div>
    <Helmet>
      <title>Box office | {websiteTitle}</title>
    </Helmet>
    <DateRangeFilter
      changeRangePicker={changeRangePicker}
      from_dt={from_dt}
      to_dt={to_dt}
    />
    {moviesBoxOffice && (
      <MoviesBoxOfficeChart
        from_dt={from_dt}
        to_dt={to_dt}
        moviesBoxOffice={moviesBoxOffice}
      />
    )}
  </div>
);
