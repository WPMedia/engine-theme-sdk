import React from 'react';

type IconProps = import('./types').default;

const DeleteIcon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = '', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M4.329 20.266c0 1.101.892 1.994 1.993 1.994H18.28a1.993 1.993 0 001.993-1.994V6.315H4.33v13.951zm11.294-10.63a.664.664 0 111.329 0v9.302a.664.664 0 11-1.33 0V9.637zm-3.986 0a.664.664 0 111.328 0v9.302a.664.664 0 11-1.328 0V9.637zm-3.986 0a.664.664 0 111.328 0v9.302a.664.664 0 01-1.328 0V9.637zM20.938 2.33h-4.983l-.39-.777A.997.997 0 0014.672 1H9.926a.985.985 0 00-.889.552l-.39.777H3.664A.664.664 0 003 2.993v1.329c0 .367.297.664.664.664h17.274a.664.664 0 00.664-.664V2.993a.664.664 0 00-.664-.664z" />
  </svg>
);

export default DeleteIcon;
