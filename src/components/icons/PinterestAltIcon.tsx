import React from 'react';

type IconProps = import('./types').default;

const PinterestAltIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M22.595 12.298c0 5.688-4.609 10.297-10.297 10.297-1.063 0-2.085-.162-3.048-.46.42-.686 1.046-1.807 1.279-2.7.124-.481.64-2.45.64-2.45.335.64 1.315 1.184 2.358 1.184 3.106 0 5.344-2.857 5.344-6.407 0-3.4-2.778-5.946-6.35-5.946-4.442 0-6.805 2.981-6.805 6.232 0 1.512.806 3.393 2.089 3.99.195.092.299.05.344-.136l.287-1.167a.308.308 0 00-.07-.295c-.42-.519-.76-1.466-.76-2.35 0-2.271 1.719-4.468 4.65-4.468 2.529 0 4.302 1.723 4.302 4.19 0 2.786-1.408 4.717-3.239 4.717-1.009 0-1.769-.835-1.524-1.86.29-1.225.851-2.546.851-3.43 0-.79-.423-1.45-1.303-1.45-1.034 0-1.865 1.068-1.865 2.5 0 .914.307 1.528.307 1.528s-1.017 4.31-1.204 5.116c-.207.888-.124 2.142-.037 2.956C4.716 20.39 2 16.662 2 12.298 2 6.609 6.609 2 12.298 2c5.688 0 10.297 4.609 10.297 10.298z" />
  </svg>
);

export default PinterestAltIcon;
