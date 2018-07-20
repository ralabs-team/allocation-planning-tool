import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './router/AppRouter';
import store from './store';
import './styles/index.css';

import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
