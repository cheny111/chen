import React from 'react';
import axios from 'axios'
import {url} from '../config.js';
import {message} from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom';


export default class Collect extends React.Component{
	constructor(){
		super()
		this.state={
			data:null
		}
	}
	componentWillMount(){
		// console.log(1)
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		console.log(this.props)
		let loginname = this.props.location.state
		// let loginname=this.props.author.loginname
		axios.get(`${url}/topic_collect/${loginname}`)
		.then(res=>this.setState({data:res.data.data}))
		.catch(err=>message.error('收藏信息获取失败'))

		
	}
	render(){
		let {data}=this.state
		console.log(data)
		return(
			<div>
				<div style={{backgroundColor:'#D0D0D0',fontSize:'18px'}}>我的收藏》</div>
				{
					data?
					(
						data.map(item=>(
							<p key={item.id} className='collect'>

								<Link to=''><strong>{item.author.loginname}</strong></Link>
								<Link to={`/topic/${item.id}`}>{item.title}</Link>
								<span>{moment(item.create_at).fromNow()}</span>
							</p>
							))
						
					)
					:null
				}
			</div>
		)
	}
}