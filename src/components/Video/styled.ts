import styled from 'styled-components';

export const VideoContainer = styled.div`
  background-color: black;
`;

export const VideoWrap = styled.div<{aspectRatio: number; viewportPercentage: number; shrinkToFit: boolean; videoLoaded: boolean }>`
  ${({
    aspectRatio,
    viewportPercentage,
    shrinkToFit,
    videoLoaded,
  }): string => (shrinkToFit ? `
    max-width: calc(${1 / aspectRatio} * ${viewportPercentage}vh);
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    ${!videoLoaded ? `padding-bottom: calc(${aspectRatio} * 100%)` : ''};
  ` : '')
}
`;
