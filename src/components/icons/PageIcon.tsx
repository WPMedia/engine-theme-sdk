import React from 'react';

type IconProps = import('./types').default;

const PageIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M13.301 6.647V1H4.997A.994.994 0 004 1.997v19.266c0 .552.444.997.997.997h13.951a.994.994 0 00.997-.997V7.643h-5.647a1 1 0 01-.997-.996zm2.657 9.8a.5.5 0 01-.498.498H8.484a.5.5 0 01-.498-.499v-.332a.5.5 0 01.498-.498h6.976a.5.5 0 01.498.498v.332zm0-2.658a.5.5 0 01-.498.498H8.484a.5.5 0 01-.498-.498v-.332a.5.5 0 01.498-.499h6.976a.5.5 0 01.498.499v.332zm0-2.99v.332a.5.5 0 01-.498.499H8.484a.5.5 0 01-.498-.499V10.8a.5.5 0 01.498-.498h6.976a.5.5 0 01.498.498zm3.987-4.737v.253H14.63V1h.253c.266 0 .52.104.706.29l4.065 4.07c.187.187.29.44.29.702z" />
  </svg>
);

export default PageIcon;
