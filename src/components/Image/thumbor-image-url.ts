import { resizerURL, resizerKey } from 'fusion:environment';
import Thumbor from 'thumbor-lite';

const buildThumborURL = (
  url: string,
  displayWidth: number,
  displayHeight: number,
  respectAspectRatio: boolean,
): string => {
  const thumbor = new Thumbor(resizerKey, resizerURL);
  const imgSrc = url.replace(/^http[s]?:\/\//, '')
    .replace(' ', '%20');
  if (imgSrc.includes('?')) imgSrc.replace('?', '%3F');

  if (respectAspectRatio) {
  // https://thumbor.readthedocs.io/en/latest/filling.html?highlight=fill#filling
  // fitIn will respect the aspect ratio of the photo and fit it into dsipaly
  // fitin https://thumbor.readthedocs.io/en/latest/usage.html?highlight=fit#fit-in
    return thumbor.setImagePath(imgSrc)
      .fitIn(displayWidth, displayHeight)
      .filter('fill(white)')
      .filter('background_color(white)')
      .buildUrl();
  }

  return thumbor.setImagePath(imgSrc)
    .resize(displayWidth, displayHeight)
    .buildUrl();
};

export default buildThumborURL;
