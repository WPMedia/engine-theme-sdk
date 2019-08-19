import { resizerURL, resizerKey } from 'fusion:environment';

const buildThumborURL = (url, displayWidth, displayHeight) => {
  if (typeof window === 'undefined') {
    const Thumbor = require('thumbor-lite'); // eslint-disable-line global-require
    const thumbor = new Thumbor(resizerKey, resizerURL);
    const imgSrc = url.replace(/^http[s]?:\/\//, '')
      .replace(' ', '%20');
    if (imgSrc.includes('?')) imgSrc.replace('?', '%3F');

    return thumbor.setImagePath(imgSrc)
      .resize(displayWidth, displayHeight)
      .buildUrl();
  }
  return '';
};

export default buildThumborURL;
