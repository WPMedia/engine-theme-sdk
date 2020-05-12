const buildThumborURL = (
  targetImageKeyWithFilter: string | undefined,
  targetDimension: string,
  imageSourceWithoutProtocol: string,
  resizerURL: string,
): string => {
  if (typeof targetImageKeyWithFilter === 'undefined' || resizerURL.length <= 1) {
    return '';
  }
  const [targetImageKey, imageFilter = ''] = targetImageKeyWithFilter.split('=');

  if (targetImageKeyWithFilter.includes('fit-in')) {
    // https://resizer.com/resizer/OzPtTYdwjA0zqIliyUtp5iuF2Hc=//fit-in/377x283/filters:fill(white):background_color(white)/arc-anglerfish-staging-staging.s3.amazonaws.com/public/NA6FMAXWP5DR3FDZQ7SGJ3C3FE.png
    return `${resizerURL}${targetImageKey}=${imageFilter}${imageSourceWithoutProtocol}`;
  }

  return `${resizerURL}${targetImageKey}=/${targetDimension}/${imageFilter}${imageSourceWithoutProtocol}`;
};

export default buildThumborURL;
