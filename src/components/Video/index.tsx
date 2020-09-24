import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

declare global {
  interface Window { powaBoot?: Function }
}

interface VideoProps {
  uuid: string;
  org: string;
  env: string;
  autoplay?: boolean;
  playthrough?: boolean;
  aspectRatio?: number;
}

const Video: React.FC<VideoProps> = (props) => {
  const {
    uuid,
    org,
    env,
    autoplay = false,
    playthrough = false,
    // default 16:9
    aspectRatio = 0.5625,
  } = props;
  const muted = autoplay;

  useEffect(() => {
    if (window.powaBoot) {
      window.powaBoot();
    }
  }, []);


  return (
    <div className="video-container">
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
    </div>
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
  /** Video ratio */
  aspectRatio: PropTypes.number,
};

export default Video;
