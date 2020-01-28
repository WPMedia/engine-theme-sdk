import React from 'react';

type IconProps = import('./types').default;

const PreviousIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M5 21.104V3.5a.5.5 0 01.498-.5h1.993a.5.5 0 01.499.499v7.324l8.117-7.515c.856-.71 2.18-.117 2.18 1.021v15.945c0 1.137-1.324 1.731-2.18 1.021l-8.117-7.47v7.28a.5.5 0 01-.499.497H5.498A.5.5 0 015 21.104z" />
  </svg>
);

export default PreviousIcon;
