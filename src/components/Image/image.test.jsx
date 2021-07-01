import React from 'react';
import { shallow } from 'enzyme';

import Image from './index';

describe('image component', () => {
  const breakpoints = {
    small: 420,
    medium: 768,
    large: 992,
  };

  const resizedParams = {
    '158x89': '/r4YXPy4Eh2thx80bDTxRZM9Syhw=filters:format(jpg):quality(70)/',
    '274x154': '/sDwhmVtwayjjDJww8CvlWjpydGM=filters:format(jpg):quality(70)/',
  };

  const smallWidth = 158;
  const smallHeight = 89;
  const mediumWidth = 274;
  const mediumHeight = 154;
  const largeWidth = 274;
  const largeHeight = 154;

  const resizerURL = 'https://fake.cdn.arcpublishing.com/resizer';

  const rawURL = 'https://fake.s3.amazonaws.com/public/37UMUNYNOVCEJDZW5SBKBXNMO4.jpg';
  const alt = 'Picture of a lovely park with no people in it';

  it('returns an raw url src if no params provided for now', () => {
    const wrapper = shallow(<Image
      url={rawURL}
      alt={alt}
      smallWidth={smallWidth}
      smallHeight={smallHeight}
      mediumWidth={mediumWidth}
      mediumHeight={mediumHeight}
      largeWidth={largeWidth}
      largeHeight={largeHeight}
      lightBoxWidth={largeWidth}
      lightBoxHeight={largeHeight}
      resizedImageOptions={{}}
      resizerURL={resizerURL}
      breakpoints={breakpoints}
    />);
    const { src, alt: altProperty } = wrapper.find('img').props();
    expect(src).toBe('');
    expect(altProperty).toBe(alt);
  });
  it('returns various breakpoints with the widths', () => {
    const wrapper = shallow(<Image
      url={rawURL}
      alt={alt}
      smallWidth={smallWidth}
      smallHeight={smallHeight}
      mediumWidth={mediumWidth}
      mediumHeight={mediumHeight}
      largeWidth={largeWidth}
      largeHeight={largeHeight}
      lightBoxWidth={largeWidth}
      lightBoxHeight={largeHeight}
      resizedImageOptions={resizedParams}
      resizerURL={resizerURL}
      breakpoints={breakpoints}
    />);
    const { src, alt: altProperty } = wrapper.find('img').props();
    expect(src).toBe('https://fake.cdn.arcpublishing.com/resizer/r4YXPy4Eh2thx80bDTxRZM9Syhw=/158x89/filters:format(jpg):quality(70)/fake.s3.amazonaws.com/public/37UMUNYNOVCEJDZW5SBKBXNMO4.jpg');
    expect(altProperty).toBe(alt);

    expect(wrapper.find('SourceHandler').length).toBe(2);
  });
});
