import React, { useRef, useEffect } from "react";
import styled from "styled-components";

interface Props {
  activeImage: boolean;
  imageUrl: string;
  onClickToggleActiveImage: () => void;
}

const Section = styled.section<{ activeImage: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3000;
  overflow: hidden;
  position: fixed;
  opacity: ${props => (props.activeImage ? "1" : "0")};
  transition: opacity 0.1s ease-in-out;
  transform: ${props =>
    props.activeImage ? "translate(0%,0%)" : "translate(0%, 300%)"};
  display: flex;
  align-items: center;
  transform-style: preserve-3d;
`;

const ImageModalContent = styled.div<{ activeImage: boolean }>`
  position: relative;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  z-index: 1;
  margin: 0 auto;
  overflow-y: visible;
  background: #000;
  transition: 0.1s ease-in-out;
  transform: ${props =>
    props.activeImage ? "translate(0%,0%)" : "translate(0%, 300%)"};
`;

const CloseIcon = styled.i`
  display: block;
  position: absolute;
  left: 0;
  top: -2.5rem;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  &:hover {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div<{ activeImage: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background: rgba(100, 100, 100, 0.8); /* overlay color */
  opacity: ${props => (props.activeImage ? "1" : "0")};
  transition: opacity 0.2s ease-out 0.05s;
`;

const Image = styled.img`
  height: 85vh;
  background: #000;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
`;

export const ImageModal = ({
  activeImage,
  imageUrl,
  onClickToggleActiveImage
}: Props) => {
  const node: any = useRef({});

  const handleClickOutside = (e: any) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    onClickToggleActiveImage();
  };

  useEffect(() => {
    if (activeImage) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeImage]);

  return (
    <Section activeImage={activeImage}>
      <ImageModalContent activeImage={activeImage} ref={node}>
        <Image src={imageUrl} />
        <CloseIcon
          onClick={() => onClickToggleActiveImage()}
          className={"fas fa-times"}
        />
      </ImageModalContent>
      <Overlay activeImage={activeImage} />
    </Section>
  );
};
