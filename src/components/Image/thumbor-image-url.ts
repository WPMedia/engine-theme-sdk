const buildThumborURL = (
  targetImageKeyWithFilter: string | undefined,
  targetDimension: string,
  imageSourceWithoutProtocol: string,
  resizerURL: string,
): string => {
  if (typeof targetImageKeyWithFilter === 'undefined' || resizerURL.length <= 1) {
    return '';
  }

  /**
   * In blocks/resizer-image-block/index.js (in fusion-news-theme-blocks
   * we are compressing the format and quality params.
   * Here we need to convert it back to thumbor format
   */
  let uncompressedTarget = targetImageKeyWithFilter;
  if (!uncompressedTarget.startsWith('/') && uncompressedTarget.indexOf('f=jpg') !== -1) {
    uncompressedTarget = `/${uncompressedTarget}`;
  }
  uncompressedTarget = uncompressedTarget
    .replace('f=jpg', 'format(jpg)')
    .replace('q=70', 'quality(70)');

  const [targetImageKey, imageFilter = ''] = uncompressedTarget.split('=');

  if (uncompressedTarget.includes('fit-in')) {
    // https://resizer.com/resizer/OzPtTYdwjA0zqIliyUtp5iuF2Hc=//fit-in/377x283/filters:fill(white):background_color(white)/arc-anglerfish-staging-staging.s3.amazonaws.com/public/NA6FMAXWP5DR3FDZQ7SGJ3C3FE.png
    return `${resizerURL}${targetImageKey}=${imageFilter}${imageSourceWithoutProtocol}`;
  }

  return `${resizerURL}${targetImageKey}=/${targetDimension}/${imageFilter}${imageSourceWithoutProtocol}`;
};

export default buildThumborURL;
