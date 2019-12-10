/* eslint react/destructuring-assignment: "off", no-param-reassign: "off" */
import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import buildThumborURL from './thumbor-image-url';

interface ImageProps {
  url: string;
  alt: string;
  smallWidth: number;
  smallHeight: number;
  mediumWidth: number;
  mediumHeight: number;
  largeWidth: number;
  largeHeight: number;
}

/**
 * Image component that has basic Thumbor and lazy loading support.
 *
 * The Thumbor support assumes that the feature pack leveraging this component will have the
 * packaage "thumbor-lite" installed via NPM. The requirement for thumbor-lite is through a
 * dynamic require to enforce
 * its usaage server-side...See the file in this repository:
 * components/image/lib/thumbor-image-url.js
 *
 * Also, the lazy loading assumes that that the feature pack will have the
 * Yall library (https://github.com/malchata/yall.js)
 * installed in resources/js/yall.min.js along with an additional script to bootstrap the library.
 * For example, a script called
 * resources/js/image-lazy.js and basically has this one line of code:
 * document.addEventListener('DOMContentLoaded', yall).
 * These two scripts are then included in an output-type file like this:
 *
 * <script type="text/javascript" src={deployment(`${contextPath}/resources/js/yall.min.js`)} />
 * <script type="text/javascript" src={deployment(`${contextPath}/resources/js/image-lazy.js`)} />
 *
 * Note: This component needs to be extended to allow for Thumbor ratio and focal point values
 * that are set by the producer.
 *
 * @constructor
 * @param {string} URL - URL to the unoptimized image.
 * @param {string} alt - The author of the book.
 * @param {number} smallWidth - Width of the image to crop to for the small break point
 * @param {number} smallHeight - Height of the image to crop to for the small break point
 * @param {number} mediumWidth - Width of the image to crop to for the medium break point
 * @param {number} mediumHeight - Height of the image to crop to for the medium break point
 * @param {number} largeWidth - Width of the image to crop to for the large break point
 * @param {number} largeHeight - Height of the image to crop to for the large break point
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
}) => {
  const { deployment = (img: string): string => img } = useAppContext();

  const getDefaultImagePath = (): string => deployment('/pf/resources/images/default_feed_image.jpg');

  if (url.indexOf('/pf/') !== -1) {
    return (
      <Static id={url}>
        <img
          className="lazy"
          src={url}
          alt={alt}
        />
      </Static>
    );
  }
  return (
    <Static id={url}>
      <img
        className="lazy"
        src={getDefaultImagePath()}
        data-src={buildThumborURL(url, smallWidth,
          smallHeight)}
        data-srcset={`
        ${buildThumborURL(url, mediumWidth,
          mediumHeight)} 1000w, 
        ${buildThumborURL(url, largeWidth,
            largeHeight)} 2000w
        `}
        alt={alt}
      />
    </Static>
  );
};

export default Image;
