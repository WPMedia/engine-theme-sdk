import React from 'react';

type IconProps = import('./types').default;

const FullscreenIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} viewBox="2 2 20.5 20.5" xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M21.602 15.955v4.65a.994.994 0 01-.996.997h-4.651c-.888 0-1.332-1.075-.706-1.702l1.503-1.503-4.451-4.452-4.452 4.456L9.353 19.9c.627.627.182 1.702-.706 1.702h-4.65A.994.994 0 013 20.606v-4.651c0-.889 1.075-1.333 1.702-.706l1.503 1.503 4.454-4.451-4.454-4.455-1.503 1.507C4.075 9.98 3 9.536 3 8.647v-4.65A.994.994 0 013.997 3h4.65c.888 0 1.333 1.075.706 1.702L7.85 6.206l4.451 4.45 4.452-4.455-1.504-1.499C14.623 4.075 15.067 3 15.955 3h4.65a.994.994 0 01.997.997v4.65c0 .889-1.075 1.333-1.702.706L18.397 7.85l-4.454 4.45 4.454 4.455 1.503-1.503c.627-.63 1.702-.187 1.702.702z" />
  </svg>
);

export default FullscreenIcon;
