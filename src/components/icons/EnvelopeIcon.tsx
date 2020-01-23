import React from 'react';

type IconProps = import('./types').default;

const EnvelopeIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M21.857 9.265a.25.25 0 01.403.195v8.492c0 1.1-.893 1.993-1.994 1.993H2.993c-1.1 0-1.993-.893-1.993-1.993V9.464c0-.207.237-.324.403-.195.93.723 2.163 1.64 6.398 4.717.877.64 2.355 1.985 3.829 1.977 1.482.012 2.99-1.362 3.832-1.977 4.236-3.077 5.465-3.998 6.395-4.72zM11.63 14.63c.963.016 2.35-1.213 3.048-1.72 5.51-3.998 5.929-4.347 7.2-5.343a.994.994 0 00.382-.785v-.789c0-1.1-.893-1.993-1.994-1.993H2.993C1.893 4 1 4.893 1 5.993v.789a1 1 0 00.382.785c1.27.992 1.69 1.345 7.2 5.344.698.506 2.084 1.735 3.048 1.719z" />
  </svg>
);

export default EnvelopeIcon;
