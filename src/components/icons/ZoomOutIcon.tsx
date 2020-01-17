import React from 'react';

type IconProps = import('./types').default;

const ZoomOutIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} viewBox="0 2 24 22" xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M14.25 9v1.5c0 .31-.253.563-.563.563H5.814a.564.564 0 01-.563-.563V9c0-.31.253-.563.563-.563h7.875c.309 0 .562.254.562.563zm9.422 13.345l-1.327 1.327a1.12 1.12 0 01-1.589 0l-4.678-4.674a1.124 1.124 0 01-.328-.796v-.765a9.702 9.702 0 01-6 2.063A9.749 9.749 0 010 9.75 9.749 9.749 0 019.75 0a9.749 9.749 0 019.75 9.75 9.702 9.702 0 01-2.063 6h.765c.3 0 .585.117.796.328l4.674 4.674c.436.44.436 1.153 0 1.593zM16.125 9.75A6.37 6.37 0 009.75 3.375 6.37 6.37 0 003.375 9.75a6.37 6.37 0 006.375 6.375 6.37 6.37 0 006.375-6.375z" fillRule="nonzero" /></svg>
);

export default ZoomOutIcon;
