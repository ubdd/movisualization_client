import React from "react";
import chart from "billboard.js";
import { kobisApi } from "../api";
import moment, { Moment } from "moment";
import styled from "styled-components";
import { Table as AntdTable } from "antd";
import { Link } from "react-router-dom";
const numeral = require("numeral");
const align: "center" | "left" | "right" = "center";

const columns = [
  {
    title: "순위",
    dataIndex: "rank",
    key: "rank",
    align
  },
  {
    title: "순위 변동",
    dataIndex: "rankInten",
    key: "rankInten",
    align,
    render: (rankInten: any, record: any) =>
      rankInten === "0" ? (
        record.rankOldAndNew === "NEW" ? (
          <span style={{ color: "goldenrod" }}>{record.rankOldAndNew}</span>
        ) : (
          <span>{rankInten}</span>
        )
      ) : rankInten > 0 ? (
        <span style={{ color: "green" }}>{rankInten}</span>
      ) : (
        <span style={{ color: "red" }}>{rankInten}</span>
      )
  },
  {
    title: "영화명",
    dataIndex: "movieNm",
    key: "movieNm",
    align,
    render: (movieNm: any, record: any) => (
      <Link to={`/film/${record.movieCd}`}>{movieNm}</Link>
    )
  },
  {
    title: "총수익",
    dataIndex: "salesAcc",
    key: "salesAcc",
    align,
    render: (salesAcc: any) => `${numeral(salesAcc).format("0,0")}원`
  },
  {
    title: "당일 수익",
    dataIndex: "salesAmt",
    key: "salesAmt",
    align,
    render: (salesAmt: any) => `${numeral(salesAmt).format("0,0")}원`
  },
  {
    title: "당일 관객수",
    dataIndex: "audiCnt",
    key: "audiCnt",
    align,
    render: (audiCnt: any) => `${numeral(audiCnt).format("0,0")}명`
  },
  {
    title: "총 관객수",
    dataIndex: "audiAcc",
    key: "audiAcc",
    align,
    render: (audiAcc: any) => `${numeral(audiAcc).format("0,0")}명`
  }
];

const ChartContainer = styled.div`
  position: relative;
  z-index: 1;
  a {
    color: black;
  }
`;

const Table = styled(AntdTable)`
  margin: 3rem 0;
`;
// const Movie = styled.div`
//   display: flex;
// `;

// const Rank = styled.div`
//   margin: 0.5rem;
//   min-width: 2rem;
// `;

// const RankOldAndNew = styled.div`
//   margin: 0.5rem;
//   min-width: 2rem;
// `;

// const RankInten = styled.div`
//   margin: 0.5rem;
//   min-width: 2rem;
// `;
// const MovieName = styled.div`
//   margin: 0.5rem;
//   min-width: 12rem;
// `;
// const SalesAmout = styled.div`
//   margin: 0.5rem;
//   min-width: 10rem;
// `;
// const AudienceCount = styled.div`
//   margin: 0.5rem;
// `;

interface Props {}

interface State {
  myChart: any;
  dailyBoxOfficeList: any;
  targetDt: Moment;
}

export default class DailyBoxOfficeChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      myChart: null,
      dailyBoxOfficeList: null,
      targetDt: moment(Date.now()).subtract(1, "days")
    };
  }

  componentDidMount = async () => {
    const {
      data: {
        boxOfficeResult: { dailyBoxOfficeList }
      }
    } = await kobisApi.dailyBoxOffice({
      targetDt: this.state.targetDt.format("YYYYMMDD")
    });
    this.setState({ dailyBoxOfficeList });
    this._renderChart(dailyBoxOfficeList);
  };

  //   _rerenderChart = (dailyBoxOfficeList: any) => {
  //     // json.date = json.date.slice(0, 10);
  //     this.state.myChart.load({
  //       names: {
  //         rank: `《${movieNm}》 순위`,
  //         audiCnt: `《${movieNm}》 당일 관객수`
  //       },
  //       json
  //     });
  //   };

  _renderChart = (dailyBoxOfficeList: any) => {
    let movieNm: any = [];
    let salesAcc: any = [];
    let audiCnt: any = [];
    dailyBoxOfficeList.forEach((boxOffice: any) => {
      movieNm.push(boxOffice.movieNm);
      salesAcc.push(boxOffice.salesAcc);
      audiCnt.push(boxOffice.audiCnt);
    });
    const myChart = chart.generate({
      size: {
        height: 500
      },
      title: {
        text: `${moment(Date.now())
          .subtract(1, "days")
          .format("YYYY-MM-DD")} 박스오피스`
      },
      bindto: "#dailyBoxOffice",
      data: {
        x: "movieNm",
        json: { movieNm, salesAcc, audiCnt },
        axes: {
          salesAcc: "y",
          audiCnt: "y2",
          movieNm: "x"
        },
        types: {
          salesAcc: "line",
          audiCnt: "area-spline"
        },
        names: {
          salesAcc: `총수익`,
          audiCnt: `당일 관객수`,
          movieNm: "영화명"
        }
      },
      axis: {
        y: {
          label: "총수익"
        },
        y2: {
          label: "당일 관객수",
          show: true
        },
        x: {
          type: "category",
          tick: {
            rotate: 45,
            multiline: false,
            tooltip: true,
            height: 130
          },
          label: "영화명"
        }
      },
      tooltip: {
        format: {
          //   value: (values: any, ratio: any, id: any) => {
          //     let format =
          //       id === "salesAmt" ? chart.format("원") : chart.format("명");
          //     return format;
          //   }
        }
      },
      zoom: {
        enabled: {
          type: "drag"
        }
      }
    });
    this.setState({ myChart });
  };
  render() {
    const { dailyBoxOfficeList } = this.state;
    return (
      <ChartContainer>
        <div id="dailyBoxOffice" />

        {this.state.targetDt.format("L")}
        <Table
          dataSource={dailyBoxOfficeList}
          columns={columns}
          bordered
          size="small"
          pagination={false}
        />

        {/* {dailyBoxOfficeList &&
            dailyBoxOfficeList.map((boxOffice: any) => (
              <Movie>
                <Rank>{boxOffice.rank}</Rank>
                {boxOffice.rankOldAndNew === "NEW" ? (
                  <RankOldAndNew>{boxOffice.rankOldAndNew}</RankOldAndNew>
                ) : (
                  <RankInten>{boxOffice.rankInten}</RankInten>
                )}
                <MovieName>{boxOffice.movieNm}</MovieName>
                <SalesAmout>
                  {numeral(boxOffice.salesAmt).format("0,0")}원
                </SalesAmout>
                <AudienceCount>
                  {numeral(boxOffice.audiCnt).format("0,0")}명
                </AudienceCount>
              </Movie>
            ))} */}
      </ChartContainer>
    );
  }
}
