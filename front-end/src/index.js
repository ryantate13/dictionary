import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Dict from 'workerize-loader!./Dict'; // eslint-disable-line
import registerServiceWorker from './registerServiceWorker';

window.Dictionary = Dict();

ReactDOM.render(<App dict={window.Dictionary}/>, document.getElementById('root'));

registerServiceWorker();
