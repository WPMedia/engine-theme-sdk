import styled from 'styled-components';

export const VideoContainer = styled.div`
  @media screen and (min-width: 48rem) {
    margin-bottom: 1.5rem;
  }

  margin-bottom: 1rem;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;

  background-color: black;
`;

export const VideoWrap = styled.div<{aspectRatio: number; viewportPercentage: number; shrinkToFit: boolean}>`
  ${({
    aspectRatio,
    viewportPercentage,
    shrinkToFit,
  }): string => (shrinkToFit ? `
    max-width: calc(${1 / aspectRatio} * ${viewportPercentage}vh);
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  ` : '')
}
`;
