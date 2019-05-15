import React from "react";
import chart from "billboard.js";
import { kobisApi } from "../api";
import moment, { Moment } from "moment";
import styled from "styled-components";
import { Table as AntdTable } from "antd";
import { Link } from "react-router-dom";
import { koreanNumeral } from "../config/_mixin";
const align: "center" | "left" | "right" = "center";

const columns = [
  {
    title: "순위",
    dataIndex: "rank",
    key: "rank",
    align,
    sorter: (a: any, b: any) => a.rank - b.rank
  },
  {
    title: "순위 변동",
    dataIndex: "rankInten",
    key: "rankInten",
    align,
    sorter: (a: any, b: any) => a.rankInten - b.rankInten,
    render: (rankInten: any, record: any) =>
      rankInten === "0" ? (
        record.rankOldAndNew === "NEW" ? (
          <span style={{ color: "goldenrod" }}>{record.rankOldAndNew}</span>
        ) : (
          <span>{rankInten}</span>
        )
      ) : rankInten > 0 ? (
        <span style={{ color: "green" }}>+{rankInten}</span>
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
  }
  // {
  //   title: "총수익",
  //   dataIndex: "salesAcc",
  //   key: "salesAcc",
  //   align,
  //   render: (salesAcc: any) => `${numeral(salesAcc).format("0,0")}원`
  // },
  // {
  //   title: "당일 수익",
  //   dataIndex: "salesAmt",
  //   key: "salesAmt",
  //   align,
  //   render: (salesAmt: any) => `${numeral(salesAmt).format("0,0")}원`
  // },
  // {
  //   title: "당일 관객수",
  //   dataIndex: "audiCnt",
  //   key: "audiCnt",
  //   align,
  //   render: (audiCnt: any) => `${numeral(audiCnt).format("0,0")}명`
  // },
  // {
  //   title: "총 관객수",
  //   dataIndex: "audiAcc",
  //   key: "audiAcc",
  //   align,
  //   render: (audiAcc: any) => `${numeral(audiAcc).format("0,0")}명`
  // }
];

const ChartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Table = styled(AntdTable)`
  margin: 3rem 0;
`;

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
    let salesAmt: any = [];
    let audiCnt: any = [];
    dailyBoxOfficeList.forEach((boxOffice: any) => {
      movieNm.push(boxOffice.movieNm);
      salesAmt.push(parseInt(boxOffice.salesAmt));
      audiCnt.push(boxOffice.audiCnt);
    });
    const myChart = chart.generate({
      size: {
        height: 400,
        width: 650
      },
      title: {
        text: `${moment(Date.now())
          .subtract(1, "days")
          .format("YYYY-MM-DD")} 박스오피스`
      },
      bindto: "#dailyBoxOffice",
      data: {
        x: "movieNm",
        json: { movieNm, salesAmt, audiCnt },
        axes: {
          salesAmt: "y",
          audiCnt: "y2",
          movieNm: "x"
        },
        types: {
          salesAmt: "bar",
          audiCnt: "bar"
        },
        names: {
          salesAmt: `당일 수익`,
          audiCnt: `당일 관객수`,
          movieNm: "영화명"
        }
      },
      axis: {
        rotated: true,
        y: {
          label: "당일 수익",
          show: true,
          tick: {
            format: (value: number) => {
              return `${koreanNumeral(value)}원`;
            }
          }
        },
        y2: {
          label: "당일 관객수",
          show: true,
          tick: {
            format: (value: number) => {
              return `${koreanNumeral(value)}명`;
            }
          }
        },
        x: {
          type: "category",
          tick: {
            format: (idx: any, title: any) => {
              return title;
              // return title.length > 5 ? `${title.substring(0, 5)}...` : title;
            }
          },
          label: "영화명"
        }
      },
      tooltip: {
        format: {
          value: (value: number, ratio: any, id: any) => {
            console.log(value, ratio, id);
            if (id === "salesAmt") {
              return `${koreanNumeral(value)}원`;
            } else {
              return `${koreanNumeral(value)}명`;
            }
          }
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
        <Table
          dataSource={dailyBoxOfficeList}
          columns={columns}
          bordered
          size="small"
          pagination={false}
        />
      </ChartContainer>
    );
  }
}
