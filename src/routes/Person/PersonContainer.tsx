import React from "react";
import { PersonPresenter } from "./PersonPresenter";

interface Props {
  match: {
    params: {
      personId: string;
    };
  };
}
interface State {}

export default class PersonContainer extends React.Component<Props, State> {
  render() {
    const {
      match: {
        params: { personId }
      }
    } = this.props;
    return <PersonPresenter personId={personId} />;
  }
}
