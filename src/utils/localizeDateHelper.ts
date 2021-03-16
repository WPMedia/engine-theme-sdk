/* eslint-disable @typescript-eslint/no-var-requires */
// tz docs https://bigeasy.github.io/timezone/
const tz = require('timezone')(
  // supported timezones
  // timezone is the quirks of the area time-wise (eg daylight savings) and timezone
  require('timezone/Asia/Seoul'),
  require('timezone/Asia/Tokyo'),
  require('timezone/Europe/Madrid'),
  require('timezone/Europe/Busingen'),
  require('timezone/Europe/Paris'),
  require('timezone/Europe/Stockholm'),
  require('timezone/America/New_York'),
  require('timezone/Europe/Oslo'),

  // supported locales
  // locale is related to language and place (eg, Spanish and Mexico)
  // korean
  require('timezone/ko_KR'),
  // japanese
  require('timezone/ja_JP'),
  // Spain Spanish
  require('timezone/es_ES'),
  // Swedish
  require('timezone/sv_SE'),
  // American English
  require('timezone/en_US'),
  // german
  require('timezone/de_DE'),
  // french
  require('timezone/fr_FR'),
  // norwegian
  require('timezone/nb_NO'),
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
