import React from "react";
import styled from "styled-components";
import chart from "billboard.js";
import moment, { Moment } from "moment";

interface Props {
  moviesBoxOffice: any;
  from_dt: Moment;
  to_dt: Moment;
}

interface State {
  myChart: any;
}

const ChartContainer = styled.div``;

/*

  Chart2: 한 화면에 세 영화의 박스오피스 정보를 보여줍니다.

  */
export default class MoviesBoxOfficeChart extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      myChart: null
    };
  }
  componentDidMount = async () => {
    const { moviesBoxOffice } = this.props;
    this._renderChart(moviesBoxOffice);
  };

  componentDidUpdate = async (prevProps: Props, prevState: State) => {
    if (
      this.props.from_dt !== prevProps.from_dt ||
      this.props.to_dt !== prevProps.to_dt ||
      this.props.moviesBoxOffice !== prevProps.moviesBoxOffice
    ) {
      const { moviesBoxOffice } = this.props;
      this._renderChart(moviesBoxOffice);
    }
  };

  _rerenderChart = (moviesBoxOffice: object[]) => {
    console.log(moviesBoxOffice);
    let json = {};
    let xs = {};
    let names = {};
    moviesBoxOffice.forEach((movieBoxOffice: any, idx: number) => {
      const { total_rank, date } = movieBoxOffice;
      json[`rank${idx}`] = total_rank;
      json[`date${idx}`] = date;
      xs[`rank${idx}`] = `date${idx}`;
      names[`rank${idx}`] = movieBoxOffice.movie_name;
    });
    this.state.myChart.load({
      xs,
      json,
      names
    });
  };

  _renderChart = (moviesBoxOffice: object[]) => {
    /*

      json 구조:  { rank1, date1, rank2, date2, ... }
      ( object이기 때문에 순서 상관 없습니다. )
      
      xs   구조:  { rank1: "date1", rank2: "date2", ... }
      ( object이기 때문에 순서는 상관 없지만 key와 value가 바뀌어서는 안됩니다. )
    
      */
    let json = {};
    let xs = {};
    let names = {};
    moviesBoxOffice.forEach((movieBoxOffice: any, idx: number) => {
      const { total_rank, date } = movieBoxOffice;
      json[`rank${idx}`] = total_rank;
      json[`date${idx}`] = date;
      xs[`rank${idx}`] = `date${idx}`;
      names[`rank${idx}`] = movieBoxOffice.movie_name;
    });
    const myChart = chart.generate({
      bindto: "#chart2",
      data: {
        xs,
        json,
        names
      },
      axis: {
        y: {
          inverted: true
        },
        x: {
          type: "timeseries",
          localtime: true,
          tick: {
            format: "%Y-%m-%d"
          }
        }
      },
      tooltip: {
        format: {
          title: (d: any) => {
            return moment(d).format("YYYY-MM-DD");
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
    return <ChartContainer id="chart2" />;
  }
}
