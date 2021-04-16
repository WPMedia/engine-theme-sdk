import formatURL from './formatURL';

it('should not add a slash at the end of the link if already has one', () => {
  const linkWithSlash = '/test/';

  expect(formatURL(linkWithSlash)).toStrictEqual('/test/');
});

it('should add a slash at the end of the link', () => {
  const linkWithoutEndingSlash = '/test';

  expect(formatURL(linkWithoutEndingSlash)).toStrictEqual('/test/');
});

it('should not add a slash at the end of the link with query params', () => {
  const linkWithQuery = '/test?query=a';

  expect(formatURL(linkWithQuery)).toStrictEqual('/test?query=a');
});

it('should not add a slash at the end of the link with hash params', () => {
  const linkWithHashParams = '/test/page#section';
  expect(formatURL(linkWithHashParams)).toStrictEqual('/test/page#section');
});
