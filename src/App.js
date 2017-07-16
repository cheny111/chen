import React from 'react';
import {HashRouter,Route} from 'react-router-dom';

import Header from './component/Header.js';
import Footer from './component/Footer.js';
import Home from './component/Home.js';
import Topic from './component/Topic.js';
import Message from './component/Message.js';
import Collect from './component/Collect.js';
import UserInfo from './component/UserInfo.js';
import NewTopic from './component/NewTopic.js'

import './main.css'

export default class App extends React.Component{
	/*componentWillMount(){
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
	}*/
	componentDidMount(){
		sessionStorage.clear();
	}
	render(){
		return(
			<HashRouter>
				<div>
					<Header/>
						<Route path='/' exact component={Home}/>
						<Route path='/topic/:id' component={Topic}/>
						<Route path='/message' component={Message}/>
						<Route path='/collect/:loginname' component={Collect}/>
						<Route path='/user/:loginname' component={UserInfo}/>
						<Route path='/newtopic' component={NewTopic}/>
				</div>
			</HashRouter>
		)
	}
}