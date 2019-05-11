import React from "react";
import chart from "billboard.js";
import "billboard.js/dist/billboard.css";

interface IProps {
  id: string;
  getAPI: any;
}

interface IState {
  genres: object;
}

class PersonGenrePref extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      genres: {}
    };
  }

  componentDidMount = () => {
    this._getGenres();
  };

  _getGenres = async () => {
    const { id, getAPI } = this.props;
    const { data: cast } = await getAPI(id);
    let genres: object = {};
    cast.cast.map((cast: any) => {
      cast.genre_ids.map((genre_id: any) => {
        genres[genre_id] ? (genres[genre_id] += 1) : (genres[genre_id] = 1);
      });
    });
    this.setState({ genres });
  };

  componentDidUpdate = (prevProps: IProps, prevState: IState) => {
    if (prevState !== this.state) {
      console.log(this.state.genres);
      this._renderChart();
    }
  };

  _renderChart = () => {
    chart.generate({
      bindto: "#personGenrePref",
      data: {
        columns: Object.entries(this.state.genres),
        type: "pie"
      }
    });
  };

  render() {
    return <div id="personGenrePref" />;
  }
}

export default PersonGenrePref;
