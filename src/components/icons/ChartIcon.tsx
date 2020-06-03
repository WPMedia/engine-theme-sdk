import React from 'react';

type IconProps = import('./types').default;

const ChartIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M14.819 14.63h1.594c.266 0 .532-.266.532-.532v-5.58c0-.266-.266-.532-.532-.532H14.82c-.266 0-.532.266-.532.532v5.58c0 .266.266.532.532.532zm3.986 0h1.594c.266 0 .532-.266.532-.532V4.531c0-.265-.266-.531-.532-.531h-1.594c-.266 0-.532.266-.532.531v9.567c0 .266.266.532.532.532zm-11.959 0h1.595c.266 0 .531-.266.531-.532v-2.923c0-.266-.265-.531-.531-.531H6.846c-.265 0-.531.265-.531.531v2.923c0 .266.266.532.531.532zm3.987 0h1.594c.266 0 .531-.266.531-.532V5.86c0-.266-.265-.531-.531-.531h-1.594c-.266 0-.532.265-.532.531v8.238c0 .266.266.532.532.532zm10.762 2.657H3.657V4.664A.664.664 0 002.993 4H1.664A.664.664 0 001 4.664v13.952c0 .734.595 1.329 1.329 1.329h19.266a.664.664 0 00.665-.665v-1.328a.664.664 0 00-.665-.665z" />
  </svg>
);

export default ChartIcon;
