import {
  useEffect, useState, useRef, FC,
} from 'react';
import EmbedContainer from 'react-oembed-container';
import PropTypes from '@arc-fusion/prop-types';
import formatEmbedMarkup from './formatEmbedMarkup';
import { VideoContainer, VideoWrap } from './styled';

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
  id?: string;
  enableAutoplay?: boolean;
  customFields?: CustomFields;
  isPlaythrough?: boolean;
  shrinkToFit?: boolean;
  viewportPercentage?: number;
  /* @deprecated Use id prop instead */
  uuid?: string;
  aspectRatio?: number;
}

/**
 * Creates a video player with arc's powa player with fusion id loaded
 * @param {string} embedMarkup is html that has powa info
 * @param {string} id corresponds to the video-{id} player loaded by powa video player
 * @param {boolean} enableAutoplay sets video to autoplay per user settings
 * @param {boolean} isPlaythrough is preferred way of setting playthrough in video
 * @param {object} customFields is deprecated but takes in values like the block video player.
 * @param {string} uuid corresponds to the video-{id} player loaded by powa video player
 */
const VideoPlayer: FC<VideoPlayerProps> = ({
  embedMarkup,
  id = '',
  uuid = '',
  enableAutoplay = false,
  customFields = {},
  aspectRatio: overrideAspectRatio,
  isPlaythrough = false,
  shrinkToFit = true,
  viewportPercentage = 65,
}) => {
  // migration from video component
  // will fallback to uuid if id is undefined with defaulting to falsy ''
  const targetId = id || uuid;

  const { playthrough = false, autoplay = false } = customFields;
  const videoRef = useRef(targetId);
  const containerRef = useRef();
  const [aspectRatio, setAspectRatio] = useState(9 / 16); // default 16:9 (ratio is height / width)
  const [videoShadowDom, setVideoShadowDom] = useState();

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
  }, [shouldRender]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (containerRef?.current) {
      const observer = new MutationObserver((() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore: Object is possibly 'undefined'.
        const element = containerRef?.current?.querySelector('.powa-shadow');
        if (element && element.shadowRoot) {
          setVideoShadowDom(element.shadowRoot);
        }
      }));
      observer.observe(containerRef?.current, { subtree: true, childList: true });
      return (): void => observer.disconnect();
    }
  }, [containerRef]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (videoShadowDom) {
      const observer = new MutationObserver((() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore: Object is possibly 'undefined'.
        const bounds = videoShadowDom?.firstElementChild?.getBoundingClientRect();
        if (bounds && bounds.height > 0 && bounds.width > 0) {
          setAspectRatio(bounds.height / bounds.width);
        }
      }));
      observer.observe(videoShadowDom, { subtree: true, childList: true });
      return (): void => observer.disconnect();
    }
  }, [videoShadowDom]);

  const getEmbedHTMLWithPlayStatus = (): string => (
    formatEmbedMarkup(
      embedMarkup,
      enableAutoplay || autoplay,
      isPlaythrough || playthrough,
      overrideAspectRatio,
    )
  );

  return (
    <VideoContainer ref={containerRef}>
      <VideoWrap
        aspectRatio={overrideAspectRatio || aspectRatio}
        viewportPercentage={viewportPercentage}
        shrinkToFit={shrinkToFit}
        videoLoaded={!!videoShadowDom}
      >
        {shouldRender
          ? (
            <EmbedContainer markup={getEmbedHTMLWithPlayStatus()}>
              <div
                id={`video-${videoRef.current}`}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: getEmbedHTMLWithPlayStatus() }}
              />
            </EmbedContainer>
          ) : null}
      </VideoWrap>
    </VideoContainer>
  );
};

export const videoPlayerCustomFieldTags = {
  shrinkToFit: {
    type: PropTypes.bool,
    group: 'Video Settings',
    name: 'Shrink video to fit screen',
    description: 'Will shrink the video width to keep the video in screen while keeping it horizontally centered to content.',
    defaultValue: true,
  },
  viewportPercentage: {
    type: PropTypes.number,
    group: 'Video Settings',
    name: 'Percentage of viewport height',
    description: 'With Shrink Video enabled, this determines how much vertical viewport real estate the video will occupy.',
    min: 0,
    max: 150,
    defaultValue: 65,
  },
};

export const videoPlayerCustomFields = (): object => ({
  shrinkToFit: PropTypes.bool.tag({
    ...(videoPlayerCustomFieldTags.shrinkToFit),
    defaultValue: true,
    hidden: true,
    group: 'Video Settings',
  }),
  viewportPercentage: PropTypes.number.tag({
    ...(videoPlayerCustomFieldTags.viewportPercentage),
    defaultValue: 65,
    hidden: true,
    group: 'Video Settings',
  }),
});

export default VideoPlayer;
