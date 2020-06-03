import React from 'react';

type IconProps = import('./types').default;

const TwitchIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M4.25 3L3 6.193v13.05h4.443v2.36h2.5l2.358-2.36h3.612l4.859-4.858V3H4.25zm14.857 10.55l-2.778 2.779h-4.443l-2.359 2.358V16.33h-3.75V4.665h13.33v8.886zm-2.778-5.692v4.854h-1.665V7.858h1.665zm-4.443 0v4.854H10.22V7.858h1.665z" />
  </svg>
);

export default TwitchIcon;
