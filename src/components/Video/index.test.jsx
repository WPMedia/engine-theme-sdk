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
      expect(videoElement.prop('data-aspect-ratio')).toBe(0.5625);
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
      expect(videoElement.prop('data-aspect-ratio')).toBe(0.5625);
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
      expect(videoElement.prop('data-aspect-ratio')).toBe(0.5625);
      expect(global.powaBoot).toBeCalled();
    });
  });

  describe('with aspectRatio defined', () => {
    it('set aspectRatio data attribute to 0.75 and call window.powaBoot', () => {
      const wrapper = mount(<Video uuid="video-uuid" org="corecomponents" env="prod" aspectRatio={0.75} />);
      const videoElement = wrapper.find('.powa').at(0);
      expect(videoElement.prop('id')).toBe('powa-video-uuid');
      expect(videoElement.prop('data-org')).toBe('corecomponents');
      expect(videoElement.prop('data-env')).toBe('prod');
      expect(videoElement.prop('data-uuid')).toBe('video-uuid');
      expect(videoElement.prop('data-autoplay')).toBe(false);
      expect(videoElement.prop('data-playthrough')).toBe(false);
      expect(videoElement.prop('data-muted')).toBe(false);
      expect(videoElement.prop('data-aspect-ratio')).toBe(0.75);
      expect(global.powaBoot).toBeCalled();
    });
  });
});
