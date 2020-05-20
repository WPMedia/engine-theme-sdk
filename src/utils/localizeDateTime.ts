import { format, utcToZonedTime } from 'date-fns-tz';
import { enUS, sv } from 'date-fns/locale';

const localizeDateTime = (date,
  dateFormat = 'LLLL d, yyyy \'at\' K:m bbbb z',
  language = 'en',
  timeZone = 'GMT'): string => {
  if (!date) return '';

  let locale = null;
  switch (language) {
    case 'sv':
      locale = sv;
      break;
    default:
      locale = enUS;
  }
  const d = utcToZonedTime(date, timeZone);
  return format(
    d,
    dateFormat,
    { locale },
  );
};

export default localizeDateTime;
