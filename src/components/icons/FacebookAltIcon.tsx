import React from 'react';

type IconProps = import('./types').default;

const FacebookAltIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M19.609 3H4.993C3.893 3 3 3.892 3 4.993V19.61c0 1.1.892 1.993 1.993 1.993h5.699v-6.324H8.076V12.3h2.616v-2.269c0-2.58 1.536-4.006 3.89-4.006 1.126 0 2.305.201 2.305.201V8.76h-1.299c-1.279 0-1.678.794-1.678 1.608v1.933h2.856l-.457 2.977H13.91v6.324h5.699c1.1 0 1.993-.892 1.993-1.993V4.993c0-1.1-.892-1.993-1.993-1.993z" />
  </svg>
);

export default FacebookAltIcon;
