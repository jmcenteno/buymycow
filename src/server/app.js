import React from 'react';
import { StaticRouter } from 'react-router';
import Context from 'react-context-component';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import renderFullPage from './render'
import App from '../common/App'
import reducers from '../common/reducers'

const ErrorPage = () => {
  return (
    <h1>Oops there was an error</h1>
  );
}

const reactApp = (req, res) => {
  
  let HTML;
  let status = 200;

  const setStatus = (newStatus) => {
    status = newStatus
  }

  const store = createStore(reducers);
  const preloadedState = store.getState();  

  try {

    const component = (
      <Context setStatus={setStatus}>
        <Provider store={store}>
          <StaticRouter context={{}} location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      </Context>
    );

    HTML = renderFullPage(component, preloadedState);

  } catch (error) {

    HTML = renderFullPage(ErrorPage);
    status = 500;

  }

  res.status(status).send(HTML);

}

export default reactApp;
