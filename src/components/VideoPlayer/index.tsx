import React, { useRef, useEffect } from 'react';
import EmbedContainer from 'react-oembed-container';

interface VideoPlayerProps {
  embedHTML: string;
  id: string;
}

// todo: include the css and scss for margin block
// document id better as the id exactly matching the content
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  embedHTML, id,
}) => {
  const videoRef = useRef(id);

  // Make sure that the player does not render until after component is mounted
  // eslint-disable-next-line no-param-reassign
  embedHTML = embedHTML && embedHTML.replace('<script', '<!--script')
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
    <div className="embed-video">
      {/* not sure if I need the useRef with the id */}
      <EmbedContainer markup={embedHTML}>
        {/* eslint-disable-next-line react/no-danger */}
        <div id={`video-${videoRef.current}`} dangerouslySetInnerHTML={{ __html: embedHTML }} />
      </EmbedContainer>
    </div>
  );
};

export default VideoPlayer;
