import React, { useEffect, useState, useRef } from 'react';
import PropTypes from '@arc-fusion/prop-types';

import { VideoContainer, VideoWrap } from './styled';

declare global {
  interface Window { powaBoot?: Function }
}

interface VideoProps {
  uuid: string;
  org: string;
  env: string;
  autoplay?: boolean;
  playthrough?: boolean;
  viewportPercentage?: number;
  shrinkToFit?: boolean;
  aspectRatio?: number;
}

const Video: React.FC<VideoProps> = (props) => {
  const {
    uuid,
    org,
    env,
    autoplay = false,
    playthrough = false,
    viewportPercentage = 65,
    shrinkToFit = true,
    aspectRatio: overrideAspectRatio,
  } = props;
  const muted = autoplay;
  const containerRef = useRef();
  const [aspectRatio, setAspectRatio] = useState(9 / 16); // default 16:9 (ratio is height / width)
  const [videoShadowDom, setVideoShadowDom] = useState();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (containerRef?.current) {
      const observer = new MutationObserver((() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore: Object is possibly 'undefined'.
        const element = containerRef?.current?.querySelector('.powa');
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

  useEffect(() => {
    if (window.powaBoot) {
      window.powaBoot();
    }
  }, []);

  return (
    <VideoContainer ref={containerRef} className="video-container">
      <VideoWrap
        aspectRatio={overrideAspectRatio || aspectRatio}
        viewportPercentage={viewportPercentage}
        shrinkToFit={shrinkToFit}
      >
        <div
          className="powa"
          id={`powa-${uuid}`}
          data-org={org}
          data-env={env}
          data-uuid={uuid}
          data-autoplay={autoplay}
          data-playthrough={playthrough}
          data-muted={muted}
          data-aspect-ratio={overrideAspectRatio || aspectRatio}
        />
      </VideoWrap>
    </VideoContainer>
  );
};

Video.propTypes = {
  /** Video UUID */
  uuid: PropTypes.string,
  /** Video org */
  org: PropTypes.string,
  /** Video code env */
  env: PropTypes.string,
  /** Autoplay the video (video will be muted) */
  autoplay: PropTypes.bool,
  /** Play through recommended videos if Video center is configured to do so */
  playthrough: PropTypes.bool,
  shrinkToFit: PropTypes.bool.tag({
    name: 'Shrink video to fit screen',
    description: 'Will shrink the video width to keep the video in screen while keeping it horizontally centered to content.',
    defaultValue: true,
    hidden: true,
    group: 'Video Settings',
  }),
  viewportPercentage: PropTypes.number.tag({
    name: 'Percentage of viewport height',
    description: 'With Shrink Video enabled, this determines how much vertical viewport real estate the video will occupy.',
    defaultValue: 65,
    hidden: true,
    group: 'Video Settings',
  }),
};

export default Video;
