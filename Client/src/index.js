import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Toaster} from "react-hot-toast"
import {Provider} from "react-redux"
import store from './Redux/store/store';
import {persistStore} from "redux-persist"
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    <Toaster/>
    </PersistGate>
  </Provider>
);

