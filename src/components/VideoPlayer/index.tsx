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
  embedMarkup: string;
  id: string;
  enableAutoplay?: boolean;
  customFields?: CustomFields;
  playthrough?: boolean;
}

export function formatEmbedHTML(
  embedHTML: string,
  enableAutoplay: boolean,
  playthrough: boolean,
): string {
  if (embedHTML) {
    let embedHTMLWithPlayStatus = embedHTML;

    if (enableAutoplay) {
      const position = embedHTMLWithPlayStatus.search('id=');
      embedHTMLWithPlayStatus = [embedHTMLWithPlayStatus.slice(0, position), ' data-autoplay=true data-muted=true ', embedHTML.slice(position)].join('');
    }

    if (playthrough) {
      const position = embedHTMLWithPlayStatus.search('id=');
      embedHTMLWithPlayStatus = [embedHTML.slice(0, position), ' data-playthrough=true ', embedHTML.slice(position)].join('');
    }

    return embedHTMLWithPlayStatus;
  }

  // if falsy (empty string, undefined, or null), return empty string
  // possibly throw an error
  return '';
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
  embedMarkup,
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
    embedMarkup,
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
