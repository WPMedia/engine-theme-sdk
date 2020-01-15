import React from 'react';

type IconProps = import('./types').default;

const ChevronRightIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M16.712 12.77l-8.07 8.07a.997.997 0 01-1.409 0l-.941-.94a.997.997 0 01-.002-1.408l6.396-6.426L6.29 5.641a.997.997 0 01.002-1.408l.941-.941a.997.997 0 011.41 0l8.069 8.07a.995.995 0 010 1.409z" /></svg>
);

export default ChevronRightIcon;
