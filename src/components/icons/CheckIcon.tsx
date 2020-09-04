import React from 'react';

type IconProps = import('./types').default;

const CheckIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Check', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M9.22 19.542l-6.909-6.91a1.063 1.063 0 010-1.503l1.504-1.503a1.063 1.063 0 011.503 0l4.654 4.655 9.97-9.97a1.063 1.063 0 011.503 0l1.503 1.504a1.063 1.063 0 010 1.503L10.724 19.542a1.063 1.063 0 01-1.503 0z" />
  </svg>
);

export default CheckIcon;
