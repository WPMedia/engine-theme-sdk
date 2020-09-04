import React from 'react';

type IconProps = import('./types').default;

const StarIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Star', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M10.936 1.74L8.225 7.237l-6.067.885c-1.087.157-1.523 1.499-.734 2.267l4.388 4.277-1.038 6.041c-.186 1.092.964 1.91 1.927 1.4l5.427-2.853 5.427 2.852c.963.507 2.114-.307 1.927-1.399l-1.038-6.041 4.389-4.277c.788-.768.352-2.11-.735-2.267l-6.067-.885L13.32 1.74c-.486-.98-1.894-.993-2.384 0z" />
  </svg>
);

export default StarIcon;
