import React from 'react';
import additionalSVGProps from './Helpers';

type IconProps = import('./types').default;

const TwitchIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Twitch', description = '', context = 'presentational',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...additionalSVGProps(context)}>
    {context === 'image'
      ? (
        <>
          <title>{title}</title>
          <desc>{description}</desc>
        </>
      ) : null}
    <path fill={fill} d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z" />
  </svg>
);

export default TwitchIcon;
