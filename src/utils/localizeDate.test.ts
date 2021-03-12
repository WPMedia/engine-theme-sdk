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

// without require timezones
// eslint-disable-next-line max-len
// const tz = require('timezone')(require('timezone/en_US.js'), require('timezone/sv_SE.js'), require('timezone/fr_FR.js'), require('timezone/nb_NO.js'), require('timezone/de_DE'), require('timezone/es_ES'), require('timezone/ja_JP'), require('timezone/ko_KR'));
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
  ).toMatchInlineSnapshot(
    '"January 02, 2000  1:00 am UTC"',
  );
});

it('returns seoul for locale ko', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y %l:%M %P %Z',
      'ko',
      'Asia/Seoul',
    ),
  ).toMatchInlineSnapshot('"1월 02, 2000 10:00 오전 KST"');
});
