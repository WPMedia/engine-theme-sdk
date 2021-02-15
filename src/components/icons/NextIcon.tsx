import React from 'react';
import additionalSVGProps from './Helpers';

type IconProps = import('./types').default;

const NextIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Next', description = '', context = 'presentational',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...additionalSVGProps(context)}>
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z" />
  </svg>
);

export default NextIcon;
