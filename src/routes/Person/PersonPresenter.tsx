import React from "react";
import styled from "styled-components";
import { tmdbApis } from "../../api";
import FilmoSection from "../../components/FilmoSection";
import { Loader } from "../../components/Loader";
import { websiteTitle } from "../../config/_mixin";
import Helmet from "react-helmet";
import Avatar from "../../static/image/avatar.png";
import PersonStat from "../../components/PersonCharts/PersonStat";
import PersonGenrePref from "../../components/PersonCharts/PersonGenrePref";
import { ImageModal } from "../../components/ImageModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 55.5rem;
  margin: 0 auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: flex-start;
  margin-bottom: 2rem;
`;

const Profile = styled.img`
  background: #161718;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(221, 238, 255, 0.35);
  border-radius: 5px;
  width: 13rem;
  cursor: pointer;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  font-size: 0.9rem;
  /* width: 21.7rem; */
`;

const ChartContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const ContainerTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  /* font-family: "Thasadith", sans-serif; */
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const BirthToDeath = styled.div`
  margin-bottom: 1rem;
`;

const Gender = styled.div`
  margin-bottom: 1rem;
`;

const Biography = styled.div`
  margin-bottom: 1rem;
  line-height: 1.5rem;
`;

const PlaceOfBirth = styled.div`
  margin-bottom: 1rem;
`;

const KnownForDepartment = styled.div`
  margin-bottom: 1rem;
`;

const Popularity = styled.div`
  margin-bottom: 1rem;
`;

const SectionContainer = styled.div`
  width: 55.5rem;
  margin: 0 auto;
`;

const Title = styled.span`
  background-color: #262626;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  padding: 0.15rem 0.4rem 0.2rem;
  margin-right: 0.5rem;
`;

interface Props {
  person: any;
  personId: string;
  loading: boolean;
  activeImage: boolean;
  imageUrl: string;
  onClickToggleActiveImage: (imageUrl?: string) => void;
}

export const PersonPresenter: React.SFC<Props> = ({
  person,
  personId,
  loading,
  activeImage,
  imageUrl,
  onClickToggleActiveImage
}) => {
  return loading ? (
    <Loader />
  ) : (
    <>
      <ImageModal
        onClickToggleActiveImage={onClickToggleActiveImage}
        activeImage={activeImage}
        imageUrl={imageUrl}
      />
      <Container>
        <Helmet>
          <title>
            {person.name} | {websiteTitle}
          </title>
        </Helmet>
        <ProfileContainer>
          <Profile
            onClick={() =>
              onClickToggleActiveImage(
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : Avatar
              )
            }
            title={person.name}
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : Avatar
            }
          />
          <ProfileInfo>
            <Name>
              {`${person.name} `}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/name/${person.imdb_id}`}
                style={{
                  margin: "0.3rem 0"
                }}
              >
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/800px-IMDB_Logo_2016.svg.png"
                  }
                  alt={person.name}
                  style={{ width: "2rem", marginRight: "0.4rem" }}
                />
              </a>
            </Name>
            {person.gender !== 0 && (
              <Gender>
                <Title>성별</Title>
                {person.gender === 2 ? "남성" : "여성"}
              </Gender>
            )}
            <BirthToDeath>
              {person.deathday ? <Title>출생-사망</Title> : <Title>출생</Title>}
              {`${person.birthday &&
                `${person.birthday}
              `}`}
              {person.deathday && `- ${person.deathday}`}
            </BirthToDeath>
            {person.place_of_birth && (
              <PlaceOfBirth>
                <Title>출생지</Title>
                {person.place_of_birth}
              </PlaceOfBirth>
            )}
            {person.known_for_department && (
              <KnownForDepartment>
                <Title>분야</Title>
                {person.known_for_department}
              </KnownForDepartment>
            )}
            {person.biography && (
              <Biography>
                <Title>소개</Title>
                {person.biography}
              </Biography>
            )}
            {person.popularity && (
              <Popularity>
                <Title>인기도</Title>
                {person.popularity}
              </Popularity>
            )}
          </ProfileInfo>
        </ProfileContainer>
        <ChartContainer>
          <ContainerTitle role="img" aria-label="cast">
            <span role="img" aria-label="crew">
              📊
            </span>{" "}
            차트
          </ContainerTitle>
          <Flex>
            <PersonStat person={person} id={personId} />
            <PersonGenrePref id={personId} getAPI={tmdbApis.filmography} />
          </Flex>
        </ChartContainer>
        <SectionContainer>
          <FilmoSection id={personId} getAPI={tmdbApis.filmography} />
        </SectionContainer>
      </Container>
    </>
  );
};
