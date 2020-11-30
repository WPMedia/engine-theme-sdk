import React from 'react';

type IconProps = import('./types').default;

const ClosedCaptioningIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Closed Captioning', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M20.266 4H2.993C1.893 4 1 4.893 1 5.993v11.959c0 1.1.893 1.993 1.993 1.993h17.273c1.1 0 1.994-.893 1.994-1.993V5.993c0-1.1-.893-1.993-1.994-1.993zm-10.21 9.289a.257.257 0 01.382.037l.81 1.15a.25.25 0 01-.021.32c-2.226 2.358-7.175 1.333-7.175-2.82 0-4.04 5.053-4.961 7.163-2.91.087.083.103.133.041.236l-.727 1.267a.259.259 0 01-.377.07c-1.695-1.328-3.928-.618-3.928 1.296.004 1.993 2.121 2.927 3.832 1.354zm7.906 0a.257.257 0 01.382.037l.81 1.15a.25.25 0 01-.021.32c-2.222 2.362-7.171 1.333-7.171-2.82 0-4.04 5.053-4.961 7.163-2.91.087.083.103.133.041.236l-.727 1.267a.259.259 0 01-.377.07c-1.695-1.328-3.928-.618-3.928 1.296 0 1.993 2.117 2.927 3.828 1.354z" />
  </svg>
);

export default ClosedCaptioningIcon;
