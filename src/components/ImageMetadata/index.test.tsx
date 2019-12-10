import React from 'react';
import { shallow } from 'enzyme';
import ImageMetadata from '.';

describe('the ImageMetadata component', () => {
  describe('when nothing is passed in for props', () => {
    it('should render nothing', () => {
      const wrapper = shallow(<ImageMetadata />);
      expect(wrapper.html()).toBe(null);
    });
  });

  describe('when no subtitle is passed in the props', () => {
    it('should not include the subtitle span', () => {
      const wrapper = shallow(<ImageMetadata
        caption="aaaaaa"
        credits={{ by: [{ name: 'bbbyyy' }], affiliation: [{ name: 'affff' }] }}
      />);
      expect(wrapper.find('span')).toHaveLength(0);
      expect(wrapper.text()).toBe('aaaaaa (bbbyyy/affff)');
    });
  });

  describe('when no caption is passed in the props', () => {
    it('should not include the caption text', () => {
      const wrapper = shallow(<ImageMetadata
        subtitle="ffffg"
        credits={{ by: [{ name: 'bbbyyy' }], affiliation: [{ name: 'affff' }] }}
      />);
      expect(wrapper.find('span')).toHaveLength(1);
      expect(wrapper.find('span').first().text()).toBe('ffffg ');
      expect(wrapper.text()).toBe('ffffg (bbbyyy/affff)');
    });
  });

  describe('when no credits are passed in the props', () => {
    it('should not include the credits string', () => {
      const wrapper = shallow(<ImageMetadata
        subtitle="ffffg"
        caption="ttttu"
      />);
      expect(wrapper.find('span')).toHaveLength(1);
      expect(wrapper.find('span').first().text()).toBe('ffffg ');
      expect(wrapper.text()).toBe('ffffg ttttu ');
    });
  });

  describe('when no byline is passed in the props', () => {
    it('should not include the byline in the credits string', () => {
      const wrapper = shallow(<ImageMetadata
        subtitle="ffffg"
        caption="ttttu"
        credits={{ affiliation: [{ name: 'affff' }] }}
      />);
      expect(wrapper.find('span')).toHaveLength(1);
      expect(wrapper.find('span').first().text()).toBe('ffffg ');
      expect(wrapper.text()).toBe('ffffg ttttu (affff)');
    });
  });

  describe('when an empty byline is passed in the props', () => {
    it('should not include the byline in the credits string', () => {
      const wrapper = shallow(<ImageMetadata
        subtitle="ffffg"
        caption="ttttu"
        credits={{ by: [], affiliation: [{ name: 'affff' }] }}
      />);
      expect(wrapper.find('span')).toHaveLength(1);
      expect(wrapper.find('span').first().text()).toBe('ffffg ');
      expect(wrapper.text()).toBe('ffffg ttttu (affff)');
    });
  });

  describe('when a nameless byline is passed in the props', () => {
    it('should not include the byline in the credits string', () => {
      const wrapper = shallow(<ImageMetadata
        subtitle="ffffg"
        caption="ttttu"
        credits={{ by: [{}], affiliation: [{ name: 'affff' }] }}
      />);
      expect(wrapper.find('span')).toHaveLength(1);
      expect(wrapper.find('span').first().text()).toBe('ffffg ');
      expect(wrapper.text()).toBe('ffffg ttttu (affff)');
    });
  });

  describe('when no affiliation is passed in the props', () => {
    it('should not include the affliation in the credits string', () => {
      const wrapper = shallow(<ImageMetadata
        subtitle="ffffg"
        caption="ttttu"
        credits={{ by: [{ name: 'bbbyyy' }] }}
      />);
      expect(wrapper.find('span')).toHaveLength(1);
      expect(wrapper.find('span').first().text()).toBe('ffffg ');
      expect(wrapper.text()).toBe('ffffg ttttu (bbbyyy)');
    });
  });

  describe('when an empty affiliation is passed in the props', () => {
    it('should not include the affliation in the credits string', () => {
      const wrapper = shallow(<ImageMetadata
        subtitle="ffffg"
        caption="ttttu"
        credits={{ by: [{ name: 'bbbyyy' }], affiliation: [] }}
      />);
      expect(wrapper.find('span')).toHaveLength(1);
      expect(wrapper.find('span').first().text()).toBe('ffffg ');
      expect(wrapper.text()).toBe('ffffg ttttu (bbbyyy)');
    });
  });

  describe('when a nameless affiliation is passed in the props', () => {
    it('should not include the affliation in the credits string', () => {
      const wrapper = shallow(<ImageMetadata
        subtitle="ffffg"
        caption="ttttu"
        credits={{ by: [{ name: 'bbbyyy' }], affiliation: [{}] }}
      />);
      expect(wrapper.find('span')).toHaveLength(1);
      expect(wrapper.find('span').first().text()).toBe('ffffg ');
      expect(wrapper.text()).toBe('ffffg ttttu (bbbyyy)');
    });
  });

  describe('when all the possible metadata values are included', () => {
    it('should render the metadata string correctly', () => {
      const wrapper = shallow(<ImageMetadata
        subtitle="ffffg"
        caption="ttttu"
        credits={{ by: [{ name: 'bbbyyy' }], affiliation: [{ name: 'affff' }] }}
      />);
      expect(wrapper.find('span')).toHaveLength(1);
      expect(wrapper.find('span').first().text()).toBe('ffffg ');
      expect(wrapper.text()).toBe('ffffg ttttu (bbbyyy/affff)');
    });
  });
});
