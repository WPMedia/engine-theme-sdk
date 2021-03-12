/* eslint-disable @typescript-eslint/no-var-requires,global-require */
// tz docs https://bigeasy.github.io/timezone/
import tz from 'timezone';

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
  const utc = tz(date);

  // performance improvement via https://github.com/bigeasy/timezone/issues/292#issuecomment-354597725

  // 1. match locale.
  // locale is related to language and place (eg, Spanish and Mexico)
  // 2. require target locale and timezone
  // timezone is the quirks of the area time-wise (eg daylight savings)
  // 3. use the function along with utc time and target date format
  // utc time is not region-specific
  // targetDateFormat is like "%d %m" for day month, formatting

  if (locale === 'ko_KR') {
    const SEOUL = tz(require('timezone/Asia/Seoul'), require('timezone/ko_KR'));
    return SEOUL(utc, 'Asia/Seoul', targetDateFormat);
  }

  if (locale === 'ja_JP') {
    const TOKYO = tz(require('timezone/Asia/Tokyo'), require('timezone/ja_JP'));
    return TOKYO(utc, 'Asia/Tokyo', targetDateFormat);
  }

  if (locale === 'es_ES') {
    const MADRID = tz(require('timezone/Europe/Madrid'), require('timezone/es_ES'));
    return MADRID(utc, locale, 'Europe/Madrid', targetDateFormat);
  }

  if (locale === 'de_DE') {
    const BUSINGEN = tz(require('timezone/Europe/Busingen'), require('timezone/de_DE'));
    return BUSINGEN(utc, locale, 'Europe/Busingen', targetDateFormat);
  }

  if (locale === 'fr_FR') {
    const PARIS = tz(require('timezone/Europe/Paris'), require('timezone/fr_FR'));
    return PARIS(utc, locale, 'Europe/Paris', targetDateFormat);
  }

  if (locale === 'sv_SE') {
    const STOCKHOLM = tz(require('timezone/Europe/Stockholm'), require('timezone/sv_SE'));
    return STOCKHOLM(utc, locale, 'timezone/Stockholm', targetDateFormat);
  }

  // default case
  // if (locale === 'en_US') {
  const NYC = tz(require('timezone/America/New_York'), require('timezone/en_US'));
  return NYC(utc, locale, 'America/New_York', targetDateFormat);
  // }
}

export default localizeDateHelper;
