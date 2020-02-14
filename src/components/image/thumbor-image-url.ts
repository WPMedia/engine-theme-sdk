import { resizerURL, resizerKey } from 'fusion:environment';
import Thumbor from 'thumbor-lite';

const buildThumborURL = (url: string, displayWidth: number, displayHeight: number): string => {
  const thumbor = new Thumbor(resizerKey, resizerURL);
  const imgSrc = url.replace(/^http[s]?:\/\//, '')
    .replace(' ', '%20');
  if (imgSrc.includes('?')) imgSrc.replace('?', '%3F');

  return thumbor.setImagePath(imgSrc)
    .resize(displayWidth, displayHeight)
    .buildUrl();
};

export default buildThumborURL;
