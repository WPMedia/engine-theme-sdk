import React from 'react';

type IconProps = import('./types').default;

const BellIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M12.343 22.26a2.657 2.657 0 002.656-2.658H9.686a2.657 2.657 0 002.657 2.658zm8.943-6.217c-.802-.862-2.303-2.159-2.303-6.406 0-3.227-2.262-5.81-5.313-6.443v-.865a1.328 1.328 0 10-2.655 0v.865c-3.05.634-5.313 3.216-5.313 6.443 0 4.247-1.5 5.544-2.303 6.406-.25.268-.36.588-.358.902a1.33 1.33 0 001.333 1.328h15.937a1.33 1.33 0 001.333-1.328 1.297 1.297 0 00-.358-.902z" /></svg>
);

export default BellIcon;
