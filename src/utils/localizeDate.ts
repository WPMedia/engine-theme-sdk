import { format } from 'date-fns';
import { convertToLocalTime } from 'date-fns-timezone';
import { enUS, sv } from 'date-fns/locale';

const localizeDate = (date,
  dateFormat = 'LLLL d, yyyy',
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
  const d = convertToLocalTime(date, { timeZone });
  return format(
    d,
    dateFormat,
    { locale },
  );
};

export default localizeDate;
