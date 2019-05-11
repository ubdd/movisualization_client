import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NoImage from "../static/popcorn.png";

const Container = styled.div`
  font-size: 0.8rem;
`;

interface IImageProps {
  bgUrl: string;
}

const Image = styled("div")<IImageProps>`
  background: url(${props => props.bgUrl});
  width: 8rem;
  height: 11.5rem;
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

const ImageContainer = styled.div`
  margin-bottom: 0.3rem;
  position: relative;
  &:hover {
    ${Image} {
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

const Year = styled.span`
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.5);
`;

const SLink = styled(Link)`
  &:hover {
    color: white;
  }
`;

interface Props {
  id: number;
  imageUrl: string;
  title: string;
  rating: number;
  year: string;
  additionalInfo?: string;
}

export const Poster: React.SFC<Props> = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  additionalInfo
}) => (
  <SLink to={`/film/${id}`} title={title}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : NoImage
          }
        />
        <Rating>
          <StarIcon
            className="fas fa-star"
            style={{
              color: "#ffd05a",
              fontSize: "1.5rem",
              marginBottom: "0.5rem"
            }}
          />
          <span>{rating}/10</span>
        </Rating>
      </ImageContainer>
      <Title>
        {title.length > 11 ? `${title.substring(0, 11)}...` : title}
      </Title>
      <Year>
        {year} {additionalInfo && `/ ${additionalInfo}`}
      </Year>
    </Container>
  </SLink>
);
