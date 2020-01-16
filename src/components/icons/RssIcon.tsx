import React from 'react';

type IconProps = import('./types').default;

const RssIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M8 19a3 3 0 11-6 0 3 3 0 016 0zm7.999 2.226c-.385-7.125-6.092-12.84-13.225-13.225A.737.737 0 002 8.738v2.216c0 .387.3.713.686.738 5.154.336 9.286 4.457 9.622 9.622.025.387.35.686.738.686h2.216c.421 0 .76-.353.737-.774zm6 .037C21.626 10.825 13.227 2.377 2.738 2A.714.714 0 002 2.715v2.146c0 .385.305.698.69.714 8.535.35 15.385 7.202 15.735 15.735.016.385.329.69.714.69h2.146a.714.714 0 00.715-.737z" /></svg>
);

export default RssIcon;
