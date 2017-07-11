import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import App from './App.js'

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(<App/>, document.getElementById('root'))
