import React from 'react';

type IconProps = import('./types').default;

const ChevronLeftIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} viewBox="2 2 20 20" xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M6.292 11.361l8.07-8.07a.997.997 0 011.409 0l.941.942a.997.997 0 01.002 1.408l-6.396 6.425 6.396 6.426a.996.996 0 01-.002 1.407l-.941.941a.997.997 0 01-1.41 0l-8.07-8.07a.997.997 0 010-1.409z" />
  </svg>
);

export default ChevronLeftIcon;
