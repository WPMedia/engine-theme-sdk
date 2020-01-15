import React from 'react';

type IconProps = import('./types').default;

const EllipsisVerticalIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M11.99 9.308a2.988 2.988 0 012.99 2.99 2.988 2.988 0 01-2.99 2.99A2.988 2.988 0 019 12.297a2.988 2.988 0 012.99-2.99zM9 4.99a2.988 2.988 0 002.99 2.99 2.988 2.988 0 002.99-2.99A2.988 2.988 0 0011.99 2 2.988 2.988 0 009 4.99zm0 14.616a2.988 2.988 0 002.99 2.99 2.988 2.988 0 002.99-2.99 2.988 2.988 0 00-2.99-2.99A2.988 2.988 0 009 19.606z" /></svg>
);

export default EllipsisVerticalIcon;
