import React from 'react';

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

const ImageMetadata: React.FC<ImageMetadataProps> = ({
  subtitle,
  caption,
  credits: { by = [{}], affiliation = [{}] } = {},
}) => {
  const photographer = by && by[0] && by[0].name;
  const aff = affiliation && affiliation[0] && affiliation[0].name;

  const credits = (photographer || aff) && `(${[photographer, aff].filter((name) => name).join('/')})`;

  return (subtitle || caption || credits) && (
    <p className="image-metadata">
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
    </p>
  );
};

export default ImageMetadata;
