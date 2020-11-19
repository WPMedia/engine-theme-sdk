/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Lazy from 'lazy-child';
import buildThumborURL from './thumbor-image-url';
import SourceHandler from './SourceHandler';

interface LazyProps {
  offsetBottom?: number;
  offsetLeft?: number;
  offsetRight?: number;
  offsetTop?: number;
}

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
  lazyOptions?: LazyProps;
  compressedThumborParams?: boolean;
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
* @param {object} lazyOptions - Object of offset values for each side (top, right, bottom, left)
* @param {boolean} compressedThumborParam - Compresses the Thumbor compression params
    for the lazy-child moudles
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
  lazyOptions = {
    offsetBottom: 0,
    offsetLeft: 0,
    offsetRight: 0,
    offsetTop: 0,
  },
  compressedThumborParams,
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
  if (url.includes('/resources/')) {
    return (
      <StyledPicture>
        <img
          src={url}
          alt={alt}
          // for fallback width and height
          width={smallWidth}
          height={smallHeight}
        />
      </StyledPicture>
    );
  }

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
      <Lazy
        offsetBottom={lazyOptions.offsetBottom}
        offsetLeft={lazyOptions.offsetLeft}
        offsetRight={lazyOptions.offsetRight}
        offsetTop={lazyOptions.offsetTop}
        renderPlaceholder={(ref): React.ReactElement => (
          <div
            ref={ref}
            style={{ height: mediumHeight, width: mediumWidth, maxWidth: '50px' }}
          />
        )}
      >
        <SourceHandler
          resizedImageOptions={resizedImageOptions}
          width={largeWidth}
          height={largeHeight}
          imageSourceWithoutProtocol={imageSourceWithoutProtocol}
          resizerURL={resizerURL}
          breakpointWidth={largeBreakpoint}
          compressedParams={compressedThumborParams}
        />
        <SourceHandler
          resizedImageOptions={resizedImageOptions}
          width={mediumWidth}
          height={mediumHeight}
          imageSourceWithoutProtocol={imageSourceWithoutProtocol}
          resizerURL={resizerURL}
          breakpointWidth={mediumBreakpoint}
          compressedParams={compressedThumborParams}
        />
        <SourceHandler
          resizedImageOptions={resizedImageOptions}
          width={smallWidth}
          height={smallHeight}
          imageSourceWithoutProtocol={imageSourceWithoutProtocol}
          resizerURL={resizerURL}
          breakpointWidth={smallBreakpoint}
          compressedParams={compressedThumborParams}
        />
        {
          typeof lightBoxWidth === 'undefined' || typeof lightBoxHeight === 'undefined'
            ? (
              <img
                alt={alt}
                src={buildThumborURL(resizedImageOptions[`${largeWidth}x${largeHeight}`], `${largeWidth}x${largeHeight}`, imageSourceWithoutProtocol, resizerURL, compressedThumborParams)}
                width={largeWidth}
                height={largeHeight}
              />
            )
            : (
              <img
                alt={alt}
                src={buildThumborURL(resizedImageOptions[`${largeWidth}x${largeHeight}`], `${largeWidth}x${largeHeight}`, imageSourceWithoutProtocol, resizerURL, compressedThumborParams)}
                // lightbox component reads from this data attribute
                data-lightbox={buildThumborURL(resizedImageOptions[`${lightBoxWidth}x${lightBoxHeight}`], `${lightBoxWidth}x${lightBoxHeight}`, imageSourceWithoutProtocol, resizerURL, compressedThumborParams)}
                width={largeWidth}
                height={largeHeight}
              />
            )
        }
      </Lazy>
    </StyledPicture>
  );
};

Image.propTypes = {
  /** Image source URL */
  url: PropTypes.string,
  /** Alt text for the image */
  alt: PropTypes.string,
  /** Width for small images */
  smallWidth: PropTypes.number,
  /** Height for small images */
  smallHeight: PropTypes.number,
  /** Width for medium images */
  mediumWidth: PropTypes.number,
  /** Height for medium images */
  mediumHeight: PropTypes.number,
  /** Width for large images */
  largeWidth: PropTypes.number,
  /** Height for large images */
  largeHeight: PropTypes.number,
  /** Key/value options for resizing the image */
  resizedImageOptions: PropTypes.shape({
    key: PropTypes.string,
  }),
  /** Thumbor resizer URL */
  resizerURL: PropTypes.string,
  /** Specify small, medium and large breakpoints for the image */
  breakpoints: PropTypes.shape({
    small: PropTypes.number,
    medium: PropTypes.number,
    large: PropTypes.number,
  }),
  /** Width of the image's lightbox */
  lightBoxWidth: PropTypes.number,
  /** Height of the image's lightbox */
  lightBoxHeight: PropTypes.number,
  /** LazyOptions - offset params for passing to the underlying module */
  lazyOptions: PropTypes.shape({
    offsetBottom: PropTypes.number,
    offsetLeft: PropTypes.number,
    offsetRight: PropTypes.number,
    offsetTop: PropTypes.number,
  }),
};

export default Image;
