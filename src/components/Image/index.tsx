import React from 'react';
import styled from 'styled-components';
import buildThumborURL from './thumbor-image-url';

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
    small: number;
    medium: number;
    large: number;
  };
  lightBoxWidth?: number;
  lightBoxHeight?: number;
}

interface SourceImageProps {
  resizedImageOptions: {
    [key: string]: string;
  };
  width: number;
  height: number;
  imageSourceWithoutProtocol: string;
  resizerURL: string;
  breakpointWidth: number;
}

const StyledPicture = styled.picture`
  > img {
    max-width: max-content;
  }
`;


const SourceHandler: React.FC<SourceImageProps> = (props) => {
  const {
    resizedImageOptions,
    width,
    height,
    imageSourceWithoutProtocol,
    resizerURL,
    breakpointWidth,
  } = props;

  const interpolatedWidthHeight = `${width}x${height}`;

  const targetImageKeyWithFilter = Object.prototype.hasOwnProperty.call(
    resizedImageOptions, interpolatedWidthHeight,
  )
    ? resizedImageOptions[interpolatedWidthHeight]
    : false;

  return (
    <>
      {
        targetImageKeyWithFilter
        && (
        <source
          srcSet={buildThumborURL(resizedImageOptions[`${width}x${height}`], `${width}x${height}`, imageSourceWithoutProtocol, resizerURL)}
          media={`screen and (min-width: ${breakpointWidth}px)`}
        />
        )
    }
    </>
  );
};

/**
 * Image component that has basic Thumbor and lazy loading support.
 *
 *
 * @constructor
 * @param {string} URL - URL to the unoptimized image.
 * @param {string} alt - Description for image.
 */
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
  const targetDimensionsPerBreakpoint = {
    small: {
      width: smallWidth,
      height: smallHeight,
    },
    medium: {
      width: mediumWidth,
      height: mediumHeight,
    },
    large: {
      width: largeWidth,
      height: largeHeight,
    },
  };

  const { small, medium, large } = targetDimensionsPerBreakpoint;

  const imageSourceWithoutProtocol = url.replace('https://', '');

  const { small: smallBreakpoint, medium: mediumBreakpoint, large: largeBreakpoint } = breakpoints;

  return (
    <StyledPicture>
      <SourceHandler
        resizedImageOptions={resizedImageOptions}
        width={small.width}
        height={small.height}
        imageSourceWithoutProtocol={imageSourceWithoutProtocol}
        resizerURL={resizerURL}
        breakpointWidth={smallBreakpoint}
      />
      <SourceHandler
        resizedImageOptions={resizedImageOptions}
        width={medium.width}
        height={medium.height}
        imageSourceWithoutProtocol={imageSourceWithoutProtocol}
        resizerURL={resizerURL}
        breakpointWidth={mediumBreakpoint}

      />
      <SourceHandler
        resizedImageOptions={resizedImageOptions}
        width={large.width}
        height={large.height}
        imageSourceWithoutProtocol={imageSourceWithoutProtocol}
        resizerURL={resizerURL}
        breakpointWidth={largeBreakpoint}
      />
      {
        typeof lightBoxWidth === "undefined" || typeof lightBoxHeight === "undefined" ? 
          (
            <img 
              alt={alt} 
              src={buildThumborURL(resizedImageOptions[`${large.width}x${large.height}`], `${large.width}x${large.height}`, imageSourceWithoutProtocol, resizerURL)} 
            />
          ) :
          (
            <img 
              alt={alt} 
              src={buildThumborURL(resizedImageOptions[`${large.width}x${large.height}`], `${large.width}x${large.height}`, imageSourceWithoutProtocol, resizerURL)} 
              // lightbox component reads from this data attribute
              data-lightbox={buildThumborURL(resizedImageOptions[`${lightBoxWidth}x${lightBoxHeight}`], `${lightBoxWidth}x${lightBoxHeight}`, imageSourceWithoutProtocol, resizerURL)}
            />
          )
      }
    </StyledPicture>
  );
};

export default Image;