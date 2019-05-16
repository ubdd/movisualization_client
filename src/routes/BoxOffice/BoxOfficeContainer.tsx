import React from "react";
import { BoxOfficePresenter } from "./BoxOfficePresenter";
import { ubdBoxOfficeApis } from "../../api";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";

interface Props extends RouteComponentProps {}
interface State {
  moviesBoxOffice: any;
  loading: boolean;
}

export default class BoxOfficeContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      moviesBoxOffice: null,
      loading: false
    };
  }
  componentDidMount = async () => {
    try {
      const {
        data: moviesBoxOffice
      } = await ubdBoxOfficeApis.moviesBoxOfficeWithRange(
        "20190401",
        "20190501"
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

  render() {
    const { moviesBoxOffice } = this.state;
    return <BoxOfficePresenter moviesBoxOffice={moviesBoxOffice} />;
  }
}
