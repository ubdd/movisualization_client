import React from "react";
import { HomePresenter } from "./HomePresenter";
import { tmdbApis, ubdBoxOfficeApis } from "../../api";
import { toast } from "react-toastify";
import moment, { Moment } from "moment";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {}

interface State {
  movies: any;
  loading: boolean;
  target_dt: Moment;
  boxoffice: any[];
}

export default class extends React.Component<Props, State> {
  state = {
    movies: null,
    loading: false,
    target_dt: moment(Date.now()).subtract(2, "days"),
    boxoffice: []
  };

  componentDidMount = async () => {
    try {
      const {
        data: { results: movies }
      } = await tmdbApis.popular(1);
      const data = await ubdBoxOfficeApis.dailyBoxOfficeWithRange(
        this.state.target_dt.format("YYYYMMDD"),
        this.state.target_dt.format("YYYYMMDD")
      );
      const boxoffice = data.data[0].box_office_result;
      this.setState({
        boxoffice: boxoffice.slice(0, 10),
        movies: movies.slice(0, 10),
        loading: true
      });
    } catch (error) {
      toast.error(`😫 ${error.message}`);
      this.props.history.push("/");
    } finally {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { movies, loading, boxoffice } = this.state;
    return !loading ? (
      <HomePresenter movies={movies} loading={loading} boxoffice={boxoffice} />
    ) : (
      <></>
    );
  }
}
