import React from 'react';
import { shallow } from 'enzyme';
import DeleteIcon from './DeleteIcon';

describe('the DeleteIcon component', () => {
  it('should render an SVG', () => {
    const wrapper = shallow(<DeleteIcon />);
    expect(wrapper.name()).toEqual('svg');
  });

  describe('the width prop', () => {
    it('should set the width of the svg element', () => {
      const wrapper = shallow(<DeleteIcon width={42} />);
      expect(wrapper.prop('width')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<DeleteIcon />);
      expect(wrapper.prop('width')).toEqual(24);
    });
  });

  describe('the height prop', () => {
    it('should set the fill color of the svg element', () => {
      const wrapper = shallow(<DeleteIcon height={42} />);
      expect(wrapper.prop('height')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<DeleteIcon />);
      expect(wrapper.prop('height')).toEqual(24);
    });
  });

  describe('the fill prop', () => {
    it('should set the height of the svg element', () => {
      const wrapper = shallow(<DeleteIcon fill="#222222" />);
      expect(wrapper.find('path').prop('fill')).toEqual('#222222');
    });

    it('should default to black', () => {
      const wrapper = shallow(<DeleteIcon />);
      expect(wrapper.find('path').prop('fill')).toEqual('#000');
    });
  });
});
