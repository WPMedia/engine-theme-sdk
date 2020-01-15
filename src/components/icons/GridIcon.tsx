import React from 'react';

type IconProps = import('./types').default;

const GridIcon: React.FC<IconProps> = ({ width = 24, height = 24, fill = '#000' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><path fill={fill} d="M7.2 3.997v3.321c0 .55-.445.997-.996.997H1.997A.997.997 0 011 7.318V3.997c0-.55.446-.997.997-.997h4.207c.55 0 .997.446.997.997zm7.53 9.965V10.64a.997.997 0 00-.996-.996H9.526a.997.997 0 00-.997.996v3.322c0 .55.447.996.997.996h4.208c.55 0 .996-.446.996-.996zm1.329-9.965v3.321c0 .55.446.997.996.997h4.208c.55 0 .997-.446.997-.997V3.997A.997.997 0 0021.263 3h-4.208a.997.997 0 00-.996.997zM14.73 7.318V3.997A.997.997 0 0013.734 3H9.526a.997.997 0 00-.997.997v3.321c0 .55.447.997.997.997h4.208c.55 0 .996-.446.996-.997zM6.204 9.644H1.997A.997.997 0 001 10.64v3.322c0 .55.446.996.997.996h4.207c.55 0 .997-.446.997-.996V10.64a.997.997 0 00-.997-.996zM1 17.284v3.322c0 .55.446.996.997.996h4.207c.55 0 .997-.446.997-.996v-3.322a.997.997 0 00-.997-.997H1.997a.997.997 0 00-.997.997zm16.055-2.326h4.208c.55 0 .997-.446.997-.996V10.64a.997.997 0 00-.997-.996h-4.208a.997.997 0 00-.996.996v3.322c0 .55.446.996.996.996zm0 6.644h4.208c.55 0 .997-.446.997-.996v-3.322a.997.997 0 00-.997-.997h-4.208a.997.997 0 00-.996.997v3.322c0 .55.446.996.996.996zM8.53 17.284v3.322c0 .55.447.996.997.996h4.208c.55 0 .996-.446.996-.996v-3.322a.997.997 0 00-.996-.997H9.526a.997.997 0 00-.997.997z" /></svg>
);

export default GridIcon;
