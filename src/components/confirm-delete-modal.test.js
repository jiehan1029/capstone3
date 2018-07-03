import React from 'react';
import { shallow } from 'enzyme';
import ConfirmDeleteModal from './confirm-delete-modal';

import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Provider store={store}>
  	<ConfirmDeleteModal />
  	</Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

