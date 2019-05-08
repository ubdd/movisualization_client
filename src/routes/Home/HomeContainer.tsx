import React from "react";
import { HomePresenter } from "./HomePresenter";

interface Props {}
interface State {}

export default class HomeContainer extends React.Component<Props, State> {
  render() {
    return <HomePresenter />;
  }
}
