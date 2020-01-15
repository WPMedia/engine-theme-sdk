import React from 'react';

type IconProps = import('./types').default;

const LinkedInAltIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M20.273 3H4.325C3.594 3 3 3.602 3 4.341v15.92c0 .739.594 1.341 1.325 1.341h15.948c.731 0 1.33-.602 1.33-1.341V4.34c0-.739-.599-1.341-1.33-1.341zM8.623 18.945H5.864v-8.878h2.761v8.878h-.004zm-1.38-10.09a1.6 1.6 0 010-3.198 1.598 1.598 0 110 3.198zm11.714 10.09H16.2v-4.319c0-1.03-.02-2.354-1.433-2.354-1.436 0-1.656 1.121-1.656 2.28v4.393h-2.757v-8.878h2.645v1.213h.037c.37-.698 1.27-1.433 2.612-1.433 2.79 0 3.31 1.84 3.31 4.231v4.867z" /></svg>
);

export default LinkedInAltIcon;
