import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import Header from './component/Header.js';
import Footer from './component/Footer.js';
import Home from './component/Home.js';
import Topic from './component/Topic.js'

import './main.css'

export default class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<div>
					<Header/>
						<Route path='/' exact component={Home}/>
						<Route path='/topic/:id' component={Topic}/>
				</div>
			</BrowserRouter>
		)
	}
}