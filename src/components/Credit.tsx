import React from "react";
import styled from "styled-components";
import Actor from "./Actor";
import Crew from "./Crew";
import Company from "./Company";
import MovieGrid from "./MovieGrid";
import { moviesApi } from "../api";
import { color } from "../config/_mixin";

const creditSection = [
  "출연",
  "제작진",
  "세부사항",
  "같이 보면 좋은 영화",
  "비슷한 영화"
];

const Container = styled.div`
  position: relative;
  margin-top: 2rem;
`;

const Header = styled.header`
  border-bottom: 1px solid #456;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 42rem;
`;

interface IItemProps {
  selected: boolean;
}

const Item = styled("li")<IItemProps>`
  padding-bottom: 0.5rem;
  margin-right: 1rem;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.075rem;
  color: ${props => (props.selected ? "white" : color.mainColor)};
  transition: 0.5s ease-in-out;
  cursor: pointer;
  border-bottom: ${props =>
    props.selected ? "2px solid white" : "2px solid transparent"};
  &:hover {
    border-bottom: ${props =>
      props.selected ? "2px solid white" : `2px solid ${color.mainColor}`};
  }
`;

interface ICastInfoContainerProps {
  isFullData?: boolean;
}

const CastInfoContainer = styled("div")<ICastInfoContainerProps>`
  height: "100%";
  margin-bottom: 1rem;
  font-family: "Thasadith", sans-serif;
  color: #cde;
  font-size: 0.9rem;
  width: 42rem;
  transition: 1s ease-in-out;
`;

const CastInfo = styled.div`
  flex-flow: row wrap;
  display: flex;
  align-content: center;
  transition: 1s ease;
`;

// const CrewContainer = styled.div`
//   margin-bottom: 1rem;
//   color: #cde;
//   font-size: 0.9rem;
//   width: 42rem;
// `;

const CrewInfo = styled.div`
  flex-flow: column wrap;
  display: flex;
  align-content: flex-start;
  transition: 1s ease;
`;

const Department = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  margin-bottom: 1rem;
  font-family: "Thasadith", sans-serif;
`;

const DepartmentText = styled.div`
  font-size: 1rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
`;

const DetailInfo = styled.div`
  flex-flow: column wrap;
  display: flex;
  align-content: center;
  transition: 1s ease;
`;

const DetailOption = styled.div`
  margin-bottom: 1rem;
  font-family: "Thasadith", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DetailOptionText = styled.div`
  font-size: 1rem;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const DetailItemContainer = styled.div`
  width: 21rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const DetailItemText = styled.div`
  font-size: 1rem;
  font-weight: 900;
  font-family: "Thasadith", sans-serif;
`;

interface Props {
  id: number;
  creditIndex: number;
  result: any;
  cast: any;
  directors: any;
  producers: any;
  writers: any;
  editors: any;
  cinematographies: any;
  productionDesigns: any;
  composers: any;
  costumes: any;
  handleCreditIndexChange: (creditIndex: number) => void;
}

interface IState {
  castMore: boolean;
  crewMore: boolean;
}

export default class Credit extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      castMore: false,
      crewMore: false
    };
  }
  render() {
    const {
      id,
      creditIndex,
      result,
      cast,
      directors,
      producers,
      writers,
      editors,
      cinematographies,
      productionDesigns,
      composers,
      costumes,
      handleCreditIndexChange
    } = this.props;
    const { castMore, crewMore } = this.state;
    return (
      <Container>
        <Header>
          <List>
            {creditSection.map((sectionName: string, idx: number) => (
              <Item
                key={idx}
                onClick={() => handleCreditIndexChange(idx)}
                selected={creditIndex === idx}
              >
                {sectionName}
              </Item>
            ))}
          </List>
        </Header>
        {creditIndex === 0 && (
          <CastInfoContainer isFullData={castMore}>
            <CastInfo>
              {cast.map((people: any, index: number) => (
                <Actor key={index} people={people} />
              ))}
            </CastInfo>
          </CastInfoContainer>
        )}
        {creditIndex === 1 && (
          <CastInfoContainer isFullData={crewMore}>
            <CrewInfo>
              {directors.length !== 0 && (
                <>
                  <DepartmentText>감독</DepartmentText>
                  <Department>
                    {directors.map((people: any, index: number) => (
                      <Crew key={index} people={people} />
                    ))}
                  </Department>
                </>
              )}
              {producers.length !== 0 && (
                <>
                  <DepartmentText>제작</DepartmentText>
                  <Department>
                    {producers.map((people: any, index: number) => (
                      <Crew key={index} people={people} />
                    ))}
                  </Department>
                </>
              )}
              {writers.length !== 0 && (
                <>
                  <DepartmentText>각본</DepartmentText>
                  <Department>
                    {writers.map((people: any, index: number) => (
                      <Crew key={index} people={people} />
                    ))}
                  </Department>
                </>
              )}
              {editors.length !== 0 && (
                <>
                  <DepartmentText>편집</DepartmentText>
                  <Department>
                    {editors.map((people: any, index: number) => (
                      <Crew key={index} people={people} />
                    ))}
                  </Department>
                </>
              )}
              {cinematographies.length !== 0 && (
                <>
                  <DepartmentText>촬영</DepartmentText>
                  <Department>
                    {cinematographies.map((people: any, index: number) => (
                      <Crew key={index} people={people} />
                    ))}
                  </Department>
                </>
              )}
              {productionDesigns.length !== 0 && (
                <>
                  <DepartmentText>프로덕션 디자인</DepartmentText>
                  <Department>
                    {productionDesigns.map((people: any, index: number) => (
                      <Crew key={index} people={people} />
                    ))}
                  </Department>
                </>
              )}
              {composers.length !== 0 && (
                <>
                  <DepartmentText>음악</DepartmentText>
                  <Department>
                    {composers.map((people: any, index: number) => (
                      <Crew key={index} people={people} />
                    ))}
                  </Department>
                </>
              )}
              {costumes.length !== 0 && (
                <>
                  <DepartmentText>의상</DepartmentText>
                  <Department>
                    {costumes.map((people: any, index: number) => (
                      <Crew key={index} people={people} />
                    ))}
                  </Department>
                </>
              )}
            </CrewInfo>
          </CastInfoContainer>
        )}
        {creditIndex === 2 && (
          <CastInfoContainer isFullData={true}>
            <DetailInfo>
              <DetailOption>
                <DetailOptionText>스튜디오</DetailOptionText>
                <DetailItemContainer>
                  {result.production_companies.map((company: any) => (
                    <Company company={company} />
                  ))}
                </DetailItemContainer>
              </DetailOption>
              <DetailOption>
                <DetailOptionText>국가</DetailOptionText>
                <DetailItemContainer>
                  {result.production_countries.map((country: any) => (
                    <DetailItemText>{country.name}</DetailItemText>
                  ))}
                </DetailItemContainer>
              </DetailOption>
              <DetailOption>
                <DetailOptionText>언어</DetailOptionText>
                <DetailItemContainer>
                  {result.spoken_languages.map((language: any) => (
                    <DetailItemText>{language.name}</DetailItemText>
                  ))}
                </DetailItemContainer>
              </DetailOption>
            </DetailInfo>
          </CastInfoContainer>
        )}
        {creditIndex === 3 && (
          <MovieGrid getAPI={moviesApi.recommendation} id={id} />
        )}
        {creditIndex === 4 && <MovieGrid getAPI={moviesApi.similar} id={id} />}
      </Container>
    );
  }
}
