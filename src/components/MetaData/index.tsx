import React, { ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';

interface CustomMetaData {
  metaName: string;
  metaValue: string;
}

const getCustomMetaData = (metaHTMLString: string): Array<CustomMetaData> => {
  let customMetaData = null;
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const DomParser = require('dom-parser');
    customMetaData = new DomParser().parseFromString(metaHTMLString)
      .getElementsByTagName('META')
      .map((metaNode) => ({
        metaName: metaNode.getAttribute('name'),
        metaValue: (metaNode.getAttribute('value') || metaNode.getAttribute('content')),
      }));
  }
  return customMetaData;
};

const generateCustomMetaTags = (metaData, MetaTag, MetaTags): ReactElement => {
  const metaHTMLString = ReactDOMServer.renderToString(<MetaTags />);
  const customMetaData = getCustomMetaData(metaHTMLString)
    .filter((metaObj) => !metaData[metaObj.metaName]);
  return (
    <>
      {customMetaData.length > 0 && customMetaData.map((metaObj, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <MetaTag key={`custom-meta-data-${i}`} name={metaObj.metaName} default={metaObj.metaValue} />
      ))}
    </>
  );
};

interface Props {
  MetaTag: Function;
  MetaTags: Function;
  metaValue: Function;
  globalContent?: {
    description?: {
      basic?: string;
    };
    headlines?: {
      basic?: string;
    };
    taxonomy?: {
      seo_keywords?: Array<string>;
      tags?: Array<{
          slug?: string;
      }>;
    };
    authors?: Array<{
      bio?: string;
      byline?: string;
    }>;
    Payload?: Array<{
      description?: string;
      name?: string;
    }>;
    metadata?: {
      metadata_description?: string;
      metadata_title?: string;
    };
    name?: string;
  } | null;
  websiteName?: string | null;
  twitterSite?: string | null;
}

const MetaData: React.FC<Props> = ({
  MetaTag, MetaTags, metaValue, globalContent: gc, websiteName, twitterSite,
}) => {
  const pageType = metaValue('page-type') || '';

  let storyMetaDataTags = null;
  let tagMetaDataTags = null;
  let authorMetaDataTags = null;
  let searchMetaDataTags = null;
  let sectionMetaDataTags = null;

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const { getImgURL, getImgAlt } = require('./promoImageHelper');
  const metaData = {
    description: null,
    keywords: null,
    ogImage: null,
    ogImageAlt: null,
    'page-type': pageType,
    title: websiteName,
    ogTitle: websiteName,
    ogSiteName: websiteName,
    twitterSite: twitterSite ? `@${twitterSite}` : null,
    twitterCard: 'summary_large_image',
  };

  if (pageType === 'article' || pageType === 'video' || pageType === 'gallery') {
    if (typeof window === 'undefined') {
      let description = null;
      let headline = null;

      if (gc && gc.description && gc.headlines) {
        description = gc.description.basic;
        headline = gc.headlines.basic;
      }
      if (metaValue('title')) {
        metaData.title = `${metaValue('title')} – ${websiteName}`;
      } else if (headline) {
        metaData.title = `${headline} – ${websiteName}`;
      } else {
        metaData.title = websiteName;
      }
      metaData.description = metaValue('description') || description || null;
      metaData.ogTitle = metaValue('og:title') || headline || websiteName;
      metaData.ogImage = getImgURL(metaValue, 'og:image', gc);
      metaData.ogImageAlt = getImgAlt(metaValue, 'og:image:alt', gc);

      // Keywords could be comma delimited string or array of string or an array of objects
      if (metaValue('keywords')) {
        metaData.keywords = metaValue('keywords');
      } else if (gc && gc.taxonomy && gc.taxonomy.seo_keywords) {
        if (typeof gc.taxonomy.seo_keywords !== 'undefined') {
          metaData.keywords = gc.taxonomy.seo_keywords.join(',');
        }
      } else if (gc && gc.taxonomy && gc.taxonomy.tags) {
        if (typeof gc.taxonomy.tags !== 'undefined' && gc.taxonomy.tags.length) {
          metaData.keywords = [];
          gc.taxonomy.tags.forEach((item) => {
            if (item.slug) metaData.keywords.push(item.slug);
          });
        }
      } else {
        metaData.keywords = null;
      }

      storyMetaDataTags = (
        <>
          {
            metaData.description
            && <meta name="description" content={metaData.description} />
          }
          {
            metaData.keywords
            && <meta name="keywords" content={metaData.keywords} />
          }

          <meta property="og:title" content={metaData.ogTitle} />

          {
            metaData.ogImage
            && <meta property="og:image" content={metaData.ogImage} />
          }
          {
            metaData.ogImageAlt
            && <meta property="og:image:alt" content={metaData.ogImageAlt} />
          }
          {
            pageType === 'article' && (
              <meta name="robots" content="noarchive" />
            )
          }
        </>
      );
    }
  } else if (pageType === 'author') {
    const author = (gc && gc.authors && gc.authors.length) ? gc.authors[0] : {};
    metaData.description = metaValue('description') || author.bio || null;
    metaData.ogTitle = metaValue('og:title') || author.byline || '';
    if (metaData.ogTitle === '') {
      metaData.title = websiteName;
      metaData.ogTitle = websiteName;
    } else {
      metaData.title = `${metaData.ogTitle} - ${websiteName}`;
      metaData.ogTitle = `${metaData.ogTitle} - ${websiteName}`;
    }

    authorMetaDataTags = (
      <>
        {
          metaData.description
          && <meta name="description" content={metaData.description} />
        }
        <meta property="og:title" content={metaData.ogTitle} />
      </>
    );
  } else if (pageType === 'search') {
    metaData.title = `Search - ${websiteName}`;
    metaData.ogTitle = `Search - ${websiteName}`;

    searchMetaDataTags = (
      <>
        <meta property="og:title" content={metaData.ogTitle} />
      </>
    );
  } else if (pageType === 'tag') {
    const payload = (gc && gc.Payload && gc.Payload.length) ? gc.Payload[0] : {};
    metaData.description = metaValue('description') || payload.description || null;
    metaData.ogTitle = metaValue('og:title') || payload.name || '';
    if (metaData.ogTitle === '') {
      metaData.title = websiteName;
      metaData.ogTitle = websiteName;
    } else {
      metaData.title = `${metaData.ogTitle} - ${websiteName}`;
      metaData.ogTitle = `${metaData.ogTitle} - ${websiteName}`;
    }

    tagMetaDataTags = (
      <>
        {
          metaData.description
          && <meta name="description" content={metaData.description} />
        }
        <meta property="og:title" content={metaData.ogTitle} />
      </>
    );
  } else if (pageType === 'section') {
    const payload = (gc && gc.name) ? gc : {};
    const gcMetadata = (gc && gc.metadata) ? gc.metadata : {};
    metaData.description = metaValue('description') || gcMetadata.metadata_description || null;
    metaData.ogTitle = metaValue('og:title') || payload.name || '';
    metaData.title = metaValue('title') || gcMetadata.metadata_title || payload.name || '';
    if (metaData.ogTitle === '') {
      metaData.ogTitle = websiteName;
    } else {
      metaData.ogTitle = `${metaData.ogTitle} - ${websiteName}`;
    }
    if (metaData.title === '') {
      metaData.title = metaData.ogTitle;
    } else if (metaData.title === payload.name) {
      metaData.title = `${metaData.title} - ${websiteName}`;
    }

    sectionMetaDataTags = (
      <>
        {
          metaData.description
          && <meta name="description" content={metaData.description} />
        }
        <meta property="og:title" content={metaData.ogTitle} />
      </>
    );
  }
  // Twitter meta tags go on all pages
  const twitterTags = (
    <>
      {
        metaData.ogSiteName
        && <meta property="og:site_name" content={metaData.ogSiteName} />
      }
      {
        metaData.twitterSite
        && <meta property="twitter:site" content={metaData.twitterSite} />
      }
      {
        metaData.twitterCard
        && <meta property="twitter:card" content={metaData.twitterCard} />
      }
    </>
  );

  const customMetaTags = generateCustomMetaTags(metaData, MetaTag, MetaTags);

  return (
    <>
      <title>{metaData.title}</title>
      {storyMetaDataTags}
      {tagMetaDataTags}
      {sectionMetaDataTags}
      {authorMetaDataTags}
      {searchMetaDataTags}
      {customMetaTags}
      {twitterTags}
    </>
  );
};

MetaData.propTypes = {
  /** The MetaTag function that is passed into an output type */
  MetaTag: PropTypes.func,
  /** The MetaTags function that is passed into an output type */
  MetaTags: PropTypes.func,
  /** The metaValue function that is passed into an output type */
  metaValue: PropTypes.func,
  /** The globalContent object that is obtained from the useFusionContext() in the fusion:context module */
  globalContent: {
    description: {
      basic: PropTypes.string,
    },
    headlines: {
      basic: PropTypes.string,
    },
    taxonomy: {
      seo_keywords: PropTypes.array,
      tags: PropTypes.array,
    },
    authors: PropTypes.array,
    Payload: PropTypes.array,
    metadata: {
      metadata_description: PropTypes.string,
      metadata_title: PropTypes.string,
    },
    name: PropTypes.string,
  },
  /** The name of the website */
  websiteName: PropTypes.string,
  /** The corresponding twitter site name */
  twitterSite: PropTypes.string,
};

export default MetaData;
