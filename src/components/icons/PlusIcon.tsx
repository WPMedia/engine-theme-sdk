import React from 'react';
import additionalSVGProps from './Helpers';

type IconProps = import('./types').default;

const PlusIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Plus', description = '', context = 'presentational',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...additionalSVGProps(context)}>
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
  </svg>
);

export default PlusIcon;
