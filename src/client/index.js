import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import { configureStore } from '../common/store';
import App from '../common/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore();
const history = createBrowserHistory();
const syncedHistory = syncHistoryWithStore(
  history,
  store,
  {
    selectLocationState: (state) => {
      return state.get('routing').toJS();
    }
  }
);

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter history={syncedHistory}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
