import React from 'react';

type IconProps = import('./types').default;

const PinterestIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M12.47 2C8.21 2 4 4.84 4 9.437c0 2.923 1.644 4.584 2.64 4.584.412 0 .649-1.146.649-1.47 0-.386-.985-1.208-.985-2.815 0-3.339 2.542-5.706 5.83-5.706 2.828 0 4.92 1.607 4.92 4.56 0 2.204-.884 6.34-3.749 6.34-1.034 0-1.918-.747-1.918-1.819 0-1.57 1.096-3.089 1.096-4.708 0-2.749-3.899-2.25-3.899 1.071 0 .698.087 1.47.399 2.105-.573 2.467-1.744 6.141-1.744 8.683 0 .784.112 1.557.187 2.341.14.158.07.142.286.063C9.805 19.8 9.73 19.24 10.677 15.49c.51.971 1.831 1.494 2.877 1.494 4.41 0 6.39-4.297 6.39-8.171C19.945 4.69 16.383 2 12.472 2z" />
  </svg>
);

export default PinterestIcon;
