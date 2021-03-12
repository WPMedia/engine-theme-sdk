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

  if (locale === 'en_US') {
    const NYC = tz(require('timezone/America/New_York'));
    return NYC(utc, 'America/New_York', targetDateFormat);
  }

  if (locale === 'ko_KR') {
    const KOREA = tz(require('timezone/Asia/Seoul'));
    return KOREA(utc, 'Asia/Seoul', targetDateFormat);
  }

  if (locale === 'ja_JP') {
    const JAPAN = tz(require('timezone/Asia/Tokyo'));
    return JAPAN(utc, 'Asia/Tokyo', targetDateFormat);
  }

  if (locale === 'es_ES') {
    const MADRID = tz(require('timezone/Europe/Madrid'));
    return MADRID(utc, 'Europe/Madrid', targetDateFormat);
  }

  if (locale === 'de_DE') {
    const BUSINGEN = tz(require('timezone/Europe/Busingen'));
    return BUSINGEN(utc, 'Europe/Busingen', targetDateFormat);
  }

  if (locale === 'fr_FR') {
    const PARIS = tz(require('timezone/Europe/Paris'));
    return PARIS(utc, 'Europe/Paris', targetDateFormat);
  }

  if (locale === 'sv_SE') {
    const STOCKHOLM = tz(require('timezone/Europe/Stockholm'));
    return STOCKHOLM(utc, 'timezone/Stockholm', targetDateFormat);
  }

  // timezone is the TZ database name https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  return tz(utc, targetDateFormat, locale, timeZone);
}

export default localizeDateHelper;
