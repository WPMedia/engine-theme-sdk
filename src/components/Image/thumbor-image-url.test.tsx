import buildThumborURL from './thumbor-image-url';

describe('thumbor image url generator', () => {
  it('uses fit in and fill', () => {
    expect(buildThumborURL('f', 100, 100, true)).toBe('undefined/unsafe/fit-in/100x100/filters:fill(white):background_color(white)/f');
  });
});
