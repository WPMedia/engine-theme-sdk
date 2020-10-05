import buildThumborURL from './thumbor-image-url';

describe('thumbor image url function', () => {
  const targetImageKey = '/r4YXPy4Eh2thx80bDTxRZM9Syhw=filters:format(jpg):quality(70)/';
  const targetImageKeyCompressed = 'r4YXPy4Eh2thx80bDTxRZM9Syhw=filters:cm=t/';
  const targetImageKeyPngCompressed = 'r4YXPy4Eh2thx80bDTxRZM9Syhw=filters:format(png):cm=t/';
  const targetImageKeyNoFilters = '/r4YXPy4Eh2thx80bDTxRZM9Syhw=/';
  const imageSource = 'www.hey.com/ffdfdf';
  const resizerURL = 'www.hey.resizer.com';
  it('returns an empty string if no resizer url', () => {
    expect(buildThumborURL(targetImageKey, '100x100', imageSource, '')).toBe('');
  });
  it('returns an empty string if targetImageKeyWithFilter is undefined', () => {
    expect(buildThumborURL(undefined, '100x100', imageSource, resizerURL)).toBe('');
  });
  it('returns a well-formed url image if all params present as expected', () => {
    expect(buildThumborURL(targetImageKey, '100x100', imageSource, resizerURL)).toBe('www.hey.resizer.com/r4YXPy4Eh2thx80bDTxRZM9Syhw=/100x100/filters:format(jpg):quality(70)/www.hey.com/ffdfdf');
  });
  it('returns a well-formed url image if filters have been assumed defaulted (with the cm=t param) to a format of jpg and quality of 70', () => {
    expect(buildThumborURL(targetImageKeyCompressed, '100x100', imageSource, resizerURL)).toBe('www.hey.resizer.com/r4YXPy4Eh2thx80bDTxRZM9Syhw=/100x100/filters:format(jpg):quality(70)/www.hey.com/ffdfdf');
  });
  it('returns a well-formed url image if filter quality have been assumed defaulted at 70 (with the cm=t param) but with a format of png', () => {
    expect(buildThumborURL(targetImageKeyPngCompressed, '100x100', imageSource, resizerURL)).toBe('www.hey.resizer.com/r4YXPy4Eh2thx80bDTxRZM9Syhw=/100x100/filters:format(png):quality(70)/www.hey.com/ffdfdf');
  });
  it('retuns well-formed url with no filters', () => {
    expect(buildThumborURL(targetImageKeyNoFilters, '100x100', imageSource, resizerURL)).toBe('www.hey.resizer.com/r4YXPy4Eh2thx80bDTxRZM9Syhw=/100x100//www.hey.com/ffdfdf');
  });
});
