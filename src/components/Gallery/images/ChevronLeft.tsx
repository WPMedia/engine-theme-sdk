import React from 'react';

const ChevronLeft: React.FC<{fill: string}> = ({ fill = '#000' }): React.ReactElement => (
  <svg
    width="100%"
    height="100%"
    viewBox="2 2 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.292 11.361l8.07-8.07a.997.997 0 011.409 0l.941.942a.997.997 0 01.002 1.408l-6.396 6.425 6.396 6.426a.996.996 0 01-.002 1.407l-.941.941a.997.997 0 01-1.41 0l-8.07-8.07a.997.997 0 010-1.409z" fill={fill} fillRule="nonzero" />
  </svg>
);

export default ChevronLeft;
