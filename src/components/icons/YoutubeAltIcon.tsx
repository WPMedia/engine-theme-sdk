import React from 'react';

type IconProps = import('./types').default;

const YoutubeAltIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M10.756 10.063l3.953 2.246-3.953 2.247v-4.493zm10.846-5.07V19.61c0 1.1-.893 1.993-1.993 1.993H4.993A1.995 1.995 0 013 19.61V4.993C3 3.893 3.893 3 4.993 3H19.61c1.1 0 1.993.893 1.993 1.993zm-1.744 7.32s0-2.474-.315-3.662a1.895 1.895 0 00-1.337-1.345c-1.176-.32-5.905-.32-5.905-.32s-4.73 0-5.904.32A1.895 1.895 0 005.06 8.65c-.316 1.184-.316 3.662-.316 3.662s0 2.475.316 3.663c.174.656.685 1.15 1.337 1.324 1.175.316 5.904.316 5.904.316s4.73 0 5.905-.32a1.868 1.868 0 001.337-1.324c.315-1.184.315-3.659.315-3.659z" />
  </svg>
);

export default YoutubeAltIcon;
