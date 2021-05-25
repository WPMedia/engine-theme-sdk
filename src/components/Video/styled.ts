/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const VideoContainer = styled.div`
  background-color: black;
`;

export const VideoWrap = styled.div<{aspectRatio: number; viewportPercentage: number; shrinkToFit: boolean}>`
  ${({
    aspectRatio,
    viewportPercentage,
    shrinkToFit,
  }): string => (shrinkToFit ? `
    max-width: calc(${1 / aspectRatio} * ${viewportPercentage}vh);
    margin-left: auto;
    margin-right: auto;
  ` : '')
}
`;
