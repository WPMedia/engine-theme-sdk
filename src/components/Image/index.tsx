/* eslint-disable no-console */
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
  breakpoints?: {
    small?: number | undefined;
    medium?: number | undefined;
    large?: number | undefined;
  };
  lightBoxWidth?: number;
  lightBoxHeight?: number;
}

/*
  this prevents stretching past its container
  to prevent stretching past max width,
  use max-width: max-content;
*/
const StyledPicture = styled.picture`
  > img {
    max-width: 100%;
  }
`;

/**
* @constructor
* @param {string} URL - URL to the unoptimized image. This will never be served.
* @param {string} alt - Will display describing image if not present, ortherwise for a11y.
* @param {number} smallWidth - Width of the image to crop to for the small break point
* @param {number} smallHeight - Height of the image to crop to for the small break point
* @param {number} mediumWidth - Width of the image to crop to for the medium break point
* @param {number} mediumHeight - Height of the image to crop to for the medium break point
* @param {number} largeWidth - Width of the image to crop to for the large break point
* @param {number} largeHeight - Height of the image to crop to for the large break point
* @param {number} lightBoxWidth - Width of the image to crop to for the lightbox
* @param {number} lightBoxHeight - Height of the image to crop to for the lightbox
* @param {object} resizedImageOptions - Dimensions and thumbor signature and filters
* @param {string} resizerURL - Link to the assigned resizer url for generating resized url
* @param {object} breakpoints - Widths to determine small, med, and large breakpoints used
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
  if (typeof url === 'undefined') {
    return null;
  }

  const imageSourceWithoutProtocol = url.replace('https://', '');

  const {
    // breakpoints default to mobile, tablet, larger screen
    small: smallBreakpoint = 0,
    medium: mediumBreakpoint = 768,
    large: largeBreakpoint = 996,
  } = breakpoints || {};

  // listen for resources relative urls
  // todo: implement resizer for relative urls
  // /pf/ is not a convention in all places,
  // but /resources/ is definitely where the local image will be
  // if (url.includes('/resources/')) {
  //   return (
  //     <StyledPicture>
  //       <img
  //         src={url}
  //         alt={alt}
  //         // for fallback width and height
  //         width={smallWidth}
  //         height={smallHeight}
  //       />
  //     </StyledPicture>
  //   );
  // }

  // if url passed in directly without resized params
  if (typeof resizedImageOptions === 'undefined' || typeof resizedImageOptions[`${largeWidth}x${largeHeight}`] === 'undefined') {
    // todo: remove for prod
    console.error(`no resized options found for url: ${url}.`);
    console.error('Please use resized options to save money on serving bigger images than necessary. Consider using resizer content source block or adding the resizer block to content source transform.');
    return (
      <img
        // will not serve image raw
        src=""
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
