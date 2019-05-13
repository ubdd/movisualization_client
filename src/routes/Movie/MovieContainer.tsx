import React from "react";
import { MoviePresenter } from "./MoviePresenter";
import { tmdbApis } from "../../api";
import { ICrew, DailyRandAudiCnt, Movie } from "../../shared-interfaces";
import { normalize } from "../../config/_mixin";
import { usDailyRankAudiCnt } from "../../static/dummy/us";

interface Props {
  match: {
    params: {
      movieId: string;
    };
  };
  history: {
    push: any;
  };
}
interface State {
  result: Movie | null;
  recommendation: any;
  similar: any;
  cast: any;
  directors: any;
  producers: any;
  writers: any;
  editors: any;
  cinematographies: any;
  productionDesigns: any;
  composers: any;
  costumes: any;
  creditIndex: number;
  error: string | null;
  loading: boolean;
  activeVideo: boolean;
  videoKey: string;
}

export default class MovieDetailContainer extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      result: null,
      recommendation: null,
      similar: null,
      cast: null,
      directors: null,
      producers: null,
      writers: null,
      editors: null,
      cinematographies: null,
      productionDesigns: null,
      composers: null,
      costumes: null,
      creditIndex: 0,
      error: null,
      loading: true,
      activeVideo: false,
      videoKey: ""
    };
  }

  componentDidMount = async () => {
    try {
      const {
        match: {
          params: { movieId }
        },
        history: { push }
      } = this.props;
      const parsedId = parseInt(movieId);
      if (isNaN(parsedId)) {
        return push("/");
      }
      try {
        const { data: result } = await tmdbApis.detail(parsedId);
        const { data: credit } = await tmdbApis.credit(parsedId);
        const { cast, crew } = credit;
        const directors = crew.filter(
          (people: ICrew) => people.department === "Directing"
        );
        const producers = crew.filter(
          (people: ICrew) => people.department === "Production"
        );
        const writers = crew.filter(
          (people: ICrew) => people.department === "Writing"
        );
        const editors = crew.filter(
          (people: ICrew) => people.department === "Editing"
        );
        const cinematographies = crew.filter(
          (people: ICrew) => people.department === "Camera"
        );
        const productionDesigns = crew.filter(
          (people: ICrew) => people.department === "Art"
        );
        const composers = crew.filter(
          (people: ICrew) => people.department === "Sound"
        );
        const costumes = crew.filter(
          (people: any) => people.department === "Costume & Make-Up"
        );
        this.setState({
          result,
          cast,
          directors,
          producers,
          writers,
          editors,
          cinematographies,
          productionDesigns,
          composers,
          costumes,
          loading: false
        });
      } catch (error) {
        this.setState({ error: error.message });
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  componentDidUpdate = async (prevProps: any, prevState: any) => {
    if (this.props.match.params.movieId !== prevProps.match.params.movieId) {
      try {
        const {
          match: {
            params: { movieId }
          },
          history: { push }
        } = this.props;
        const parsedId = parseInt(movieId);
        if (isNaN(parsedId)) {
          return push("/");
        }
        try {
          this.setState({ loading: true });
          const { data: result } = await tmdbApis.detail(parsedId);
          const { data: credit } = await tmdbApis.credit(parsedId);
          const { cast } = credit;
          const { crew } = credit;
          const directors = crew.filter(
            (people: any) => people.department === "Directing"
          );
          const producers = crew.filter(
            (people: any) => people.department === "Production"
          );
          const writers = crew.filter(
            (people: any) => people.department === "Writing"
          );
          const editors = crew.filter(
            (people: any) => people.department === "Editing"
          );
          const cinematographies = crew.filter(
            (people: any) => people.department === "Camera"
          );
          const productionDesigns = crew.filter(
            (people: any) => people.department === "Art"
          );
          const composers = crew.filter(
            (people: any) => people.department === "Sound"
          );
          const costumes = crew.filter(
            (people: any) => people.department === "Costume & Make-Up"
          );
          this.setState({
            result,
            cast,
            directors,
            producers,
            writers,
            editors,
            cinematographies,
            productionDesigns,
            composers,
            costumes,
            creditIndex: 0,
            loading: true
          });
        } catch (error) {
          this.setState({ error: error.message });
        } finally {
          this.setState({ loading: false });
        }
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  };

  handleCreditIndexChange = (creditIndex: number) => {
    this.setState({ creditIndex });
  };

  onClickToggleActiveVideo = (videoKey: string = "") => {
    if (!this.state.activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    this.setState({ activeVideo: !this.state.activeVideo, videoKey });
  };

  render() {
    const {
      match: {
        params: { movieId }
      }
    } = this.props;
    const parsedId = parseInt(movieId);
    const {
      result,
      cast,
      directors,
      producers,
      writers,
      editors,
      cinematographies,
      productionDesigns,
      composers,
      costumes,
      creditIndex,
      error,
      loading,
      activeVideo,
      videoKey
    } = this.state;
    console.log(this.state);
    console.log(result && normalize(result.vote_average, 0, 10, 0, 5, 3));
    let dailyRankAudiCnt: DailyRandAudiCnt | null = null;
    if (result) {
      dailyRankAudiCnt = {
        movieNm: result.title,
        data: usDailyRankAudiCnt.data
      };
    }
    return (
      <MoviePresenter
        id={parsedId}
        result={result}
        cast={cast}
        directors={directors}
        producers={producers}
        writers={writers}
        editors={editors}
        cinematographies={cinematographies}
        productionDesigns={productionDesigns}
        composers={composers}
        costumes={costumes}
        creditIndex={creditIndex}
        error={error}
        loading={loading}
        activeVideo={activeVideo}
        videoKey={videoKey}
        dailyRankAudiCnt={dailyRankAudiCnt}
        handleCreditIndexChange={this.handleCreditIndexChange}
        onClickToggleActiveVideo={this.onClickToggleActiveVideo}
      />
    );
  }
}
