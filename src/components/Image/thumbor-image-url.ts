const buildThumborURL = (
  targetImageKeyWithFilter: string | undefined,
  targetDimension: string,
  imageSourceWithoutProtocol: string,
  resizerURL: string,
): string => {
  if (typeof targetImageKeyWithFilter === 'undefined' || resizerURL.length === 0) {
    return '';
  }
  const [targetImageKey = '', imageFilter = ''] = targetImageKeyWithFilter.split('=');

  return `${resizerURL}${targetImageKey}=/${targetDimension}/${imageFilter}${imageSourceWithoutProtocol}`;
};

export default buildThumborURL;
