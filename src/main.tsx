import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
//import TagManager from 'react-gtm-module';

import { App } from './router';
import { setupStore } from './store/store';

// const tagManagerArgs = {
//   gtmId: 'G-MPBS7BE0VP'
// };
//
// TagManager.initialize(tagManagerArgs);

const store = setupStore();

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={ store } >
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
