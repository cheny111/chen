import React from 'react';
import {HashRouter,Route} from 'react-router-dom';

import Header from './component/Header.js';
import Footer from './component/Footer.js';
import Home from './component/Home.js';

import './main.css'

export default class App extends React.Component{
	render(){
		return(
			<HashRouter>
				<div>
					<Header>
						<Route path='/' exact component={Home}/>
					</Header>
				</div>
			</HashRouter>
		)
	}
}