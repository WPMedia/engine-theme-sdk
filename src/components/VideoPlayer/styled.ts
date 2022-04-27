import styled from "styled-components";

// removing the bottom margin if caption below, ensuring backwards compatibility
export const VideoContainer = styled.div<{
	hasCaption: boolean;
}>`
	@media screen and (min-width: 48rem) {
		${({ hasCaption }): string => (hasCaption ? `margin-bottom: 0rem` : `margin-bottom: 1.5rem;`)};
	}
	${({ hasCaption }): string => (hasCaption ? `margin-bottom: 0rem` : `margin-bottom: 1rem;`)};

	margin-left: 0;
	margin-right: 0;
	margin-top: 0;

	background-color: black;
`;

export const VideoWrap = styled.div<{
	aspectRatio: number;
	viewportPercentage: number;
	shrinkToFit: boolean;
	videoLoaded: boolean;
}>`
	${({ aspectRatio, viewportPercentage, shrinkToFit, videoLoaded }): string =>
		shrinkToFit
			? `
    max-width: calc(${1 / aspectRatio} * ${viewportPercentage}vh);
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    ${!videoLoaded ? `padding-bottom: calc(${aspectRatio} * 100%)` : ""};
  `
			: ""}
`;
