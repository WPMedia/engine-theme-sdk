import React from 'react';
import { shallow } from 'enzyme';
import ArrowRightIcon from './ArrowRightIcon';

describe('the ArrowRightIcon component', () => {
  it('should render an SVG', () => {
    const wrapper = shallow(<ArrowRightIcon />);
    expect(wrapper.name()).toEqual('svg');
    expect(wrapper.prop('role')).toEqual('img');
  });

  describe('the viewBox prop', () => {
    it('viewBox property should available', () => {
      const wrapper = shallow(<ArrowRightIcon />);
      expect(wrapper.prop('viewBox')).toEqual('0 0 24 24');
    });
  });

  describe('the width prop', () => {
    it('should set the width of the svg element', () => {
      const wrapper = shallow(<ArrowRightIcon width={42} />);
      expect(wrapper.prop('width')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<ArrowRightIcon />);
      expect(wrapper.prop('width')).toEqual(24);
    });
  });

  describe('the height prop', () => {
    it('should set the height of the svg element', () => {
      const wrapper = shallow(<ArrowRightIcon height={42} />);
      expect(wrapper.prop('height')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<ArrowRightIcon />);
      expect(wrapper.prop('height')).toEqual(24);
    });
  });

  describe('the fill prop', () => {
    it('should set the fill color of the svg element', () => {
      const wrapper = shallow(<ArrowRightIcon fill="#222222" />);
      expect(wrapper.find('path').prop('fill')).toEqual('#222222');
    });

    it('should default to black', () => {
      const wrapper = shallow(<ArrowRightIcon />);
      expect(wrapper.find('path').prop('fill')).toEqual('#000');
    });
  });

  describe('the title prop', () => {
    it('should set the title of the svg element', () => {
      const wrapper = shallow(<ArrowRightIcon title="an icon!" />);
      expect(wrapper.find('title').text()).toEqual('an icon!');
    });
  });

  describe('the description prop', () => {
    it('should set the description of the svg element', () => {
      const wrapper = shallow(<ArrowRightIcon description="this is an icon!" />);
      expect(wrapper.find('desc').text()).toEqual('this is an icon!');
    });

    it('should default to an empty string', () => {
      const wrapper = shallow(<ArrowRightIcon />);
      expect(wrapper.find('desc').text()).toEqual('');
    });
  });
});
