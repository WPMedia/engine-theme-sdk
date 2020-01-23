import React from 'react';

type IconProps = import('./types').default;

const CloseIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M15.078 12.308l4.155-4.155c.51-.51.51-1.337 0-1.847l-.923-.924a1.306 1.306 0 00-1.847 0l-4.155 4.156-4.155-4.156a1.306 1.306 0 00-1.847 0l-.924.924c-.51.51-.51 1.336 0 1.847l4.156 4.155-4.156 4.155c-.51.51-.51 1.337 0 1.847l.924.923c.51.51 1.337.51 1.847 0l4.155-4.155 4.155 4.155c.51.51 1.337.51 1.847 0l.923-.923c.51-.51.51-1.337 0-1.847l-4.155-4.155z" />
  </svg>
);

export default CloseIcon;
