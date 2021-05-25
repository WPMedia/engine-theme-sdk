import React, { useEffect, useState, useRef } from 'react';
import EmbedContainer from 'react-oembed-container';
import PropTypes from '@arc-fusion/prop-types';
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
  shrinkToFit?: boolean;
  viewportPercentage?: number;
}

const EmbedVideoContainer = styled.div`
  @media screen and (min-width: 48rem) {
    margin-bottom: 1.5rem;
  }

  margin-bottom: 1rem;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;

  background-color: black;
`;

const EmbedContainerStyle = styled(EmbedContainer)`
  ${({
    aspectRatio,
    viewportPercentage,
    shrinkToFit,
  }): string => (shrinkToFit ? `
    max-width: calc(${1 / aspectRatio} * ${viewportPercentage}vh);
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  ` : '')
}
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
  shrinkToFit = false,
  viewportPercentage = 75,
}) => {
  const { playthrough = false, autoplay = false } = customFields;
  const videoRef = useRef(id);
  const containerRef = useRef();
  const [aspectRatio, setAspectRatio] = useState(9 / 16); // default 16:9

  const shouldRender = !!(
    typeof window !== 'undefined'
    && typeof document !== 'undefined'
  );

  useEffect(() => {
    if (shouldRender && document.getElementById(`video-${videoRef.current}`)) {
      const powaEl = document.getElementById(`video-${videoRef.current}`).firstElementChild;
      if (powaEl) {
        if (window.powaBoot) window.powaBoot();
      }
    }
    // only run on mount with []
  }, [shouldRender]);

  useEffect(() => {
    const observer = new MutationObserver((() => {
      const bounds = containerRef.current.getBoundingClientRect();
      if (bounds.height > 0 && bounds.width > 0) {
        setAspectRatio(bounds.height / bounds.width);
      }
    }));
    observer.observe(containerRef.current, { subtree: true, childList: true });
  }, [containerRef]);

  const getEmbedHTMLWithPlayStatus = (): string => (
    formatEmbedMarkup(
      embedMarkup,
      enableAutoplay || autoplay,
      isPlaythrough || playthrough,
    )
  );

  return shouldRender ? (
    <EmbedVideoContainer ref={containerRef} aspectRatio={aspectRatio}>
      <EmbedContainerStyle
        markup={getEmbedHTMLWithPlayStatus()}
        aspectRatio={aspectRatio}
        viewportPercentage={viewportPercentage}
        shrinkToFit={shrinkToFit}
      >
        <div
          id={`video-${videoRef.current}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: getEmbedHTMLWithPlayStatus() }}
        />
      </EmbedContainerStyle>
    </EmbedVideoContainer>
  ) : null;
};

export const videoPlayerCustomFieldTags = {
  shrinkToFit: {
    type: PropTypes.bool,
    group: 'Video Settings',
    name: 'Shrink video to fit screen',
    description: 'Will shrink the video width to keep the video in screen while keeping it horizontally centered to content.',
    defaultValue: false,
  },
  viewportPercentage: {
    type: PropTypes.number,
    group: 'Video Settings',
    name: 'Percentage of viewport height',
    description: 'With Shrink Video enabled, this determines how much vertical viewport real estate the video will occupy.',
    min: 0,
    max: 150,
    defaultValue: 75,
  },
};

export const videoPlayerCustomFields = (): object => ({
  shrinkToFit: PropTypes.bool.tag({
    ...(videoPlayerCustomFieldTags.shrinkToFit),
    defaultValue: false,
    group: 'Video Settings',
  }),
  viewportPercentage: PropTypes.number.tag({
    ...(videoPlayerCustomFieldTags.viewportPercentage),
    defaultValue: 75,
    group: 'Video Settings',
  }),
});

export default VideoPlayer;
