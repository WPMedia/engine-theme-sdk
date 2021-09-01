import React from 'react';
import { shallow } from 'enzyme';
import ErrorIcon from './ErrorIcon';

describe('the ErrorIcon component', () => {
  it('should render an SVG', () => {
    const wrapper = shallow(<ErrorIcon />);
    expect(wrapper.name()).toEqual('svg');
    expect(wrapper.prop('viewBox')).toEqual('0 0 16 16');
    expect(wrapper.prop('role')).not.toBeDefined();
  });

  it('should render as an "img" SVG', () => {
    const wrapper = shallow(<ErrorIcon context="image" />);
    expect(wrapper.name()).toEqual('svg');
    expect(wrapper.prop('role')).toEqual('img');
  });

  describe('the width prop', () => {
    it('should set the width of the svg element', () => {
      const wrapper = shallow(<ErrorIcon width={42} />);
      expect(wrapper.prop('width')).toEqual(42);
    });

    it('should default to 1em', () => {
      const wrapper = shallow(<ErrorIcon />);
      expect(wrapper.prop('width')).toEqual('1em');
    });
  });

  describe('the height prop', () => {
    it('should set the height of the svg element', () => {
      const wrapper = shallow(<ErrorIcon height={42} />);
      expect(wrapper.prop('height')).toEqual(42);
    });

    it('should default to 1em', () => {
      const wrapper = shallow(<ErrorIcon />);
      expect(wrapper.prop('height')).toEqual('1em');
    });
  });

  describe('the fill prop', () => {
    it('should set the fill color of the svg element', () => {
      const wrapper = shallow(<ErrorIcon fill="#222222" />);
      expect(wrapper.find('path').prop('fill')).toEqual('#222222');
    });

    it('should default to currentColor', () => {
      const wrapper = shallow(<ErrorIcon />);
      expect(wrapper.find('path').prop('fill')).toEqual('currentColor');
    });
  });

  describe('the title prop', () => {
    it('should set the title of the svg element', () => {
      const wrapper = shallow(<ErrorIcon title="an icon!" context="image" />);
      expect(wrapper.find('title').text()).toEqual('an icon!');
    });
  });

  describe('the description prop', () => {
    it('should set the description of the svg element', () => {
      const wrapper = shallow(<ErrorIcon description="this is an icon!" context="image" />);
      expect(wrapper.find('desc').text()).toEqual('this is an icon!');
    });

    it('should default to an empty string', () => {
      const wrapper = shallow(<ErrorIcon context="image" />);
      expect(wrapper.find('desc').text()).toEqual('');
    });
  });
});
