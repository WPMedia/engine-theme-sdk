import React from 'react';

type IconProps = import('./types').default;

const PlusIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Plus', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M20.273 10.308h-5.979v-5.98C14.294 3.596 13.7 3 12.965 3h-1.328c-.734 0-1.329.595-1.329 1.329v5.979h-5.98c-.733 0-1.328.595-1.328 1.329v1.328c0 .734.595 1.33 1.329 1.33h5.979v5.978c0 .734.595 1.33 1.329 1.33h1.328a1.33 1.33 0 001.33-1.33v-5.979h5.978a1.33 1.33 0 001.33-1.329v-1.328a1.33 1.33 0 00-1.33-1.329z" />
  </svg>
);

export default PlusIcon;
