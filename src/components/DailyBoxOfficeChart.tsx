import React from "react";
import chart from "billboard.js";
import { kobisApi } from "../api";
import moment, { Moment } from "moment";
import styled from "styled-components";
import { Table as AntdTable } from "antd";
import { Link } from "react-router-dom";
import { koreanNumeral } from "../config/_mixin";
import { Switch } from "antd";

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

const BillboardContainer = styled.div`
  text-align: right;
`;

interface Props {}

interface State {
  myChart: any;
  dailyBoxOfficeList: any;
  targetDt: Moment;
  showUBD: boolean;
}

export default class DailyBoxOfficeChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      myChart: null,
      dailyBoxOfficeList: null,
      targetDt: moment(Date.now()).subtract(1, "days"),
      showUBD: false
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
        height: 380,
        width: 650
      },
      title: {
        text: `${moment(Date.now())
          .subtract(1, "days")
          .format("YYYY-MM-DD")} 박스오피스`
      },
      bindto: "#dailyBoxOffice",
      color: {
        pattern: ["#e94d3f", "#f2c431"]
      },
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
          label: "당일 수익(억 원)",
          show: true,
          tick: {
            format: (value: number) => {
              return `${koreanNumeral(value, false)}`;
            }
          }
        },
        y2: {
          label: "당일 관객수(만 명)",
          show: true,
          tick: {
            format: (value: number) => {
              return `${koreanNumeral(value, false)}`;
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
              return `${koreanNumeral(value, true)}원`;
            } else {
              return `${koreanNumeral(value, true)}명`;
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

  _renderUBDChart = (dailyBoxOfficeList: any) => {
    let column: string[] = ["UBD"];
    let UBDArray: any[] = [];
    let categories: string[] = [];
    dailyBoxOfficeList.forEach((movie: any) => {
      const audie = parseInt(movie.audiAcc);
      UBDArray.push((audie / 170000).toFixed(2));
    });
    dailyBoxOfficeList.forEach((movie: any) => categories.push(movie.movieNm));
    const myChart = chart.generate({
      bindto: "#UBDChart",
      size: {
        height: 380,
        width: 650
      },
      title: {
        text: `${moment(Date.now())
          .subtract(1, "days")
          .format("YYYY-MM-DD")} UBD`
      },
      data: {
        columns: [column.concat(UBDArray)],
        labels: false,
        colors: { UBD: "#f2c431" }
      },
      point: {
        pattern: [
          `<svg y='-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="35" height="30"><g id="outline"><path style="stroke:#f2c431;" d="M49,26a12.933,12.933,0,0,0-4.246.726L40.525,17H46.5a1.5,1.5,0,0,1,0,3H44v2h2.5a3.5,3.5,0,0,0,0-7H39a1,1,0,0,0-.917,1.4l2,4.6H23.33l-1.173-3.665,3.364-1.122A2.162,2.162,0,0,0,24.838,12H17.414a2.414,2.414,0,0,0-1.707,4.121l.569.569a4.4,4.4,0,0,0,3.969,1.23l1.074,3.356a.977.977,0,0,0-.2.256l-2.938,5.55a13,13,0,1,0,7.066,16.245A3.986,3.986,0,0,0,28.8,45.98l.751,2.253a1,1,0,0,0,.925.684l3.5.083.046-2-2.8-.066-.456-1.366a3.95,3.95,0,0,0,1.3-6.1L42.081,25.6l.837,1.924A12.987,12.987,0,1,0,49,26ZM20.22,15.873a2.493,2.493,0,0,1-2.53-.6l-.569-.569A.414.414,0,0,1,17.414,14h7.424a.162.162,0,0,1,.051.316ZM13,50a11,11,0,1,1,4.241-21.148l-5.125,9.68a1,1,0,0,0,.7,1.45L23.574,42A11.012,11.012,0,0,1,13,50Zm10.947-9.962-9.427-1.77L19.005,29.8A11,11,0,0,1,24,39C24,39.35,23.98,39.7,23.947,40.038Zm2.032-.631c.005-.136.021-.27.021-.407a12.991,12.991,0,0,0-6.059-10.973l2.205-4.166,4.726,14.765A3.986,3.986,0,0,0,25.979,39.407Zm4.152,4.24L29.448,41.6l-1.9.632.506,1.52a1.992,1.992,0,1,1,2.073-.106Zm.325-5.363A3.966,3.966,0,0,0,29,38c-.076,0-.147.018-.222.022L23.97,23H40.953l.2.463ZM49,50a11,11,0,0,1-5.283-20.644L48.083,39.4l1.834-.8-4.365-10.04A11,11,0,1,1,49,50Z"/></g></svg>
          `
        ]
      },
      axis: {
        rotated: true,
        x: {
          type: "category",
          categories: categories
        }
      }
    });
    this.setState({ myChart });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.showUBD !== this.state.showUBD) {
      this.state.showUBD
        ? this._renderUBDChart(this.state.dailyBoxOfficeList)
        : this._renderChart(this.state.dailyBoxOfficeList);
    }
  }

  toggleUBD = () => {
    this.setState({ showUBD: !this.state.showUBD });
  };

  render() {
    const { dailyBoxOfficeList } = this.state;
    let chart = this.state.showUBD ? (
      <div id="UBDChart" />
    ) : (
      <div id="dailyBoxOffice" />
    );

    return (
      <ChartContainer>
        <Table
          dataSource={dailyBoxOfficeList}
          columns={columns}
          bordered
          size="small"
          pagination={false}
        />
        <BillboardContainer>
          <Switch
            onClick={this.toggleUBD}
            checkedChildren="🍿"
            unCheckedChildren="🚲"
          />
          {chart}
        </BillboardContainer>
      </ChartContainer>
    );
  }
}
