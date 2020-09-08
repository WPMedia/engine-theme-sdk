import React from 'react';

type IconProps = import('./types').default;

const BackwardIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M10.817 11.315H2.498A.498.498 0 012 10.817V2.498C2 2.223 2.223 2 2.498 2h1.993c.276 0 .499.223.499.498v3.244a10.27 10.27 0 017.73-3.41 10.273 10.273 0 0110.221 10.32c-.012 5.677-4.618 10.275-10.297 10.275a10.26 10.26 0 01-6.914-2.666.5.5 0 01-.02-.723l1.41-1.41a.497.497 0 01.682-.023 7.28 7.28 0 004.842 1.833 7.304 7.304 0 007.308-7.308 7.304 7.304 0 00-7.308-7.308 7.295 7.295 0 00-5.908 3.003h4.08c.276 0 .499.223.499.499v1.993a.498.498 0 01-.498.498z" />
  </svg>
);

export default BackwardIcon;
