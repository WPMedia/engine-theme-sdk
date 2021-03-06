/* eslint-disable react/forbid-prop-types */
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

const normalizeFallbackImage = (websiteDomain: string, url: string): string | null => {
  if (!url) {
    return null;
  }
  if (!url.startsWith('http')) {
    const tmp = `${websiteDomain}¬${url}`;
    return tmp.replace(/\/?¬\/?/, '/');
  }
  return url;
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
      image?: string | {
        url?: string;
        alt_text?: string;
      };
      name?: string;
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
  fallbackImage?: string | null;
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
  fallbackImage,
}) => {
  const pageType = metaValue('page-type');

  let storyMetaDataTags = null;
  let tagMetaDataTags = null;
  let authorMetaDataTags = null;
  let searchMetaDataTags = null;
  let sectionMetaDataTags = null;
  let homepageMetaDataTags = null;
  let nativoMetaDataTags = null;
  let commonTagsOnPage = true;

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const { getImgURL, getImgAlt } = require('./promoImageHelper');
  const metaData = {
    description: null,
    keywords: null,
    ogImage: null,
    ogImageAlt: null,
    url: generateUrl(arcSite, websiteDomain, gc),
    'page-type': pageType,
    title: metaValue('title') || websiteName,
    'og:title': metaValue('og:title') || websiteName,
    ogSiteName: websiteName,
    twitterUsername: twitterUsername ? `@${twitterUsername}` : null,
    twitterCard: 'summary_large_image',
    'twitter:title': metaValue('twitter:title') || websiteName,
    twitterImage: null,
    fallbackImage: normalizeFallbackImage(websiteDomain, fallbackImage),
  };

  if (pageType === 'article' || pageType === 'video' || pageType === 'gallery') {
    if (typeof window === 'undefined') {
      const description = gc && gc.description && gc.description.basic;
      const headline = gc && gc.headlines && gc.headlines.basic;

      metaData.title = metaValue('title') || (headline && `${headline} – ${websiteName}`) || websiteName;
      metaData.description = metaValue('description') || description || null;
      metaData['og:title'] = metaValue('og:title') || headline || websiteName;
      metaData.ogImage = getImgURL(metaValue, 'og:image', gc, resizerURL) || metaData.fallbackImage;
      metaData.ogImageAlt = getImgAlt(metaValue, 'og:image:alt', gc);
      metaData['twitter:title'] = metaValue('twitter:title') || headline || websiteName;
      metaData.twitterImage = getImgURL(metaValue, 'twitterImage', gc, resizerURL) || metaData.fallbackImage;

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

          <meta property="og:title" content={metaData['og:title']} />
          <meta name="twitter:title" content={metaData['twitter:title']} />

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
    const fallbackTitle = (author.byline && `${author.byline} - ${websiteName}`) || websiteName;
    metaData.description = metaValue('description') || author.bio || null;
    metaData['og:title'] = metaValue('og:title') || fallbackTitle;
    metaData['twitter:title'] = metaValue('twitter:title') || fallbackTitle;
    metaData.title = metaValue('title') || fallbackTitle;
    const { name: authorName } = author;
    const authorImageUrl = (typeof author.image === 'string')
      ? author.image
      : (author.image && author.image.url);
    const authorAltText = (typeof author.image === 'object')
      ? author.image.alt_text
      : author.byline || authorName;

    const authorPhoto = authorImageUrl || metaData.fallbackImage;
    const authorAlt = authorAltText || authorName || author.byline || websiteName;

    authorMetaDataTags = (
      <>
        {
          metaData.description
          && (
            <>
              <meta name="description" content={metaData.description} />
              <meta property="og:description" content={metaData.description} />
              <meta name="twitter:description" content={metaData.description} />
            </>
          )
        }
        <meta property="og:title" content={metaData['og:title']} />
        <meta name="twitter:title" content={metaData['twitter:title']} />
        {
          authorPhoto
          && (
            <>
              <meta property="og:image" content={authorPhoto} />
              <meta property="og:image:alt" content={authorAlt} />
              <meta name="twitter:image" content={authorPhoto} />
              <meta name="twitter:image:alt" content={authorAlt} />
            </>
          )
        }
      </>
    );
  } else if (pageType === 'search') {
    const fallbackTitle = `Search - ${websiteName}`;
    metaData.title = metaValue('title') || fallbackTitle;
    metaData['og:title'] = metaValue('og:title') || fallbackTitle;
    metaData['twitter:title'] = metaValue('twitter:title') || fallbackTitle;

    searchMetaDataTags = (
      <>
        <meta property="og:title" content={metaData['og:title']} />
        <meta name="twitter:title" content={metaData['twitter:title']} />
      </>
    );
  } else if (pageType === 'tag') {
    const payload = (gc && gc.Payload && gc.Payload.length) ? gc.Payload[0] : {};
    const fallbackTitle = (payload.name && `${payload.name} - ${websiteName}`) || websiteName;
    metaData.description = metaValue('description') || payload.description || null;
    metaData.title = metaValue('title') || fallbackTitle;
    metaData['og:title'] = metaValue('og:title') || fallbackTitle;
    metaData['twitter:title'] = metaValue('twitter:title') || fallbackTitle;

    tagMetaDataTags = (
      <>
        {
          metaData.description
          && (
            <>
              <meta name="description" content={metaData.description} />
              <meta property="og:description" content={metaData.description} />
              <meta name="twitter:description" content={metaData.description} />
            </>
          )
        }
        <meta property="og:title" content={metaData['og:title']} />
        <meta name="twitter:title" content={metaData['twitter:title']} />
        {
          metaData.fallbackImage
          && (
            <>
              <meta property="og:image" content={metaData.fallbackImage} />
              <meta property="og:image:alt" content={metaData['og:title']} />
              <meta name="twitter:image" content={metaData.fallbackImage} />
              <meta name="twitter:image:alt" content={metaData['twitter:title']} />
            </>
          )
        }
      </>
    );
  } else if (pageType === 'section') {
    const payload = (gc && gc.name) ? gc : {};
    const gcMetadata = (gc && gc.metadata) ? gc.metadata : {};
    const fallbackTitle = (payload.name && `${payload.name} - ${websiteName}`) || websiteName;
    metaData.description = metaValue('description') || gcMetadata.metadata_description || null;
    metaData.title = metaValue('title') || gcMetadata.metadata_title || fallbackTitle;
    metaData['og:title'] = metaValue('og:title') || fallbackTitle;
    metaData['twitter:title'] = metaValue('twitter:title') || fallbackTitle;

    sectionMetaDataTags = (
      <>
        {
          metaData.description
          && (
            <>
              <meta name="description" content={metaData.description} />
              <meta property="og:description" content={metaData.description} />
              <meta name="twitter:description" content={metaData.description} />
            </>
          )
        }
        <meta property="og:title" content={metaData['og:title']} />
        <meta name="twitter:title" content={metaData['twitter:title']} />

        {
          metaData.fallbackImage
          && (
            <>
              <meta property="og:image" content={metaData.fallbackImage} />
              <meta property="og:image:alt" content={metaData['og:title']} />
              <meta name="twitter:image" content={metaData.fallbackImage} />
              <meta name="twitter:image:alt" content={metaData['twitter:title']} />
            </>
          )
        }
      </>
    );
  } else if (pageType === 'homepage') {
    homepageMetaDataTags = (
      <>
        <meta property="og:title" content={metaData['og:title']} />
        <meta name="twitter:title" content={metaData['twitter:title']} />
        {
          metaData.fallbackImage
          && (
            <>
              <meta property="og:image" content={metaData.fallbackImage} />
              <meta property="og:image:alt" content={websiteName} />
              <meta name="twitter:image" content={metaData.fallbackImage} />
              <meta name="twitter:image:alt" content={websiteName} />
            </>
          )
        }
      </>
    );
  } else if (pageType === 'nativo-clp') {
    /* Nativo ad integration */
    /* this kind of page type can not render any social metadata */
    commonTagsOnPage = false;
    nativoMetaDataTags = (
      <>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="noindex, nofollow" />
      </>
    );
  } else {
    sectionMetaDataTags = (
      <>
        <meta property="og:title" content={metaData['og:title']} />
        <meta name="twitter:title" content={metaData['twitter:title']} />
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
      {homepageMetaDataTags}
      {authorMetaDataTags}
      {searchMetaDataTags}
      {customMetaTags}
      {commonTagsOnPage && twitterTags}
      {nativoMetaDataTags}
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
