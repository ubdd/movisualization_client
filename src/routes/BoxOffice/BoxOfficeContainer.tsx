import React from "react";
import { ubdBoxOfficeApis } from "../../api";
import moment, { Moment } from "moment";
import { BoxOfficePresenter } from "./BoxOfficePresenter";

interface Props {}
interface State {
  target_dt: Moment;
  box_office_result: any[];
  loading: boolean;
}

export default class BoxOfficeContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      target_dt: moment(Date.now()).subtract(2, "days"),
      box_office_result: [],
      loading: true
    };
  }

  componentDidMount = () => {
    this.getApi();
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
      console.log(this.state);
    } catch {
      console.log(Error);
    }
  };

  changeDateHandler = (date: Moment, dateString: string) => {
    if (date !== null) {
      this.setState({ target_dt: date });
    }
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (prevState.target_dt !== this.state.target_dt) {
      this.getApi();
    }
  };

  render() {
    return !this.state.loading ? (
      <BoxOfficePresenter
        boxOfficeResult={this.state.box_office_result}
        loading={this.state.loading}
        changeDate={this.changeDateHandler}
      />
    ) : (
      <></>
    );
  }
}
