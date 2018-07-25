import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Dict from 'workerize-loader!./Dict'; // eslint-disable-line import/no-webpack-loader-syntax
import registerServiceWorker from './registerServiceWorker';
import 'datalist-polyfill';

window.Dictionary = Dict();

ReactDOM.render(<App dict={window.Dictionary}/>, document.getElementById('root'));

registerServiceWorker();
