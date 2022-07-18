import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';

import { Provider } from 'react-redux/es/exports';
import store from './redux/store/index';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App /> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

