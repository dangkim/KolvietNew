import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
import { store, history } from './_helpers';
import { Router } from 'react-router-dom';
import './assets/base.css';
import Main from './DemoPages/Main';
//import {configureStore} from './config/configureStore';
import { Provider } from 'react-redux';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import i18n from './i18n';
//const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Component i18n={i18n} />
      </Router>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./DemoPages/Main', () => {
    const NextApp = require('./DemoPages/Main').default;
    renderApp(NextApp);
  });
}
unregister();

// registerServiceWorker();

