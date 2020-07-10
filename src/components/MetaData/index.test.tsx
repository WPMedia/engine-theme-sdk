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

const websiteName = 'The Sun';
const twitterUsername = 'the-sun';
const resizerURL = 'https://fake.cdn.com/resizer';

const expectTwitterMeta = (wrapper: ShallowWrapper): void => {
  expect(wrapper.find("meta[property='twitter:site']").props().content).toBe(`@${twitterUsername}`);
  expect(wrapper.find("meta[property='twitter:card']").props().content).toBe('summary_large_image');
};

const expectTwitterMetaMissing = (wrapper: ShallowWrapper): void => {
  expect(wrapper.find("meta[property='twitter:site']").length).toBe(0);
  expect(wrapper.find("meta[property='twitter:card']").props().content).toBe('summary_large_image');
};

describe('the meta data ', () => {
  describe('if page type is article', () => {
    const metaValue = (prop: string): string | null => {
      if (prop === 'page-type') {
        return 'article';
      }
      if (prop === 'title') {
        return 'the-sun';
      }
      return null;
    };

    const useFusionContext = {
      globalContent: {
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
      },
      arcSite: 'the-sun',
    };
    const { globalContent } = useFusionContext;
    const wrapper = shallow(<MetaData
      metaValue={metaValue}
      MetaTag={jest.fn()}
      MetaTags={jest.fn()}
      globalContent={globalContent}
      twitterUsername={twitterUsername}
      websiteName={websiteName}
      resizerURL={resizerURL}
    />);

    it('should have a title', () => {
      expect(wrapper.find('title').length).toBe(1);
    });

    it('should have meta tags', () => {
      expect(wrapper.find('meta').length).toBe(9);
    });

  });

  describe('when a video page type is provided', () => {
    describe('when global content is provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'video';
        }
        return null;
      };

      const useFusionContext = {
        globalContent: {
          description: {
            basic: 'this is a video description',
          },
          headlines: {
            basic: 'this is a video headline',
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
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;
      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a video headline – The Sun');
      });

      it('should have a video description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a video description');
      });

      it('should have a video keywords meta tag', () => {
        expect(wrapper.find("meta[name='keywords']").props().content).toBe('keyword1,keyword2');
      });

      it('should have a video og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a video headline');
      });

      it('should have a video og:image meta tag', () => {
        expect(wrapper.find("meta[property='og:image']").props().content).toBe('https://fake.cdn.com/resizer/l_1yxKdAU0rtnyaww9LofnGAFkw=/1200x630/awesome-url');
      });

      it('should have a video og:image:alt meta tag', () => {
        expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('alt text');
      });

      it('should not have a robots meta tag', () => {
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'video';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: null,
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('The Sun');
      });

      it('should not have a video description meta tag', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });

      it('should not have a video keywords meta tag', () => {
        expect(wrapper.find("meta[name='keywords']").length).toBe(0);
      });

      it('should have a video og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('The Sun');
      });

      it('should have a video og:image meta tag', () => {
        expect(wrapper.find("meta[property='og:image']").length).toBe(0);
      });

      it('should not have a video og:image:alt meta tag', () => {
        expect(wrapper.find("meta[property='og:image:alt']").length).toBe(0);
      });

      it('should not have a robots meta tag', () => {
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });
    });

    describe('when custom tags are provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'video';
        }
        if (prop === 'description') {
          return 'this is a custom description';
        }
        if (prop === 'title') {
          return 'this is a custom title';
        }
        if (prop === 'og:title') {
          return 'this is a custom og:title';
        }
        if (prop === 'keywords') {
          return 'custom-keyword1,custom-keyword2';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: {
          description: {
            basic: 'this is a video description',
          },
          headlines: {
            basic: 'this is a video headline',
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
            },
          },
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);
      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a custom title – The Sun');
      });

      it('should not have a video description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a custom description');
      });

      it('should not have a video keywords meta tag', () => {
        expect(wrapper.find("meta[name='keywords']").props().content).toBe('custom-keyword1,custom-keyword2');
      });

      it('should have a video og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a custom og:title');
      });

      it('should have a video og:image meta tag', () => {
        expect(wrapper.find("meta[property='og:image']").length).toBe(0);
      });

      it('should not have a video og:image:alt meta tag', () => {
        expect(wrapper.find("meta[property='og:image:alt']").length).toBe(0);
      });

      it('should not have a robots meta tag', () => {
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });
    });
  });

  describe('when a gallery page type is provided', () => {
    describe('when global content is provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'gallery';
        }
        return null;
      };

      const useFusionContext = {
        globalContent: {
          description: {
            basic: 'this is a gallery description',
          },
          headlines: {
            basic: 'this is a gallery headline',
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
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;
      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a gallery headline – The Sun');
      });

      it('should have a gallery description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a gallery description');
      });

      it('should have a gallery keywords meta tag', () => {
        expect(wrapper.find("meta[name='keywords']").props().content).toBe('keyword1,keyword2');
      });

      it('should have a gallery og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a gallery headline');
      });

      it('should have a gallery og:image meta tag', () => {
        expect(wrapper.find("meta[property='og:image']").props().content).toBe('https://fake.cdn.com/resizer/l_1yxKdAU0rtnyaww9LofnGAFkw=/1200x630/awesome-url');
      });

      it('should have a gallery og:image:alt meta tag', () => {
        expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('alt text');
      });

      it('should not have a robots meta tag', () => {
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'gallery';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: null,
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('The Sun');
      });

      it('should have a gallery description meta tag', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });

      it('should have a gallery keywords meta tag', () => {
        expect(wrapper.find("meta[name='keywords']").length).toBe(0);
      });

      it('should have a gallery og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('The Sun');
      });

      it('should have a gallery og:image meta tag', () => {
        expect(wrapper.find("meta[property='og:image']").length).toBe(0);
      });

      it('should have a gallery og:image:alt meta tag', () => {
        expect(wrapper.find("meta[property='og:image:alt']").length).toBe(0);
      });

      it('should not have a robots meta tag', () => {
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });
    });

    describe('when custom tags are provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'gallery';
        }
        if (prop === 'description') {
          return 'this is a custom description';
        }
        if (prop === 'title') {
          return 'this is a custom title';
        }
        if (prop === 'og:title') {
          return 'this is a custom og:title';
        }
        if (prop === 'keywords') {
          return 'custom-keyword1,custom-keyword2';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: {
          description: {
            basic: 'this is a gallery description',
          },
          headlines: {
            basic: 'this is a gallery headline',
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
          },
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a custom title – The Sun');
      });

      it('should have a gallery description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a custom description');
      });

      it('should have a gallery keywords meta tag', () => {
        expect(wrapper.find("meta[name='keywords']").props().content).toBe('custom-keyword1,custom-keyword2');
      });

      it('should have a gallery og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a custom og:title');
      });

      it('should have a gallery og:image meta tag', () => {
        expect(wrapper.find("meta[property='og:image']").length).toBe(0);
      });

      it('should have a gallery og:image:alt meta tag', () => {
        expect(wrapper.find("meta[property='og:image:alt']").length).toBe(0);
      });

      it('should not have a robots meta tag', () => {
        expect(wrapper.find("meta[name='robots']").length).toBe(0);
      });
    });
  });

  describe('when an author page type is provided', () => {
    describe('when global content is provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'author';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: {
          authors: [
            {
              byline: 'John Doe',
              bio: 'John Doe is an author',
            },
          ],
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;
      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('John Doe - The Sun');
      });

      it('should have an author description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('John Doe is an author');
      });

      it('should have an author og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('John Doe - The Sun');
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'author';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: null,
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('The Sun');
      });

      it('should have an author og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('The Sun');
      });
    });

    describe('when custom tags are provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'author';
        }
        if (prop === 'description') {
          return 'this is a custom description';
        }
        if (prop === 'og:title') {
          return 'this is a custom og:title';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: {
          authors: [
            {
              byline: 'John Doe',
              bio: 'John Doe is an author',
            },
          ],
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a custom og:title - The Sun');
      });

      it('should have an author description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a custom description');
      });

      it('should have an author og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a custom og:title - The Sun');
      });
    });
  });

  describe('when a tag page type is provided', () => {
    describe('when global content is provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'tag';
        }
        return null;
      };

      const useFusionContext = {
        globalContent: {
          Payload: [
            {
              description: 'this is a tag description',
              name: 'tag name',
            },
          ],
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;
      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('tag name - The Sun');
      });

      it('should have a tag description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a tag description');
      });

      it('should have a tag og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('tag name - The Sun');
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'tag';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: null,
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('The Sun');
      });

      it('should not have a tag description meta tag', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });

      it('should have a tag og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('The Sun');
      });
    });

    describe('when custom tags are provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'tag';
        }
        if (prop === 'description') {
          return 'this is a custom description';
        }
        if (prop === 'og:title') {
          return 'this is a custom og:title';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: {
          Payload: [
            {
              description: 'this is a tag description',
              name: 'tag name',
            },
          ],
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a custom og:title - The Sun');
      });

      it('should have a tag description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a custom description');
      });

      it('should have a tag og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a custom og:title - The Sun');
      });
    });
  });

  describe('when a section page type is provided', () => {
    describe('when global content is provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'section';
        }
        return null;
      };

      const useFusionContext = {
        globalContent: {
          name: 'Entertainment',
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;
      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('Entertainment - The Sun');
      });

      it('should not have a section description meta tag', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });

      it('should have a section og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('Entertainment - The Sun');
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'section';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: null,
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('The Sun');
      });

      it('should not have a section description meta tag', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });

      it('should have a section og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('The Sun');
      });
    });

    describe('when custom tags are provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'section';
        }
        if (prop === 'description') {
          return 'this is a custom description';
        }
        if (prop === 'og:title') {
          return 'this is a custom og:title';
        }
        if (prop === 'title') {
          return 'this is a custom title';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: {
          metadata: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            metadata_title: 'This is a metadata title',
            // eslint-disable-next-line @typescript-eslint/camelcase
            metadata_description: 'This is a metadata description',
          },
          name: 'Entertainment',
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a custom title');
      });

      it('should have a tag description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a custom description');
      });

      it('should have a tag og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a custom og:title - The Sun');
      });
    });

    describe('when metadata fields in global content are provided', () => {
      const metaValue = (prop: string): string | null => {
        if (prop === 'page-type') {
          return 'section';
        }
        return null;
      };
      const useFusionContext = {
        globalContent: {
          metadata: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            metadata_title: 'This is a metadata title',
            // eslint-disable-next-line @typescript-eslint/camelcase
            metadata_description: 'This is a metadata description',
          },
          name: 'Entertainment',
        },
        arcSite: 'the-sun',
      };
      const { globalContent } = useFusionContext;

      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('This is a metadata title');
      });

      it('should have a tag description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('This is a metadata description');
      });

      it('should have a tag og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('Entertainment - The Sun');
      });
    });
  });

  describe('twitter meta', () => {
    const metaValue = (prop: string): string | null => {
      if (prop === 'page-type') {
        return 'article';
      }
      if (prop === 'title') {
        return 'the-sun';
      }
      return null;
    };

    const useFusionContext = {
      globalContent: {
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
      },
      arcSite: 'the-sun',
    };
    const { globalContent } = useFusionContext;

    it('should have twitter tags', () => {
      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
        twitterUsername={twitterUsername}
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      expectTwitterMeta(wrapper);
    });

    it('must not have an empty twitter:site metatag if twitterUsername missing', () => {
      const wrapper = shallow(<MetaData
        metaValue={metaValue}
        MetaTag={jest.fn()}
        MetaTags={jest.fn()}
        globalContent={globalContent}
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
        globalContent={globalContent}
        twitterUsername=""
        websiteName={websiteName}
        resizerURL={resizerURL}
      />);

      expectTwitterMetaMissing(wrapper);
    });
  });
});
