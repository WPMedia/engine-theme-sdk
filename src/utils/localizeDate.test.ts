import localizeDateHelper from './localizeDateHelper';

it('returns us east expected output with at', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y at %l:%M %P %Z',
      'en',
      'America/New_York',
    ),
  ).toMatchInlineSnapshot('"January 01, 2000 at  8:00 pm EST"');
});

it('returns American english language for not found locale, but uses correct time zone passed in', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y %l:%M %P %Z',
      // hindi
      // to match language should be "जनवरी 02, 2000 6:30 पूर्वाह्न IST"
      // Snapshot: "January 02, 2000 6:30 am IST"
      // Received: "जनवरी 02, 2000 6:30 पूर्वाह्न IST"
      // todo: should be able to pass in any language and country locale
      'hi_IN',
      // india has half-hour timezone +05:30
      // india standard time
      'Asia/Kolkata',
    ),
  ).toMatchInlineSnapshot(
    '"January 02, 2000  6:30 am IST"',
  );
});
