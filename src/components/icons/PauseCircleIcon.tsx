import React from 'react';

type IconProps = import('./types').default;

const PauseCircleIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M12.298 2C6.609 2 2 6.609 2 12.298c0 5.688 4.609 10.297 10.298 10.297 5.688 0 10.297-4.609 10.297-10.297C22.595 6.609 17.986 2 12.298 2zm-.665 13.62a.666.666 0 01-.664.664H8.976a.666.666 0 01-.665-.665V8.976c0-.366.3-.665.665-.665h1.993c.365 0 .664.3.664.665v6.643zm4.65 0a.666.666 0 01-.664.664h-1.993a.666.666 0 01-.664-.665V8.976c0-.366.299-.665.664-.665h1.993c.366 0 .665.3.665.665v6.643z" />
  </svg>
);

export default PauseCircleIcon;
