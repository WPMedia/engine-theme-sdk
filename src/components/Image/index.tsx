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
  // lightBoxWidth: number;
  // lightBoxHeight: number;
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

/*

resizedImageParams:
158x105: "/ujptxhneNS8cZvB6srUPpZKgPUQ=filters:format(jpg):quality(70)/"
158x119: "/7bAUFF-QZEKWmvsomIp5OLPrNDM=filters:format(jpg):quality(70)/"
158x89: "/r4YXPy4Eh2thx80bDTxRZM9Syhw=filters:format(jpg):quality(70)/"
274x183: "/OH2BBp_JfX0uAQs32WXDiKrlqsE=filters:format(jpg):quality(70)/"
274x206: "/ASc1uxs2dQ1VjMhwbiroZUeARFs=filters:format(jpg):quality(70)/"
274x154: "/sDwhmVtwayjjDJww8CvlWjpydGM=filters:format(jpg):quality(70)/"
__proto__: Object
url: "https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/37UMUNYNOVCEJDZW5SBKBXNMO4.jpg"
alt: "This is a Free article for testing Mentor Medier’s paywall"
smallWidth: 158
smallHeight: 89
mediumWidth: 274
mediumHeight: 154
largeWidth: 274
largeHeight: 154
resizerURL: undefined

*/

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
  // lightBoxWidth,
  // lightBoxHeight,
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
      <img alt={alt} src={buildThumborURL(resizedImageOptions[`${large.width}x${large.height}`], `${large.width}x${large.height}`, imageSourceWithoutProtocol, resizerURL)} />
    </StyledPicture>
  );
};

export default Image;