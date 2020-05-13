import React from 'react';
import { storiesOf, addParameters } from '@storybook/react';
import {
  INITIAL_VIEWPORTS,
} from '@storybook/addon-viewport';
import Image from '../src/components/Image';

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      MacbookPro: {
        name: 'Macbook pro 1',
        styles: {
          width: '1200px',
          height: '801px',
        },
      },
    },
  },
});

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

const resizerURL = 'https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer';

const rawURL = 'https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/37UMUNYNOVCEJDZW5SBKBXNMO4.jpg';
const alt = 'This is a Free article for testing Mentor Medier’s paywall';

storiesOf('Image', module)
  .add('with widths and heights', () => (
    <Image
      url={rawURL}
      alt={alt}
      smallWidth={smallWidth}
      smallHeight={smallHeight}
      mediumWidth={mediumWidth}
      mediumHeight={mediumHeight}
      largeWidth={largeWidth}
      largeHeight={largeHeight}
      resizedImageOptions={resizedParams}
      resizerURL={resizerURL}
      breakpoints={breakpoints}
    />
  ))
  .add('with widths and heights and lightbox', () => (
    <Image
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
    />
  ))
  .add('without resizer url, should show alt tag', () => (
    <Image
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
      resizerURL=""
      breakpoints={breakpoints}
    />
  ))
  .add('without breakpoints, should show default breakpoints', () => (
    <Image
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
      breakpoints={{}}
    />
  ))
  .add('if no resized params passed in, should slowly load raw url big image', () => (
    <Image
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
    />
  ));
