import React from 'react';

type IconProps = import('./types').default;

const PhoneIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M21.653 16.023l-4.65-1.994a.997.997 0 00-1.163.287l-2.06 2.516a15.39 15.39 0 01-7.357-7.357l2.516-2.06a.994.994 0 00.287-1.162l-1.993-4.65a1.003 1.003 0 00-1.142-.578l-4.319.997a.997.997 0 00-.772.97C1 13.644 9.633 22.26 20.266 22.26c.465 0 .868-.32.972-.772l.997-4.318a1.009 1.009 0 00-.582-1.146z" />
  </svg>
);

export default PhoneIcon;
