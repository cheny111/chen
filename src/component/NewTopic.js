import React from 'react';
import axios from 'axios';
import {url} from '../config.js';
import {Input,Card,Button,Select} from 'antd';
const Option = Select.Option


export default class NewTopic extends React.Component{
	constructor(){
		super()
		this.state={
			title:'',
			content:'',
			tab:'dev'
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

		let data={accesstoken,title,tab,content}
		axios.post(`${url}/topics`,data)
		.then(res=>{
			let id=res.data.topic_id;
			this.props.history.push(`/topic/${id}`)
		})
		.catch(err=>alert('err'))
	}
	render(){
		let {title,content,tab}=this.state
		return(
			<div style={{fontSize:'20px'}}>
				选择版块：
				<Select style={{width:'120px'}} value={this.state.tab} onChange={value => this.setState({tab:value})}>
            <Option value="ask">问答</Option>
            <Option value="job">招聘</Option>
            <Option value="share">分享</Option>
            <Option value="dev">客户端测试</Option>
          </Select>

				<Card >
					<Input placeholder='标题字数 10 字以上' value={title} onChange={e=>this.setState({title:e.target.value})}/>
					<Input type='textarea' cols="30" rows='10' style={{marginTop:'10px'}} value={content} onChange={e=>this.setState({content:e.target.value})}/>
				</Card>
				<Button type='primary' onClick={this.handleClick.bind(this)}>提交</Button>
				
			</div>
		)
	}
}