import '@babel/polyfill';
require('base64-js');
import atob from 'atob';
import btoa from 'btoa';
window.atob = atob;
window.btoa = btoa;
// canvas toBlob polyfill
import Polyfill from './polyfill/polyfill';
new Polyfill();
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.less'

import App from './App';

ReactDOM.render(<App/>, document.getElementById('app'));
