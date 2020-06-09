import React from 'react';
import Gallery from '../src/components/Gallery';

export default {
  title: 'Gallery',
  component: Gallery,
};

const mockGallery = [
  // permutation with everything
  {
    _id: 'aaa111',
    url: 'http://www.aaa.aaa/aaa.jpg',
    alt_text: 'aaa alt aaa',
    subtitle: 'aaa sub aaa',
    caption: 'aaa caption aaa',
    breakpoints: {
      small: 0,
      medium: 0,
      large: 0,
    },
    resized_params: {},
    credits: {
      by: [
        {
          name: 'aaa by name aaa',
        },
      ],
      affiliation: [
        {
          name: 'aaa aff name aaa',
        },
      ],
    },
  },
  // permutation with no subtitle
  {
    _id: 'bbb222',
    url: 'http://www.bbb.bbb/bbb.jpg',
    alt_text: 'bbb alt bbb',
    caption: 'bbb caption bbb',
    breakpoints: {
      small: 0,
      medium: 0,
      large: 0,
    },
    resized_params: {},
    credits: {
      by: [
        {
          name: 'bbb by name bbb',
        },
      ],
      affiliation: [
        {
          name: 'bbb aff name bbb',
        },
      ],
    },
  },
  // permutation with no caption
  {
    _id: 'ccc333',
    url: 'http://www.ccc.ccc/ccc.jpg',
    alt_text: 'ccc alt ccc',
    subtitle: 'ccc sub ccc',
    breakpoints: {
      small: 0,
      medium: 0,
      large: 0,
    },
    resizerURL: '',
    resized_params: {},
    credits: {
      by: [
        {
          name: 'ccc by name ccc',
        },
      ],
      affiliation: [
        {
          name: 'ccc aff name ccc',
        },
      ],
    },
  },
  // permutation with no byline
  {
    _id: 'ddd444',
    url: 'http://www.ddd.ddd/ddd.jpg',
    alt_text: 'ddd alt ddd',
    subtitle: 'ddd sub ddd',
    caption: 'ddd caption ddd',
    breakpoints: {
      small: 0,
      medium: 0,
      large: 0,
    },
    resizerURL: '',
    resized_params: {},
    credits: {
      affiliation: [
        {
          name: 'ddd aff name ddd',
        },
      ],
    },
  },
  // permutation with no affiliation
  {
    _id: 'eee555',
    url: 'http://www.eee.eee/eee.jpg',
    alt_text: 'eee alt eee',
    subtitle: 'eee sub eee',
    caption: 'eee caption eee',
    breakpoints: {
      small: 0,
      medium: 0,
      large: 0,
    },
    resizerURL: '',
    resized_params: {},
    credits: {
      by: [
        {
          name: 'eee by name eee',
        },
      ],
    },
  },
  // permutation with no byline or affiliation
  {
    _id: 'fff666',
    url: 'http://www.fff.fff/fff.jpg',
    alt_text: 'fff alt fff',
    subtitle: 'fff sub fff',
    caption: 'fff caption fff',
    breakpoints: {
      small: 0,
      medium: 0,
      large: 0,
    },
    resizerURL: '',
    resized_params: {},
  },
];


export const GalleryTest = () => <Gallery galleryElements={mockGallery} resizerURL="" />;
