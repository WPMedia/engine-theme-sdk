import React from 'react';

type IconProps = import('./types').default;

const HamburgerMenuIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M3.664 6.99h17.274a.664.664 0 00.664-.665v-1.66A.664.664 0 0020.938 4H3.664A.664.664 0 003 4.664v1.661c0 .367.297.665.664.665zm0 6.643h17.274a.664.664 0 00.664-.664v-1.661a.664.664 0 00-.664-.664H3.664a.664.664 0 00-.664.664v1.66c0 .368.297.665.664.665zm0 6.644h17.274a.664.664 0 00.664-.665v-1.66a.664.664 0 00-.664-.665H3.664a.664.664 0 00-.664.665v1.66c0 .367.297.665.664.665z" /></svg>
);

export default HamburgerMenuIcon;
