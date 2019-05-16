import React from "react";
import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";

const NameWithLogo = styled.div`
  font-size: 1rem;
  font-weight: 900;
  font-family: "Thasadith", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  padding: 1rem;
  opacity: 0;
  transition: 0.5s ease-in-out;
`;

const NameWithoutLogo = styled.div`
  font-size: 1rem;
  font-weight: 900;
  font-family: "Thasadith", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  padding: 1rem;
`;

const ProfileImage = styled.img`
  width: 6rem;
  height: 6rem;
  padding: 1rem;
  object-fit: scale-down;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  border-radius: 10px;
  transition: 0.5s ease-in-out;
`;

const NotFoundImage = styled.div`
  width: 6rem;
  height: 6rem;
  padding: 1rem;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  border-radius: 10px;
  transition: 0.5s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  margin-bottom: 1rem;
  overflow: hidden;
  position: relative;
  &:hover {
    ${NameWithLogo} {
      opacity: 1;
    }
    ${ProfileImage} {
      filter: brightness(0.5);
    }
    ${NotFoundImage} {
      filter: brightness(0.5);
    }
  }
`;

interface ICompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Props {
  company: ICompany;
}

export default class Company extends React.Component<Props> {
  render() {
    const {
      company: { logo_path, name, origin_country }
    } = this.props;
    return (
      <Container>
        {logo_path ? (
          <>
            <ProfileImage
              src={`https://image.tmdb.org/t/p/original${logo_path}`}
            />

            <NameWithLogo>
              {origin_country && <ReactCountryFlag code={origin_country} svg />}
              <div style={{ marginTop: origin_country ? "0.5rem" : undefined }}>
                {name}
              </div>
            </NameWithLogo>
          </>
        ) : (
          <>
            <NotFoundImage />
            <NameWithoutLogo>
              {origin_country && <ReactCountryFlag code={origin_country} svg />}
              <div style={{ marginTop: origin_country ? "0.5rem" : undefined }}>
                {name}
              </div>
            </NameWithoutLogo>
          </>
        )}
      </Container>
    );
  }
}
