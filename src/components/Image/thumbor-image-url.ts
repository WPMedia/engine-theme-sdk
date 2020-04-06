const buildThumborURL = (
  targetImageKeyWithFilter: string,
  targetDimension: string,
  imageSourceWithoutProtocol: string,
  resizerURL: string,
): string => {
  const [targetImageKey = '', imageFilter = ''] = targetImageKeyWithFilter.split('=');

  return `${resizerURL}${targetImageKey}=/${targetDimension}/${imageFilter}${imageSourceWithoutProtocol}`;
};

export default buildThumborURL;
