/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useAppContext } from "fusion:context";
import getThemeStyle from "fusion:themes";
import { CreditData, Credits } from "../../../types/shared";

interface ImageMetadataProps extends CreditData {
	vanityCredits?: Credits;
}

const MetadataParagraph = styled.p<{ primaryFont: string }>`
	font-family: ${(props): string => props.primaryFont};
	font-size: 14px;
	color: #6c7778;
	margin: 8px 0;
	line-height: 16px;

	> * {
		font-family: ${(props): string => props.primaryFont};
	}

	.title {
		color: #6c7778;
		font-weight: bold;
	}
`;

const extract =
	(key: string) =>
	(item: object): object =>
		item[key];

const formatCredits = (credits: Credits): string => {
	const creators = credits?.by?.map(extract("name")).join(", ") || null;
	const affiliations = credits?.affiliation.map(extract("name")).join(", ") || null;

	return (creators || affiliations) && `(${[creators, affiliations].filter(Boolean).join("/")})`;
};

const ImageMetadata: React.FC<ImageMetadataProps> = ({
	subtitle,
	caption,
	credits,
	vanityCredits,
}) => {
	const { arcSite } = useAppContext();

	const preferredCredits = {
		by: vanityCredits?.by || credits?.by || [],
		affiliation: vanityCredits?.affiliation || credits?.affiliation || [],
	};

	// String literal used for caption in order to keep caption and credits visually separate
	return (
		!!(subtitle || caption || credits) && (
			<MetadataParagraph
				className="image-metadata"
				primaryFont={getThemeStyle(arcSite)["primary-font-family"]}
			>
				{subtitle && <span className="title">{`${subtitle} `}</span>}
				{caption && <span dangerouslySetInnerHTML={{ __html: `${caption} ` }} />}
				{formatCredits(preferredCredits)}
			</MetadataParagraph>
		)
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
