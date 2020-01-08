import { resizerURL, resizerKey } from 'fusion:environment';

const buildThumborURL = (url: string, displayWidth: number, displayHeight: number): string => {
  if (typeof window === 'undefined') {
    const Thumbor = require('thumbor-lite'); // eslint-disable-line global-require,@typescript-eslint/no-var-requires
    const thumbor = new Thumbor(resizerKey, resizerURL);
    const imgSrc = url.replace(/^http[s]?:\/\//, '')
      .replace(' ', '%20');
    if (imgSrc.includes('?')) imgSrc.replace('?', '%3F');

    return thumbor.setImagePath(imgSrc)
      .resize(displayWidth, displayHeight)
      .buildUrl();
  }else{
    console.debug(`Attemping to call buildThumborURL with window: width: ${displayWidth} height: ${displayHeight}`);
  }
  return '';
};

export default buildThumborURL;
