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
    } = await kobisApi.dailyBoxOffice({
      targetDt: "20190514"
    });
    const { dailyBoxOfficeList: boxOfficeList } = boxOfficeResult;
    this.setState({ boxOfficeList });
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
        labels: false,
        colors: { UBD: "white" }
      },
      point: {
        // pattern: ["<g><text x='5' y='25' style='font-size:2rem'>🚲</text></g>"]
        pattern: [
          `<svg y='-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="35" height="30"><g id="outline"><path style="stroke:white;" d="M49,26a12.933,12.933,0,0,0-4.246.726L40.525,17H46.5a1.5,1.5,0,0,1,0,3H44v2h2.5a3.5,3.5,0,0,0,0-7H39a1,1,0,0,0-.917,1.4l2,4.6H23.33l-1.173-3.665,3.364-1.122A2.162,2.162,0,0,0,24.838,12H17.414a2.414,2.414,0,0,0-1.707,4.121l.569.569a4.4,4.4,0,0,0,3.969,1.23l1.074,3.356a.977.977,0,0,0-.2.256l-2.938,5.55a13,13,0,1,0,7.066,16.245A3.986,3.986,0,0,0,28.8,45.98l.751,2.253a1,1,0,0,0,.925.684l3.5.083.046-2-2.8-.066-.456-1.366a3.95,3.95,0,0,0,1.3-6.1L42.081,25.6l.837,1.924A12.987,12.987,0,1,0,49,26ZM20.22,15.873a2.493,2.493,0,0,1-2.53-.6l-.569-.569A.414.414,0,0,1,17.414,14h7.424a.162.162,0,0,1,.051.316ZM13,50a11,11,0,1,1,4.241-21.148l-5.125,9.68a1,1,0,0,0,.7,1.45L23.574,42A11.012,11.012,0,0,1,13,50Zm10.947-9.962-9.427-1.77L19.005,29.8A11,11,0,0,1,24,39C24,39.35,23.98,39.7,23.947,40.038Zm2.032-.631c.005-.136.021-.27.021-.407a12.991,12.991,0,0,0-6.059-10.973l2.205-4.166,4.726,14.765A3.986,3.986,0,0,0,25.979,39.407Zm4.152,4.24L29.448,41.6l-1.9.632.506,1.52a1.992,1.992,0,1,1,2.073-.106Zm.325-5.363A3.966,3.966,0,0,0,29,38c-.076,0-.147.018-.222.022L23.97,23H40.953l.2.463ZM49,50a11,11,0,0,1-5.283-20.644L48.083,39.4l1.834-.8-4.365-10.04A11,11,0,1,1,49,50Z"/></g></svg>
          `
        ]
      },
      onrendered: function() {
        // or set unicode value as
        // this.defs.selectAll("text").text(() => "\uf21c");
      },
      axis: {
        rotated: true,
        x: {
          type: "category",
          categories: this.state.boxOfficeList.map(
            (movie: any) => movie.movieNm
          )
        },
        y: {
          // max: Math.max.apply(null, UBDArray) * 1.2,
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
