import React from 'react';

type IconProps = import('./types').default;

const YoutubeIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'YouTube', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M23.242 6.495a2.85 2.85 0 00-2.005-2.018C19.468 4 12.377 4 12.377 4s-7.091 0-8.86.477a2.85 2.85 0 00-2.004 2.018c-.474 1.78-.474 5.493-.474 5.493s0 3.714.474 5.494a2.807 2.807 0 002.004 1.986c1.769.477 8.86.477 8.86.477s7.091 0 8.86-.477a2.807 2.807 0 002.005-1.986c.474-1.78.474-5.494.474-5.494s0-3.713-.474-5.493zM10.058 15.36V8.617l5.927 3.372-5.927 3.371z" />
  </svg>
);

export default YoutubeIcon;
