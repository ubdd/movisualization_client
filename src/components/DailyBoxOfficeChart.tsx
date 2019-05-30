import React from "react";
import chart from "billboard.js";
import { Moment } from "moment";
import styled from "styled-components";
import { Table as AntdTable } from "antd";
import { Link } from "react-router-dom";
import { koreanNumeral, media } from "../config/_mixin";
import { Switch } from "antd";

const align: "center" | "left" | "right" = "center";

const columns = [
  {
    title: "순위",
    dataIndex: "total_rank",
    key: "total_rank",
    align,
    sorter: (a: any, b: any) => a.total_rank - b.total_rank
  },
  {
    title: "순위 변동",
    dataIndex: "rank_inten",
    key: "rank_inten",
    align,
    sorter: (a: any, b: any) => a.rank_inten - b.rank_inten,
    render: (rank_inten: any, record: any) =>
      !rank_inten ? (
        record.rank_old_and_new ? (
          <span style={{ color: "goldenrod" }}>NEW</span>
        ) : (
          <span>{rank_inten}</span>
        )
      ) : rank_inten > 0 ? (
        <span style={{ color: "#51ca61" }}>+{rank_inten}</span>
      ) : (
        <span style={{ color: "#fd7150" }}>{rank_inten}</span>
      )
  },
  {
    title: "영화명",
    dataIndex: "movie_nm",
    key: "movie_nm",
    align,
    render: (movie_nm: any, record: any) => (
      <Link to={`/film/${record.tmdb_movie_id}`}>{movie_nm}</Link>
    )
  }
];

const DailyBoxOfficeChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.desktop} {
    flex-direction: column;
  }
`;

const Table = styled(AntdTable)`
  margin: 3rem 0;
`;

const BillboardContainer = styled.div`
  text-align: right;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Nanum Myeongjo", serif;
`;

const UBDImage = styled.div<{ showUBD: boolean }>`
  opacity: ${props => (props.showUBD ? "1" : "0")};
  margin: ${props => (props.showUBD ? "2rem 0" : "0")};
  width: 100%;
  height: ${props => (props.showUBD ? "356px" : "0px")};
  transition: 2s ease-in-out;
  background: linear-gradient(
      to right,
      rgba(20, 24, 28, 1),
      transparent,
      transparent,
      transparent,
      rgba(20, 24, 28, 1)
    ),
    linear-gradient(
      to bottom,
      rgba(20, 24, 28, 1),
      transparent,
      transparent,
      transparent,
      rgba(20, 24, 28, 1)
    ),
    url("https://w.namu.la/s/271e149e9ddeabf700ae2cd75d9661b7540b6dd7a1eaa2dc505919929427bd08344043674a11232c06fdc3e577ef9c8a982b7588869b023312e75cb2a31543b50a5e14c2f081eb56a515f4c69d8d945cd2e3077cfae09485fe279fd1ad6d9a34");
  background-position: center center;
  background-size: cover;
`;

interface Props {
  boxOfficeResult: any;
  height: number;
  targetDt: Moment;
}

interface State {
  myChart: any;
  dailyBoxOfficeList: any;
  showUBD: boolean;
}

export default class DailyBoxOfficeChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      myChart: null,
      dailyBoxOfficeList: null,
      showUBD: false
    };
  }

  componentDidMount = async () => {
    this._renderChart(this.props.boxOfficeResult);
  };

  _rerenderChart = (dailyBoxOfficeList: any) => {
    // json.date = json.date.slice(0, 10);
    let column: string[] = ["UBD"];
    let UBDArray: any[] = [];
    dailyBoxOfficeList.forEach((movie: any) => {
      const audie = parseInt(movie.audi_acc);
      UBDArray.push((audie / 170000).toFixed(2));
    });
    this.state.myChart.load({
      columns: [column.concat(UBDArray)]
    });
  };

  _renderChart = (dailyBoxOfficeList: any) => {
    let movie_nm: any = [];
    let sales_amt: any = [];
    let audi_cnt: any = [];
    dailyBoxOfficeList.forEach((boxOffice: any) => {
      movie_nm.push(boxOffice.movie_nm);
      sales_amt.push(parseInt(boxOffice.sales_amt));
      audi_cnt.push(boxOffice.audi_cnt);
    });
    const myChart = chart.generate({
      size: {
        height: this.props.height,
        width: 650
      },
      bindto: "#dailyBoxOffice",
      color: {
        pattern: ["#e94d3f", "#f2c431"]
      },
      data: {
        x: "movie_nm",
        json: { movie_nm, sales_amt, audi_cnt },
        axes: {
          sales_amt: "y",
          audi_cnt: "y2",
          movie_nm: "x"
        },
        types: {
          sales_amt: "bar",
          audi_cnt: "bar"
        },
        names: {
          sales_amt: `당일 수익`,
          audi_cnt: `당일 관객수`,
          movie_nm: "영화명"
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
            }
          },
          label: "영화명"
        }
      },
      tooltip: {
        format: {
          value: (value: number, ratio: any, id: any) => {
            if (id === "sales_amt") {
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
    let column: any[] = ["UBD"];
    let UBDArray: any[] = [];
    let maxArray: any[] = [];
    let categories: string[] = [];
    dailyBoxOfficeList.forEach((movie: any) => {
      UBDArray.push(0);
    });
    dailyBoxOfficeList.forEach((movie: any) => {
      const audie = parseInt(movie.audi_acc);
      maxArray.push((audie / 170000).toFixed(2));
    });
    dailyBoxOfficeList.forEach((movie: any) => categories.push(movie.movie_nm));
    const myChart = chart.generate({
      bindto: "#UBDChart",
      size: {
        width: 650,
        height: this.props.height
      },
      title: {
        text: `${this.props.targetDt.format("YYYY-MM-DD")} UBD`
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
        },
        y: {
          max: Math.max.apply(null, maxArray)
        }
      }
    });
    // this.setState({myCh})
    this.setState({ myChart }, () =>
      setTimeout(() => {
        this._rerenderChart(dailyBoxOfficeList);
      }, 500)
    );
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.showUBD !== this.state.showUBD) {
      this.state.showUBD
        ? this._renderUBDChart(this.props.boxOfficeResult)
        : this._renderChart(this.props.boxOfficeResult);
    }
    if (prevProps.boxOfficeResult !== this.props.boxOfficeResult) {
      this._renderChart(this.props.boxOfficeResult);
    }
  }

  toggleUBD = () => {
    this.setState({ showUBD: !this.state.showUBD });
  };

  render() {
    const { boxOfficeResult } = this.props;
    const { showUBD } = this.state;
    let chart = showUBD ? <div id="UBDChart" /> : <div id="dailyBoxOffice" />;

    return (
      <DailyBoxOfficeChartContainer>
        <Title>
          <span role="img" aria-label="popcorn">
            🍿
          </span>
          {this.props.targetDt.format("YYYY년 MM월 DD일")}{" "}
          <Link to={"/boxOffice"}>박스오피스</Link>
          <span role="img" aria-label="popcorn">
            🍿
          </span>
        </Title>
        <a
          target="_blank"
          style={{ width: "100%" }}
          href="https://namu.wiki/w/UBD"
        >
          <UBDImage showUBD={showUBD} />
        </a>
        <ChartContainer>
          {boxOfficeResult && (
            <>
              <Table
                dataSource={boxOfficeResult}
                columns={columns}
                bordered
                size="small"
                rowKey="uid"
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
            </>
          )}
        </ChartContainer>
      </DailyBoxOfficeChartContainer>
    );
  }
}
