import * as React from 'react';
import { mount } from 'enzyme';
import Index from '../src/pages/index';
import Search from '../src/pages/search';

//Not to strong or familiar with testing, but willing to learn it. Was able to set it up and run extremly simple tests.

describe('Pages', () => {
  describe('Index', () => {
    it('should render without throwing an error', function () {
      const wrap = mount(<Index />);
      expect(wrap.find('main').text()).toBe('Popular Routes');
    });
  });
});

describe('Results', () => {
  describe('Search', () => {
    it('should render without throwing an error', function () {
      const wrap = mount(<Search />);
      // expect(wrap.find('main').
    });
  });
});
