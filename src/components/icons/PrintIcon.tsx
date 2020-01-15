import React from 'react';

type IconProps = import('./types').default;

const PrintIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M19.602 8.972V4.208c0-.353-.14-.69-.389-.94l-1.88-1.879A1.32 1.32 0 0016.394 1H4.986c-.734 0-1.329.595-1.329 1.329v6.643A2.657 2.657 0 001 11.63v4.65c0 .367.297.665.664.665h1.993v3.986a1.33 1.33 0 001.33 1.329h13.286a1.33 1.33 0 001.33-1.33v-3.985h1.992a.664.664 0 00.665-.665v-4.65a2.657 2.657 0 00-2.658-2.658zm-2.657 10.63H6.315v-3.986h10.63v3.986zm0-9.301H6.315V3.657h7.972v1.994c0 .367.297.664.665.664h1.993V10.3zm1.993 2.99a.997.997 0 110-1.994.997.997 0 010 1.994z" /></svg>
);

export default PrintIcon;
