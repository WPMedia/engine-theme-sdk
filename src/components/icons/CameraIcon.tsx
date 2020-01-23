import React from 'react';

type IconProps = import('./types').default;

const CameraIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M22.26 7.65v11.96c0 1.1-.893 1.993-1.994 1.993H2.993A1.995 1.995 0 011 19.61V7.651c0-1.1.893-1.994 1.993-1.994h3.654l.51-1.366A1.99 1.99 0 019.023 3h5.211c.83 0 1.574.515 1.865 1.291l.514 1.366h3.654c1.1 0 1.994.893 1.994 1.994zm-5.648 5.98a4.987 4.987 0 00-4.982-4.983 4.987 4.987 0 00-4.983 4.983 4.987 4.987 0 004.983 4.982 4.987 4.987 0 004.982-4.982zm-1.328 0a3.66 3.66 0 01-3.654 3.654 3.66 3.66 0 01-3.654-3.654 3.66 3.66 0 013.654-3.654 3.66 3.66 0 013.654 3.654z" />
  </svg>
);

export default CameraIcon;
