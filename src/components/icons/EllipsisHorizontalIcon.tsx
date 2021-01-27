import React from 'react';

type IconProps = import('./types').default;

const EllipsisHorizontalIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'EllipsisHorizontal', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" />
  </svg>
);

export default EllipsisHorizontalIcon;
