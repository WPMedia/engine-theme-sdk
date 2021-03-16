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

it('supports language and timezone for Kiwis speaking Spain Spanish', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y %l:%M %P %Z',
      'es',
      'Pacific/Auckland',
    ),
  ).toMatchInlineSnapshot('"enero 02, 2000  2:00  NZDT"');
});

it('Supports french-speakers in Paris', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y %l:%M %P %Z',
      'fr',
      'Europe/Paris',
    ),
  ).toMatchInlineSnapshot('"janvier 02, 2000  2:00  CET"');
});
