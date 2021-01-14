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

/**
 * via https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/#a-better-way
 * Convert a template string into HTML DOM nodes
 * @param  {String} string The template string
 * @return {Node}       The template HTML
 */
function convertStringToNode(string: string): HTMLElement {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, 'text/html');
  // get the body, will return <body> around your code
  return doc.body;
}

export function formatEmbedHTML(
  embedHTML: string,
  enableAutoplay: boolean,
  playthrough: boolean,
): string {
  if (embedHTML) {
    const embedHTMLWithPlayStatus = convertStringToNode(embedHTML).querySelector('div');

    if (enableAutoplay) {
      embedHTMLWithPlayStatus.setAttribute('data-autoplay', 'true');
      embedHTMLWithPlayStatus.setAttribute('data-muted', 'true');
    }

    if (playthrough) {
      embedHTMLWithPlayStatus.setAttribute('data-playthrough', 'true');
    }

    return embedHTMLWithPlayStatus.outerHTML;
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
