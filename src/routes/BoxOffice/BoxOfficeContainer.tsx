import React from "react";
import { BoxOfficePresenter } from "./BoxOfficePresenter";

interface Props {}
interface State {}

export default class BoxOfficeContainer extends React.Component<Props, State> {
  render() {
    return <BoxOfficePresenter />;
  }
}
