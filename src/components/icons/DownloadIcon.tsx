import React from 'react';

type IconProps = import('./types').default;

const DownloadIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M9.969 1h3.322c.552 0 .996.444.996.997v6.975h3.642c.739 0 1.108.893.585 1.416l-6.315 6.32a.804.804 0 01-1.134 0l-6.324-6.32a.83.83 0 01.586-1.416h3.645V1.997c0-.553.445-.997.997-.997zm12.29 15.612v4.651a.994.994 0 01-.996.997H1.997A.994.994 0 011 21.263v-4.65c0-.553.444-.997.997-.997h6.09l2.035 2.035a2.13 2.13 0 003.015 0l2.035-2.035h6.091c.552 0 .997.444.997.996zm-5.148 3.654a.833.833 0 00-.83-.83.833.833 0 00-.831.83c0 .457.374.83.83.83.457 0 .83-.373.83-.83zm2.657 0a.833.833 0 00-.83-.83.833.833 0 00-.83.83c0 .457.373.83.83.83.456 0 .83-.373.83-.83z" />
  </svg>
);

export default DownloadIcon;
