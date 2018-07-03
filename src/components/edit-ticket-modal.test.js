import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';

import EditTicketModal from './edit-ticket-modal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Provider store={store}>
  	<EditTicketModal />
  	</Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
