import { FC } from 'react';
import additionalSVGProps from './Helpers';

type IconProps = import('./types').default;

const ArrowUpIcon: FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Arrow Up', description = '', context = 'presentational',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...additionalSVGProps(context)}>
    {context === 'image'
      ? (
        <>
          <title>{title}</title>
          <desc>{description}</desc>
        </>
      ) : null}
    <path fill={fill} d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" />
  </svg>
);

export default ArrowUpIcon;
