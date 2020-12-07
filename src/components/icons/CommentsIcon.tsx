import React from 'react';

type IconProps = import('./types').default;

const CommentsIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Comments', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M17.273 9.644C17.273 5.973 13.408 3 8.637 3 3.866 3 0 5.973 0 9.644c0 1.424.585 2.736 1.578 3.82C1.02 14.718.104 15.714.09 15.727a.33.33 0 00-.062.36c.054.125.17.2.303.2 1.52 0 2.778-.51 3.683-1.038 1.337.652 2.92 1.038 4.622 1.038 4.77 0 8.636-2.973 8.636-6.643zm5.066 9.135c.992-1.08 1.578-2.396 1.578-3.82 0-2.778-2.221-5.158-5.369-6.15.037.274.054.552.054.835 0 4.397-4.472 7.972-9.965 7.972-.449 0-.885-.033-1.317-.079 1.308 2.388 4.381 4.065 7.96 4.065 1.703 0 3.285-.382 4.622-1.038.905.527 2.163 1.038 3.683 1.038a.333.333 0 00.24-.56c-.012-.013-.93-1.005-1.486-2.263z" />
  </svg>
);

export default CommentsIcon;
