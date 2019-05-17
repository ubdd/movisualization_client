import React from "react";
import Helmet from "react-helmet";
import { websiteTitle } from "../../config/_mixin";
import DailyBoxOfficeChart from "../../components/DailyBoxOfficeChart";
import { DatePicker } from "antd";
import { Moment } from "moment";
import MoviesBoxOfficeChart from "../../components/MoviesBoxOfficeChart";
import DateRangeFilter from "../../components/DateRangeFilter";
import styled from "styled-components";

interface Props {
  boxOfficeResult: any[];
  loading: boolean;
  moviesBoxOffice: any;
  from_dt: Moment;
  to_dt: Moment;
  target_dt: Moment;
  changeDate: (date: Moment, dateString: string) => void;
  changeRangePicker: (date: any, dateString: string[]) => void;
}

const Container = styled.div`
  margin: 2rem 0;
`;

const DailyBoxOfficeContainer = styled.div`
  margin-top: 2.5rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const ChartTitle = styled.div`
  font-size: 1.4rem;
  margin: 1rem 0;
`;

export const BoxOfficePresenter: React.SFC<Props> = ({
  boxOfficeResult,
  loading,
  changeDate,
  moviesBoxOffice,
  from_dt,
  to_dt,
  target_dt,
  changeRangePicker
}) => {
  return (
    <div>
      <Helmet>
        <title>Box office | {websiteTitle}</title>
      </Helmet>
      {!loading ? (
        <Container>
          <ChartTitle>📉 기간별 박스오피스 순위 변동</ChartTitle>
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
          <DailyBoxOfficeContainer>
            <ChartTitle>📊 날짜별 박스오피스 순위 </ChartTitle>
            <DatePicker onChange={changeDate} defaultValue={target_dt} />
            <DailyBoxOfficeChart
              boxOfficeResult={boxOfficeResult}
              height={1060}
              targetDt={target_dt}
            />
          </DailyBoxOfficeContainer>
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
};
