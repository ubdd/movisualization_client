import React from "react";
import chart from "billboard.js";

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
      filmoCnt: 4.8
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
      filmoCnt: (cast.length + crew.length) / 10,
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
            this.state.avgRate,
            this.state.trend,
            (person.popularity / 9).toFixed(2),
            this.state.filmoCnt
          ]
        ],
        type: "radar",
        colors: { "배우 스탯": "#dba506" }
      },
      radar: {
        axis: {
          max: 5
        },
        level: {
          depth: 5
        }
      }
    });
  };

  render() {
    return <div id="personStat" />;
  }
}

export default PersonStat;
