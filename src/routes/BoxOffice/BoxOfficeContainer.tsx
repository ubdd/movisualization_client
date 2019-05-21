import React from "react";
import { ubdBoxOfficeApis } from "../../api";
import { BoxOfficePresenter } from "./BoxOfficePresenter";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import moment, { Moment } from "moment";

interface Props extends RouteComponentProps {}
interface State {
  moviesBoxOffice: any;
  from_dt: Moment;
  to_dt: Moment;
  target_dt: Moment;
  box_office_result: any[];
  loading: boolean;
}

export default class BoxOfficeContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      target_dt: moment(Date.now()).subtract(2, "days"),
      from_dt: moment(Date.now()).subtract(8, "days"),
      to_dt: moment(Date.now()).subtract(1, "days"),
      box_office_result: [],
      loading: true,
      moviesBoxOffice: null
    };
  }

  componentDidMount = async () => {
    try {
      this.getApi();
      const { from_dt, to_dt } = this.state;
      const {
        data: moviesBoxOffice
      } = await ubdBoxOfficeApis.moviesBoxOfficeWithRange(
        from_dt.format("YYYYMMDD"),
        to_dt.format("YYYYMMDD")
      );
      this.setState({ moviesBoxOffice, loading: true });
    } catch (error) {
      toast.error(`😫 ${error.message}`);
      this.props.history.push("/");
    } finally {
      this.setState({ loading: false });
    }
  };

  getApi = async () => {
    try {
      const data = await ubdBoxOfficeApis.dailyBoxOfficeWithRange(
        this.state.target_dt.format("YYYYMMDD"),
        this.state.target_dt.format("YYYYMMDD")
      );
      const boxoffice = data.data[0].box_office_result;
      this.setState({
        box_office_result: boxoffice,
        loading: false
      });
    } catch (error) {
      toast.error(`😫 ${error.message}`);
      this.props.history.push("/");
    }
  };

  changeDateHandler = (date: Moment, dateString: string) => {
    if (date !== null) {
      this.setState({ target_dt: date });
    }
  };

  componentDidUpdate = async (prevProps: Props, prevState: State) => {
    if (prevState.target_dt !== this.state.target_dt) {
      this.getApi();
    }
    if (
      this.state.from_dt !== prevState.from_dt ||
      this.state.to_dt !== prevState.to_dt
    ) {
      try {
        const { from_dt, to_dt } = this.state;
        const {
          data: moviesBoxOffice
        } = await ubdBoxOfficeApis.moviesBoxOfficeWithRange(
          from_dt.format("YYYYMMDD"),
          to_dt.format("YYYYMMDD")
        );
        this.setState({ moviesBoxOffice, loading: true });
      } catch (error) {
        toast.error(`😫 ${error.message}`);
        this.props.history.push("/");
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  changeRangePicker = (date: Moment[], dateString: string[]) => {
    this.setState({ from_dt: date[0], to_dt: date[1] });
  };

  render() {
    const { moviesBoxOffice, from_dt, to_dt, target_dt } = this.state;
    return (
      !this.state.loading && (
        <BoxOfficePresenter
          from_dt={from_dt}
          to_dt={to_dt}
          target_dt={target_dt}
          moviesBoxOffice={moviesBoxOffice}
          changeRangePicker={this.changeRangePicker}
          boxOfficeResult={this.state.box_office_result}
          loading={this.state.loading}
          changeDate={this.changeDateHandler}
        />
      )
    );
  }
}
