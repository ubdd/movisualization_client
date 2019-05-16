import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../static/image/avatar.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  width: 21rem;
  overflow: hidden;
`;

interface IProfileImageProps {
  url: string;
}

const ProfileImage = styled("div")<IProfileImageProps>`
  background: url(${props => props.url});
  background-size: 100% auto;
  background-position: center center;
  border-radius: 100%;
  min-width: 50px;
  min-height: 50px;
  margin-right: 0.5rem;
`;

const NotFoundImage = styled.img`
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
  background-size: 100% auto;
  background-position: center center;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
`;

const TextContainer = styled.div`
  height: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.div`
  font-weight: 900;
`;

const Charector = styled.div`
  opacity: 0.7;
`;

interface IActor {
  credit_id: number;
  character: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
}

interface Props {
  people: IActor;
}

export default class Actor extends React.Component<Props> {
  render() {
    const {
      people: { id: personId, character, name, profile_path }
    } = this.props;
    return (
      <Link to={`/person/${personId}`} title={name}>
        <Container>
          {profile_path ? (
            <ProfileImage
              url={`https://image.tmdb.org/t/p/w300${profile_path}`}
            />
          ) : (
            <NotFoundImage src={Avatar} />
          )}
          <TextContainer>
            <Name>{name}</Name>
            {character && <Charector>{character} 역</Charector>}
          </TextContainer>
        </Container>
      </Link>
    );
  }
}
