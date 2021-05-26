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
}

const Video: React.FC<VideoProps> = (props) => {
  const {
    uuid,
    org,
    env,
    autoplay = false,
    playthrough = false,
    viewportPercentage = 75,
    shrinkToFit = false,
  } = props;
  const muted = autoplay;
  const containerRef = useRef();
  const [aspectRatio, setAspectRatio] = useState(9 / 16); // default 16:9 (ratio is height / width)
  const [videoShadowDom, setVideoShadowDom] = useState();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (containerRef.current) {
      const observer = new MutationObserver((() => {
        const element = containerRef.current.querySelector('.powa');
        if (element && element.shadowRoot) {
          setVideoShadowDom(element.shadowRoot);
        }
      }));
      observer.observe(containerRef.current, { subtree: true, childList: true });
      return (): void => observer.disconnect();
    }
  }, [containerRef]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (videoShadowDom) {
      const observer = new MutationObserver((() => {
        const bounds = videoShadowDom.firstElementChild.getBoundingClientRect();
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
        aspectRatio={aspectRatio}
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
          data-aspect-ratio={aspectRatio}
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
    defaultValue: false,
    group: 'Video Settings',
  }),
  viewportPercentage: PropTypes.number.tag({
    name: 'Percentage of viewport height',
    description: 'With Shrink Video enabled, this determines how much vertical viewport real estate the video will occupy.',
    defaultValue: 75,
    group: 'Video Settings',
  }),
};

export default Video;
