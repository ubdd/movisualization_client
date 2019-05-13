import React from "react";
import chart from "billboard.js";
import "billboard.js/dist/billboard.css";
import { moviesApi } from "../../api";

interface Genres {
  id: number;
  name: string;
  count: number;
}

interface IProps {
  id: string;
  getAPI: any;
}

interface IState {
  genreName: Genres[];
}

class PersonGenrePref extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      genreName: []
    };
  }

  componentDidMount = () => {
    // this._getGenreNamebyId();
    this._getGenres();
  };

  // _getGenreNamebyId = async () => {
  //   this.setState({ genreName: genres });
  // };

  _getGenres = async () => {
    const { id, getAPI } = this.props;
    const { data: cast } = await getAPI(id);
    const { data: genreRes } = await moviesApi.genres();
    const { genres: genres } = genreRes;
    cast.cast.map((cast: any) => {
      cast.genre_ids.map((genre_id: any) => {
        let genreIndex = genres.findIndex((x: any) => x.id == genre_id);
        if (!genres[genreIndex].count) {
          genres[genreIndex].count = 1;
        } else {
          genres[genreIndex].count += 1;
        }
      });
    });
    genres.map((genre: any) => delete genre.id);
    genres.sort((a: any, b: any) => (a.count > b.count ? -1 : 1));
    this.setState({
      genreName: genres.filter((genre: any) => genre.count)
    });
  };

  componentDidUpdate = (prevProps: IProps, prevState: IState) => {
    if (prevState !== this.state) {
      this._renderChart();
      console.log(this.state);
    }
  };

  _renderChart = () => {
    chart.generate({
      bindto: "#personGenrePref",
      data: {
        columns: this.state.genreName.map(genre => Object.values(genre)),
        type: "pie"
      },
      pie: {
        padding: 0
      }
    });
  };

  render() {
    return <div id="personGenrePref" />;
  }
}

export default PersonGenrePref;
