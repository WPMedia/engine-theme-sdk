import fixTrailingSlash from './fixTrailingSlash';

it('should not add a slash at the end of the link if already has one', () => {
  const linkWithSlash = '/test/';

  expect(fixTrailingSlash(linkWithSlash)).toStrictEqual('/test/');
});

it('should add a slash at the end of the link', () => {
  const linkWithoutEndingSlash = '/test';

  expect(fixTrailingSlash(linkWithoutEndingSlash)).toStrictEqual('/test/');
});

it('should not add a slash at the end of the link with query params', () => {
  const linkWithQuery = '/test?query=a';

  expect(fixTrailingSlash(linkWithQuery)).toStrictEqual('/test?query=a');
});

it('should not add a slash at the end of the link with hash params', () => {
  const linkWithHashParams = '/test/page#section';
  expect(fixTrailingSlash(linkWithHashParams)).toStrictEqual('/test/page#section');
});
