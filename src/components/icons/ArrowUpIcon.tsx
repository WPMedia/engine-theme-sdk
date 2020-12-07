import React from 'react';

type IconProps = import('./types').default;

const ArrowUpIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Arrow Up', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M4.242 13.694l-.922-.922a.992.992 0 010-1.407l8.068-8.072a.992.992 0 011.407 0l8.068 8.068a.992.992 0 010 1.407l-.922.922a.998.998 0 01-1.424-.017l-4.763-4.999v11.934a.994.994 0 01-.996.996h-1.329a.994.994 0 01-.996-.996V8.674l-4.767 5.004a.99.99 0 01-1.424.016z" />
  </svg>
);

export default ArrowUpIcon;
