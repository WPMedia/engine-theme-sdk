/* eslint-disable @typescript-eslint/no-var-requires */
// tz docs https://bigeasy.github.io/timezone/
const tz = require('timezone')(
  require('timezone/zones'),
  require('timezone/locales'),
);

function localizeDateHelper(
  date: string,
  targetDateFormat: string,
  language: string,
  timeZone: string,
): string {
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
    case 'en':
    default:
      locale = 'en_US';
  }

  // Convert to UTC date
  // utc time is not region-specific
  const utc = tz(date);

  return tz(utc, locale, timeZone, targetDateFormat);
}

export default localizeDateHelper;
