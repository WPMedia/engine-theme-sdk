import React from 'react';
import styled from 'styled-components';
import buildThumborURL from './thumbor-image-url';
import SourceHandler from './SourceHandler';

interface ImageProps {
  url: string;
  alt?: string;
  smallWidth: number;
  smallHeight: number;
  mediumWidth: number;
  mediumHeight: number;
  largeWidth: number;
  largeHeight: number;
  resizedImageOptions: {
    [key: string]: string;
  };
  resizerURL: string;
  breakpoints: {
    small?: number | undefined;
    medium?: number | undefined;
    large?: number | undefined;
  };
  lightBoxWidth?: number;
  lightBoxHeight?: number;
}

const StyledPicture = styled.picture`
  > img {
    max-width: max-content;
  }
`;

const Image: React.FC<ImageProps> = ({
  url,
  alt,
  smallWidth,
  smallHeight,
  mediumWidth,
  mediumHeight,
  largeWidth,
  largeHeight,
  resizedImageOptions,
  resizerURL,
  breakpoints,
  lightBoxWidth,
  lightBoxHeight,
}) => {
  const imageSourceWithoutProtocol = url.replace('https://', '');

  const {
    small: smallBreakpoint = 0,
    medium: mediumBreakpoint = 768,
    large: largeBreakpoint = 996,
  } = breakpoints;

  // if url passed in directly without resized params
  if (typeof resizedImageOptions[`${largeWidth}x${largeHeight}`] === 'undefined') {
    return (
      <img
        src={url}
        alt={alt}
        width={largeWidth}
        height={largeHeight}
      />
    );
  }

  return (
    <StyledPicture>
      <SourceHandler
        resizedImageOptions={resizedImageOptions}
        width={largeWidth}
        height={largeHeight}
        imageSourceWithoutProtocol={imageSourceWithoutProtocol}
        resizerURL={resizerURL}
        breakpointWidth={largeBreakpoint}
      />
      <SourceHandler
        resizedImageOptions={resizedImageOptions}
        width={mediumWidth}
        height={mediumHeight}
        imageSourceWithoutProtocol={imageSourceWithoutProtocol}
        resizerURL={resizerURL}
        breakpointWidth={mediumBreakpoint}
      />
      <SourceHandler
        resizedImageOptions={resizedImageOptions}
        width={smallWidth}
        height={smallHeight}
        imageSourceWithoutProtocol={imageSourceWithoutProtocol}
        resizerURL={resizerURL}
        breakpointWidth={smallBreakpoint}
      />
      {
        typeof lightBoxWidth === 'undefined' || typeof lightBoxHeight === 'undefined'
          ? (
            <img
              alt={alt}
              src={buildThumborURL(resizedImageOptions[`${largeWidth}x${largeHeight}`], `${largeWidth}x${largeHeight}`, imageSourceWithoutProtocol, resizerURL)}
              width={largeWidth}
              height={largeHeight}
            />
          )
          : (
            <img
              alt={alt}
              src={buildThumborURL(resizedImageOptions[`${largeWidth}x${largeHeight}`], `${largeWidth}x${largeHeight}`, imageSourceWithoutProtocol, resizerURL)}
              // lightbox component reads from this data attribute
              data-lightbox={buildThumborURL(resizedImageOptions[`${lightBoxWidth}x${lightBoxHeight}`], `${lightBoxWidth}x${lightBoxHeight}`, imageSourceWithoutProtocol, resizerURL)}
              width={largeWidth}
              height={largeHeight}
            />
          )
      }
    </StyledPicture>
  );
};

export default Image;
