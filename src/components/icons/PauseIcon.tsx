import React from 'react';

type IconProps = import('./types').default;

const PauseIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Pause button icon', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="2 1 22 22" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M8.98 21.602H4.992A1.993 1.993 0 013 19.61V4.993C3 3.893 3.893 3 4.993 3H8.98c1.1 0 1.993.893 1.993 1.993V19.61c0 1.1-.892 1.993-1.993 1.993zm12.622-1.993V4.993c0-1.1-.893-1.993-1.993-1.993h-3.986c-1.1 0-1.993.893-1.993 1.993V19.61c0 1.1.892 1.993 1.993 1.993h3.986c1.1 0 1.993-.893 1.993-1.993z" />
  </svg>
);

export default PauseIcon;
