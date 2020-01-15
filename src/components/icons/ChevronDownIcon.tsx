import React from 'react';

type IconProps = import('./types').default;

const ChevronDownIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M11.389 16.712l-8.07-8.07a.997.997 0 010-1.409l.941-.941a.997.997 0 011.408-.002l6.425 6.396L18.52 6.29a.997.997 0 011.407.002l.942.941a.998.998 0 010 1.41l-8.07 8.069a.997.997 0 01-1.41 0z" /></svg>
);

export default ChevronDownIcon;
