import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';

interface ImageAttribution {
  name?: string;
}

interface ImageMetadataProps {
  subtitle?: string;
  caption?: string;
  credits?: {
    by?: ImageAttribution[];
    affiliation?: ImageAttribution[];
  };
  vanityCredits?: {
    by?: ImageAttribution[];
    affiliation?: ImageAttribution[];
  };
}

const MetadataParagraph = styled.p<{ primaryFont: string }>`
  font-family: ${(props): string => props.primaryFont};
  font-size: 14px;
  color: #7F8C8D;
  margin: 8px 0;
  line-height: 16px;

  > * {
    font-family: ${(props): string => props.primaryFont};
  }

  .title {
    color: #7F8C8D;
    font-weight: bold;
  }
`;

const ImageMetadata: React.FC<ImageMetadataProps> = ({
  subtitle,
  caption,
  credits: { by = [{}], affiliation = [{}] } = {},
  vanityCredits,
}) => {
  const { arcSite } = useAppContext();
  let photographer = by && by[0] && by[0].name;
  let aff = affiliation && affiliation[0] && affiliation[0].name;
  if (vanityCredits) {
    const { by: vanityBy, affiliation: vanityAff } = vanityCredits;
    if (vanityBy) {
      photographer = (vanityBy[0] && vanityBy[0].name) || null;
    }
    if (vanityAff) {
      aff = (vanityAff[0] && vanityAff[0].name) || null;
    }
  }
  const credits = (photographer || aff) && `(${[photographer, aff].filter((name) => name).join('/')})`;

  return !!(subtitle || caption || credits) && (
    <MetadataParagraph className="image-metadata" primaryFont={getThemeStyle(arcSite)['primary-font-family']}>
      {
        subtitle && (
          <span className="title">
            {`${subtitle} `}
          </span>
        )
      }
      {
        caption && `${caption} `
      }
      {
        credits
      }
    </MetadataParagraph>
  );
};

ImageMetadata.propTypes = {
  /** Subtitle text for the image */
  subtitle: PropTypes.string,
  /** Image caption */
  caption: PropTypes.string,
  /** Image author related data */
  credits: PropTypes.shape({
    by: PropTypes.array,
    affiliation: PropTypes.array,
  }),
  /** Vanity credits related data */
  vanityCredits: PropTypes.shape({
    by: PropTypes.array,
    affiliation: PropTypes.array,
  }),
};

export default ImageMetadata;
