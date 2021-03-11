import localizeDateHelper from './localizeDateHelper';

it('returns us east expected output with at', () => {
  expect(
    localizeDateHelper(
      '2000-01-02',
      '%B %d, %Y at %l:%M %P %Z',
      'en',
      'America/New_York',
    ),
  ).toMatchInlineSnapshot('"January 01, 2000 at  7:00 pm EST"');
});
