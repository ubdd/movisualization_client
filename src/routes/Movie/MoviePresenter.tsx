import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import ReactCountryFlag from "react-country-flag";
import { Loader } from "../../components/Loader";
import Credit from "../../components/Credit";
import NoImage from "../../static/image/popcorn.png";
import { websiteTitle, genreWithEmoji } from "../../config/_mixin";
import { VideoModal } from "../../components/VideoModal";
import { TMDbMovieVideo, DailyRankAudiCnt } from "../../shared-interfaces";
import MovieBoxOfficeChart from "../../components/MovieBoxOfficeChart";
// import { ImageModal } from "../../components/ImageModal";
import ImageZoom from "../../components/ImageZoom";
const numeral = require("numeral");

const Container = styled.div`
  width: 100%;
  position: relative;
`;

interface BackdropProps {
  bgImage: string;
}

const Backdrop = styled("div")<BackdropProps>`
  position: absolute;
  top: -7rem;
  left: 0;
  width: 1200px;
  height: 675px;
  left: 50%;
  transform: translateX(-50%);
  background-image: linear-gradient(
      to right,
      rgba(20, 24, 28, 1),
      transparent,
      transparent,
      transparent,
      rgba(20, 24, 28, 1)
    ),
    linear-gradient(
      to bottom,
      transparent,
      transparent,
      transparent,
      rgba(20, 24, 28, 1)
    ),
    url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  z-index: 0;
`;

const Content = styled.div`
  padding-top: 25rem;
  padding-bottom: 2rem;
  width: 60rem;
  margin: 0 auto;
`;

const MediaInfo = styled.div`
  margin-right: 3rem;
  width: 15rem;
  float: left;
`;

const Cover = styled(ImageZoom)`
  /* width: 15rem;
  background: #161718;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(221, 238, 255, 0.35);
  display: inline-block;
  overflow: hidden;
  position: relative;
  -webkit-background-clip: padding-box;
  border-radius: 4px;
  cursor: pointer; */
`;

const FilmStats = styled.ul`
  clear: both;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.6rem 0 0.3rem;
  text-align: center;
  list-style: none;
`;

const FilmStat = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.4rem;
  font-size: inherit;
  line-height: 1.38461538;
`;

const FilmStatIcon = styled.i`
  font-size: 0.8rem;
  margin-right: 0.3rem;
`;

const FilmStatText = styled.span``;

const Watch = styled.div`
  margin: 0.6rem 0 1.2rem;
  border: 1px solid #303840;
  background-color: #14181c;
  overflow: hidden;
  border-radius: 3px;
`;

const WatchTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #242c34;
  color: #9ab;
  padding: 0.25rem 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.075em;
`;

const MediaLink = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.3rem 0;
`;

const SymbolicIcons = styled.div`
  display: flex;
`;

const VideoThumbnail = styled.img`
  width: 100%;
  border-radius: 0.2rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: 0.5s ease-in-out;
  filter: brightness(0.4);
`;

const VideoInfo = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  right: 0;
  left: 0;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 2rem;
  opacity: 1;
  transition: 0.5s ease-in-out;
`;

const VideoContainer = styled.div`
  position: relative;
  cursor: pointer;
  &:hover {
    ${VideoThumbnail} {
      filter: brightness(1);
    }
    ${VideoInfo} {
      opacity: 0;
    }
  }
`;

const WatchPanel = styled.div`
  color: #fff;
  background-color: #131313;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  ${VideoContainer}:not(:last-child) {
    margin-bottom: 0.3rem;
  }
`;

const TrailerIcon = styled.i`
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: auto;
  left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const TrailerText = styled.div`
  word-break: keep-all;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.66666667;
  min-width: 5rem;
`;

// const MoreService = styled.div`
//   display: block;
//   padding: 6px 10px 4px;
//   text-transform: uppercase;
//   letter-spacing: 0.075em;
//   font-size: 0.76923077rem;
//   line-height: 1.3;
//   border-top: 1px solid #303840;
//   color: #678;
// `;

// const MoreServiceText = styled.div``;

const TextInfo = styled.div`
  position: relative;
  width: 42rem;
  float: right;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: -0.2rem 0 1rem;
`;

const Title = styled.div`
  display: inline;
  margin: 0 0.5rem 0 0;
  font-family: "Nanum Myeongjo", serif;
  font-weight: 800;
  font-size: 2.46153846rem;
  margin: 0 0 0.6rem;
  color: #fff;
  line-height: 1.2;
  text-shadow: 0px 3px 5px #0a0e27;
`;

const Subtitle = styled.div`
  display: inline;
  max-width: 100%;
  font-size: 17px;
  line-height: 1.6;
  color: white;
  text-shadow: #000 0px 2px 5px;
  margin: 0;
  white-space: pre-wrap;
  font-family: "Nanum Myeongjo", serif;
  font-weight: 400;
  letter-spacing: 0.02em;
`;

const SideInfoSection = styled.div`
  padding-bottom: 3rem;
  float: left;
`;

const Quote = styled.i`
  font-size: 0.8rem;
`;

const Tagline = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 1.5625;
  margin-bottom: 0.625em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: pre-wrap;
  text-shadow: 0px 5px 5px #0a0e27;
`;

const Overview = styled.div`
  overflow: hidden;
  font-size: 1rem;
  line-height: 1.5625;
  margin-bottom: 0.625em;
`;

const Divider = styled.span`
  margin: 0 0.2rem;
`;

const Sidebar = styled.aside`
  padding-bottom: 3rem;
  width: 15rem;
`;

const UserPanel = styled.ul`
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  color: #bcd;
`;

const UserActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserAction = styled.li`
  padding: 1rem 0;
  width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #456;
  margin-bottom: 1px;
`;

const UserActionIcon = styled.i`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const UserActionText = styled.span``;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  margin-bottom: 1px;
  background-color: #456;
`;

const RatingText = styled.span`
  margin-bottom: 0.2rem;
`;

const AddReview = styled.div`
  background-color: #456;
  padding: 1rem 0;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddList = styled.div`
  background-color: #456;
  padding: 1rem 0;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Share = styled.div`
  background-color: #456;
  padding: 1rem 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  id: number;
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
  creditIndex: number;
  loading: boolean;
  activeVideo: boolean;
  activeImage: boolean;
  videoKey: string;
  imageUrl: string;
  dailyRankAudiCnt: DailyRankAudiCnt | null;
  zoom: any;
  boxOffices: any;
  handleCreditIndexChange: (creditIndex: number) => void;
  onClickToggleActiveVideo: (videoKey?: string) => void;
  onClickToggleActiveImage: (imageUrl?: string) => void;
}

export const MoviePresenter: React.SFC<Props> = ({
  id,
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
  creditIndex,
  loading,
  activeVideo,
  activeImage,
  videoKey,
  imageUrl,
  dailyRankAudiCnt,
  zoom,
  boxOffices,
  handleCreditIndexChange,
  onClickToggleActiveVideo,
  onClickToggleActiveImage
}) =>
  loading ? (
    <Loader />
  ) : (
    <>
      {/* <ImageZoom
        src={imageUrl}
        alt={result.title}
        zoom={zoom}
        color="#BADA55"
      /> */}
      {/* <ImageModal
        onClickToggleActiveImage={onClickToggleActiveImage}
        activeImage={activeImage}
        imageUrl={imageUrl}
      /> */}
      <VideoModal
        onClickToggleActiveVideo={onClickToggleActiveVideo}
        activeVideo={activeVideo}
        videoKey={videoKey}
      />
      <Container>
        <Helmet>
          <title>
            {result.title} | {websiteTitle}
          </title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <MediaInfo>
            <Cover
              alt={result.title}
              zoom={zoom}
              color="rgba(0, 0, 0, 0.5)"
              src={
                result.poster_path
                  ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                  : NoImage
              }
            />
            <FilmStats>
              {result.budget !== 0 && (
                <FilmStat title="흥행도">
                  <SLink to={`/movie/${result.id}/members/`}>
                    <FilmStatIcon
                      style={{ color: "#e74c3c" }}
                      className="fas fa-burn"
                    />
                    <FilmStatText>
                      {Math.round((result.revenue / result.budget) * 100)}%
                    </FilmStatText>
                  </SLink>
                </FilmStat>
              )}
              <FilmStat>
                <Link to={`/film/${result.id}/lists/by/popular/`}>
                  <FilmStatIcon
                    style={{ color: "skyblue" }}
                    className="fas fa-dollar-sign"
                  />
                  <FilmStatText title="매출액">
                    {numeral(result.revenue).format("0.0a")}
                  </FilmStatText>
                </Link>
              </FilmStat>
              <FilmStat title="인기도">
                <SLink to={`/film/${result.id}/likes/`}>
                  <FilmStatIcon
                    style={{ color: "orange" }}
                    className="fas fa-heart"
                  />
                  <FilmStatText>
                    {numeral(result.popularity).format("0 a")}
                  </FilmStatText>
                </SLink>
              </FilmStat>
              <FilmStat title="평점">
                <SLink to={`/best`}>
                  <FilmStatIcon
                    style={{ color: "yellow" }}
                    className="fas fa-star"
                  />
                  <FilmStatText>{result.vote_average}</FilmStatText>
                </SLink>
              </FilmStat>
            </FilmStats>
            <Watch>
              <WatchTitle>
                관련 미디어
                <SymbolicIcons>
                  {result.homepage && (
                    <MediaLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href={result.homepage}
                    >
                      <TrailerIcon
                        className="fas fa-home"
                        style={{ marginRight: "0.4rem" }}
                        title={`${result.title} 홈페이지`}
                      />
                    </MediaLink>
                  )}
                  {result.imdb_id && (
                    <MediaLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.imdb.com/title/${result.imdb_id}`}
                    >
                      <img
                        src={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/800px-IMDB_Logo_2016.svg.png"
                        }
                        alt="IMDB"
                        title={`${result.title} IMDb`}
                        style={{ width: "2rem" }}
                      />
                    </MediaLink>
                  )}
                </SymbolicIcons>
              </WatchTitle>
              {result.videos.results.filter(
                (video: TMDbMovieVideo) => video.site === "YouTube"
              ).length !== 0 && (
                <WatchPanel>
                  {result.videos.results
                    .filter((video: TMDbMovieVideo) => video.site === "YouTube")
                    .map((video: TMDbMovieVideo, index: number) => (
                      <VideoContainer
                        onClick={() => onClickToggleActiveVideo(video.key)}
                        key={index}
                      >
                        <VideoInfo>
                          <TrailerIcon
                            style={{
                              fontSize: "1.5rem",
                              marginBottom: "0.4rem"
                            }}
                            className="fas fa-play-circle"
                          />
                          <TrailerText>
                            {video.type === "Trailer"
                              ? `${video.name}`
                              : video.type === "Teaser"
                              ? `${video.name}`
                              : video.type === "Featurette"
                              ? `${video.name}`
                              : `${video.name}`}
                          </TrailerText>
                        </VideoInfo>
                        <VideoThumbnail
                          src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                        />
                      </VideoContainer>
                    ))}
                </WatchPanel>
              )}
              {/* <MoreService>
                <Link to={"/"}>
                  <MoreServiceText>더 많은 서비스</MoreServiceText>
                </Link>
              </MoreService> */}
            </Watch>
            <Sidebar>
              <UserPanel>
                <UserActionContainer>
                  <UserAction style={{ borderTopLeftRadius: 4 }}>
                    <UserActionIcon className="far fa-eye" />
                    <UserActionText>봤어요</UserActionText>
                  </UserAction>
                  <UserAction>
                    <UserActionIcon className="far fa-heart" />
                    <UserActionText>좋아요</UserActionText>
                  </UserAction>
                  <UserAction style={{ borderTopRightRadius: 4 }}>
                    <UserActionIcon className="far fa-clock" />
                    <UserActionText>보고싶어요</UserActionText>
                  </UserAction>
                </UserActionContainer>
                <RatingContainer>
                  <RatingText>평점</RatingText>
                  <Rate
                    style={{ fontSize: 30, color: "goldenrod", marginLeft: 10 }}
                    allowHalf
                  />
                </RatingContainer>
                <AddReview>리뷰 작성</AddReview>
                <AddList>컬렉션 추가</AddList>
                <Share>공유</Share>
              </UserPanel>
            </Sidebar>
          </MediaInfo>
          <TextInfo>
            <TitleSection>
              <Title>{result.title}</Title>
              <Subtitle>
                {result.release_date.substring(0, 4)}/
                {result.release_date.substring(5, 7)}/
                {result.release_date.substring(8)}
                <Divider>•</Divider>
                {result.genres.map((genre: any, index: number) => {
                  return (
                    <React.Fragment key={genre.id}>
                      <span>{genreWithEmoji(genre.name)}</span>
                      {result.genres.length - 1 !== index && <span>, </span>}
                    </React.Fragment>
                  );
                })}
                <Divider>•</Divider>
                {result.production_countries.map(
                  (country: any, index: number) => (
                    <React.Fragment key={country.iso_3166_1}>
                      <ReactCountryFlag code={country.iso_3166_1} svg />
                      {result.production_countries.length - 1 !== index && (
                        <span>, </span>
                      )}
                    </React.Fragment>
                  )
                )}
                <Divider>•</Divider>
                {`${Math.floor(result.runtime / 60)}시간 ${result.runtime %
                  60}분`}
              </Subtitle>
            </TitleSection>
            <SideInfoSection>
              {result.tagline && (
                <Tagline>
                  <Quote className="fas fa-quote-left" />
                  <span style={{ margin: "0 1rem" }}>{result.tagline}</span>
                  <Quote className="fas fa-quote-right" />
                </Tagline>
              )}
              {result.overview && <Overview>{result.overview}</Overview>}
              {boxOffices && (
                <MovieBoxOfficeChart dailyRankAudiCnt={boxOffices} />
              )}
              <Credit
                id={id}
                creditIndex={creditIndex}
                result={result}
                cast={cast}
                directors={directors}
                producers={producers}
                writers={writers}
                editors={editors}
                cinematographies={cinematographies}
                productionDesigns={productionDesigns}
                composers={composers}
                costumes={costumes}
                handleCreditIndexChange={handleCreditIndexChange}
              />
            </SideInfoSection>
          </TextInfo>
        </Content>
      </Container>
    </>
  );
