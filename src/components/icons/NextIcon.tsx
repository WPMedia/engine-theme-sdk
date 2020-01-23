import React from 'react';

type IconProps = import('./types').default;

const NextIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M18.287 3.499v17.605a.5.5 0 01-.498.498h-1.993a.5.5 0 01-.498-.498V13.78L7.18 21.295c-.855.71-2.18.116-2.18-1.021V4.329c0-1.138 1.325-1.732 2.18-1.021l8.118 7.47v-7.28A.5.5 0 0115.796 3h1.993a.5.5 0 01.498.499z" />
  </svg>
);

export default NextIcon;
