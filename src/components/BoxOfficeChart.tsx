import React from "react";
import styled from "styled-components";
import chart from "billboard.js";
import moment from "moment";
import { DailyRandAudiCnt } from "../shared-interfaces";

// const tick: number = 4000;

interface Props {
  dailyRankAudiCnt: DailyRandAudiCnt | null;
}

interface State {
  myChart: any;
}

const ChartContainer = styled.div``;

/*

  Chart1: 한 영화의 날짜별 박스 오피스 데이터(당일 관객수, 누적 관객수, 순위, 매출액)를 보여줍니다.
  세 영화(어벤져스: 엔드게임, 어스, 돈)가 번갈아서 보여집니다.

*/
export default class BoxOfficeChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      myChart: null
    };
  }
  componentDidMount = async () => {
    this._renderChart(this.props.dailyRankAudiCnt);
    // setTimeout(() => {
    //   this._rerenderChart(usDailyRankAudiCnt);
    // }, tick);
    // setTimeout(() => {
    //   this._rerenderChart(moneyDailyRankAudiCnt);
    // }, tick * 2);
    // setInterval(() => {
    //   this._rerenderChart(endgameDailyRankAudiCnt);
    //   setTimeout(() => {
    //     this._rerenderChart(usDailyRankAudiCnt);
    //   }, tick);
    //   setTimeout(() => {
    //     this._rerenderChart(moneyDailyRankAudiCnt);
    //   }, tick * 2);
    // }, tick * 3);
  };

  _rerenderChart = (api: any) => {
    const { data: json, movieNm } = api;
    // json.date = json.date.slice(0, 10);
    this.state.myChart.load({
      names: {
        rank: `《${movieNm}》 순위`,
        audiCnt: `《${movieNm}》 당일 관객수`
      },
      json
    });
  };

  _renderChart = (api: any) => {
    /*

      json 구조:  { date, rank, audiCnt }
      ( object이기 때문에 순서 상관 없습니다. )

      axis의 object는 x, y, y2로 꼭 정해진 값을 사용해야 합니다.

      */
    const { data: json, movieNm } = api;
    // json.date = json.date.slice(0, 10);
    const myChart = chart.generate({
      title: {
        text: `박스오피스 순위 & 당일 관객수`
      },
      bindto: "#chart1",
      data: {
        x: "date",
        xFormat: "%Y-%m-%d",
        json: json,
        axes: {
          rank: "y",
          audiCnt: "y2"
        },
        types: {
          rank: "step",
          audiCnt: "area-spline"
        },
        names: {
          rank: `《${movieNm}》 순위`,
          audiCnt: `《${movieNm}》 당일 관객수`
        }
      },
      axis: {
        y: {
          label: "순위",
          inverted: true
        },
        y2: {
          label: "당일 관객수",
          show: true
        },
        x: {
          label: "날짜",
          color: "white",
          type: "timeseries",
          localtime: true,
          tick: {
            culling: {
              max: 7
            },
            format: "%Y-%m-%d"
          }
        }
      },
      colors: {
        rank: "#ff0000",
        audiCnt: "#00ff00",
        date: "#0000ff"
      },
      zoom: {
        enabled: {
          type: "drag"
        }
      },
      tooltip: {
        format: {
          title: (d: any) => {
            return moment(d).format("YYYY-MM-DD");
          }
        }
      }
    });
    this.setState({ myChart });
  };

  render() {
    console.log(this.props);
    return <ChartContainer id="chart1" />;
  }
}
