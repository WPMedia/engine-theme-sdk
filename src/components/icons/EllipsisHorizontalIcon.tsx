import React from 'react';

type IconProps = import('./types').default;

const EllipsisHorizontalIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M15.287 11.99a2.988 2.988 0 01-2.99 2.99 2.988 2.988 0 01-2.989-2.99A2.988 2.988 0 0112.298 9a2.988 2.988 0 012.99 2.99zM19.606 9a2.988 2.988 0 00-2.99 2.99 2.988 2.988 0 002.99 2.99 2.988 2.988 0 002.99-2.99A2.988 2.988 0 0019.605 9zM4.99 9A2.988 2.988 0 002 11.99a2.988 2.988 0 002.99 2.99 2.988 2.988 0 002.99-2.99A2.988 2.988 0 004.99 9z" />
  </svg>
);

export default EllipsisHorizontalIcon;
