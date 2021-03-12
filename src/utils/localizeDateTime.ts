import isValidDateFormatString from './isValidDateFormatString';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tz = require('timezone')(require('timezone/zones'), require('timezone/en_US.js'), require('timezone/sv_SE.js'), require('timezone/fr_FR.js'), require('timezone/nb_NO.js'), require('timezone/de_DE'), require('timezone/es_ES'), require('timezone/ja_JP'), require('timezone/ko_KR'));

const DATE_TIME_FORMAT_FALLBACK = '%B %d, %Y at %l:%M %P %Z';

const localizeDateTime = (date,
  dateFormat = DATE_TIME_FORMAT_FALLBACK,
  language = 'en',
  timeZone = 'America/New_York'): string => {
  if (!date) return '';

  let validDateFormat = dateFormat;

  if (!isValidDateFormatString(dateFormat)) {
    validDateFormat = DATE_TIME_FORMAT_FALLBACK;
  }

  let locale = null;
  switch (language) {
    case 'sv':
      locale = 'sv_SE';
      break;
    case 'fr':
      locale = 'fr_FR';
      break;
    case 'no':
      locale = 'nb_NO';
      break;
    case 'de':
      locale = 'de_DE';
      break;
    case 'es':
      locale = 'es_ES';
      break;
    case 'ja':
      locale = 'ja_JP';
      break;
    case 'ko':
      locale = 'ko_KR';
      break;
    default:
      locale = 'en_US';
  }
  // Convert to UTC date
  const utc = tz(date);
  return tz(utc, validDateFormat, locale, timeZone);
};

export default localizeDateTime;
