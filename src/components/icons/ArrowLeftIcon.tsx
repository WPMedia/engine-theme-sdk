import React from 'react';

type IconProps = import('./types').default;

const ArrowLeftIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M13.694 19.918l-.922.922a.992.992 0 01-1.407 0l-8.072-8.068a.992.992 0 010-1.407l8.072-8.072a.992.992 0 011.407 0l.922.922a.998.998 0 01-.016 1.424l-5.004 4.767h11.934c.552 0 .996.444.996.996v1.329a.994.994 0 01-.996.996H8.674l5.004 4.767a.99.99 0 01.016 1.424z" />
  </svg>
);

export default ArrowLeftIcon;
