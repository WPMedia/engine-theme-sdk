import React from 'react';

type IconProps = import('./types').default;

const LinkIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M14.562 8.698a6.308 6.308 0 01.015 8.91l-.015.016-2.79 2.79a6.318 6.318 0 01-8.926 0 6.318 6.318 0 010-8.926l1.54-1.54c.41-.41 1.113-.138 1.134.44a7.67 7.67 0 00.402 2.189.668.668 0 01-.157.69l-.543.543c-1.164 1.164-1.2 3.059-.048 4.234a2.993 2.993 0 004.249.021l2.79-2.79a2.989 2.989 0 00-.43-4.584.666.666 0 01-.288-.523c-.016-.44.139-.891.486-1.238l.874-.874a.667.667 0 01.855-.072c.304.212.59.451.852.714zm5.852-5.852a6.318 6.318 0 00-8.926 0l-2.79 2.79-.015.015a6.308 6.308 0 00.867 9.625.667.667 0 00.855-.072l.874-.874c.346-.347.502-.8.485-1.238a.666.666 0 00-.288-.524 2.989 2.989 0 01-.43-4.584l2.79-2.79a2.993 2.993 0 014.25.022c1.152 1.175 1.116 3.07-.048 4.233l-.544.544a.668.668 0 00-.157.69 7.63 7.63 0 01.403 2.189c.02.577.724.849 1.133.44l1.54-1.54a6.318 6.318 0 000-8.926z" />
  </svg>
);

export default LinkIcon;
