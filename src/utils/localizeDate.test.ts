import localizeDateHelper from './localizeDateHelper';

// supported locale and timezone if no blocks.json found
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

// unsupported locale and timezone if no blocks.json found
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

// supported locale if no blocks.json found
// unsupported timezone if no blocks.json found
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

// supported timezone by default if no blocks.json found
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

// supported timezone by default if no blocks.json found
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

it('handles french meridiems', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 01:00',
      '%B %d, %Y %l:%M %P %Z',
      'fr',
      'Europe/Paris',
    ),
  ).toMatchInlineSnapshot('"janvier 02, 2000  2:00 am CET"');
});

it('handles spanish meridiems', () => {
  expect(
    localizeDateHelper(
      '2000-01-02 13:00',
      '%B %d, %Y %l:%M %P %Z',
      'es',
      'Europe/Paris',
    ),
  ).toMatchInlineSnapshot('"enero 02, 2000  2:00 pm CET"');
});

// To test this, see debugging-timezone-postinstall-dates.md
// 1. Add a blocks.json file in the src/ folder from above doc
// 2. run `rm -rf node_modules && npm ci --production`
// 3. run `ls node_modules/timezone`
// 4. See pt_PT in the list
// 5. You can uncomment this test

// eslint-disable-next-line max-len
// it('support portuguese in portugal language and portugal lisbon timezone when setup with blocks.json', () => {
//   expect(localizeDateHelper(
//     '2000-01-02 01:00',
//     '%B %d, %Y %l:%M %P %Z',
//     'pt_PT',
//     'Europe/Lisbon',
//   )).toMatchInlineSnapshot('"Janeiro 02, 2000  1:00  WET"');
// });
