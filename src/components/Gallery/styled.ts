import styled from 'styled-components';
import rem from 'polished/lib/helpers/rem';

export const GalleryDiv = styled.div`
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
    color: green;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const ControlsButton = styled(GalleryButton)`
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

export const ImageCountText = styled.span`
  margin-left: 12px;
`;

export const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  height: 450px;
  background-color: black;
`;

export const CarouselButton = styled(GalleryButton)`
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
  transition-property: transform;

  img {
    object-fit: contain;
    height: 100%;
  }
`;
