import React from 'react';

type IconProps = import('./types').default;

const LockIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M19.609 10.301h-.997v-2.99A6.32 6.32 0 0012.301 1 6.32 6.32 0 005.99 7.311v2.99h-.997c-1.1 0-1.993.893-1.993 1.993v7.972c0 1.1.893 1.994 1.993 1.994H19.61c1.1 0 1.993-.893 1.993-1.994v-7.972c0-1.1-.893-1.993-1.993-1.993zm-4.318 0H9.31v-2.99a2.993 2.993 0 012.99-2.99 2.993 2.993 0 012.99 2.99v2.99z" />
  </svg>
);

export default LockIcon;
