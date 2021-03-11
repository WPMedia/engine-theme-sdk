import localizeDateHelper from './localizeDateHelper';

const localizeDate = (date,
  dateFormat = '%B %d, %Y',
  language = 'en',
  timeZone = 'America/New_York'): string => {
  if (!date) return '';

  return localizeDateHelper(
    date,
    dateFormat,
    language,
    timeZone,
  );
};

export default localizeDate;
