/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import Gallery from '.';

jest.mock('fusion:context', () => ({
  useAppContext: jest.fn(() => ({})),
}));

jest.mock('fusion:themes', () => (): object => ({
  'primary-font-color': 'white',
}));

const mockGallery = [
  // permutation with everything
  {
    _id: 'aaa111',
    url: 'http://www.aaa.aaa/aaa.jpg',
    alt_text: 'aaa alt aaa',
    subtitle: 'aaa sub aaa',
    caption: 'aaa caption aaa',
    credits: {
      by: [
        {
          name: 'aaa by name aaa',
        },
      ],
      affiliation: [
        {
          name: 'aaa aff name aaa',
        },
      ],
    },
  },
  // permutation with no subtitle
  {
    _id: 'bbb222',
    url: 'http://www.bbb.bbb/bbb.jpg',
    alt_text: 'bbb alt bbb',
    caption: 'bbb caption bbb',
    credits: {
      by: [
        {
          name: 'bbb by name bbb',
        },
      ],
      affiliation: [
        {
          name: 'bbb aff name bbb',
        },
      ],
    },
  },
  // permutation with no caption
  {
    _id: 'ccc333',
    url: 'http://www.ccc.ccc/ccc.jpg',
    alt_text: 'ccc alt ccc',
    subtitle: 'ccc sub ccc',
    credits: {
      by: [
        {
          name: 'ccc by name ccc',
        },
      ],
      affiliation: [
        {
          name: 'ccc aff name ccc',
        },
      ],
    },
  },
  // permutation with no byline
  {
    _id: 'ddd444',
    url: 'http://www.ddd.ddd/ddd.jpg',
    alt_text: 'ddd alt ddd',
    subtitle: 'ddd sub ddd',
    caption: 'ddd caption ddd',
    credits: {
      affiliation: [
        {
          name: 'ddd aff name ddd',
        },
      ],
    },
  },
  // permutation with no affiliation
  {
    _id: 'eee555',
    url: 'http://www.eee.eee/eee.jpg',
    alt_text: 'eee alt eee',
    subtitle: 'eee sub eee',
    caption: 'eee caption eee',
    credits: {
      by: [
        {
          name: 'eee by name eee',
        },
      ],
    },
  },
  // permutation with no byline or affiliation
  {
    _id: 'fff666',
    url: 'http://www.fff.fff/fff.jpg',
    alt_text: 'fff alt fff',
    subtitle: 'fff sub fff',
    caption: 'fff caption fff',
  },
];

function createClientXY(x: number, y: number, target: EventTarget): Touch {
  return {
    clientX: x,
    clientY: y,
    identifier: 0,
    target,
    screenX: 0,
    screenY: 0,
    pageX: 0,
    pageY: 0,
    radiusX: 0,
    radiusY: 0,
    rotationAngle: 0,
    force: 0,
    touchType: 'direct',
    altitudeAngle: 0,
    azimuthAngle: 0,
  };
}

function createTouchEvent({ x = 0, y = 0 }, target: EventTarget): TouchEventInit {
  return { touches: [createClientXY(x, y, target)] };
}

describe('the gallery block', () => {
  describe('the fullscreen button', () => {
    it('should be present with the "FullScreen" svg component with the correct fill', () => {
      const wrapper = shallow(<Gallery galleryElements={mockGallery} />);
      expect(wrapper.find('.playback-controls > button').at(0).childAt(0).name()).toBe('FullscreenIcon');
      expect(wrapper.find('.playback-controls > button').at(0).childAt(0).prop('fill')).toBe('#6B6B6B');
      expect(wrapper.find('.playback-controls > button').at(0).childAt(1).name()).toBe('span');
      expect(wrapper.find('.playback-controls > button').at(0).childAt(1).text()).toBe('Full Screen');
    });
  });

  describe('the fullscreen button', () => {
    it('should be present with the "PlayButton" svg component with the correct fill', () => {
      const wrapper = shallow(<Gallery galleryElements={mockGallery} />);
      expect(wrapper.find('.playback-controls > button').at(1).childAt(0).name()).toBe('PlayIcon');
      expect(wrapper.find('.playback-controls > button').at(1).childAt(0).prop('fill')).toBe('#6B6B6B');
      expect(wrapper.find('.playback-controls > button').at(1).childAt(1).name()).toBe('span');
      expect(wrapper.find('.playback-controls > button').at(1).childAt(1).text()).toBe('Autoplay');
    });
  });

  describe('the page/image counter and nearby buttons', () => {
    it('should accurately reflect the current page and any updates', () => {
      const controlsWrapper = mount(<Gallery galleryElements={mockGallery} />).find('.image-change-controls');
      const nextButtonWrapper = controlsWrapper.find('button').at(1);
      const prevButtonWrapper = controlsWrapper.find('button').at(0);
      expect(controlsWrapper.text()).toMatch(/1\sof\s6/);
      nextButtonWrapper.simulate('click');
      expect(controlsWrapper.text()).toMatch(/2\sof\s6/);
      prevButtonWrapper.simulate('click');
      expect(controlsWrapper.text()).toMatch(/1\sof\s6/);
    });
  });

  describe('the page/image counter and overlaid buttons', () => {
    it('should accurately reflect the current page and any updates', () => {
      const wrapper = mount(<Gallery galleryElements={mockGallery} />);
      const controlsWrapper = wrapper.find('.image-change-controls');
      const nextButtonWrapper = wrapper.find('button.next-button').at(0);
      const prevButtonWrapper = wrapper.find('button.prev-button').at(0);
      expect(controlsWrapper.text()).toMatch(/1\sof\s6/);
      nextButtonWrapper.simulate('click');
      expect(controlsWrapper.text()).toMatch(/2\sof\s6/);
      prevButtonWrapper.simulate('click');
      expect(controlsWrapper.text()).toMatch(/1\sof\s6/);
    });
  });

  describe('the overlaid previous image button', () => {
    it('should be present with the "ChevronLeft" svg component with the correct fill', () => {
      const wrapper = shallow(<Gallery galleryElements={mockGallery} />);
      expect(wrapper.find('button.prev-button').at(0).childAt(0).name()).toBe('ChevronLeftIcon');
      expect(wrapper.find('button.prev-button').at(0).childAt(0).prop('fill')).toBe('white');
    });
  });

  describe('the overlaid next image button', () => {
    it('should be present with the "ChevronRight" svg component with the correct fill', () => {
      const wrapper = shallow(<Gallery galleryElements={mockGallery} />);
      expect(wrapper.find('button.next-button').at(0).childAt(0).name()).toBe('ChevronRightIcon');
      expect(wrapper.find('button.next-button').at(0).childAt(0).prop('fill')).toBe('white');
    });
  });

  describe('the image carousel', () => {
    let outerNode;

    beforeEach(() => {
      outerNode = document.createElement('div');
      document.body.appendChild(outerNode);
    });

    afterEach(() => {
      document.body.removeChild(outerNode);
    });

    it('should render all the images with the correct inital x offset', () => {
      const wrapper = shallow(<Gallery galleryElements={mockGallery} />);
      const imagesWrapper = wrapper.find('.image-wrapper');
      expect(imagesWrapper.everyWhere((wrap) => wrap.prop('style').transform === 'translate(0%, 0)')).toBe(true);
      expect(imagesWrapper.everyWhere((wrap) => wrap.prop('style').transitionDuration === '1s')).toBe(true);
    });

    describe('when the user swipes left', () => {
      it('should update the page counter', () => {
        const wrapper = mount(<Gallery galleryElements={mockGallery} />, { attachTo: outerNode });
        const carouselWrapper = wrapper.find('.gallery-carousel-container').first();
        const carouselNode = carouselWrapper.getDOMNode();
        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 100, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 10, y: 30 }, carouselNode)));
        });
        expect(wrapper.find('.image-change-controls').text()).toMatch(/2\u00A0of\u00A06/);
      });

      it('should set the correct x offsets during the swipe', () => {
        const wrapper = mount(<Gallery galleryElements={mockGallery} />, { attachTo: outerNode });
        const carouselWrapper = wrapper.find('.gallery-carousel-container').first();
        const carouselNode = carouselWrapper.getDOMNode();
        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 100, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
        });
        wrapper.update();
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transform === 'translate(calc(0% - 50px), 0)')).toBe(true);
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transitionDuration === '0s')).toBe(true);
      });

      it('should set the x offsets to the correct values after the swipe', () => {
        const wrapper = mount(<Gallery galleryElements={mockGallery} />, { attachTo: outerNode });
        const carouselWrapper = wrapper.find('.gallery-carousel-container').first();
        const carouselNode = carouselWrapper.getDOMNode();
        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 100, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 10, y: 30 }, carouselNode)));
        });
        wrapper.update();
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transform === 'translate(-100%, 0)')).toBe(true);
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transitionDuration === '1s')).toBe(true);
      });
    });

    describe('when the user swipes right', () => {
      it('should update the page counter', () => {
        const wrapper = mount(<Gallery galleryElements={mockGallery} />, { attachTo: outerNode });
        const carouselWrapper = wrapper.find('.gallery-carousel-container').first();
        const carouselNode = carouselWrapper.getDOMNode();
        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 100, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 10, y: 10 }, carouselNode)));
        });
        expect(wrapper.find('.image-change-controls').text()).toMatch(/2\u00A0of\u00A06/);
        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 10, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 100, y: 30 }, carouselNode)));
        });
        expect(wrapper.find('.image-change-controls').text()).toMatch(/1\u00A0of\u00A06/);
      });

      it('should set the correct x offsets during the swipe', () => {
        const wrapper = mount(<Gallery galleryElements={mockGallery} />, { attachTo: outerNode });
        const carouselWrapper = wrapper.find('.gallery-carousel-container').first();
        const carouselNode = carouselWrapper.getDOMNode();
        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 100, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 10, y: 30 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 10, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
        });
        wrapper.update();
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transform === 'translate(calc(-100% - -40px), 0)')).toBe(true);
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transitionDuration === '0s')).toBe(true);
      });

      it('should set the x offsets to the correct values after the swipe', () => {
        const wrapper = mount(<Gallery galleryElements={mockGallery} />, { attachTo: outerNode });
        const carouselWrapper = wrapper.find('.gallery-carousel-container').first();
        const carouselNode = carouselWrapper.getDOMNode();
        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 100, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 10, y: 30 }, carouselNode)));
        });
        wrapper.update();
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transform === 'translate(-100%, 0)')).toBe(true);
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transitionDuration === '1s')).toBe(true);
        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 10, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 100, y: 30 }, carouselNode)));
        });
        wrapper.update();
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transform === 'translate(0%, 0)')).toBe(true);
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transitionDuration === '1s')).toBe(true);
      });
    });

    describe('when the user swipes left at the end of the gallery', () => {
      it('should not advance forward', () => {
        const wrapper = mount(<Gallery galleryElements={mockGallery} />, { attachTo: outerNode });
        const carouselWrapper = wrapper.find('.gallery-carousel-container').first();
        const carouselNode = carouselWrapper.getDOMNode();

        for (let i = 1; i < 6; i += 1) {
          act(() => {
            carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 100, y: 10 }, carouselNode)));
            carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
            carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 10, y: 30 }, carouselNode)));
          });
          wrapper.update();
          expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transform === `translate(${i * -100}%, 0)`)).toBe(true);
          expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transitionDuration === '1s')).toBe(true);
          expect(wrapper.find('.image-change-controls').text()).toMatch(new RegExp(`${i + 1}\u00A0of\u00A06`));
        }

        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 100, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 10, y: 30 }, carouselNode)));
        });
        wrapper.update();
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transform === 'translate(-500%, 0)')).toBe(true);
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transitionDuration === '1s')).toBe(true);
        expect(wrapper.find('.image-change-controls').text()).toMatch(/6\u00A0of\u00A06/);
      });
    });

    describe('when the user swipes right at the beginning of the gallery', () => {
      it('should not advance backward', () => {
        const wrapper = mount(<Gallery galleryElements={mockGallery} />, { attachTo: outerNode });
        const carouselWrapper = wrapper.find('.gallery-carousel-container').first();
        const carouselNode = carouselWrapper.getDOMNode();
        act(() => {
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchstart', createTouchEvent({ x: 10, y: 10 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchmove', createTouchEvent({ x: 50, y: 20 }, carouselNode)));
          carouselWrapper.getDOMNode().dispatchEvent(new TouchEvent('touchend', createTouchEvent({ x: 100, y: 30 }, carouselNode)));
        });
        wrapper.update();
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transform === 'translate(0%, 0)')).toBe(true);
        expect(wrapper.find('.image-wrapper').everyWhere((wrap) => wrap.prop('style').transitionDuration === '1s')).toBe(true);
        expect(wrapper.find('.image-change-controls').text()).toMatch(/1\u00A0of\u00A06/);
      });
    });
  });

  describe('the Image child components', () => {
    it('should pass the correct dimensions', () => {
      const wrapper = shallow(<Gallery galleryElements={mockGallery} />);
      wrapper.find('.image-wrapper').forEach((imageWrapper) => {
        expect(imageWrapper.find('Image').first().prop('smallWidth')).toBe(400);
        expect(imageWrapper.find('Image').first().prop('smallHeight')).toBe(0);
        expect(imageWrapper.find('Image').first().prop('mediumWidth')).toBe(600);
        expect(imageWrapper.find('Image').first().prop('mediumHeight')).toBe(0);
        expect(imageWrapper.find('Image').first().prop('largeWidth')).toBe(800);
        expect(imageWrapper.find('Image').first().prop('largeHeight')).toBe(0);
      });
    });

    it('should pass the correct url', () => {
      const wrapper = shallow(<Gallery galleryElements={mockGallery} />);
      wrapper.find('.image-wrapper').forEach((imageWrapper, index) => {
        expect(imageWrapper.find('Image').first().prop('url')).toStrictEqual(mockGallery[index].url);
      });
    });

    it('should pass the correct alt text', () => {
      const wrapper = shallow(<Gallery galleryElements={mockGallery} />);
      wrapper.find('.image-wrapper').forEach((imageWrapper, index) => {
        expect(imageWrapper.find('Image').first().prop('alt')).toStrictEqual(mockGallery[index].alt_text);
      });
    });
  });

  describe('the ImageMetadata child component', () => {
    it('should pass the current image meta values to the child component', () => {
      const wrapper = mount(<Gallery galleryElements={mockGallery} />);
      expect(wrapper.find('ImageMetadata').first().props()).toStrictEqual({
        subtitle: 'aaa sub aaa',
        caption: 'aaa caption aaa',
        credits: {
          by: [
            {
              name: 'aaa by name aaa',
            },
          ],
          affiliation: [
            {
              name: 'aaa aff name aaa',
            },
          ],
        },
      });
      wrapper.find('button.next-button').at(0).simulate('click');
    });

    it('should update with the current image when the page changes', () => {
      const wrapper = mount(<Gallery galleryElements={mockGallery} />);
      wrapper.find('button.next-button').at(0).simulate('click');
      expect(wrapper.find('ImageMetadata').first().props()).toStrictEqual({
        subtitle: undefined,
        caption: 'bbb caption bbb',
        credits: {
          by: [
            {
              name: 'bbb by name bbb',
            },
          ],
          affiliation: [
            {
              name: 'bbb aff name bbb',
            },
          ],
        },
      });
    });
  });
});
