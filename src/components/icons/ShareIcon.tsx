import React from 'react';

type IconProps = import('./types').default;

const ShareIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Share', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M23.605 8.368l-5.98 5.647c-.63.595-1.68.153-1.68-.725v-2.988c-6.003.04-8.536 1.458-6.842 7.115.186.622-.534 1.103-1.039.72-1.618-1.23-3.081-3.58-3.081-5.953 0-5.977 4.883-7.163 10.962-7.197v-2.99c0-.88 1.05-1.319 1.68-.724l5.98 5.646a.997.997 0 010 1.45zm-7.66 8.374v2.86H2.657V6.315h2.115a.498.498 0 00.359-.153 8.095 8.095 0 012.118-1.565c.462-.24.29-.94-.23-.94H1.993C.893 3.657 0 4.55 0 5.651v14.615c0 1.101.892 1.994 1.993 1.994H16.61c1.1 0 1.993-.893 1.993-1.994V16.58a.498.498 0 00-.665-.47c-.455.162-.942.21-1.42.14a.5.5 0 00-.572.493z" />
  </svg>
);

export default ShareIcon;
