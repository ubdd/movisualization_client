import React from "react";
import chart from "billboard.js";
import styled from "styled-components";
// import "billboard.js/dist/theme/insight.css";
import "../../static/mytheme.css";
import { tmdbApis } from "../../api";

const LegendContainer = styled.div`
  width: 500px;
  height: 250px;
  text-align: left;
`;

interface Genres {
  id: number;
  name: string;
  count: number;
}

interface Props {
  id: string;
  getAPI: any;
}

interface State {
  genreName: Genres[];
}

class PersonGenrePref extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      genreName: []
    };
  }

  componentDidMount = async () => {
    const { id, getAPI } = this.props;
    const { data: genreRes } = await tmdbApis.genres();
    const { data: filmo } = await getAPI(id);
    this._getGenres(filmo.cast, genreRes);
    this._sortGenres(this.state.genreName);
  };

  _getGenres = (movies: any, genreRes: any) => {
    const { genres: genres } = genreRes;
    movies.map((movie: any) => {
      movie.genre_ids.forEach((genre_id: any) => {
        let genreIndex = genres.findIndex((x: any) => x.id == genre_id);
        if (!genres[genreIndex].count) {
          genres[genreIndex].count = 1;
        } else {
          genres[genreIndex].count += 1;
        }
      });
    });
    genres.forEach((genre: any) => delete genre.id);
    this.setState({
      genreName: genres.filter((genre: any) => genre.count)
    });
  };

  _sortGenres = (genres: any) => {
    genres.sort((a: any, b: any) => b.count - a.count);
    this.setState({ genreName: genres });
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (prevState !== this.state) {
      this._renderChart();
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
      },
      legend: {
        position: "right"
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <LegendContainer id="personGenrePref" />
      </React.Fragment>
    );
  }
}

export default PersonGenrePref;
