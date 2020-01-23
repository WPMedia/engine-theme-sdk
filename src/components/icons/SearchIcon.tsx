import React from 'react';

type IconProps = import('./types').default;

const SearchIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M21.969 19.382l-4.14-4.14a.996.996 0 00-.706-.29h-.677a8.594 8.594 0 001.827-5.315A8.635 8.635 0 009.637 1 8.635 8.635 0 001 9.637a8.635 8.635 0 008.637 8.636 8.59 8.59 0 005.315-1.827v.677c0 .266.103.52.29.706l4.14 4.14a.992.992 0 001.408 0l1.175-1.175c.39-.39.39-1.022.004-1.412zm-12.332-4.43a5.312 5.312 0 01-5.315-5.315 5.312 5.312 0 015.315-5.315 5.312 5.312 0 015.315 5.315 5.312 5.312 0 01-5.315 5.315z" />
  </svg>
);

export default SearchIcon;
