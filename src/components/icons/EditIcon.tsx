import React from 'react';

type IconProps = import('./types').default;

const EditIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M16.717 4.45l3.745 3.746a.406.406 0 010 .573l-9.068 9.068-3.854.428a.808.808 0 01-.892-.893l.427-3.853 9.069-9.068a.406.406 0 01.573 0zm6.727-.95l-2.027-2.027a1.624 1.624 0 00-2.292 0l-1.47 1.47a.406.406 0 000 .573l3.746 3.746a.406.406 0 00.573 0l1.47-1.47a1.624 1.624 0 000-2.292zm-7.5 11.87v4.228H2.658V6.31H12.2a.51.51 0 00.353-.146l1.661-1.66a.498.498 0 00-.353-.852H1.993A1.995 1.995 0 000 5.646v14.616c0 1.1.893 1.993 1.993 1.993H16.61c1.1 0 1.993-.892 1.993-1.993V13.71a.5.5 0 00-.851-.353l-1.661 1.661a.51.51 0 00-.145.353z" />
  </svg>
);

export default EditIcon;
