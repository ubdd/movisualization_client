import React from "react";
import chart from "billboard.js";
import styled from "styled-components";
import { tmdbApis } from "../../api";
import { genreWithEmoji } from "../../config/_mixin";
import { Genre } from "../../shared-interfaces";

const LegendContainer = styled.div`
  width: 500px;
  height: 250px;
  text-align: left;
`;

interface GenreWithCount extends Genre {
  count: number;
}

interface Props {
  id: string;
  getAPI: any;
}

interface State {
  genreName: GenreWithCount[];
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
    const {
      data: { genres }
    } = await tmdbApis.genres();
    const {
      data: { cast: movies }
    } = await getAPI(id);
    this._getGenres(movies, genres);
    this._renderChart();
  };

  _getGenres = (movies: any, genres: GenreWithCount[]) => {
    movies.forEach((movie: any) => {
      movie.genre_ids.forEach((genre_id: number) => {
        let genreIndex = genres.findIndex((x: any) => x.id == genre_id);
        if (!genres[genreIndex].count) {
          genres[genreIndex].count = 1;
        } else {
          genres[genreIndex].count += 1;
        }
      });
    });
    this._sortGenres(genres.filter((genre: any) => genre.count));
  };

  _sortGenres = (genres: GenreWithCount[]) => {
    genres.sort((a: GenreWithCount, b: GenreWithCount) => b.count - a.count);
    this.setState({ genreName: genres });
  };

  _renderChart = () => {
    chart.generate({
      bindto: "#personGenrePref",
      data: {
        columns: this.state.genreName.map((genre: GenreWithCount) => {
          return [genreWithEmoji(genre.name), genre.count];
        }),
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
    return <LegendContainer id="personGenrePref" />;
  }
}

export default PersonGenrePref;
