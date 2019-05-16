import React from "react";
import { withRouter, RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps<any> {}

class ScrollToTop extends React.Component<IProps, {}> {
  componentDidUpdate(prevProps: any) {
    console.log(this.props.location.pathname, prevProps.location.pathname);
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
