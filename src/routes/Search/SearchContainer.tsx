import React from "react";
import { SearchPresenter } from "./SearchPresenter";

interface IProps {
  match: { params: { term: string } };
}
interface IState {
  term: string;
}

export default class SearchContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      term: ""
    };
  }

  async componentDidMount() {
    const { term } = this.props.match.params;
    this.setState({ term });
  }

  async componentDidUpdate(prevProps: any) {
    if (this.props.match.params.term !== prevProps.match.params.term) {
      const { term } = this.props.match.params;
      this.setState({ term });
    }
  }

  render() {
    const { term } = this.state;
    console.log(this.state);
    return <SearchPresenter term={term} />;
  }
}
