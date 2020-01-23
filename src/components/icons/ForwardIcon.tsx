import React from 'react';

type IconProps = import('./types').default;

const ForwardIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M14.152 11.315h8.319a.498.498 0 00.498-.498V2.498A.498.498 0 0022.47 2h-1.993a.498.498 0 00-.499.498v3.244a10.27 10.27 0 00-7.73-3.41 10.273 10.273 0 00-10.221 10.32c.012 5.677 4.618 10.275 10.297 10.275a10.26 10.26 0 006.914-2.666.5.5 0 00.02-.723l-1.41-1.41a.497.497 0 00-.682-.023 7.28 7.28 0 01-4.842 1.833 7.304 7.304 0 01-7.308-7.308 7.304 7.304 0 017.308-7.308 7.295 7.295 0 015.908 3.003h-4.08a.498.498 0 00-.499.499v1.993c0 .275.223.498.498.498z" />
  </svg>
);

export default ForwardIcon;
