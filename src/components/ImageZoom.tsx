import React from "react";
import styled from "styled-components";

interface Props {
  zoom: any;
  color: string;
  src: string;
  alt: string;
}

interface State {
  isZoomOpen: boolean;
}

const Image = styled.img`
  width: 15rem;
  background: #161718;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(221, 238, 255, 0.35);
  display: inline-block;
  overflow: hidden;
  position: relative;
  -webkit-background-clip: padding-box;
  border-radius: 4px;
  cursor: pointer;
`;

export default class ImageZoom extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isZoomOpen: false };
  }
  zoom = this.props.zoom.clone({
    background: this.props.color
  });

  attachZoom = (image: any) => {
    this.zoom.attach(image);
    this.zoom.on("open", (event: unknown) => {
      console.log(event);
      this.setState({ isZoomOpen: true });
      // the image has been opened (tracked only once)
    });
    this.zoom.on("close", (event: unknown) => {
      console.log(event);
      this.setState({ isZoomOpen: false });
      // the image has been opened (tracked only once)
    });
  };

  render() {
    const { isZoomOpen } = this.state;
    return (
      <Image
        style={{ zIndex: isZoomOpen ? 7 : 2 }}
        src={this.props.src}
        alt={this.props.alt}
        ref={this.attachZoom}
      />
    );
  }
}
