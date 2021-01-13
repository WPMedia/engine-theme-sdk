import React, { useRef, useEffect } from 'react';
import EmbedContainer from 'react-oembed-container';
import styled from 'styled-components';

/**
    autoplay,
    // can't support global content
    // inheritGlobalContent,
    playthrough,
    alertBadge,
    title,
    description,

    // can't support websiteURL and
    // i think it's deprecated anyway
    // bc fetching
    // websiteURL,
  * */

interface CustomFields {
  playthrough?: boolean;
  autoplay?: boolean;
  // todo:
  // alertBadge
  // title: string;
  // description: string;
}

interface VideoPlayerProps {
  embedHTML: string;
  id: string;
  enableAutoplay?: boolean;
  customFields?: CustomFields;
  playthrough?: boolean;
}

function formatEmbedHTML(embedHTML: string, enableAutoplay: boolean, playthrough: boolean): string {
  let embedHTMLWithPlayStatus = embedHTML;
  if (playthrough && embedHTMLWithPlayStatus) {
    const position = embedHTMLWithPlayStatus.search('id=');
    embedHTMLWithPlayStatus = [embedHTMLWithPlayStatus.slice(0, position), 'data-playthrough=true ', embedHTMLWithPlayStatus.slice(position)].join('');
  }

  if (enableAutoplay && embedHTML) {
    const position = playthrough ? embedHTMLWithPlayStatus.search('data-playthrough=') : embedHTMLWithPlayStatus.search('id=');
    embedHTMLWithPlayStatus = [embedHTMLWithPlayStatus.slice(0, position), ' data-autoplay=true data-muted=true ', embedHTMLWithPlayStatus.slice(position)].join('');
  }

  return embedHTMLWithPlayStatus;
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

// document id better as the id exactly matching the content
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  embedHTML,
  id,
  enableAutoplay = false,
  customFields = {},
}) => {
  const { playthrough = false, autoplay = false } = customFields;
  const videoRef = useRef(id);

  useEffect(() => {
    if (document.getElementById(`video-${videoRef.current}`)) {
      const powaEl = document.getElementById(`video-${videoRef.current}`).firstElementChild;

      if (powaEl) {
        if (window.powaBoot) window.powaBoot();
      }
    }
  });

  const embedHTMLWithPlayStatus = formatEmbedHTML(
    embedHTML,
    enableAutoplay || autoplay,
    playthrough,
  );

  return (
    <EmbedVideoContainer>
      <EmbedContainer markup={embedHTMLWithPlayStatus}>
        {/* eslint-disable-next-line react/no-danger */}
        <div id={`video-${videoRef.current}`} dangerouslySetInnerHTML={{ __html: embedHTMLWithPlayStatus }} />
      </EmbedContainer>
    </EmbedVideoContainer>
  );
};

export default VideoPlayer;
