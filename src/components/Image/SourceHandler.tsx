import React from 'react';
import buildThumborURL from './thumbor-image-url';

interface SourceImageProps {
  resizedImageOptions: {
    [key: string]: string | undefined;
  };
  width: number;
  height: number;
  imageSourceWithoutProtocol: string;
  resizerURL: string;
  breakpointWidth: number;
}

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

  if (!targetImageKeyWithFilter) {
    return null;
  }

  return (
    <>
      <source
        // using src with picture tag parent is deprecated via console info warning
        srcSet={buildThumborURL(resizedImageOptions[`${width}x${height}`], `${width}x${height}`, imageSourceWithoutProtocol, resizerURL)}
        media={`screen and (min-width: ${breakpointWidth}px)`}
      />
    </>
  );
};

export default SourceHandler;
