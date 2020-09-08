import React from 'react';

type IconProps = import('./types').default;

const SoundOnIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M8.929 3.327L5.234 7.021H.997A.996.996 0 000 8.017v5.98c0 .55.446.996.997.996h4.237l3.695 3.694c.624.624 1.7.185 1.7-.705V4.032c0-.891-1.077-1.328-1.7-.705zm9.688-2.12a1.004 1.004 0 10-1.103 1.68 9.69 9.69 0 014.394 8.12 9.69 9.69 0 01-4.394 8.121 1.004 1.004 0 101.103 1.68 11.696 11.696 0 005.3-9.801c0-3.958-1.982-7.622-5.3-9.8zm1.314 9.8a7.667 7.667 0 00-3.562-6.488.992.992 0 00-1.375.31 1.008 1.008 0 00.308 1.385 5.666 5.666 0 012.636 4.793 5.666 5.666 0 01-2.636 4.792 1.008 1.008 0 00-.308 1.386c.27.43.877.628 1.375.31a7.666 7.666 0 003.562-6.488zm-5.887-3.192a.997.997 0 00-.962 1.746c.537.295.87.85.87 1.446 0 .597-.333 1.15-.87 1.445a.997.997 0 00.963 1.747 3.652 3.652 0 001.9-3.192 3.65 3.65 0 00-1.9-3.192z" />
  </svg>
);

export default SoundOnIcon;
