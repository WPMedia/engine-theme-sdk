import React from 'react';

type IconProps = import('./types').default;

const ArrowRightIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M10.91 4.215l.922-.922a.992.992 0 011.407 0l8.072 8.068a.992.992 0 010 1.407L13.24 20.84a.992.992 0 01-1.407 0l-.922-.922a.998.998 0 01.017-1.424l5.003-4.767H3.997A.994.994 0 013 12.731v-1.329c0-.552.444-.996.997-.996H15.93l-5.003-4.767a.99.99 0 01-.017-1.424z" />
  </svg>
);

export default ArrowRightIcon;
