import React from "react";
import chart from "billboard.js";
import { normalize } from "../../config/_mixin";
import { ubdPersonApis } from "../../api";

interface Props {
  person: any;
  id: string;
}

interface State {
  audie_acc: number;
  avg_rate: number;
  search_cnt: number;
  filmo_cnt: number;
  popularity: number;
}

class PersonStat extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      audie_acc: 4.6,
      avg_rate: 3.7,
      search_cnt: 4,
      filmo_cnt: 0,
      popularity: 0
    };
  }

  componentDidMount = () => {
    this._getFilmoInfo();
  };

  _getFilmoInfo = async () => {
    const { id } = this.props;
    const { data } = await ubdPersonApis.stat(id);
    console.log(data);
    this.setState({
      avg_rate: data.avg_rate / 2,
      filmo_cnt: data.filmo_cnt,
      popularity: data.popularity,
      search_cnt: data.search_cnt
    });
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (prevState !== this.state) {
      this._renderChart();
    }
  };

  _renderChart = () => {
    const { person } = this.props;
    chart.generate({
      bindto: "#personStat",
      data: {
        x: "x",
        columns: [
          ["x", "관객수", "평균평점", "네이버 검색량", "인기도", "작품수"],
          [
            "배우 스탯",
            this.state.audie_acc,
            this.state.avg_rate.toFixed(2),
            normalize(this.state.search_cnt, 0, 1000000, 0, 5, 2),
            normalize(person.popularity, 0, 40, 0, 5, 2),
            normalize(this.state.filmo_cnt, 0, 240, 0, 5, 2)
          ]
        ],
        type: "radar",
        colors: { "배우 스탯": "#f2c431" }
      },
      legend: {
        show: false
      },
      radar: {
        size: {
          ratio: 0.75
          // width: 250
        },
        axis: {
          max: 5
        },
        level: {
          depth: 5
        }
      },
      size: {
        width: 400,
        height: 250
      }
    });
  };

  render() {
    return <div id="personStat" />;
  }
}

export default PersonStat;
