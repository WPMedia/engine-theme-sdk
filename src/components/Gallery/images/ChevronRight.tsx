import React from 'react';

const ChevronRight: React.FC<{fill: string}> = ({ fill = '#000' }): React.ReactElement => (
  <svg
    width="100%"
    height="100%"
    viewBox="2 2 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.712 12.77l-8.07 8.07a.997.997 0 01-1.409 0l-.941-.94a.997.997 0 01-.002-1.408l6.396-6.426L6.29 5.641a.997.997 0 01.002-1.408l.941-.941a.997.997 0 011.41 0l8.069 8.07c.39.389.39 1.02 0 1.409z" fill={fill} fillRule="nonzero" />
  </svg>
);

export default ChevronRight;
