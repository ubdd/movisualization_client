import React from "react";
import { PersonPresenter } from "./PersonPresenter";
import { tmdbApis } from "../../api";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<any> {}

interface State {
  person: any;
  error: string | null;
  loading: boolean;
}

export default class PersonContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      person: null,
      error: null,
      loading: true
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
      this.setState({ person, loading: true });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      match: {
        params: { personId }
      }
    } = this.props;
    const { person, error, loading } = this.state;
    return (
      <>
        <PersonPresenter
          person={person}
          personId={personId}
          error={error}
          loading={loading}
        />
      </>
    );
  }
}
