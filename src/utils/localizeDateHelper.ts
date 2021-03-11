// eslint-disable-next-line @typescript-eslint/no-var-requires
const tz = require('timezone')(require('timezone/zones'), require('timezone/en_US.js'), require('timezone/sv_SE.js'), require('timezone/fr_FR.js'), require('timezone/nb_NO.js'), require('timezone/de_DE'), require('timezone/es_ES'), require('timezone/ja_JP'), require('timezone/ko_KR'));

// tz docs https://bigeasy.github.io/timezone/
function localizeDateHelper(
  date: string,
  targetDateFormat: string,
  language: string,
  timeZone: string,
): string {
  let locale = null;
  // locale is the language, like English has January
  // language list can be found here https://github.com/bigeasy/timezone/tree/master/src/locales
  // all languages are being imported
  // but catching ones not matched to english or specified one to language
  // country and language can affect translations as well
  // eg, spain spanish and mexican spanish can be different
  // todo: language should be able to pass in anything
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

  // timezone is the TZ database name https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  // all timezones currently work
  return tz(utc, targetDateFormat, locale, timeZone);
}

export default localizeDateHelper;
