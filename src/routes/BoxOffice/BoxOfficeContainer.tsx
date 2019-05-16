import React from "react";
import { BoxOfficePresenter } from "./BoxOfficePresenter";
import { ubdBoxOfficeApis } from "../../api";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import moment, { Moment } from "moment";

interface Props extends RouteComponentProps {}
interface State {
  moviesBoxOffice: any;
  loading: boolean;
  from_dt: Moment;
  to_dt: Moment;
}

export default class BoxOfficeContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      moviesBoxOffice: null,
      loading: false,
      from_dt: moment(Date.now()).subtract(8, "days"),
      to_dt: moment(Date.now()).subtract(1, "days")
    };
  }
  componentDidMount = async () => {
    try {
      const { from_dt, to_dt } = this.state;
      const {
        data: moviesBoxOffice
      } = await ubdBoxOfficeApis.moviesBoxOfficeWithRange(
        from_dt.format("YYYYMMDD"),
        to_dt.format("YYYYMMDD")
      );
      console.log(moviesBoxOffice);
      this.setState({ moviesBoxOffice, loading: true });
    } catch (error) {
      toast.error(`😫 ${error.message}`);
      this.props.history.push("/");
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate = async (prevProps: Props, prevState: State) => {
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
        console.log(moviesBoxOffice);
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
    const { moviesBoxOffice, from_dt, to_dt } = this.state;
    return (
      <BoxOfficePresenter
        from_dt={from_dt}
        to_dt={to_dt}
        moviesBoxOffice={moviesBoxOffice}
        changeRangePicker={this.changeRangePicker}
      />
    );
  }
}
