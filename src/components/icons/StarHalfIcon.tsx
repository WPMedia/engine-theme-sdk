import React from 'react';

type IconProps = import('./types').default;

const StarHalfIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M22.158 8.122l-6.078-.885-2.716-5.497A1.322 1.322 0 0012.167 1a1.31 1.31 0 00-1.19.74L8.258 7.236 2.18 8.12c-1.09.158-1.526 1.499-.736 2.267l4.397 4.277-1.041 6.04c-.148.863.541 1.556 1.312 1.556.205 0 .416-.05.618-.156l5.437-2.852 5.437 2.853c.202.106.412.154.616.154.772 0 1.462-.69 1.315-1.553l-1.04-6.041 4.398-4.276c.79-.769.354-2.11-.736-2.267zm-5.055 5.115l-.753.732.178 1.033.81 4.71-4.24-2.225-.93-.487.002-13.17 2.119 4.288.464.94 1.039.151 4.743.69-3.432 3.338z" />
  </svg>
);

export default StarHalfIcon;
