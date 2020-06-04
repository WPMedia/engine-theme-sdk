import React from 'react';

type IconProps = import('./types').default;

const CalendarIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M3.498 8.972h17.606a.5.5 0 01.498.499v10.795c0 1.1-.893 1.994-1.993 1.994H4.993c-1.1 0-1.993-.893-1.993-1.994V9.471a.5.5 0 01.498-.499zm18.104-1.827V5.651c0-1.1-.893-1.994-1.993-1.994h-1.993V1.498A.5.5 0 0017.118 1h-1.661a.5.5 0 00-.499.498v2.16H9.644v-2.16A.5.5 0 009.145 1h-1.66a.5.5 0 00-.499.498v2.16H4.993A1.992 1.992 0 003 5.65v1.494a.5.5 0 00.498.499h17.606a.5.5 0 00.498-.499z" />
  </svg>
);

export default CalendarIcon;
