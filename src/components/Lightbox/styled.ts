/* eslint-disable import/prefer-default-export */
import styled, { keyframes } from 'styled-components';
import rem from 'polished/lib/helpers/rem';

const primaryColor = '#fff';
const primaryBackground = 'rgba(0, 0, 0, 1.0)';
const secondaryBackground = 'rgba(0, 0, 0, 0.5)';
const tertiaryBackground = '#fff';

const closeWindowKeyframes = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const pointFadeKeyframes = keyframes`
  0%, 19.999%, 100% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
`;

export const LightboxContainer = styled.div<{isClosing: boolean}>`
  background-color: ${primaryBackground};
  outline: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  -ms-content-zooming: none;
  -ms-user-select: none;
  -ms-touch-select: none;
  touch-action: none;
  animation-name: ${closeWindowKeyframes};
  opacity: ${({ isClosing }): 0 | 1 => (isClosing ? 0 : 1)};
`;

export const LightboxInnerDiv = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const NavButton = styled.button`
  border: none;
  position: absolute;
  top: 0;
  bottom: 0;
  height: auto;
  width: auto;
  margin: auto;
  cursor: pointer;
  opacity: 0.7;
  background: none;

  svg {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:hover {
    opacity: 1;
  }

  &:active {
    opacity: 0.7;
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }

  svg {
    height: 48px;
    width: 48px;
  }
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const LoadingCircle = styled.div`
  width: 60px;
  height: 60px;
  color: ${primaryColor};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export const LoadingCirclePoint = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  &::before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 11%;
    height: 30%;
    background-color: ${tertiaryBackground};
    border-radius: 30%;
    animation: ${pointFadeKeyframes} 800ms infinite ease-in-out both;
  }

  &:nth-of-type(1) {
    transform: rotate(0deg);

    &::before {
      animation-delay: -800ms;
    }
  }

  &:nth-of-type(7) {
    transform: rotate(180deg);
    transform: rotate(180deg);

    &::before {
      animation-delay: -800ms;
      animation-delay: 0ms;
    }
  }

  &:nth-of-type(2) {
    transform: rotate(30deg);

    &::before {
      animation-delay: -666ms;
    }
  }

  &:nth-of-type(8) {
    transform: rotate(210deg);

    &::before {
      animation-delay: -666ms;
    }
  }

  &:nth-of-type(3) {
    transform: rotate(60deg);

    &::before {
      animation-delay: -533ms;
    }
  }

  &:nth-of-type(9) {
    transform: rotate(240deg);

    &::before {
      animation-delay: -533ms;
    }
  }

  &:nth-of-type(4) {
    transform: rotate(90deg);

    &::before {
      animation-delay: -400ms;
    }
  }

  &:nth-of-type(10) {
    transform: rotate(270deg);

    &::before {
      animation-delay: -400ms;
    }
  }

  &:nth-of-type(5) {
    transform: rotate(120deg);

    &::before {
      animation-delay: -266ms;
    }
  }

  &:nth-of-type(11) {
    transform: rotate(300deg);

    &::before {
      animation-delay: -266ms;
    }
  }

  &:nth-of-type(6) {
    transform: rotate(150deg);

    &::before {
      animation-delay: -133ms;
    }
  }

  &:nth-of-type(12) {
    transform: rotate(330deg);

    &::before {
      animation-delay: -133ms;
    }
  }

  &:nth-of-type(13) {
    transform: rotate(360deg);

    &::before {
      animation-delay: 0ms;
    }
  }
`;

export const ErrorContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${primaryColor};
`;

export const LightboxImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  max-width: none;
  -ms-content-zooming: none;
  -ms-user-select: none;
  -ms-touch-select: none;
  touch-action: none;

  .imageNext, .imagePrev {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    max-width: none;
    -ms-content-zooming: none;
    -ms-user-select: none;
    -ms-touch-select: none;
    touch-action: none;

    .loadingContainer {
      display: none;
    }

    .errorContainer {
      display: none;
    }
  }

  &.imageDiscourager {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .downloadBlocker {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    background-size: cover;
  }
`;

export const LightboxCaption = styled.div`
  background-color: ${secondaryBackground};
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: left;
  bottom: 0;
  max-height: 150px;
  overflow: auto;

  .captionContent {
    padding: 10px 20px;
    color: ${primaryColor};
    font-size: ${rem('14px')};
    line-height: ${rem('24px')};

    .image-metadata, .image-metadata .title {
      color: white;
    }
  }
`;

export const LightboxToolbar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  top: 0;
  height: 50px;

  .toolbarSide {
    height: 50px;
    margin: 0;

    &.leftSide {
      padding-left: 20px;
      padding-right: 0;
      flex: 0 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.rightSide {
      padding-left: 0;
      padding-right: 20px;
      flex: 0 0 auto;
    }
  }

  .toolbarItem {
    display: inline-block;
    line-height: 50px;
    padding: 0;
    color: ${primaryColor};
    font-size: 120%;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    button {
      background-color: rgba(0, 0, 0, 0.1);

      &.builtinButton {
        width: 40px;
        height: 35px;
        cursor: pointer;
        border: none;
        opacity: 0.7;

        &:hover {
          opacity: 1;
        }

        &:active {
          outline: none;
        }

        &.disabled {
          cursor: default;
          opacity: 0.5;

          &:hover {
            opacity: 0.5;
          }
        }
      }
    }

    .itemChild {
      vertical-align: middle;
    }
  }
`;
