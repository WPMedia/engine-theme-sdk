import React from 'react';
import { shallow } from 'enzyme';
import FacebookAltIcon from './FacebookAltIcon';

describe('the FacebookAltIcon component', () => {
  it('should render an SVG', () => {
    const wrapper = shallow(<FacebookAltIcon />);
    expect(wrapper.name()).toEqual('svg');
    expect(wrapper.prop('viewBox')).toEqual('0 0 448 512');
    expect(wrapper.prop('role')).not.toBeDefined();
  });

  it('should render as an "img" SVG', () => {
    const wrapper = shallow(<FacebookAltIcon context="image" />);
    expect(wrapper.name()).toEqual('svg');
    expect(wrapper.prop('role')).toEqual('img');
  });

  describe('the width prop', () => {
    it('should set the width of the svg element', () => {
      const wrapper = shallow(<FacebookAltIcon width={42} />);
      expect(wrapper.prop('width')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<FacebookAltIcon />);
      expect(wrapper.prop('width')).toEqual(24);
    });
  });

  describe('the height prop', () => {
    it('should set the height of the svg element', () => {
      const wrapper = shallow(<FacebookAltIcon height={42} />);
      expect(wrapper.prop('height')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<FacebookAltIcon />);
      expect(wrapper.prop('height')).toEqual(24);
    });
  });

  describe('the fill prop', () => {
    it('should set the fill color of the svg element', () => {
      const wrapper = shallow(<FacebookAltIcon fill="#222222" />);
      expect(wrapper.find('path').prop('fill')).toEqual('#222222');
    });

    it('should default to black', () => {
      const wrapper = shallow(<FacebookAltIcon />);
      expect(wrapper.find('path').prop('fill')).toEqual('#000');
    });
  });

  describe('the title prop', () => {
    it('should set the title of the svg element', () => {
      const wrapper = shallow(<FacebookAltIcon title="an icon!" />);
      expect(wrapper.find('title').text()).toEqual('an icon!');
    });
  });

  describe('the description prop', () => {
    it('should set the description of the svg element', () => {
      const wrapper = shallow(<FacebookAltIcon description="this is an icon!" />);
      expect(wrapper.find('desc').text()).toEqual('this is an icon!');
    });

    it('should default to an empty string', () => {
      const wrapper = shallow(<FacebookAltIcon />);
      expect(wrapper.find('desc').text()).toEqual('');
    });
  });
});
