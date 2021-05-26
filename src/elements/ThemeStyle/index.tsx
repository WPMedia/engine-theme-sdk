import React from 'react';
import { PolymorphicComponent } from 'react-polymorphic-box';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';

// Component-specific props
export type StyledFontProps = {
  fontType?: string;
  fontColor?: string;
  backgroundColor?: string;
};

// An HTML tag or a different React component can be rendered by default
const defaultElement = 'div';

const StyledElement: PolymorphicComponent<
  StyledFontProps, // Merged with props from the underlying element type
  typeof defaultElement // Default element type (optional, defaults to 'div')
> = styled(defaultElement)<StyledFontProps>`
  font-family: ${({ fontType }): string => fontType};

  ${({ fontColor }): string => fontColor && `
    color: ${fontColor};
  `}

  ${({ backgroundColor }): string => backgroundColor && `
    background-color: ${backgroundColor};
  `}
`;

export type ThemeStyleProps = {
  element?: React.ElementType;
  font?: string;
  color?: string;
  bgColor?: string;
  [x: string]: unknown;
}

const ThemeStyle = ({
  element, font, color, bgColor, ...otherProps
}: ThemeStyleProps): JSX.Element => {
  const { arcSite } = useFusionContext();
  const themeStyles = getThemeStyle(arcSite);
  const fontType = themeStyles[`${font}-font-family`];
  const fontColor = color ? themeStyles[`${color}-color`] : null;
  const backgroundColor = bgColor ? themeStyles[`${bgColor}-color`] : null;
  const styledElementProps = {
    as: element, fontType, fontColor, backgroundColor, arcSite, ...otherProps,
  };

  return (
    <StyledElement {...styledElementProps} />
  );
};

export default ThemeStyle;
