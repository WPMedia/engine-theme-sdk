import React from 'react';

type IconProps = import('./types').default;

const UserIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M12.301 11.63a5.314 5.314 0 100-10.63 5.314 5.314 0 000 10.63zm3.72 1.328h-.693a7.236 7.236 0 01-6.054 0h-.693A5.583 5.583 0 003 18.54v1.727c0 1.1.893 1.994 1.993 1.994H19.61c1.1 0 1.993-.893 1.993-1.994V18.54c0-3.08-2.5-5.58-5.58-5.58z" /></svg>
);

export default UserIcon;
