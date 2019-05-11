import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { posterSize } from "../config/_mixin";
import NoPerson from "../static/popcorn.png";

const Container = styled.div`
  font-size: 0.8rem;
`;

interface IPersonProps {
  bgUrl: string;
}

const Person = styled("div")<IPersonProps>`
  background: url(${props => props.bgUrl});
  width: ${posterSize.width};
  height: ${posterSize.height};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(221, 238, 255, 0.35);
  background-size: cover;
  border-radius: 0.3rem;
  background-position: center center;
  transition: 0.1s ease-in-out;
`;

const Rating = styled.span`
  width: 100%;
  top: 50%;
  left: 50%;
  font-size: 1rem;
  font-weight: 900;
  transform: translate(-50%, -50%);
  position: absolute;
  opacity: 0;
  transition: 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StarIcon = styled.i`
  &:hover {
  }
`;

const PersonContainer = styled.div`
  margin-bottom: 0.3rem;
  position: relative;
  &:hover {
    ${Person} {
      filter: brightness(0.5);
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
`;

const SLink = styled(Link)`
  &:hover {
    color: white;
  }
`;

interface Props {
  person: any;
}

export const PersonCard: React.SFC<Props> = ({ person }) => (
  <SLink to={`/person/${person.id}`} title={person.name}>
    <Container>
      <PersonContainer>
        <Person
          bgUrl={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
              : NoPerson
          }
        />
        <Rating>
          <StarIcon
            className="fas fa-heart"
            style={{
              color: "#e74c3c",
              fontSize: "1.5rem",
              marginBottom: "0.5rem"
            }}
          />
          <span>{person.popularity}</span>
        </Rating>
      </PersonContainer>
      <Title>{person.name}</Title>
    </Container>
  </SLink>
);
