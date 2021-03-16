import localizeDateHelper from './localizeDateHelper';

// supported locale and timezone
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

// unsupported locale and timezone
it('returns American english language and utc date for timezone not found', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y %l:%M %P %Z',
      'hi_IN',
      // india has half-hour timezone +05:30
      // india standard time
      'Asia/Kolkata',
    ),
  ).toMatchInlineSnapshot('"January 02, 2000  1:00 am UTC"');
});

// supported locale
// unsupported timezone
it('returns correct Korean language for locale ko but falls back to UTC', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y %l:%M %P %Z',
      'ko',
      'Asia/Seoul',
    ),
  ).toMatchInlineSnapshot('"1월 02, 2000  1:00 오전 UTC"');
});

// supported timezones
// supported language en to show am/pm
// Pacific/Auckland GMT+13
it('supports Auckland timezone', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y %l:%M %P %Z',
      'en',
      'Pacific/Auckland',
    ),
  ).toMatchInlineSnapshot('"January 02, 2000  2:00 pm NZDT"');
});

// supported timezone
// paris (GMT+1)
it('supports Paris timezone', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y %l:%M %P %Z',
      'en',
      'Europe/Paris',
    ),
  ).toMatchInlineSnapshot('"January 02, 2000  2:00 am CET"');
});
