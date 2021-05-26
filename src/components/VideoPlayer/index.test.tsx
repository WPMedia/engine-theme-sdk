import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import VideoPlayer, { videoPlayerCustomFields } from '.';

test('renders id with video tag to match with powa player', () => {
  const targetId = 'matching123';
  const videoPlayer = render(<VideoPlayer embedMarkup="" id={targetId} />);

  // id not usually important in rtl but this is an exception
  const matchingVideoTargetIdDiv = videoPlayer.container.querySelector(`#video-${targetId}`);
  expect(matchingVideoTargetIdDiv.getAttribute('id')).toBe('video-matching123');
});

test('renders uuid with video tag to match with powa player', () => {
  const targetId = 'matching123';
  const videoPlayer = render(<VideoPlayer embedMarkup="" uuid={targetId} />);

  // id not usually important in rtl but this is an exception
  const matchingVideoTargetIdDiv = videoPlayer.container.querySelector(`#video-${targetId}`);
  expect(matchingVideoTargetIdDiv.getAttribute('id')).toBe('video-matching123');
});

test('renders embed markup in container', () => {
  const targetId = '';
  const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
    + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
    + 'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
  const videoPlayer = render(
    <VideoPlayer embedMarkup={testEmbed} id={targetId} />,
  );

  // match properties not usually important in rtl but this is an exception
  const videoPlayerPowaContainer = videoPlayer.container.querySelector('.powa');
  expect(videoPlayerPowaContainer.outerHTML).toMatchInlineSnapshot(
    '"<div class=\\"powa\\" id=\\"powa-e924\\" data-org=\\"corecomponents\\" data-env=\\"prod\\" data-uuid=\\"e924e51b\\" data-aspect-ratio=\\"0.562\\" data-api=\\"prod\\"><script src=\\"//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents\\"></script></div>"',
  );
});

describe('Styling', () => {
  describe('shrinkToFit flag on Video', () => {
    it('not included, the video should still render with a false flag passed to the wrapper', () => {
      const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
        + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
        + 'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
      const wrapper = mount(
        <VideoPlayer embedMarkup={testEmbed} id="targetId" />,
      );
      expect(wrapper.find('styled__VideoWrap').prop('shrinkToFit')).toBe(false);
    });

    it('included, the video should still render with a true flag passed to the wrapper', () => {
      const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
        + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
        + 'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
      const wrapper = mount(
        <VideoPlayer embedMarkup={testEmbed} id="targetId" shrinkToFit />,
      );
      expect(wrapper.find('styled__VideoWrap').prop('shrinkToFit')).toBe(true);
    });
  });
  describe('PageBuilder settings', () => {
    it('should return an object with settings defined', () => {
      const result = videoPlayerCustomFields();
      expect(result).toHaveProperty('shrinkToFit');
      expect(result).toHaveProperty('viewportPercentage');
    });
  });
});

describe('MutationObserver', () => {
  beforeEach(() => {
    global.MutationObserver = class MutationObserver extends global.MutationObserver {
      constructor(callback) {
        super(callback);
      }
      disconnect() {}
      observe(element, initObject) {}
    };
  });
  describe('video aspect ratio', () => {
    it('should not be calculated given a zero dimension video', () => {
      Element.prototype.getBoundingClientRect = jest.fn((): DOMRect => (DOMRectReadOnly.fromRect({ width: 0, height: 0 })));
      const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
        + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
        + 'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
      const wrapper = mount(
        <VideoPlayer embedMarkup={testEmbed} id="targetId" />,
      );
      expect(wrapper.find('styled__VideoWrap').prop('aspectRatio')).toBe(0.5625);
    });

    it('should be calculated given a known dimension video', () => {
      Element.prototype.getBoundingClientRect = jest.fn((): DOMRect => (DOMRectReadOnly.fromRect({ width: 10, height: 10 })));
      const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
        + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
        + 'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
      const wrapper = mount(
        <VideoPlayer embedMarkup={testEmbed} id="targetId" />,
      );
      expect(wrapper.find('styled__VideoWrap').prop('aspectRatio')).toBe(0.5625);
    });
  });
});
