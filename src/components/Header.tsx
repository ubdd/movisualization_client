import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import HeaderSearch from "./HeaderSearch";
import { headerHeight, media } from "../config/_mixin";

interface IGradientBackgroundProps {
  darken: boolean;
}

const GradientBackground = styled("div")<IGradientBackgroundProps>`
  top: 0;
  bottom: -1rem;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 0;
  opacity: ${props => (props.darken ? "0.95" : "0.5")};
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 1),
    rgba(20, 20, 20, 0.7),
    transparent
  );
  transition: 1s ease-in-out;
`;

const Container = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  z-index: 5; /* header z-index */
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    ${GradientBackground} {
      opacity: 0.95;
    }
  }
  ${media.tablet} {
    height: 4rem;
  }
`;

const List = styled.ul`
  margin: 0 2rem;
  height: ${headerHeight};
  width: 100%;
  min-width: 15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${media.tablet} {
    margin: 0 1rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const LogoImage = styled.img`
//   height: 3rem;
//   position: relative;
//   z-index: 2;
// `;

const LogoText = styled.span`
  all: unset;
  font-size: 2.5rem;
  position: relative;
  z-index: 2;
  font-style: italic;
  font-family: "Playfair Display", serif;
  background: linear-gradient(to right, #e74c3c, #f1c40f, #2ecc71, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${media.tablet} {
    font-size: 1.5rem;
  }
`;

const CustomHeaderContainer = styled.div`
  height: 3rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlainLink = styled(Link)`
  &:hover {
    /* color: white; */
  }
`;

const BoxOffice = styled.i`
  font-size: 1.2rem;
  position: relative;
  margin-right: 1rem;
`;

interface Props extends RouteComponentProps<any> {}

interface State {
  darken: boolean;
}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      darken: false
    };
  }

  handleScrollHeader = () => {
    const scrollHeight = window.scrollY;
    if (scrollHeight > 75) {
      this.setState({ darken: true });
    } else {
      this.setState({ darken: false });
    }
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScrollHeader);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScrollHeader);
  };

  render() {
    const { darken } = this.state;
    return (
      <Container>
        <GradientBackground darken={darken} />
        <List>
          <PlainLink to={"/"}>
            {/* <LogoImage src={Logo} /> */}
            <LogoText>
              <span>Movisualization</span>
              {/* <span style={{ color: "#e74c3c", fontWeight: "bolder" }}>
                Mov
              </span>
              <span style={{ color: "#f1c40f", fontWeight: "bolder" }}>is</span>
              <span style={{ color: "#2ecc71", fontWeight: "bolder" }}>
                uali
              </span>
              <span style={{ color: "#3498db", fontWeight: "bolder" }}>
                zation
              </span> */}
            </LogoText>
          </PlainLink>
          <NavList>
            <CustomHeaderContainer>
              <PlainLink to={"/boxOffice"}>
                <BoxOffice className="fas fa-ticket-alt" />
              </PlainLink>
              <HeaderSearch />
            </CustomHeaderContainer>
          </NavList>
        </List>
      </Container>
    );
  }
}

export default withRouter(Header);
