import React from 'react';

type IconProps = import('./types').default;

const ExternalLinkIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M18.938 14.287h-1.329a.664.664 0 00-.664.665v4.65H3.657V6.315h5.98a.664.664 0 00.664-.664V4.32a.664.664 0 00-.664-.664H2.993A1.996 1.996 0 001 5.651v14.615c0 1.101.892 1.994 1.993 1.994H17.61c1.1 0 1.993-.893 1.993-1.994v-5.314a.664.664 0 00-.664-.665zM21.263 1h-5.315c-.887 0-1.33 1.076-.706 1.702l1.484 1.484-10.12 10.117a.997.997 0 000 1.411l.94.94a.997.997 0 001.413 0L19.074 6.536l1.483 1.481c.623.623 1.703.187 1.703-.706V1.997A.997.997 0 0021.263 1z" />
  </svg>
);

export default ExternalLinkIcon;
