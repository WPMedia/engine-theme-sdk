import React from 'react';

type IconProps = import('./types').default;

const PlayCircleIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M12.298 1C6.609 1 2 5.609 2 11.298c0 5.688 4.609 10.297 10.298 10.297 5.688 0 10.297-4.609 10.297-10.297C22.595 5.609 17.986 1 12.298 1zm4.804 11.294l-7.308 4.194a.998.998 0 01-1.483-.872V6.979a.999.999 0 011.483-.872l7.308 4.443a1 1 0 010 1.744z" />
  </svg>
);

export default PlayCircleIcon;
