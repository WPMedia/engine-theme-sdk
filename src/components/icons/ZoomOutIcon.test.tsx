import React from 'react';
import { shallow } from 'enzyme';
import ZoomOutIcon from './ZoomOutIcon';

describe('the ZoomOutIcon component', () => {
  it('should render an SVG', () => {
    const wrapper = shallow(<ZoomOutIcon />);
    expect(wrapper.name()).toEqual('svg');
  });

  describe('the width prop', () => {
    it('should set the width of the svg element', () => {
      const wrapper = shallow(<ZoomOutIcon width={42} />);
      expect(wrapper.prop('width')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<ZoomOutIcon />);
      expect(wrapper.prop('width')).toEqual(24);
    });
  });

  describe('the height prop', () => {
    it('should set the height of the svg element', () => {
      const wrapper = shallow(<ZoomOutIcon height={42} />);
      expect(wrapper.prop('height')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<ZoomOutIcon />);
      expect(wrapper.prop('height')).toEqual(24);
    });
  });

  describe('the fill prop', () => {
    it('should set the fill color of the svg element', () => {
      const wrapper = shallow(<ZoomOutIcon fill="#222222" />);
      expect(wrapper.find('path').prop('fill')).toEqual('#222222');
    });

    it('should default to black', () => {
      const wrapper = shallow(<ZoomOutIcon />);
      expect(wrapper.find('path').prop('fill')).toEqual('#000');
    });
  });

  describe('the title prop', () => {
    it('should set the title of the svg element', () => {
      const wrapper = shallow(<ZoomOutIcon title="an icon!" />);
      expect(wrapper.find('title').text()).toEqual('an icon!');
    });

    it('should default to an empty string', () => {
      const wrapper = shallow(<ZoomOutIcon />);
      expect(wrapper.find('title').text()).toEqual('Zoom out');
    });
  });

  describe('the description prop', () => {
    it('should set the description of the svg element', () => {
      const wrapper = shallow(<ZoomOutIcon description="this is an icon!" />);
      expect(wrapper.find('desc').text()).toEqual('this is an icon!');
    });

    it('should default to an empty string', () => {
      const wrapper = shallow(<ZoomOutIcon />);
      expect(wrapper.find('desc').text()).toEqual('');
    });
  });
});
