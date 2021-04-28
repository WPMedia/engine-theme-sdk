import styled from 'styled-components';
import rem from 'polished/lib/helpers/rem';

export const GalleryDiv = styled.section`
  display: block;
  width: 100%;
  overflow: hidden;
`;

const GalleryButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  height: auto;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
`;

export const ControlsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ControlContainer = styled.div`
  flex: 0 0 auto;
  line-height: ${rem('16px')};
  margin: 6px 0;
  width: auto;

  &, > button, > span {
    display: inline-flex;
    align-items: center;
    color: #191919;
    font-size: 14px;
    font-weight: 500;
  }
`;

// via typescript styled issue https://github.com/microsoft/TypeScript/issues/37597
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ControlsButton = styled(GalleryButton as any)`
  display: flex;
  align-items: center;

  svg {
    height: 1rem;
    width: 1rem;
  }

  > * {
    flex: auto;
    line-height: 1;
  }
`;

export const PlaybackText = styled.span`
  margin: 0 30px 0 4px;
`;

export const ImageCountText = styled.p`
  display: inline-block;
  margin: 0 0 0 12px;

  span {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  height: 450px;
  background-color: black;
`;

// via typescript styled issue https://github.com/microsoft/TypeScript/issues/37597
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CarouselButton = styled(GalleryButton as any)`
  position: absolute;
  top: 50%;
  height: 3rem;
  width: 3rem;

  &.prev-button {
    left: 0;
  }

  &.next-button {
    right: 0;
  }
`;

export const ImageWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  display: inline-block;
  transition-property: transform, visibility;

  img {
    object-fit: contain;
    height: 100%;
  }
`;

export const AdWrapper = styled.div`
  background-color: black;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  .advertisement-label {
    color: white;
    line-height: 1.5rem;
  }

  .arcad_feature {
    background-color: #222222;
    padding: 2rem;
  }
`;
