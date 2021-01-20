import React from 'react';
import { render } from '@testing-library/react';
import VideoPlayer from '.';

test('renders id with video tag to match with powa player', () => {
  const targetId = 'matching123';
  const videoPlayer = render(<VideoPlayer embedMarkup="" id={targetId} />);

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
