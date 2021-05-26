/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';

interface FontStyleProps {
  arcSite: string;
  fontType: string;
  fontColor?: string;
  backgroundColor?: string;
}

const FontStyles = styled.div.attrs<FontStyleProps>((props) => ({
  arcSite: props.arcSite,
  fontType: props.fontType,
  fontColor: props.fontColor || null,
  backgroundColor: props.backgroundColor || null,
}))<FontStyleProps>`
  font-family: ${({ fontType }): string => fontType};

  ${({ arcSite, fontColor }): string => fontColor && `
    color: ${getThemeStyle(arcSite)[`${fontColor}-color`]};
  `}

  ${({ arcSite, backgroundColor }): string => backgroundColor && `
    background-color: ${getThemeStyle(arcSite)[`${backgroundColor}-color`]};
  `}
`;

const Font = ({
  element, font, fontColor, backgroundColor, ...otherProps
}): JSX.Element => {
  const { arcSite } = useFusionContext();
  const fontType = getThemeStyle(arcSite)[`${font}-font-family`];
  const props = {
    as: element, fontType, fontColor, backgroundColor, arcSite, ...otherProps,
  };

  return (
    <FontStyles {...props} />
  );
};

Font.defaultProps = {
  element: 'div',
  font: 'primary',
};

Font.propTypes = {
  element: PropTypes.string,
  font: PropTypes.oneOf(['primary', 'secondary']),
  fontColor: PropTypes.oneOf(['primary', 'secondary']),
  backgroundColor: PropTypes.oneOf(['primary', 'secondary']),
};

export default Font;
