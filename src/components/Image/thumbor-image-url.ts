const buildThumborURL = (
  targetImageKeyWithFilter: string | undefined,
  targetDimension: string,
  imageSourceWithoutProtocol: string,
  resizerURL: string,
  compressedParams?: boolean,
): string => {
  if (typeof targetImageKeyWithFilter === 'undefined' || resizerURL.length <= 1) {
    return '';
  }

  /**
   * In blocks/resizer-image-block/index.js (in fusion-news-theme-blocks),
   * we are compressing the format and quality params. We add a param 'cm=t' to alert us that
   * the string is compressed.  We will look for that param to see if we need to
   * convert the string back to the thumbor format by:
   * 1) Add back the leading slash
   * 2) remove the compression flag
   * 3) Convert the default format and quality params to thumbor params.
   */
  let uncompressedTarget = targetImageKeyWithFilter;
  if (uncompressedTarget.indexOf(':cm=t') !== -1 && compressedParams) {
    uncompressedTarget = uncompressedTarget.replace(':cm=t', ':format(jpg):quality(70)');
    uncompressedTarget = `/${uncompressedTarget}`;
  }

  const [targetImageKey, imageFilter = ''] = uncompressedTarget.split('=');

  if (uncompressedTarget.includes('fit-in')) {
    // https://resizer.com/resizer/OzPtTYdwjA0zqIliyUtp5iuF2Hc=/fit-in/377x283/filters:fill(white):background_color(white)/arc-anglerfish-staging-staging.s3.amazonaws.com/public/NA6FMAXWP5DR3FDZQ7SGJ3C3FE.png
    return `${resizerURL}/${targetImageKey}=${imageFilter}${imageSourceWithoutProtocol}`;
  }

  return `${resizerURL}${targetImageKey}=/${targetDimension}/${imageFilter}${imageSourceWithoutProtocol}`;
};

export default buildThumborURL;
