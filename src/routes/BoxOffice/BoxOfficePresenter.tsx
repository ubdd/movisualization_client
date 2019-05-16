import React from "react";
import Helmet from "react-helmet";
import { websiteTitle } from "../../config/_mixin";
import DailyBoxOfficeChart from "../../components/DailyBoxOfficeChart";
import { DatePicker } from "antd";
import { Moment } from "moment";

interface Props {
  boxOfficeResult: any[];
  loading: boolean;
  changeDate: (date: Moment, dateString: string) => void;
}

export const BoxOfficePresenter: React.SFC<Props> = ({
  boxOfficeResult,
  loading,
  changeDate
}) => {
  return (
    <div>
      <Helmet>
        <title>Box office | {websiteTitle}</title>
      </Helmet>
      {!loading ? (
        <React.Fragment>
          <DatePicker onChange={changeDate} />
          <DailyBoxOfficeChart
            boxOfficeResult={boxOfficeResult}
            height={1060}
          />
        </React.Fragment>
      ) : (
        <></>
      )}
    </div>
  );
};
