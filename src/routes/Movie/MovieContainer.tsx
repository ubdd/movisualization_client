import React from "react";
import { MoviePresenter } from "./MoviePresenter";
import { moviesApi } from "../../api";
import { ICrew } from "../../shared-interfaces";

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
  result: any;
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

  async componentDidMount() {
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
        console.log(parsedId);
        const { data: result } = await moviesApi.detail(parsedId);
        const { data: credit } = await moviesApi.credit(parsedId);
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
          loading: true
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
      this.setState({ loading: true });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate = async (prevProps: any) => {
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
          const { data: result } = await moviesApi.detail(parsedId);
          const { data: credit } = await moviesApi.credit(parsedId);
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
        this.setState({ loading: true });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
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
    console.log(this.state.result);
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
        handleCreditIndexChange={this.handleCreditIndexChange}
        onClickToggleActiveVideo={this.onClickToggleActiveVideo}
      />
    );
  }
}
