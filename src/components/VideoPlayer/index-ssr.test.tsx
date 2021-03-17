/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */
import React from 'react';
import { shallow } from 'enzyme';
import VideoPlayer from './index';

describe('server-side render', () => {
  it('renders nothing when server-side', () => {
    const testEmbed = `
      <div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod" data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod">
        <script src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script>
      </div>
    `;
    const wrapper = shallow(
      <VideoPlayer embedMarkup={testEmbed} id="ssr-video" />,
    );
    expect(wrapper.type()).toEqual(null);
  });
});
