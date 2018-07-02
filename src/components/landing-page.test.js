import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';
import LandingPage from './landing-page';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
	<Provider store={store}>
		<LandingPage />
	</Provider>,
  div);
  ReactDOM.unmountComponentAtNode(div);
});
