import React from "react";
import styled from "styled-components";
import { posterSize } from "../config/_mixin";
import { tmdbApis } from "../api";
import { PersonCard } from "./PersonCard";

const Container = styled.div`
  position: relative;
  z-index: 2;
  :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

interface IGridProps {
  loading: boolean;
}

const Grid = styled("div")<IGridProps>`
  margin-top: 1.5rem;
  display: grid;
  justify-content: space-between;
  transition: 0.5s ease-in-out;
  grid-template-columns: repeat(auto-fill, ${posterSize.width});
  grid-gap: 0.5rem;
`;

const MoreIcon = styled.i<{ noMore: boolean }>`
  font-size: 2rem;
  margin-bottom: 1rem;
  transition: 0.5s ease-in-out;
  transform: ${props => (props.noMore ? "rotate(45deg)" : undefined)};
`;

const More = styled.div<{ noMore: boolean }>`
  width: ${posterSize.width};
  height: ${posterSize.height};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(221, 238, 255, 0.35);
  border-radius: 0.3rem;
  background-color: ${props => (props.noMore ? "#333" : "#21d4fd")};
  background-image: ${props =>
    props.noMore
      ? "linear-gradient(73deg, #222222 0%, #434343 100%)"
      : "linear-gradient(19deg, #21d4fd 0%, #b721ff 100%)"};
  cursor: pointer;
  &:hover {
    ${MoreIcon} {
      transform: ${props =>
        props.noMore ? "rotate(45deg)" : "rotate(360deg)"};
    }
  }
`;

interface Props {
  title?: string;
  term: string;
}

interface State {
  people: any;
  page: number;
  error: string | null;
  loading: boolean;
  noMorePerson: boolean;
}

export default class PersonGrid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      people: null,
      page: 1,
      error: null,
      loading: true,
      noMorePerson: false
    };
  }

  componentDidMount = async () => {
    const { term } = this.props;
    try {
      let people: any[] = [];
      if (term && term.trim()) {
        const {
          data: { results }
        } = await tmdbApis.searchPerson(term, this.state.page);
        people = results;
      }
      if (people.length !== 20) {
        this.setState({ noMorePerson: true });
      }
      this.setState({
        people,
        loading: true
      });
    } catch (error) {
      this.setState({
        error: error.message
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  componentDidUpdate = async (prevProps: any, prevState: any) => {
    if (this.props.term && this.props.term !== prevProps.term) {
      const { term } = this.props;
      try {
        let people: any[] = [];
        if (term && term.trim()) {
          const {
            data: { results }
          } = await tmdbApis.searchPerson(term, 1);
          people = results;
        }
        this.setState({
          people,
          loading: true,
          noMorePerson: false
        });
        if (people.length !== 20) {
          this.setState({ noMorePerson: true });
        }
      } catch (error) {
        this.setState({
          error: error.message
        });
      } finally {
        this.setState({
          loading: false
        });
      }
    }
  };

  handleOnClickMore = async () => {
    const { term } = this.props;
    const { page } = this.state;
    try {
      let people: any = [];
      if (term && term.trim()) {
        const {
          data: { results }
        } = await tmdbApis.searchPerson(term, page + 1);
        people = results;
      }
      if (people.length !== 20) {
        this.setState({ noMorePerson: true });
      }
      this.setState({
        people: this.state.people.concat(people),
        page: page + 1,
        loading: true
      });
    } catch (error) {
      this.setState({
        error: error.message
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { title } = this.props;
    const { people, loading, noMorePerson } = this.state;
    return (
      <Container>
        {title && <Title>{title}</Title>}
        <Grid loading={loading}>
          {people &&
            people.map((person: any, idx: number) => {
              return <PersonCard key={idx} person={person} />;
            })}
          {noMorePerson ? (
            <More noMore={noMorePerson}>
              <MoreIcon noMore={noMorePerson} className="fas fa-plus" />
              {/* <span>마지막 페이지</span> */}
            </More>
          ) : (
            <More
              noMore={noMorePerson}
              onClick={() => this.handleOnClickMore()}
            >
              {!loading ? (
                <MoreIcon noMore={noMorePerson} className="fas fa-plus" />
              ) : (
                <MoreIcon noMore={noMorePerson} className="fas fa-spinner" />
              )}
              <span>더 보기</span>
            </More>
          )}
        </Grid>
      </Container>
    );
  }
}
