import React, { useRef, useEffect } from 'react';
import EmbedContainer from 'react-oembed-container';
import styled from 'styled-components';
import formatEmbedMarkup from './formatEmbedMarkup';

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
  /* @deprecated Use isPlaythrough prop directly instead */
  playthrough?: boolean;
  /* @deprecated Use enableAutoplay prop directly instead */
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
  isPlaythrough?: boolean;
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

/**
 * Creates a video player with arc's powa player with fusion id loaded
 * @param {string} embedMarkup is html that has powa info
 * @param {string} id corresponds to the video-{id} player loaded by powa video player
 * @param {boolean} enableAutoplay sets video to autoplay per user settings
 * @param {boolean} isPlaythrough is preferred way of setting playthrough in video
 * @param {object} customFields is deprecated but takes in values like the block video player.
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  embedMarkup,
  id,
  enableAutoplay = false,
  customFields = {},
  isPlaythrough = false,
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
    // only run on mount with []
  }, []);

  const embedHTMLWithPlayStatus = formatEmbedMarkup(
    embedMarkup,
    enableAutoplay || autoplay,
    isPlaythrough || playthrough,
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
