import React from 'react';

const PlayButton: React.FC<{fill: string}> = ({ fill = '#000' }): React.ReactElement => (
  <svg
    width="100%"
    height="100%"
    viewBox="2 1 22 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.622 9.914L6.006 1.273C4.82.57 3 1.252 3 2.988v17.277c0 1.557 1.69 2.496 3.006 1.715l14.616-8.637c1.304-.768 1.308-2.661 0-3.43z" fill={fill} fillRule="nonzero" />
  </svg>
);

export default PlayButton;
