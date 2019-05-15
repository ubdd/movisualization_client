import React from "react";
import bb from "billboard.js";
import { kobisApi } from "../api";

interface Props {}

interface State {
  boxOfficeList: string[];
}

class UBDCHart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      boxOfficeList: []
    };
  }

  componentDidMount = async () => {
    const {
      data: { boxOfficeResult }
    } = await kobisApi.get("", {
      params: {
        targetDt: "20190514"
      }
    });
    const { dailyBoxOfficeList: boxOfficeList } = boxOfficeResult;
    this.setState({ boxOfficeList });
    console.log(this.state);
    this.renderChart();
  };

  renderChart = () => {
    let column: string[] = ["UBD"];
    let UBDArray: any[] = [];
    this.state.boxOfficeList.map((movie: any) => {
      const audie = parseInt(movie.audiAcc);
      UBDArray.push((audie / 170000).toFixed(2));
    });
    bb.generate({
      bindto: "#UBDChart",
      data: {
        columns: [column.concat(UBDArray)],
        type: "bubble",
        labels: true
      },
      bubble: {
        maxR: (x: any) => 50
      },
      axis: {
        x: {
          type: "category",
          categories: this.state.boxOfficeList.map(
            (movie: any) => movie.movieNm
          )
        },
        y: {
          max: Math.max.apply(null, UBDArray) * 1.2,
          tick: {
            outer: false
          }
        }
      }
    });
  };

  render() {
    const { chartContainerStyle } = styles;
    return <div id="UBDChart" style={chartContainerStyle} />;
  }
}

const styles = {
  chartContainerStyle: {
    width: "65%",
    margin: "0 auto"
  }
};

export default UBDCHart;
