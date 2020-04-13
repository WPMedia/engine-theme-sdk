import React from 'react';
import { shallow, mount } from 'enzyme';

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

  it('returns an empty src if no image providied', () => {
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
    const wrapper = mount(<Image
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
    expect(src).toBe('https://fake.cdn.arcpublishing.com/resizer/sDwhmVtwayjjDJww8CvlWjpydGM=/274x154/filters:format(jpg):quality(70)/fake.s3.amazonaws.com/public/37UMUNYNOVCEJDZW5SBKBXNMO4.jpg');
    expect(altProperty).toBe(alt);

    expect(wrapper.find('source').length).toBe(3);
  });
});
