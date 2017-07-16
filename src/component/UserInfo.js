import  React from 'react';
import {url} from '../config.js';
import axios from 'axios';
import {Avatar,message} from 'antd';
import {Link} from 'react-router-dom';

export default class UserInfo extends React.Component{
	constructor(){
		super()
		this.state={
			data:null
		}
	}
	componentWillMount(){
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		console.log(this.props)
		let loginname = this.props.location.state
		axios.get(`${url}/user/${loginname}`)
		.then(res=>this.setState({data:res.data.data}))
		.catch(err=>message.error('个人信息获取失败'))

		
	}
	render(){
		let {data}=this.state
		console.log(data)
		return(
			<div>
				<h1>个人信息:</h1>
				{
					data?
					(
						<div>
							<div style={{borderBottom:'2px solid #eee'}}>
								<Avatar src={data.avatar_url}/>
								<h2>用户名：{data.loginname}</h2>
								<h2>积分：{data.score}</h2>
							</div>
							

							<div style={{fontSize:'24px',borderBottom:'2px solid #eee'}}>参与的话题：
								{	
									data.recent_replies.map(item=>(
										<div key={item.id}>
											<span>{item.author.loginname}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<Link to={`/topic/${item.id}`}>{item.title}</Link>
										</div>
									))
								}
							</div>
							<div style={{fontSize:'24px'}}>创建的话题：
								{
									data.recent_topics.map(item=>(
										<p key={item.id}>{item.title}</p>
										))
								}
							</div>
						</div>
					):null
				}
			</div>
		)
	}
}