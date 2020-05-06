import buildThumborURL from './thumbor-image-url';

// changing the resizer key from secret would affect the key value generated [resizerurl]/6ItQ...
// see https://thumbor.readthedocs.io/en/latest/security.html for more info
jest.mock('fusion:environment', () => ({
  resizerURL:
    'http://resizer.com',
  resizerKey: 'secret',
}));

describe('thumbor image url generator', () => {
  it('uses fit in and fill', () => {
    expect(buildThumborURL('f', 100, 100, true)).toBe('http://resizer.com/6ItQSfF4QBj3SzAMfLc6fBOs8sc=/fit-in/100x100/filters:fill(white):background_color(white)/f');
  });
  it('uses resizer not fit in fill if respect aspect ratio is false', () => {
    expect(buildThumborURL('f', 100, 100, false)).toBe('http://resizer.com/S-i76Wy9BLwvRC1JOf-qW2DLgbQ=/100x100/f');
  });
  it('to throw error if empty string passed into resizer', () => {
    try {
      buildThumborURL('', 100, 100, false);
    } catch (e) {
      expect(e.message).toBe("The image url can't be null or empty.");
    }
  });
  it('to render width of zero if 0 passed in', () => {
    expect(buildThumborURL('f', 100, 0, false)).toBe('http://resizer.com/uvmH5G016LOkBXNymuA3zV5HhuM=/100x0/f');
  });
});
