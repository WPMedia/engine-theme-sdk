import React from 'react';

type IconProps = import('./types').default;

const HomeIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M11.683 7.825l-7.655 6.306v6.805c0 .367.297.664.664.664l4.653-.012a.664.664 0 00.661-.664v-3.975c0-.366.298-.664.664-.664h2.658c.367 0 .664.298.664.664v3.972a.664.664 0 00.665.666l4.651.013a.664.664 0 00.664-.664v-6.81l-7.654-6.3a.506.506 0 00-.635 0zm12.093 4.286L20.304 9.25V3.498A.498.498 0 0019.806 3h-2.325a.498.498 0 00-.498.498v3.015l-3.718-3.058a1.993 1.993 0 00-2.533 0L.222 12.11a.498.498 0 00-.067.702l1.06 1.287a.498.498 0 00.701.067l9.767-8.044c.186-.15.45-.15.635 0l9.768 8.044a.498.498 0 00.702-.066l1.058-1.287a.498.498 0 00-.07-.703z" />
  </svg>
);

export default HomeIcon;
