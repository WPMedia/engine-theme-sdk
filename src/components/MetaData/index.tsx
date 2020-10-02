/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';

interface CustomMetaData {
  metaName: string;
  metaValue: string;
}

interface GlobalContentBag {
  [x: string]: unknown;
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

const generateUrl = (arcSite: string, websiteDomain: string, gc: GlobalContentBag): string => {
  const siteData = gc && gc.websites && gc.websites[arcSite];
  if (!siteData) {
    return null;
  }
  return `${websiteDomain}${siteData.website_url}`;
};

interface Props {
  MetaTag: Function;
  MetaTags: Function;
  metaValue: Function;
  globalContent?: {
    name?: string;
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
  } | null;
  websiteName?: string | null;
  websiteDomain?: string | null;
  twitterUsername?: string | null;
  resizerURL?: string | null;
  arcSite?: string | null;
  facebookAdmins?: string | null;
}

const MetaData: React.FC<Props> = ({
  MetaTag,
  MetaTags,
  metaValue,
  globalContent: gc,
  websiteName,
  websiteDomain,
  twitterUsername,
  resizerURL,
  arcSite,
  facebookAdmins,
}) => {
  const pageType = metaValue('page-type');

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
    url: generateUrl(arcSite, websiteDomain, gc),
    'page-type': pageType,
    title: websiteName,
    ogTitle: websiteName,
    ogSiteName: websiteName,
    twitterUsername: twitterUsername ? `@${twitterUsername}` : null,
    twitterCard: 'summary_large_image',
    twitterTitle: websiteName,
    twitterImage: null,
  };

  if (pageType === 'article' || pageType === 'video' || pageType === 'gallery') {
    if (typeof window === 'undefined') {
      const description = gc && gc.description && gc.description.basic;
      const headline = gc && gc.headlines && gc.headlines.basic;

      if (metaValue('title')) {
        metaData.title = `${metaValue('title')} – ${websiteName}`;
      } else if (headline) {
        metaData.title = `${headline} – ${websiteName}`;
      } else {
        metaData.title = websiteName;
      }
      metaData.description = metaValue('description') || description || null;
      metaData.ogTitle = metaValue('og:title') || headline || websiteName;
      metaData.ogImage = getImgURL(metaValue, 'og:image', gc, resizerURL);
      metaData.ogImageAlt = getImgAlt(metaValue, 'og:image:alt', gc);
      metaData.twitterTitle = metaValue('twitterTitle') || headline || websiteName;
      metaData.twitterImage = getImgURL(metaValue, 'twitterImage', gc, resizerURL);

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
          metaData.keywords = metaData.keywords.join(',');
        }
      } else {
        metaData.keywords = null;
      }

      storyMetaDataTags = (
        <>
          {
            metaData.description && (
              <>
                <meta name="description" content={metaData.description} />
                <meta name="twitter:description" content={metaData.description} />
                <meta property="og:description" content={metaData.description} />
              </>
            )
          }
          {
            metaData.keywords
            && <meta name="keywords" content={metaData.keywords} />
          }

          <meta property="og:title" content={metaData.ogTitle} />
          <meta name="twitter:title" content={metaData.twitterTitle} />

          {
            metaData.ogImage
            && <meta property="og:image" content={metaData.ogImage} />
          }
          {
            metaData.twitterImage
            && <meta name="twitter:image" content={metaData.twitterImage} />
          }
          {
            metaData.ogImageAlt
            && <meta property="og:image:alt" content={metaData.ogImageAlt} />
          }
          {
            pageType === 'article' && (
              <>
                <meta property="og:type" content="article" />
                <meta name="robots" content="noarchive" />
              </>
            )
          }
        </>
      );
    }
  } else if (pageType === 'author') {
    const author = (gc && gc.authors && gc.authors.length) ? gc.authors[0] : {};
    metaData.description = metaValue('description') || author.bio || null;
    metaData.ogTitle = metaValue('og:title') || author.byline || '';
    metaData.twitterTitle = metaValue('twitterTitle') || author.byline || '';

    if (metaData.ogTitle === '') {
      metaData.title = websiteName;
      metaData.ogTitle = websiteName;
    } else {
      metaData.title = `${metaData.ogTitle} - ${websiteName}`;
      metaData.ogTitle = `${metaData.ogTitle} - ${websiteName}`;
    }

    if (metaData.twitterTitle === '') {
      metaData.twitterTitle = websiteName;
    } else {
      metaData.twitterTitle = `${metaData.twitterTitle} - ${websiteName}`;
    }

    authorMetaDataTags = (
      <>
        {
          metaData.description
          && <meta name="description" content={metaData.description} />
        }
        <meta property="og:title" content={metaData.ogTitle} />
        <meta name="twitter:title" content={metaData.twitterTitle} />
      </>
    );
  } else if (pageType === 'search') {
    metaData.title = `Search - ${websiteName}`;
    metaData.ogTitle = `Search - ${websiteName}`;

    searchMetaDataTags = (
      <>
        <meta property="og:title" content={metaData.ogTitle} />
        <meta name="twitter:title" content={metaData.ogTitle} />
      </>
    );
  } else if (pageType === 'tag') {
    const payload = (gc && gc.Payload && gc.Payload.length) ? gc.Payload[0] : {};
    metaData.description = metaValue('description') || payload.description || null;
    metaData.ogTitle = metaValue('og:title') || payload.name || '';
    metaData.twitterTitle = metaValue('twitterTitle') || payload.name || '';

    if (metaData.ogTitle === '') {
      metaData.title = websiteName;
      metaData.ogTitle = websiteName;
    } else {
      metaData.title = `${metaData.ogTitle} - ${websiteName}`;
      metaData.ogTitle = `${metaData.ogTitle} - ${websiteName}`;
    }

    if (metaData.twitterTitle === '') {
      metaData.twitterTitle = websiteName;
    } else {
      metaData.twitterTitle = `${metaData.twitterTitle} - ${websiteName}`;
    }

    tagMetaDataTags = (
      <>
        {
          metaData.description
          && <meta name="description" content={metaData.description} />
        }
        <meta property="og:title" content={metaData.ogTitle} />
        <meta name="twitter:title" content={metaData.twitterTitle} />
      </>
    );
  } else if (pageType === 'section') {
    const payload = (gc && gc.name) ? gc : {};
    const gcMetadata = (gc && gc.metadata) ? gc.metadata : {};
    metaData.description = metaValue('description') || gcMetadata.metadata_description || null;
    metaData.ogTitle = metaValue('og:title') || payload.name || '';
    metaData.title = metaValue('title') || gcMetadata.metadata_title || payload.name || '';
    metaData.twitterTitle = metaValue('twitterTitle') || payload.name || '';

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
    if (metaData.twitterTitle === '') {
      metaData.twitterTitle = websiteName;
    } else {
      metaData.twitterTitle = `${metaData.twitterTitle} - ${websiteName}`;
    }

    sectionMetaDataTags = (
      <>
        {
          metaData.description
          && <meta name="description" content={metaData.description} />
        }
        <meta property="og:title" content={metaData.ogTitle} />
        <meta name="twitter:title" content={metaData.twitterTitle} />
      </>
    );
  } else if (pageType === 'homepage') {
    homepageMetaDataTags = <meta property="og:title" content={metaData.ogTitle} />;
  } else {
    sectionMetaDataTags = (
      <>
        <meta property="og:title" content={metaData.title} />
        <meta name="twitter:title" content={metaData.title} />
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
        metaData.url
        && <meta property="og:url" content={metaData.url} />
      }
      {
        metaData.twitterUsername
        && <meta name="twitter:site" content={metaData.twitterUsername} />
      }
      {
        metaData.twitterCard
        && <meta name="twitter:card" content={metaData.twitterCard} />
      }
      {
        facebookAdmins
        && <meta property="fb:admins" content={facebookAdmins} />
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
  /**
   * The globalContent object that is obtained from the
   * useFusionContext() in the fusion:context module
   * */
  globalContent: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.shape({
      basic: PropTypes.string,
    }),
    headlines: PropTypes.shape({
      basic: PropTypes.string,
    }),
    taxonomy: PropTypes.shape({
      seo_keywords: PropTypes.array,
      tags: PropTypes.array,
    }),
    authors: PropTypes.array,
    Payload: PropTypes.array,
    metadata: PropTypes.shape({
      metadata_description: PropTypes.string,
      metadata_title: PropTypes.string,
    }),
  }),
  /** The name of the website */
  websiteName: PropTypes.string,
  /** The corresponding twitter site name */
  twitterUsername: PropTypes.string,
};

export default MetaData;
