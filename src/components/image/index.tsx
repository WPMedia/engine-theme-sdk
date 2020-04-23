/* eslint react/destructuring-assignment: "off", no-param-reassign: "off" */
import React from 'react';
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
  lightBoxWidth: number;
  lightBoxHeight: number;
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
 * @param {number} lightBoxWidth - Width of the image to crop to for the large break point
 * @param {number} lightBoxHeight - Height of the image to crop to for the large break point
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
  lightBoxWidth,
  lightBoxHeight,
}) => {
  // This is just a 800x600 black image
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultImagePath = 'data:image/gif;base64,R0lGODdhIANYAqIAAAAAACYmJpGRkf///wAAAAAAAAAAAAAAACH5BAkAAAQALAAAAAAgA1gCAAP/KAHc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wrAWKbN94ru987//AoHBIhC2KyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169iza9/Ovbv37+DDix9Pvrz58+jTq1/Pvr379/Djy59Pv779+/jz69/Pv7////8ABijggAQWaOCBCCao4IIMNujggxBGKOGEFFZo4YUYZqjhhhx26OGHIIYo4ogklmjiiSimqOKKLLbo4oswxijjjDTWaOONOOao44489ujjj0AGKeSQRBZp5JFIJqnkkkw26eSTUEYp5ZRUVmnllVhmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMYq66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LL/zDbr7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rnopqvuuuy26+678MYr77z01mvvvfjmq+++/Pbr778AByzwwAQXbPDBCCes8MIMN+zwwxBHLPHEFFds8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNOOes88489+zzz0AHLfTQRBdt9NFIJ6300kw37fTTUEct9dRUV2311VhnrfXWXHft9ddghy322GSXbfbZaKet9tpst+3223DHLffcdNdt991456333nz37fffgAcu+OCEF2744YgnrvjijDfu+OOQRy755JRXbvnlZphnrvnmnHfu+eeghy766KSXbvrpqKe+uqst+7667DHLvvstNdu++2456777rz37vvvwAcv/PDEF2/88cgnr/zyzDfv/PPQRy/99NRXb/312Gev/fbcd+/99+BnecTKNIyPMg0JAAA7';

  if (url.indexOf('/pf/') !== -1) {
    return (
      <img
        src={url}
        alt={alt}
      />
    );
  }

  if (lightBoxWidth !== null || lightBoxHeight !== null) {
    return (
      <img
        src={buildThumborURL(url, smallWidth, smallHeight)}
        data-lightbox={buildThumborURL(url, lightBoxWidth,
          lightBoxHeight)}
        srcSet={`
      ${buildThumborURL(url, mediumWidth,
          mediumHeight)} 1000w,
      ${buildThumborURL(url, largeWidth,
            largeHeight)} 2000w
      `}
        alt={alt}
      />
    );
  }
  return (
    <img
      src={buildThumborURL(url, smallWidth, smallHeight)}
      srcSet={`
      ${buildThumborURL(url, mediumWidth,
        mediumHeight)} 1000w,
      ${buildThumborURL(url, largeWidth,
          largeHeight)} 2000w
      `}
      alt={alt}
    />
  );
};

export default Image;
