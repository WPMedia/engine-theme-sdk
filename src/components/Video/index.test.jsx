import React from 'react';
import { mount } from 'enzyme';
import Video from '.';

describe('Video', () => {
  beforeEach(() => {
    global.powaBoot = jest.fn();
  });

  describe('with minimum configurations', () => {
    it('set proper data attributes and call window.powaBoot', () => {
      const wrapper = mount(<Video uuid="video-uuid" org="corecomponents" env="prod" />);
      const videoElement = wrapper.find('.powa').at(0);
      expect(videoElement.prop('id')).toBe('powa-video-uuid');
      expect(videoElement.prop('data-org')).toBe('corecomponents');
      expect(videoElement.prop('data-env')).toBe('prod');
      expect(videoElement.prop('data-uuid')).toBe('video-uuid');
      expect(videoElement.prop('data-autoplay')).toBe(false);
      expect(videoElement.prop('data-playthrough')).toBe(false);
      expect(videoElement.prop('data-muted')).toBe(false);
      expect(global.powaBoot).toBeCalled();
    });
  });

  describe('with autoplay', () => {
    it('set autoplay data attribute to true and call window.powaBoot', () => {
      const wrapper = mount(<Video uuid="video-uuid" org="corecomponents" env="prod" autoplay />);
      const videoElement = wrapper.find('.powa').at(0);
      expect(videoElement.prop('id')).toBe('powa-video-uuid');
      expect(videoElement.prop('data-org')).toBe('corecomponents');
      expect(videoElement.prop('data-env')).toBe('prod');
      expect(videoElement.prop('data-uuid')).toBe('video-uuid');
      expect(videoElement.prop('data-autoplay')).toBe(true);
      expect(videoElement.prop('data-playthrough')).toBe(false);
      expect(videoElement.prop('data-muted')).toBe(true);
      expect(global.powaBoot).toBeCalled();
    });
  });

  describe('with playthrough', () => {
    it('set playthrough data attribute to true and call window.powaBoot', () => {
      const wrapper = mount(<Video uuid="video-uuid" org="corecomponents" env="prod" playthrough />);
      const videoElement = wrapper.find('.powa').at(0);
      expect(videoElement.prop('id')).toBe('powa-video-uuid');
      expect(videoElement.prop('data-org')).toBe('corecomponents');
      expect(videoElement.prop('data-env')).toBe('prod');
      expect(videoElement.prop('data-uuid')).toBe('video-uuid');
      expect(videoElement.prop('data-autoplay')).toBe(false);
      expect(videoElement.prop('data-playthrough')).toBe(true);
      expect(videoElement.prop('data-muted')).toBe(false);
      expect(global.powaBoot).toBeCalled();
    });
  });

  describe('with aspectRatio defined', () => {
    it('set aspectRatio data attribute to 0.75 and call window.powaBoot', () => {
      const wrapper = mount(<Video uuid="video-uuid" org="corecomponents" env="prod" />);
      const videoElement = wrapper.find('.powa').at(0);
      expect(videoElement.prop('id')).toBe('powa-video-uuid');
      expect(videoElement.prop('data-org')).toBe('corecomponents');
      expect(videoElement.prop('data-env')).toBe('prod');
      expect(videoElement.prop('data-uuid')).toBe('video-uuid');
      expect(videoElement.prop('data-autoplay')).toBe(false);
      expect(videoElement.prop('data-playthrough')).toBe(false);
      expect(videoElement.prop('data-muted')).toBe(false);
      expect(global.powaBoot).toBeCalled();
    });
  });
});

describe('Styling', () => {
  beforeEach(() => {
    global.powaBoot = jest.fn();
  });

  describe('shrinkToFit flag on Video', () => {
    it('not included, the video should still render with a default true flag passed to the wrapper', () => {
      const wrapper = mount(
        <Video uuid="video-uuid" org="corecomponents" env="prod" />,
      );
      expect(wrapper.find('styled__VideoWrap').prop('shrinkToFit')).toBe(true);
    });

    it('included, the video should still render with a false flag passed to the wrapper', () => {
      const wrapper = mount(
        <Video uuid="video-uuid" org="corecomponents" env="prod" shrinkToFit={false} />,
      );
      expect(wrapper.find('styled__VideoWrap').prop('shrinkToFit')).toBe(false);
    });
  });
});

describe('MutationObserver', () => {
  beforeEach(() => {
    global.MutationObserver = class MutationObserver extends global.MutationObserver {
      // eslint-disable-next-line no-useless-constructor, class-methods-use-this
      constructor(callback) {
        super(callback);
      }

      // eslint-disable-next-line max-len
      // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
      disconnect() {}

      // eslint-disable-next-line max-len
      // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
      observe() {}
    };
  });

  describe('video aspect ratio', () => {
    it('should not be calculated given a zero dimension video', () => {
      Element.prototype.getBoundingClientRect = jest.fn(
        (): DOMRect => (DOMRectReadOnly.fromRect({ width: 0, height: 0 })),
      );
      const wrapper = mount(
        <Video uuid="video-uuid" org="corecomponents" env="prod" />,
      );
      expect(wrapper.find('styled__VideoWrap').prop('aspectRatio')).toBe(0.5625);
    });

    it('should be calculated given a known dimension video', () => {
      Element.prototype.getBoundingClientRect = jest.fn(
        (): DOMRect => (DOMRectReadOnly.fromRect({ width: 10, height: 10 })),
      );
      const wrapper = mount(
        <Video uuid="video-uuid" org="corecomponents" env="prod" />,
      );
      expect(wrapper.find('styled__VideoWrap').prop('aspectRatio')).toBe(0.5625);
    });
  });
});
