import React from 'react';
import axios from 'axios';
import {url} from '../config.js';
import {Input,Card,Button} from 'antd';

export default class NewTopic extends React.Component{
	constructor(){
		super()
		this.state={
			title:'',
			content:'',
			tab:''
		}
	}
	
	handleClick(){
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		
		let {title,content,tab}=this.state
		let data={accesstoken,title,content,tab}
		axios.post(`${url}/topics`,data)
		.then(res=>console.log(res))
		.catch(err=>alert('err'))
	}
	render(){
		let {title,content,tab}=this.state
		return(
			<div style={{fontSize:'20px'}}>
				选择版块：
				<select style={{fontSize:'20px',margin:'10px'}} >
					<option value="dev" onChange={e=>this.setState({tab:e.target.value})}>客户端测试</option>
					<option value="job" onChange={e=>this.setState({tab:e.target.value})}>招聘</option>
					<option value="ask" onChange={e=>this.setState({tab:e.target.value})}>问答</option>
					<option value="share" onChange={e=>this.setState({tab:e.target.value})}>分享</option>
				</select>
				<Card >
					<Input placeholder='标题字数 10 字以上' onChange={e=>this.setState({title:e.target.value})}/>
					<Input type='textarea' cols="30" rows='10' style={{marginTop:'10px'}} onChange={e=>this.setState({content:e.target.value})}/>
				</Card>
				<Button type='primary' onClick={this.handleClick.bind(this)}>提交</Button>
				
			</div>
		)
	}
}