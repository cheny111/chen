import React from 'react';
import axios from 'axios';
import {url} from '../config.js'
import {Link} from 'react-router-dom';
import {message} from 'antd';
import moment from 'moment'

export default class Message extends React.Component{
	constructor(){
		super()
		this.state={
			data:null
		}
	}
	componentDidMount(){
		let accesstoken=sessionStorage.accesstoken;
		axios.get(`${url}/messages?accesstoken=${accesstoken}`)
		.then(res=>this.setState({data:res.data.data}))
		.catch(err=>message.error('消息读取失败'))
	}
	render(){
		let {data}=this.state
		console.log(data)
		
		return(
			<div style={{padding:'10px'}}>
				{
					data?(
									<div style={{backgroungColor:'red'}}>
										<h2 style={{lineHeight:'24px'}}>未读消息：</h2>
												{
													data.hasnot_read_messages.map(item=>(
													<p key={item.id}>
														<Link to='/'>{item.author.loginname}</Link>
														
														{item.type==='reply'? '回复' :'@'}了你的
														<Link to={`/topic/${item.topic.id}`}>{item.topic.title}</Link>
														<span style={{float:'right'}}>{moment(item.create_at).fromNow()}</span>
													</p>
													))
												}
									<h2>已读消息：</h2>
												{
													data.has_read_messages.map(item=>(
													<p key={item.id}>
														<Link to=''>{item.author.loginname}</Link>
														
														{item.type==='reply'? '回复' :'@'}了你的
														<Link to={`/topic/${item.topic.id}`}>{item.topic.title}</Link>
														<span style={{float:'right'}}>{moment(item.create_at).fromNow()}</span>
													</p>
													))
												}
									</div>
								):'没有数据'
				}
			</div>
		)
	}
}





