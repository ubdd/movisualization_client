import React from "react";
import chart from "billboard.js";
import { normalize } from "../../config/_mixin";

interface Props {
  person: any;
  id: string;
  getAPI: any;
}

interface State {
  audieAcc: number;
  avgRate: number;
  trend: number;
  filmoCnt: number;
}

class PersonStat extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      audieAcc: 4.6,
      avgRate: 3.7,
      trend: 4,
      filmoCnt: 0
    };
  }

  componentDidMount = () => {
    this._getFilmoInfo();
  };

  _getFilmoInfo = async () => {
    const { id, getAPI } = this.props;
    let vote_average = 0;
    const {
      data: { cast, crew }
    } = await getAPI(id);
    let total_filmo = cast.length;
    cast.forEach((cast: any) => {
      vote_average += cast.vote_average;
      if (cast.vote_average === 0) total_filmo--;
    });
    this.setState({
      filmoCnt: cast.length + crew.length,
      avgRate: vote_average / total_filmo / 2
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
          ["x", "관객수", "평균평점", "화제도", "인기도", "작품수"],
          [
            "배우 스탯",
            this.state.audieAcc,
            this.state.avgRate.toFixed(2),
            this.state.trend,
            normalize(person.popularity, 0, 40, 0, 5, 2),
            normalize(this.state.filmoCnt, 0, 240, 0, 5, 2)
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
