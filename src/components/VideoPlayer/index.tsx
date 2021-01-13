import React, { useRef, useEffect } from 'react';
import EmbedContainer from 'react-oembed-container';
import styled from 'styled-components';

// todo: add enableAutoplay
// enableAutoplay={!!(customFields?.enableAutoplay)}
// customFields={{
//   playthrough:
// }}
interface VideoPlayerProps {
  embedHTML: string;
  id: string;
}

const EmbedVideoContainer = styled.div`
  @media screen and (min-width: 48rem) {
    margin-bottom: 1.5rem;
  }

  margin-bottom: 1rem;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
`;

// todo: include the css and scss for margin block
// document id better as the id exactly matching the content
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  embedHTML, id,
}) => {
  const videoRef = useRef(id);

  // the fetched data may be null
  // embed_html from a null object which throws errors and interferes
  // comments out script but keeps the ref id
  // todo: potentially return null if embedHTML is invalid
  const validEmbedHTML = embedHTML && embedHTML.replace('<script', '<!--script')
    .replace('script>', 'script-->');

  useEffect(() => {
    if (document.getElementById(`video-${videoRef.current}`)) {
      const powaEl = document.getElementById(`video-${videoRef.current}`).firstElementChild;

      if (powaEl) {
        if (window.powaBoot) window.powaBoot();
      }
    }
  });

  return (
    <EmbedVideoContainer>
      <EmbedContainer markup={validEmbedHTML}>
        {/* eslint-disable-next-line react/no-danger */}
        <div id={`video-${videoRef.current}`} dangerouslySetInnerHTML={{ __html: validEmbedHTML }} />
      </EmbedContainer>
    </EmbedVideoContainer>
  );
};

export default VideoPlayer;
