import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './router/AppRouter';
import './styles/index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
