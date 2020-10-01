/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import MetaData from './index';

jest.mock('react-dom/server', () => ({
  renderToString: jest.fn().mockReturnValue('<meta />'),
}));

// getProperties.mockImplementation(() => ({
//   websiteName: 'The Sun',
//   twitterUsername: 'the-sun',
//   dangerouslyInjectJS: [],
// }));

interface MetaValuesReturnInterface {
  (prop: string): string | null;
}

interface GlobalContentBag {
  [x: string]: unknown;
}

const websiteName = 'The Sun';
const websiteDomain = 'http://example.com';
const twitterUsername = 'the-sun';
const resizerURL = 'https://fake.cdn.com/resizer';
const arcSite = 'the-sun';
const facebookAdmins = '1111111111';
const globalContentComplete = {
  description: {
    basic: 'this is a description',
  },
  headlines: {
    basic: 'this is a headline',
  },
  taxonomy: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    seo_keywords: [
      'keyword1',
      'keyword2',
    ],
    tags: [
      { slug: 'tag1' },
      { slug: 'tag2' },
    ],
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  promo_items: {
    basic: {
      url: 'awesome-url',
      // eslint-disable-next-line @typescript-eslint/camelcase
      alt_text: 'alt text',
    },
  },
  websites: {
    'the-sun': {
      // eslint-disable-next-line @typescript-eslint/camelcase
      website_url: '/url/to/story/',
    },
  },
  authors: [
    {
      byline: 'John Doe',
      bio: 'John Doe is an author',
    },
  ],
  Payload: [
    {
      name: 'payload name',
      description: 'payload description',
    },
  ],
  name: 'section name',
  metadata: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    metadata_description: 'metadata section description',
    // eslint-disable-next-line @typescript-eslint/camelcase
    metadata_title: 'metadata section title',
  },
};

const expectTwitterMeta = (wrapper: ShallowWrapper): void => {
  expect(wrapper.find("meta[name='twitter:site']").props().content).toBe(`@${twitterUsername}`);
  expect(wrapper.find("meta[name='twitter:card']").props().content).toBe('summary_large_image');
};

const expectTwitterMetaMissing = (wrapper: ShallowWrapper): void => {
  expect(wrapper.find("meta[name='twitter:site']").length).toBe(0);
  expect(wrapper.find("meta[name='twitter:card']").props().content).toBe('summary_large_image');
};

const wrapperGenerator = (
  metaValue: MetaValuesReturnInterface,
  globalContent: GlobalContentBag,
): ShallowWrapper => (
  shallow(
    <MetaData
      metaValue={metaValue}
      MetaTag={jest.fn()}
      MetaTags={jest.fn()}
      globalContent={globalContent}
      twitterUsername={twitterUsername}
      websiteName={websiteName}
      resizerURL={resizerURL}
      arcSite={arcSite}
      websiteDomain={websiteDomain}
      facebookAdmins={facebookAdmins}
    />,
  )
);

const metaValues = (values: object): MetaValuesReturnInterface => {
  const data = { ...values };
  return (prop: string): string | null => data[prop];
};

const titleTest = (pageType: string): void => {
  describe('when need to add a title tag', () => {
    it('must use the meta value first and add the site name', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        title: 'meta title',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(wrapper.find('title').text()).toEqual(`${metaValue('title')} – ${websiteName}`);
    });

    it('must use the headline if metaValue missing', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(wrapper.find('title').text()).toEqual(`${globalContentComplete.headlines.basic} – ${websiteName}`);
    });

    it('must use the websiteName if found no valid values', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const globalContent = {
        ...globalContentComplete,
        headlines: {},
      };
      const wrapper = wrapperGenerator(metaValue, globalContent);
      expect(wrapper.find('title').text()).toEqual(websiteName);
    });
  });
};
const ogTitleTest = (pageType: string): void => {
  describe('when need to add a og:title tag', () => {
    it('must use the meta value first and add the site name', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        'og:title': 'og meta title',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(wrapper.find("meta[property='og:title']").prop('content')).toEqual(metaValue('og:title'));
    });

    it('must use the headline if metaValue missing', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(wrapper.find("meta[property='og:title']").prop('content')).toEqual(globalContentComplete.headlines.basic);
    });

    it('must use the websiteName if found no valid values', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const globalContent = {
        ...globalContentComplete,
        headlines: {},
      };
      const wrapper = wrapperGenerator(metaValue, globalContent);
      expect(wrapper.find("meta[property='og:title']").prop('content')).toEqual(websiteName);
    });
  });
};
const descriptionTest = (pageType: string): void => {
  describe('when need to add a description tag', () => {
    it('must use the meta value first', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        title: 'the-sun',
        description: 'description from metaValue',
      });

      const globalContent = {
        description: {
          basic: 'this is a description',
        },
      };
      const wrapper = wrapperGenerator(metaValue, globalContent);
      expect(wrapper.find("meta[name='description']").prop('content')).toEqual(metaValue('description'));
    });

    it('must use the global content if metaValue missing', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        title: 'the-sun',
      });

      const globalContent = {
        description: {
          basic: 'this is a description',
        },
      };
      const wrapper = wrapperGenerator(metaValue, globalContent);
      expect(wrapper.find("meta[name='description']").prop('content')).toEqual(globalContent.description.basic);
    });

    it('must not render a description if found no valid values', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        title: 'the-sun',
      });

      const globalContent = {};
      const wrapper = wrapperGenerator(metaValue, globalContent);
      expect(wrapper.find("meta[name='description']").length).toBe(0);
    });
  });
};

const ogImageTest = (pageType: string): void => {
  describe('when need to add a og:image tag', () => {
    it('must use the metaValue first', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        'og:image': 'http://example.com/resources/image.jpg',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      const content = wrapper.find("meta[property='og:image']").prop('content');
      expect(
        content.substring(0, resizerURL.length),
      ).toEqual(resizerURL);
    });

    it('must use the promo_items.basic if found', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      const content = wrapper.find("meta[property='og:image']").prop('content');
      const url = globalContentComplete.promo_items.basic.url.replace('https://', '');
      expect(
        content.substring(0, resizerURL.length),
      ).toEqual(resizerURL);
      expect(
        content.slice(url.length * -1),
      ).toEqual(url);
    });
    it('must not add og:image if url not found', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const globalContent = {
        ...globalContentComplete,
        // eslint-disable-next-line @typescript-eslint/camelcase
        promo_items: {},
      };

      const wrapper = wrapperGenerator(metaValue, globalContent);
      expect(wrapper.find("meta[property='og:image']").length).toBe(0);
    });
  });
};

const ogImageAltTest = (pageType: string): void => {
  describe('when need to add a og:image:alt tag', () => {
    it('must use the metaValue first', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        'og:image:alt': 'meta alt image description',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(
        wrapper.find("meta[property='og:image:alt']").prop('content'),
      ).toEqual(metaValue('og:image:alt'));
    });

    it('must use the promo_images alt value', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(
        wrapper.find("meta[property='og:image:alt']").prop('content'),
      ).toEqual(globalContentComplete.promo_items.basic.alt_text);
    });

    it('must not add og:image:alt if values not found', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const content = {
        ...globalContentComplete,
        // eslint-disable-next-line @typescript-eslint/camelcase
        promo_items: {},
      };
      const wrapper = wrapperGenerator(metaValue, content);
      expect(
        wrapper.find("meta[property='og:image:alt']").length,
      ).toBe(0);
    });
  });
};

const twitterTitleTest = (pageType: string): void => {
  describe('when need to add a twitter:title tag', () => {
    it('must use the metaValue first', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        twitterTitle: 'meta alt twitter title',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(
        wrapper.find("meta[name='twitter:title']").prop('content'),
      ).toEqual(metaValue('twitterTitle'));
    });

    it('must use the headlines if metaValue not found', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(
        wrapper.find("meta[name='twitter:title']").prop('content'),
      ).toEqual(globalContentComplete.headlines.basic);
    });

    it('must use the websiteName if no values found', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const content = {
        ...globalContentComplete,
        headlines: {},
      };
      const wrapper = wrapperGenerator(metaValue, content);
      expect(
        wrapper.find("meta[name='twitter:title']").prop('content'),
      ).toEqual(websiteName);
    });
  });
};

const twitterImageTest = (pageType: string): void => {
  describe('when need to add a twitter:image tag', () => {
    it('must use the metaValue first', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        'twitter:image': 'http://example.com/resources/image.jpg',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      const content = wrapper.find("meta[name='twitter:image']").prop('content');
      expect(
        content.substring(0, resizerURL.length),
      ).toEqual(resizerURL);
    });

    it('must use the promo_items.basic if found', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      const content = wrapper.find("meta[name='twitter:image']").prop('content');
      const url = globalContentComplete.promo_items.basic.url.replace('https://', '');
      expect(
        content.substring(0, resizerURL.length),
      ).toEqual(resizerURL);
      expect(
        content.slice(url.length * -1),
      ).toEqual(url);
    });

    it('must not add twitter:image if url not found', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const globalContent = {
        ...globalContentComplete,
        // eslint-disable-next-line @typescript-eslint/camelcase
        promo_items: {},
      };

      const wrapper = wrapperGenerator(metaValue, globalContent);
      expect(wrapper.find("meta[name='twitter:image']").length).toBe(0);
    });
  });
};

const keywordsTest = (pageType: string): void => {
  describe('when need to add a keywords tag', () => {
    it('must use the metaValue first', () => {
      const metaValue = metaValues({
        'page-type': pageType,
        keywords: 'key1, key2,key3',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(wrapper.find("meta[name='keywords']").prop('content')).toEqual(metaValue('keywords'));
    });

    it('must use the globalContent.taxonomy.seo_keywords if exists', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(
        wrapper.find("meta[name='keywords']").prop('content'),
      ).toEqual(globalContentComplete.taxonomy.seo_keywords.join(','));
    });

    it('must use the globalContent.taxonomy.tags if exists', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const content = {
        ...globalContentComplete,
        taxonomy: {
          tags: globalContentComplete.taxonomy.tags,
        },
      };
      const wrapper = wrapperGenerator(metaValue, content);
      const tags = content.taxonomy.tags.reduce((acc, ele) => acc.concat(ele.slug), []).join(',');
      expect(
        wrapper.find("meta[name='keywords']").prop('content'),
      ).toEqual(tags);
    });

    it('must not use meta keywords if valid values not found', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const content = {
        ...globalContentComplete,
        taxonomy: {},
      };
      const wrapper = wrapperGenerator(metaValue, content);
      expect(wrapper.find("meta[name='keywords']").length).toBe(0);
    });

    it('must not use meta keywords if tags do not have slug', () => {
      const metaValue = metaValues({
        'page-type': pageType,
      });
      const content = {
        ...globalContentComplete,
        taxonomy: {
          tags: [
            { zapato: 'tag1' },
            { zapato: 'tag2' },
          ],
        },
      };
      const wrapper = wrapperGenerator(metaValue, content);
      expect(wrapper.find("meta[name='keywords']").length).toBe(0);
    });
  });
};

const urlTest = (pageType: string): void => {
  describe('when globalContent is provided', () => {
    const metaValue = metaValues({
      'page-type': pageType,
      title: 'the-sun',
    });
    const wrapper = wrapperGenerator(metaValue, globalContentComplete);

    it('should have a og:url', () => {
      expect(wrapper.find("meta[property='og:url']").prop('content')).toEqual('http://example.com/url/to/story/');
    });
  });
};

const noGlobalContent = (pageType: string): void => {
  const metaValue = metaValues({
    'page-type': pageType,
  });
  const wrapper = wrapperGenerator(metaValue, null);

  it('should have a title tag', () => {
    expect(wrapper.find('title').childAt(0).text()).toEqual(websiteName);
  });

  it('should not have a description meta tag', () => {
    expect(wrapper.find("meta[name='description']").length).toBe(0);
  });

  it('should not have a twitter:description meta tag', () => {
    expect(wrapper.find("meta[name='twitter:description']").length).toBe(0);
  });

  it('should not have a og:description meta tag', () => {
    expect(wrapper.find("meta[property='og:description']").length).toBe(0);
  });

  it('should not have a keywords meta tag', () => {
    expect(wrapper.find("meta[name='keywords']").length).toBe(0);
  });

  it('should have a og:title meta tag', () => {
    expect(wrapper.find("meta[property='og:title']").prop('content')).toBe(websiteName);
  });

  it('should have a twitter:title meta tag', () => {
    expect(wrapper.find("meta[name='twitter:title']").prop('content')).toBe(websiteName);
  });

  it('should not have an og:image meta tag', () => {
    expect(wrapper.find("meta[property='og:image']").length).toBe(0);
  });

  it('should not have an og:image:alt meta tag', () => {
    expect(wrapper.find("meta[property='og:image:alt']").length).toBe(0);
  });
};

describe('the meta data ', () => {
  describe('when a article page type is provided', () => {
    describe('when globalContent is provided', () => {
      titleTest('article');
      descriptionTest('article');
      ogTitleTest('article');
      ogImageTest('article');
      ogImageAltTest('article');
      twitterTitleTest('article');
      twitterImageTest('article');
      keywordsTest('article');
      urlTest('article');

      it('should have robots noarchive', () => {
        const metaValue = metaValues({
          'page-type': 'article',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='robots']").prop('content')).toEqual('noarchive');
      });

      it('should have og:type', () => {
        const metaValue = metaValues({
          'page-type': 'article',
          title: 'the-sun',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);

        expect(wrapper.find("meta[property='og:type']").props().content).toBe('article');
      });
    });

    describe('when globalContent is not provided', () => {
      noGlobalContent('article');

      it('should have robots noarchive', () => {
        const metaValue = metaValues({
          'page-type': 'article',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='robots']").prop('content')).toEqual('noarchive');
      });

      it('should have og:type', () => {
        const metaValue = metaValues({
          'page-type': 'article',
          title: 'the-sun',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);

        expect(wrapper.find("meta[property='og:type']").props().content).toBe('article');
      });
    });
  });

  describe('when a video page type is provided', () => {
    describe('when global content is provided', () => {
      titleTest('video');
      descriptionTest('video');
      ogTitleTest('video');
      ogImageTest('video');
      ogImageAltTest('video');
      twitterTitleTest('video');
      twitterImageTest('video');
      keywordsTest('video');

      it('should not have a robots meta tag', () => {
        const metaValue = metaValues({
          'page-type': 'video',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });

      it('should not have og:type', () => {
        const metaValue = metaValues({
          'page-type': 'video',
          title: 'the-sun',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);

        expect(wrapper.find("meta[property='og:type']").length).toBe(0);
      });
    });

    describe('when global content is not provided', () => {
      noGlobalContent('video');

      it('should not have a robots meta tag', () => {
        const metaValue = metaValues({
          'page-type': 'video',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });

      it('should not have og:type', () => {
        const metaValue = metaValues({
          'page-type': 'video',
          title: 'the-sun',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);

        expect(wrapper.find("meta[property='og:type']").length).toBe(0);
      });
    });
  });

  describe('when a gallery page type is provided', () => {
    describe('when global content is provided', () => {
      titleTest('gallery');
      descriptionTest('gallery');
      ogTitleTest('gallery');
      ogImageTest('gallery');
      ogImageAltTest('gallery');
      twitterTitleTest('gallery');
      twitterImageTest('gallery');
      keywordsTest('gallery');

      it('should not have a robots meta tag', () => {
        const metaValue = metaValues({
          'page-type': 'gallery',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });

      it('should not have og:type', () => {
        const metaValue = metaValues({
          'page-type': 'gallery',
          title: 'the-sun',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);

        expect(wrapper.find("meta[property='og:type']").length).toBe(0);
      });
    });

    describe('when global content is not provided', () => {
      noGlobalContent('gallery');

      it('should not have a robots meta tag', () => {
        const metaValue = metaValues({
          'page-type': 'gallery',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });

      it('should not have og:type', () => {
        const metaValue = metaValues({
          'page-type': 'gallery',
          title: 'the-sun',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);

        expect(wrapper.find("meta[property='og:type']").length).toBe(0);
      });
    });
  });

  describe('when an author page type is provided', () => {
    describe('when global content is provided', () => {
      it('should use metaValue first if exists for description', () => {
        const metaValue = metaValues({
          'page-type': 'author',
          description: 'author meta value bio',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='description']").props().content).toBe(metaValue('description'));
      });

      it('should use authors.bio if exists for description', () => {
        const metaValue = metaValues({
          'page-type': 'author',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='description']").props().content).toBe(globalContentComplete.authors[0].bio);
      });

      it('should use metaValue og:title for title', () => {
        const metaValue = metaValues({
          'page-type': 'author',
          'og:title': 'meta value title',
        });

        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find('title').childAt(0).text(),
        ).toEqual(
          `${metaValue('og:title')} - ${websiteName}`,
        );
        expect(
          wrapper.find("meta[property='og:title']").prop('content'),
        ).toBe(
          `${metaValue('og:title')} - ${websiteName}`,
        );
      });

      it('should use authors.byline for title if exists', () => {
        const metaValue = metaValues({
          'page-type': 'author',
        });

        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find('title').childAt(0).text(),
        ).toEqual(
          `${globalContentComplete.authors[0].byline} - ${websiteName}`,
        );
        expect(
          wrapper.find("meta[property='og:title']").prop('content'),
        ).toBe(
          `${globalContentComplete.authors[0].byline} - ${websiteName}`,
        );
      });

      it('should have an author twitter:title meta tag', () => {
        const metaValue = metaValues({
          'page-type': 'author',
          twitterTitle: 'meta value title',
        });

        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find("meta[name='twitter:title']").prop('content'),
        ).toBe(
          `${metaValue('twitterTitle')} - ${websiteName}`,
        );
      });

      it('should use authors.byline if twitterTitle not found', () => {
        const metaValue = metaValues({
          'page-type': 'author',
        });

        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find("meta[name='twitter:title']").prop('content'),
        ).toBe(
          `${globalContentComplete.authors[0].byline} - ${websiteName}`,
        );
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = metaValues({
        'page-type': 'author',
      });
      const wrapper = wrapperGenerator(metaValue, null);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual(websiteName);
        expect(wrapper.find("meta[property='og:title']").prop('content')).toEqual(websiteName);
        expect(wrapper.find("meta[name='twitter:title']").prop('content')).toEqual(websiteName);
      });

      it('should not have description', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });
    });
  });

  describe('when a tag page type is provided', () => {
    describe('when global content is provided', () => {
      it('should use metaValue first if exists for description', () => {
        const metaValue = metaValues({
          'page-type': 'tag',
          description: 'tag meta valu',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='description']").prop('content')).toBe(metaValue('description'));
      });

      it('should use Payload.description if exists for description', () => {
        const metaValue = metaValues({
          'page-type': 'tag',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='description']").prop('content')).toBe(globalContentComplete.Payload[0].description);
      });

      it('should use metaValue og:title for title', () => {
        const metaValue = metaValues({
          'page-type': 'tag',
          'og:title': 'meta value title',
        });

        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find('title').childAt(0).text(),
        ).toEqual(
          `${metaValue('og:title')} - ${websiteName}`,
        );
        expect(
          wrapper.find("meta[property='og:title']").prop('content'),
        ).toBe(
          `${metaValue('og:title')} - ${websiteName}`,
        );
      });

      it('should have an author twitter:title meta tag', () => {
        const metaValue = metaValues({
          'page-type': 'tag',
          twitterTitle: 'meta value title',
        });

        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find("meta[name='twitter:title']").prop('content'),
        ).toBe(
          `${metaValue('twitterTitle')} - ${websiteName}`,
        );
      });

      it('should use Payload.name for title if exists', () => {
        const metaValue = metaValues({
          'page-type': 'tag',
        });

        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find('title').childAt(0).text(),
        ).toEqual(
          `${globalContentComplete.Payload[0].name} - ${websiteName}`,
        );
        expect(
          wrapper.find("meta[property='og:title']").prop('content'),
        ).toBe(
          `${globalContentComplete.Payload[0].name} - ${websiteName}`,
        );
      });

      it('should have an author twitter:title meta tag', () => {
        const metaValue = metaValues({
          'page-type': 'tag',
          twitterTitle: 'meta value title',
        });

        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find("meta[name='twitter:title']").prop('content'),
        ).toBe(
          `${metaValue('twitterTitle')} - ${websiteName}`,
        );
      });

      it('should use authors.byline if twitterTitle not found', () => {
        const metaValue = metaValues({
          'page-type': 'tag',
        });

        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find("meta[name='twitter:title']").prop('content'),
        ).toBe(
          `${globalContentComplete.Payload[0].name} - ${websiteName}`,
        );
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = metaValues({
        'page-type': 'tag',
      });
      const wrapper = wrapperGenerator(metaValue, null);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual(websiteName);
        expect(wrapper.find("meta[property='og:title']").prop('content')).toEqual(websiteName);
        expect(wrapper.find("meta[name='twitter:title']").prop('content')).toEqual(websiteName);
      });

      it('should not have description', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });
    });
  });

  describe('when a section page type is provided', () => {
    describe('when global content is provided', () => {
      it('should use metaValue first if exists for description', () => {
        const metaValue = metaValues({
          'page-type': 'section',
          description: 'section meta valu',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='description']").prop('content')).toBe(metaValue('description'));
      });

      it('should use metadata_description if exists for description', () => {
        const metaValue = metaValues({
          'page-type': 'section',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(wrapper.find("meta[name='description']").prop('content')).toBe(globalContentComplete.metadata.metadata_description);
      });

      describe('title handling', () => {
        it('should use metaValue title for title', () => {
          const metaValue = metaValues({
            'page-type': 'section',
            title: 'meta value title',
          });

          const wrapper = wrapperGenerator(metaValue, globalContentComplete);
          expect(
            wrapper.find('title').childAt(0).text(),
          ).toEqual(
            metaValue('title'),
          );
        });

        it('should use metadata_title if title not found', () => {
          const metaValue = metaValues({
            'page-type': 'section',
          });

          const wrapper = wrapperGenerator(metaValue, globalContentComplete);
          expect(
            wrapper.find('title').childAt(0).text(),
          ).toBe(
            globalContentComplete.metadata.metadata_title,
          );
        });

        it('should use gc.name if metadata_title and title are missing', () => {
          const metaValue = metaValues({
            'page-type': 'section',
          });
          const content = {
            ...globalContentComplete,
            metadata: {},
          };

          const wrapper = wrapperGenerator(metaValue, content);
          expect(
            wrapper.find('title').childAt(0).text(),
          ).toEqual(
            `${content.name} - ${websiteName}`,
          );
        });

        it('should use og:title if metadata_title, title and gc.name are missing', () => {
          const metaValue = metaValues({
            'page-type': 'section',
            'og:title': 'meta value og:title',
          });
          const content = {
            ...globalContentComplete,
            name: null,
            metadata: {},
          };

          const wrapper = wrapperGenerator(metaValue, content);
          expect(
            wrapper.find('title').childAt(0).text(),
          ).toEqual(
            `${metaValue('og:title')} - ${websiteName}`,
          );
        });
      });

      it('should use og:title', () => {
        const metaValue = metaValues({
          'page-type': 'section',
          'og:title': 'meta value og:title',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find("meta[property='og:title']").prop('content'),
        ).toBe(
          `${metaValue('og:title')} - ${websiteName}`,
        );
      });

      it('should use gc.name if og:title missing', () => {
        const metaValue = metaValues({
          'page-type': 'section',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find("meta[property='og:title']").prop('content'),
        ).toBe(
          `${globalContentComplete.name} - ${websiteName}`,
        );
      });

      it('should use websiteName if gc.name and og:title are missing', () => {
        const metaValue = metaValues({
          'page-type': 'section',
        });
        const content = {
          ...globalContentComplete,
          name: null,
        };
        const wrapper = wrapperGenerator(metaValue, content);
        expect(
          wrapper.find("meta[property='og:title']").prop('content'),
        ).toBe(
          websiteName,
        );
      });

      it('should use twitterTitle', () => {
        const metaValue = metaValues({
          'page-type': 'section',
          twitterTitle: 'meta value twitterTitle',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find("meta[name='twitter:title']").prop('content'),
        ).toBe(
          `${metaValue('twitterTitle')} - ${websiteName}`,
        );
      });

      it('should use gc.name if twitterTitle is missing', () => {
        const metaValue = metaValues({
          'page-type': 'section',
        });
        const wrapper = wrapperGenerator(metaValue, globalContentComplete);
        expect(
          wrapper.find("meta[name='twitter:title']").prop('content'),
        ).toBe(
          `${globalContentComplete.name} - ${websiteName}`,
        );
      });

      it('should use websiteName if twitterTitle is missing', () => {
        const metaValue = metaValues({
          'page-type': 'section',
        });
        const content = {
          ...globalContentComplete,
          name: null,
        };
        const wrapper = wrapperGenerator(metaValue, content);
        expect(
          wrapper.find("meta[name='twitter:title']").prop('content'),
        ).toBe(
          websiteName,
        );
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = metaValues({
        'page-type': 'section',
      });
      const wrapper = wrapperGenerator(metaValue, null);

      it('should use websiteName as title', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual(websiteName);
      });

      it('should not have a section description meta tag', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });

      it('should use websiteName as og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").prop('content')).toBe(websiteName);
      });

      it('should use websiteName as twitter:title meta tag', () => {
        expect(wrapper.find("meta[name='twitter:title']").prop('content')).toBe(websiteName);
      });
    });
  });

  describe('when a search page type is provided', () => {
    it('should use websiteName as title', () => {
      const metaValue = metaValues({
        'page-type': 'search',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(wrapper.find('title').childAt(0).text()).toEqual(`Search - ${websiteName}`);
    });

    it('should use websiteName as og:title', () => {
      const metaValue = metaValues({
        'page-type': 'search',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(
        wrapper.find("meta[property='og:title']").prop('content'),
      ).toBe(`Search - ${websiteName}`);
    });

    it('should use websiteName as twitter:title', () => {
      const metaValue = metaValues({
        'page-type': 'search',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expect(
        wrapper.find("meta[name='twitter:title']").prop('content'),
      ).toBe(`Search - ${websiteName}`);
    });
  });

  describe('twitter meta', () => {
    const metaValue = metaValues({
      'page-type': 'article',
      title: 'the-sun',
    });

    it('should have twitter tags', () => {
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      expectTwitterMeta(wrapper);
    });

    it('must not have an empty twitter:site metatag if twitterUsername missing', () => {
      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContentComplete}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      expectTwitterMetaMissing(wrapper);
    });

    it('must not have an empty twitter:site metatag if twitterUsername empty', () => {
      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContentComplete}
        twitterUsername=""
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      expectTwitterMetaMissing(wrapper);
    });
  });

  describe('facebook article meta', () => {
    it('articles pages must have og:type = article', () => {
      const metaValue = metaValues({
        'page-type': 'article',
        title: 'the-sun',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);

      expect(wrapper.find("meta[property='og:type']").props().content).toBe('article');
    });

    it('no articles pages must not have og:type = article', () => {
      const metaValue = metaValues({
        'page-type': 'video',
        title: 'the-sun',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);

      expect(wrapper.find("meta[property='og:type']").length).toBe(0);
    });
  });

  describe('all pages tags', () => {
    it('all pages must have this social tags', () => {
      const metaValue = metaValues({
        'page-type': 'all-pages',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);

      expect(wrapper.find("meta[property='og:site_name']").prop('content')).toEqual(websiteName);
      expect(wrapper.find("meta[name='twitter:site']").prop('content')).toEqual(`@${twitterUsername}`);
      expect(wrapper.find("meta[name='twitter:card']").prop('content')).toEqual('summary_large_image');
      expect(wrapper.find("meta[property='fb:admins']").prop('content')).toEqual(facebookAdmins);
    });

    it('must have the og:url if can build the page url', () => {
      const metaValue = metaValues({
        'page-type': 'all-pages',
      });
      const wrapper = wrapperGenerator(metaValue, globalContentComplete);
      const url = `${websiteDomain}${globalContentComplete.websites[arcSite].website_url}`;

      expect(wrapper.find("meta[property='og:url']").prop('content')).toEqual(url);
    });
  });

  describe('all pages tags without globalContent', () => {
    it('all pages must have this social tags', () => {
      const metaValue = metaValues({
        'page-type': 'all-pages',
      });
      const wrapper = wrapperGenerator(metaValue, null);

      expect(wrapper.find("meta[property='og:site_name']").prop('content')).toEqual(websiteName);
      expect(wrapper.find("meta[name='twitter:site']").prop('content')).toEqual(`@${twitterUsername}`);
      expect(wrapper.find("meta[name='twitter:card']").prop('content')).toEqual('summary_large_image');
      expect(wrapper.find("meta[property='fb:admins']").prop('content')).toEqual(facebookAdmins);
    });

    it('must not have og:url if not has globalContent', () => {
      const metaValue = metaValues({
        'page-type': 'all-pages',
      });
      const wrapper = wrapperGenerator(metaValue, null);

      expect(wrapper.find("meta[property='og:url']").length).toBe(0);
    });

    it('must not have og:url if can not build the url', () => {
      const metaValue = metaValues({
        'page-type': 'all-pages',
      });
      const localContent = {
        ...globalContentComplete,
        websites: {},
      };
      const wrapper = wrapperGenerator(metaValue, localContent);
      expect(wrapper.find("meta[property='og:url']").length).toBe(0);
    });
  });

  describe('when page type is not provided', () => {
    describe('must reder default meta tags', () => {
      noGlobalContent('');
    });
  });
});
