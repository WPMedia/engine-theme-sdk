// eslint-disable-next-line @typescript-eslint/no-var-requires
const tz = require('timezone')(require('timezone/zones'), require('timezone/en_US.js'), require('timezone/sv_SE.js'));

const localizeDateTime = (date,
  dateFormat = '%B %d, %Y at %l:%M %P %Z',
  language = 'en',
  timeZone = 'America/New_York'): string => {
  if (!date) return '';

  let locale = null;
  switch (language) {
    case 'sv':
      locale = 'sv_SE';
      break;
    default:
      locale = 'en_US';
  }
  // Convert to UTC date
  const utc = tz(date);
  return tz(utc, dateFormat, locale, timeZone);
};

export default localizeDateTime;
