import React from 'react';
import { shallow } from 'enzyme';
import ClosedCaptioningIcon from './ClosedCaptioningIcon';

describe('the ClosedCaptioningIcon component', () => {
  it('should render an SVG', () => {
    const wrapper = shallow(<ClosedCaptioningIcon />);
    expect(wrapper.name()).toEqual('svg');
  });

  describe('the width prop', () => {
    it('should set the width of the svg element', () => {
      const wrapper = shallow(<ClosedCaptioningIcon width={42} />);
      expect(wrapper.prop('width')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<ClosedCaptioningIcon />);
      expect(wrapper.prop('width')).toEqual(24);
    });
  });

  describe('the height prop', () => {
    it('should set the height of the svg element', () => {
      const wrapper = shallow(<ClosedCaptioningIcon height={42} />);
      expect(wrapper.prop('height')).toEqual(42);
    });

    it('should default to 24', () => {
      const wrapper = shallow(<ClosedCaptioningIcon />);
      expect(wrapper.prop('height')).toEqual(24);
    });
  });

  describe('the fill prop', () => {
    it('should set the fill color of the svg element', () => {
      const wrapper = shallow(<ClosedCaptioningIcon fill="#222222" />);
      expect(wrapper.find('path').prop('fill')).toEqual('#222222');
    });

    it('should default to black', () => {
      const wrapper = shallow(<ClosedCaptioningIcon />);
      expect(wrapper.find('path').prop('fill')).toEqual('#000');
    });
  });
});
