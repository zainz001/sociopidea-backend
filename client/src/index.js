import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk))); // Add a closing parenthesis here

const root = document.getElementById('root');

// Use createRoot from "react-dom/client" for rendering
const reactRoot = createRoot(root);
reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
