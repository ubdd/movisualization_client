import React from "react";
import { PersonPresenter } from "./PersonPresenter";
import { tmdbApis } from "../../api";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";

interface Props extends RouteComponentProps<any> {}

interface State {
  person: any;
  loading: boolean;
  activeImage: boolean;
  imageUrl: string;
}

export default class PersonContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      person: null,
      loading: true,
      activeImage: false,
      imageUrl: ""
    };
  }

  componentDidMount = async () => {
    try {
      const {
        match: {
          params: { personId }
        }
      } = this.props;
      const { data: person } = await tmdbApis.person(personId);
      person.also_known_as = person.also_known_as.filter((name: string) => {
        const c = name.charCodeAt(0);
        if (0x1100 <= c && c <= 0x11ff) return true;
        if (0x3130 <= c && c <= 0x318f) return true;
        if (0xac00 <= c && c <= 0xd7a3) return true;
        return false;
      });
      if (person.also_known_as.length > 0) {
        person.name = person.also_known_as[0];
      }
      console.log(person);
      this.setState({ person, loading: true });
    } catch (error) {
      toast.error(`😫 ${error.message}`);
      this.props.history.push("/");
    } finally {
      this.setState({ loading: false });
    }
  };

  onClickToggleActiveImage = (imageUrl: string = "") => {
    if (!this.state.activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    this.setState({ activeImage: !this.state.activeImage, imageUrl });
  };

  render() {
    const {
      match: {
        params: { personId }
      }
    } = this.props;
    const { person, loading, activeImage, imageUrl } = this.state;
    return (
      <>
        <PersonPresenter
          person={person}
          personId={personId}
          loading={loading}
          activeImage={activeImage}
          imageUrl={imageUrl}
          onClickToggleActiveImage={this.onClickToggleActiveImage}
        />
      </>
    );
  }
}
