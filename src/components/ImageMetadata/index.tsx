import React from 'react';
import styled from 'styled-components';
import { useAppContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';

import './imagemetadata.scss';

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
}

const MetadataParagraph = styled.p<{ primaryFont: string }>`
  font-family: ${(props): string => props.primaryFont};
`;

const ImageMetadata: React.FC<ImageMetadataProps> = ({
  subtitle,
  caption,
  credits: { by = [{}], affiliation = [{}] } = {},
}) => {
  const { arcSite } = useAppContext();
  const photographer = by && by[0] && by[0].name;
  const aff = affiliation && affiliation[0] && affiliation[0].name;

  const credits = (photographer || aff) && `(${[photographer, aff].filter((name) => name).join('/')})`;

  return (subtitle || caption || credits) && (
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

export default ImageMetadata;
