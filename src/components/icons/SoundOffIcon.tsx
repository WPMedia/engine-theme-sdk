import React from 'react';

type IconProps = import('./types').default;

const SoundOffIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M9.929 4.293L6.234 7.986H1.997A.996.996 0 001 8.983v5.979c0 .55.446.996.997.996h4.237l3.695 3.694c.624.624 1.7.186 1.7-.705V4.997c0-.89-1.077-1.328-1.7-.704zm10.24 7.68l1.895-1.896a.67.67 0 000-.947l-.948-.948a.67.67 0 00-.948 0l-1.895 1.895-1.895-1.895a.67.67 0 00-.947 0l-.948.948a.67.67 0 000 .947l1.895 1.895-1.894 1.895a.67.67 0 000 .948l.947.947a.67.67 0 00.948 0l1.894-1.895 1.895 1.895a.67.67 0 00.948 0l.948-.947a.67.67 0 000-.948l-1.896-1.895z" /></svg>
);

export default SoundOffIcon;
