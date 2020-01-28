import React from 'react';

type IconProps = import('./types').default;

const EnvelopeOpenIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M22.26 20.267c0 1.1-.893 1.993-1.994 1.993H2.993c-1.1 0-1.993-.893-1.993-1.993V9.335c0-.613.282-1.191.763-1.569 1.035-.81 1.89-1.468 6.818-5.045.7-.51 2.085-1.735 3.049-1.72.963-.015 2.35 1.21 3.048 1.72 4.928 3.576 5.784 4.235 6.818 5.045.482.378.764.956.764 1.569v10.932zm-2.727-8.164a.332.332 0 00-.47-.08c-.95.701-2.304 1.691-4.385 3.201-.699.51-2.085 1.735-3.048 1.72-.964.015-2.349-1.21-3.049-1.72-2.08-1.51-3.435-2.5-4.384-3.2a.332.332 0 00-.47.079l-.377.548a.332.332 0 00.076.455c.95.702 2.303 1.69 4.373 3.192.842.614 2.347 1.985 3.83 1.976 1.484.01 2.989-1.361 3.832-1.976 2.07-1.502 3.422-2.49 4.372-3.192a.332.332 0 00.077-.455l-.377-.548z" />
  </svg>
);

export default EnvelopeOpenIcon;
