import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { media } from "../config/_mixin";
import { youtubeApis } from "../api";

interface Props {
  activeVideo: boolean;
  videoKey: string;
  onClickToggleActiveVideo: () => void;
}

const Section = styled.section<{ activeVideo: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3000;
  overflow: hidden;
  position: fixed;
  opacity: ${props => (props.activeVideo ? "1" : "0")};
  transition: opacity 0.1s ease-in-out;
  transform: ${props =>
    props.activeVideo ? "translate(0%,0%)" : "translate(0%, 300%)"};
  display: flex;
  align-items: center;
  transform-style: preserve-3d;
`;

const VideoModalContent = styled.div<{ activeVideo: boolean }>`
  position: relative;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  z-index: 1;
  margin: 0 auto;
  overflow-y: visible;
  background: #000;
  width: calc(70% - 10em);
  height: 0;
  padding-top: calc((70% - 10em) * 0.5625); /* 16:9 calc */
  transition: 0.1s ease-in-out;
  transform: ${props =>
    props.activeVideo ? "translate(0%,0%)" : "translate(0%, 300%)"};

  /* Scaling to fit within the current Viewport size:
   When viewport aspect ratio is greater than 16:9
   work off the height instead of the width for calc */
  @media (min-aspect-ratio: 16/9) {
    width: 0;
    height: calc(80vh - 10em);
    padding-top: 0;
    padding-left: calc((80vh - 10em) * 1.7778); /* 16:9 calc */
  }

  /* Mobile Layout Tweaks - side margins reduced */
  ${media.tablet} {
    width: calc(90% - 1em);
    padding-top: calc((90% - 1em) * 0.5625); /* 16:9 calc */
  }
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

const Overlay = styled.div<{ activeVideo: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background: rgba(100, 100, 100, 0.8); /* overlay color */
  opacity: ${props => (props.activeVideo ? "1" : "0")};
  transition: opacity 0.2s ease-out 0.05s;
`;

const YoutubePlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: #000;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
`;

const TagContainer = styled.div`
  visibility: hidden;
  display: flex;
`;

const Tag = styled.div`
  margin: 0.5rem;
  padding: 0.5rem 0.6rem 0.5rem;
  color: #46abf3;
  font-weight: 700;
  background-color: white;
  border-radius: 0.5rem;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
`;

export const VideoModal = ({
  activeVideo,
  videoKey,
  onClickToggleActiveVideo
}: Props) => {
  const node: any = useRef({});
  const [tags, setTags] = useState([]);

  const handleClickOutside = (e: any) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    onClickToggleActiveVideo();
  };

  useEffect(() => {
    if (activeVideo) {
      document.addEventListener("mousedown", handleClickOutside);
      const fetchData = async () => {
        const {
          data: { items }
        } = await youtubeApis.videos(videoKey);
        const youtubeItem = items[0];
        const { snippet } = youtubeItem;
        setTags(snippet.tags);
      };
      fetchData();
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeVideo]);

  return (
    <Section activeVideo={activeVideo}>
      <VideoModalContent activeVideo={activeVideo} ref={node}>
        <YoutubePlayer
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          playing={true}
          controls={false}
          width="100%"
          height="100%"
        />
        {tags.length !== 0 && (
          <TagContainer>
            {tags.map((tag: string) => (
              <Tag># {tag}</Tag>
            ))}
          </TagContainer>
        )}
        <CloseIcon
          onClick={() => onClickToggleActiveVideo()}
          className={"fas fa-times"}
        />
      </VideoModalContent>
      <Overlay activeVideo={activeVideo} />
    </Section>
  );
};
