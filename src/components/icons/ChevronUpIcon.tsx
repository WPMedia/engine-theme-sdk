import React from 'react';

type IconProps = import('./types').default;

const ChevronUpIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M12.77 6.292l8.07 8.07a.995.995 0 010 1.409l-.94.941a.997.997 0 01-1.408.002l-6.426-6.396-6.425 6.396a.997.997 0 01-1.408-.002l-.941-.941a.997.997 0 010-1.41l8.07-8.07a.997.997 0 011.409 0z" />
  </svg>
);

export default ChevronUpIcon;
