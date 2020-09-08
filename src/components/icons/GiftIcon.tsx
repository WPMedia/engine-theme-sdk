import React from 'react';

type IconProps = import('./types').default;

const GiftIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M2.329 20.273c0 .735.593 1.33 1.328 1.33h6.644v-6.645H2.329v5.315zm10.63 1.33h6.643c.735 0 1.329-.595 1.329-1.33v-5.315h-7.973v6.644zM20.93 8.314h-1.748a3.62 3.62 0 00.42-1.661A3.66 3.66 0 0015.947 3c-1.727 0-2.844.884-4.277 2.836C10.24 3.884 9.121 3 7.394 3A3.66 3.66 0 003.74 6.654c0 .602.158 1.158.42 1.66H2.329A1.33 1.33 0 001 9.645v3.321c0 .366.299.665.664.665h19.931a.666.666 0 00.665-.665V9.644c0-.735-.594-1.33-1.33-1.33zm-13.54 0a1.66 1.66 0 110-3.322c.826 0 1.436.137 3.574 3.322H7.39zm8.557 0h-3.575c2.134-3.177 2.728-3.322 3.575-3.322a1.66 1.66 0 110 3.322z" />
  </svg>
);

export default GiftIcon;
