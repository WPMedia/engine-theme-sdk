import React from 'react';

const PlayButton: React.FC<{fill: string}> = ({ fill = '#000' }): React.ReactElement => (
  <svg
    width="100%"
    height="100%"
    viewBox="2 1 22 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.98 21.602H4.992A1.993 1.993 0 013 19.61V4.993C3 3.893 3.893 3 4.993 3H8.98c1.1 0 1.993.893 1.993 1.993V19.61c0 1.1-.892 1.993-1.993 1.993zm12.622-1.993V4.993c0-1.1-.893-1.993-1.993-1.993h-3.986c-1.1 0-1.993.893-1.993 1.993V19.61c0 1.1.892 1.993 1.993 1.993h3.986c1.1 0 1.993-.893 1.993-1.993z" fill={fill} fillRule="nonzero" />
  </svg>
);

export default PlayButton;
