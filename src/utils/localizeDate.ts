import isValidDateFormatString from './isValidDateFormatString';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tz = require('timezone')(require('timezone/zones'), require('timezone/en_US.js'), require('timezone/sv_SE.js'), require('timezone/fr_FR.js'), require('timezone/nb_NO.js'));

const DATE_FORMAT_FALLBACK = '%B %d, %Y';

// date comes in Thu Mar 11 2021 17:27:24 GMT-0600 (Central Standard Time)
const localizeDate = (date,
  dateFormat = DATE_FORMAT_FALLBACK,
  language = 'en',
  timeZone = 'America/New_York'): string => {
  if (!date) return '';

  let validDateFormat = dateFormat;

  if (!isValidDateFormatString(dateFormat)) {
    validDateFormat = DATE_FORMAT_FALLBACK;
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
    default:
      locale = 'en_US';
  }
  // Convert to UTC date
  const utc = tz(date);
  return tz(utc, validDateFormat, locale, timeZone);
};

export default localizeDate;
