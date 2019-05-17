import React from "react";
import chart from "billboard.js";
import { tmdbApis } from "../../api";
import { genreWithEmoji } from "../../config/_mixin";
import { Genre } from "../../shared-interfaces";
import styled from "styled-components";

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

const GenreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-family: Helvetica, "Apple SD Gothic Neo", Arial, sans-serif,
    "nanumgothic", "Dotum";
  font-size: 1rem;
  margin: 0.7rem 0;
  text-align: center;
`;

const Highlight = styled.span`
  color: #e94d3f;
  font-weight: 800;
`;

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
    console.log(this.state.genreName[0].name);
  };

  _getGenres = (movies: any, genres: GenreWithCount[]) => {
    movies.forEach((movie: any) => {
      movie.genre_ids.forEach((genre_id: number) => {
        let genreIndex = genres.findIndex((x: any) => x.id === genre_id);
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
        padding: 0,
        label: {
          format: (value: number) => value + "편"
        }
      },
      legend: {
        position: "right"
      },
      size: {
        width: 400,
        height: 250
      }
    });
  };

  render() {
    const topGenre =
      this.state.genreName[0] && genreWithEmoji(this.state.genreName[0].name);
    return (
      <GenreContainer>
        <div id="personGenrePref" />
        <Title>
          <Highlight>{topGenre}</Highlight> 장르의 영화에 가장 많이 출연했어요
        </Title>
      </GenreContainer>
    );
  }
}

export default PersonGenrePref;
