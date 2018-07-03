import React from 'react';
import { shallow } from 'enzyme';
import RandomPickModal from './random-pick-modal';

it('renders without crashing', () => {
  shallow(<RandomPickModal />);
});
