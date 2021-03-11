import localizeDateHelper from './localizeDateHelper';

const localizeDateTime = (date,
  dateFormat = '%B %d, %Y at %l:%M %P %Z',
  language = 'en',
  timeZone = 'America/New_York'): string => {
  if (!date) return '';

  return localizeDateHelper(
    date,
    // default includes time (see dateTimeFormat property)
    dateFormat,
    language,
    timeZone,
  );
};

export default localizeDateTime;
