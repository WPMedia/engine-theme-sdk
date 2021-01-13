/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { mount, shallow } from 'enzyme';
import VideoPlayer from '.';


describe('VideoPlayer', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('renders ', () => {
    const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
        + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
        + 'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
    const wrapper = shallow(<VideoPlayer embedHTML={testEmbed} id="12345" />);
    expect(wrapper.find('#video-12345').length).toEqual(1);
  });

  it('if autoplay is disabled, expect it to not be in embed html ', () => {
    const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
        + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
        + 'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

    const wrapper = mount(<VideoPlayer
      embedHTML={testEmbed}
      id="12345"
      enableAutoplay={false}
    />);

    const expectedEmbed = {
      __html: '<div class="powa"'
          + ' id="powa-e924" data-org="corecomponents" data-env="prod" data-uuid="e924e51b" '
          + 'data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloud'
          + 'front.net/prod/powaBoot.js?org=corecomponents"></script></div>',
    };
    expect(wrapper.find('#video-12345').prop('dangerouslySetInnerHTML')).toEqual(expectedEmbed);
  });


  it('if autoplay is enabled, expect it to be included in embed html ', () => {
    const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
    + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
    + 'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

    const wrapper = mount(<VideoPlayer
      embedHTML={testEmbed}
      id="12345"
      enableAutoplay
    />);

    const expectedEmbed = {
      __html: '<div class="powa"  data-autoplay=true data-muted=true'
      + ' id="powa-e924" data-org="corecomponents" data-env="prod" data-uuid="e924e51b" '
      + 'data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloud'
      + 'front.net/prod/powaBoot.js?org=corecomponents"></script></div>',
    };
    expect(wrapper.find('#video-12345').prop('dangerouslySetInnerHTML')).toEqual(expectedEmbed);
  });

  it('if playthrough is enabled, add playthrough props ', () => {
    const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
        + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
        + 'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

    const getElementMock = jest.fn();
    getElementMock.mockReturnValue({ firstElementChild: {} });
    document.getElementById = getElementMock;

    const customFields = { autoplay: true, playthrough: true };
    const wrapper = mount(<VideoPlayer
      customFields={customFields}
      embedHTML={testEmbed}
      id="12345"
      enableAutoplay
    />);

    const expectedEmbed = {
      __html: '<div class="powa"  data-autoplay=true data-muted=true data-playthrough=true'
      + ' id="powa-e924" data-org="corecomponents" data-env="prod" data-uuid="e924e51b" '
      + 'data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloud'
      + 'front.net/prod/powaBoot.js?org=corecomponents"></script></div>',
    };
    expect(wrapper.find('#video-12345').prop('dangerouslySetInnerHTML')).toEqual(expectedEmbed);
  });
});
