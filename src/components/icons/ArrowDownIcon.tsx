import React from 'react';

type IconProps = import('./types').default;

const ArrowDownIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M19.945 9.91l.922.922a.992.992 0 010 1.407L12.8 20.311a.992.992 0 01-1.407 0L3.32 12.24a.992.992 0 010-1.407l.922-.922a.998.998 0 011.424.017l4.767 5.003V2.997c0-.553.444-.997.996-.997h1.329c.552 0 .996.444.996.997V14.93l4.767-5.003a.99.99 0 011.424-.017z" />
  </svg>
);

export default ArrowDownIcon;
