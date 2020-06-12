import { resizerKey as RESIZER_SECRET_KEY } from 'fusion:environment';

export const getImgURL = (metaValue, metaType = 'og:image', globalContent, resizerURL): string => {
  const buildURL = (_url): string | null => {
    if (typeof window === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
      const Thumbor = require('thumbor-lite');
      const thumbor = new Thumbor(RESIZER_SECRET_KEY, resizerURL);
      let imgSrc = _url.replace(/^http[s]?:\/\//, '')
        .replace(' ', '%20');
      if (imgSrc.includes('?')) {
        imgSrc = imgSrc.replace('?', '%3F');
      }

      return thumbor.setImagePath(imgSrc)
        .resize(1200, 630)
        .buildUrl();
    }
    return null;
  };

  if (metaValue(metaType)) {
    return buildURL(metaValue(metaType));
  }

  if (globalContent && globalContent.promo_items
    && globalContent.promo_items.basic
    && globalContent.promo_items.basic.url) {
    return buildURL(globalContent.promo_items.basic.url);
  }

  return '';
};

export const getImgAlt = (metaValue, metaType = 'og:image:alt', globalContent): string | null => {
  if (metaValue(metaType)) {
    return metaValue(metaType);
  }

  if (globalContent && globalContent.promo_items
    && globalContent.promo_items.basic
    && globalContent.promo_items.basic.alt_text) {
    if (globalContent.promo_items.basic.alt_text) {
      return globalContent.promo_items.basic.alt_text;
    }
  }

  return null;
};
