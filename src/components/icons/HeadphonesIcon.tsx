import React from 'react';

type IconProps = import('./types').default;

const HeadphonesIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M11.63 2A10.624 10.624 0 001 12.63v1.993c0 .503.284.963.734 1.188l.598.299a4.65 4.65 0 004.647 4.492h.997c.55 0 .996-.446.996-.996v-7.308a.997.997 0 00-.996-.997h-.997a4.636 4.636 0 00-3.322 1.396v-.067c0-4.396 3.577-7.973 7.973-7.973s7.972 3.577 7.972 7.973v.067a4.636 4.636 0 00-3.322-1.396h-.996a.997.997 0 00-.997.997v7.308c0 .55.446.996.997.996h.996a4.65 4.65 0 004.648-4.492l.597-.299c.45-.225.735-.685.735-1.188V12.63C22.26 6.755 17.505 2 11.63 2z" />
  </svg>
);

export default HeadphonesIcon;
