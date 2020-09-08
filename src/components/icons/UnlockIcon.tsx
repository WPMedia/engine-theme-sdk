import React from 'react';

type IconProps = import('./types').default;

const UnlockIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M19.609 11.63H9.311V7.349c0-1.644 1.317-3.01 2.961-3.027a2.994 2.994 0 013.019 2.99v.664c0 .552.444.996.996.996h1.329a.994.994 0 00.996-.996V7.31A6.318 6.318 0 0012.28 1c-3.488.012-6.29 2.886-6.29 6.374v4.256h-.997c-1.1 0-1.993.893-1.993 1.993v6.643c0 1.1.893 1.994 1.993 1.994H19.61c1.1 0 1.993-.893 1.993-1.994v-6.643c0-1.1-.893-1.993-1.993-1.993z" />
  </svg>
);

export default UnlockIcon;
