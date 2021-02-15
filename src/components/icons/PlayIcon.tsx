import React from 'react';
import additionalSVGProps from './Helpers';

type IconProps = import('./types').default;

const PlayIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Play button icon', description = '', context = 'presentational',
}) => (
  <svg width={width} height={height} viewBox="2 1 22 22" xmlns="http://www.w3.org/2000/svg" {...additionalSVGProps(context)}>
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M20.622 9.914L6.006 1.273C4.82.57 3 1.252 3 2.988v17.277c0 1.557 1.69 2.496 3.006 1.715l14.616-8.637c1.304-.768 1.308-2.661 0-3.43z" />
  </svg>
);

export default PlayIcon;
